import { mkdtempSync, readdirSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { type Database } from './db.type';
import { drizzleSchema } from './drizzle-schema';

/**
 * A pasta `server/`, calculada a partir DESTE arquivo — e não do diretório em que o processo
 * foi iniciado.
 *
 * O mesmo server sobe de lugares diferentes: `npm run dev` roda dentro de `server/`, o Docker
 * roda `node server/dist/main.js` da raiz, e os seeds rodam da raiz do workspace. As
 * migrations precisam ser achadas nos três casos.
 *
 * `src/lib/db` e `dist/lib/db` ficam à mesma distância de `server/`, então a conta vale para
 * o código-fonte e para o build.
 */
export const SERVER_ROOT = resolve(__dirname, '..', '..', '..');

/** As migrations versionadas, geradas por `npm run db:generate`. */
export const MIGRATIONS_FOLDER = join(SERVER_ROOT, 'drizzle');

export type OpenDatabase = {
  db: Database;
  close: () => Promise<void>;
};

/**
 * Quantas conexões o sistema mantém abertas.
 *
 * **Uma só não serve.** Painel, Inteligência e Orçamento disparam as consultas deles JUNTAS
 * (`Promise.all`), porque são independentes e enfileirá-las deixaria a tela lenta. Com uma
 * conexão, essas consultas disputam o mesmo canal e a tela inteira cai junto quando algo dá
 * errado em uma delas. Cinco é folgado para um MVP e continua barato na Neon, que cobra por
 * conexão aberta.
 */
const POOL_SIZE = 5;

/**
 * Segundos que uma conexão parada fica aberta.
 *
 * A Neon SUSPENDE o banco depois de alguns minutos sem uso, e derruba as conexões junto.
 * Guardar um socket aberto por horas significa que a primeira consulta depois do almoço sai
 * por um cano que já morreu — e o erro aparece na tela de quem só abriu o painel. Fechando a
 * conexão parada antes disso, a próxima consulta abre uma nova e funciona.
 */
const IDLE_TIMEOUT_SECONDS = 30;

/** O schema de sempre. Outro só quando o banco é dividido com outros sistemas. */
export const DEFAULT_SCHEMA = 'public';

/**
 * Abre a conexão com o Postgres e aplica as migrations pendentes.
 *
 * É a ÚNICA porta para o banco: o `DbModule`, os seeds e os testes E2E passam por aqui.
 *
 * A MIGRATION roda numa conexão SÓ DELA, aberta e fechada aqui: o `migrate` do Drizzle aplica
 * uma migration por vez e precisa que a trava de migração e o DDL aconteçam na mesma conexão.
 * Com o pool, dois processos subindo juntos (o server e um seed, por exemplo) poderiam aplicar
 * a mesma migration duas vezes. Depois que o banco está no lugar, o sistema passa a usar o
 * pool — que é o que permite as telas buscarem várias coisas ao mesmo tempo.
 */
export async function openDatabase(url: string, schema = DEFAULT_SCHEMA): Promise<OpenDatabase> {
  assertSchemaName(schema);

  /* Fora do `public`, toda conexão já nasce olhando só para o schema do sistema: as tabelas
     do Drizzle não levam schema no nome, e é o `search_path` que decide onde elas moram. */
  const connection = schema === DEFAULT_SCHEMA ? {} : { search_path: schema };

  /* Migration aplicada na partida: quem clona o projeto roda `npm run dev` e o banco já
     nasce com as tabelas. Esquecer `db:migrate` não é um passo que alguém deveria poder
     esquecer. */
  const migrationClient = postgres(url, { max: 1, connection });

  try {
    if (schema === DEFAULT_SCHEMA) {
      await migrate(drizzle(migrationClient), { migrationsFolder: MIGRATIONS_FOLDER });
    } else {
      await migrationClient.unsafe(`create schema if not exists "${schema}"`);
      await migrate(drizzle(migrationClient), {
        migrationsFolder: migrationsForSchema(schema),
        /* O histórico de migrations mora DENTRO do schema do sistema: o schema `drizzle`
           padrão pode ser de outro sistema no mesmo banco, e ler o histórico dele faz o
           migrator pular migrations que nunca rodaram aqui. */
        migrationsSchema: schema,
      });
    }
  } finally {
    await migrationClient.end();
  }

  const sql = postgres(url, { max: POOL_SIZE, idle_timeout: IDLE_TIMEOUT_SECONDS, connection });

  return { db: drizzle(sql, { schema: drizzleSchema }), close: () => sql.end() };
}

/* O nome entra cru no SQL (`create schema`, `search_path`): só letras minúsculas, número e
   sublinhado, para nunca virar injeção de SQL pela variável de ambiente. */
function assertSchemaName(schema: string): void {
  if (/^[a-z_][a-z0-9_]*$/.test(schema)) return;

  throw new Error(`Invalid database schema name: ${schema}`);
}

/**
 * Uma cópia das migrations com `"public".` trocado pelo schema do sistema.
 *
 * As migrations geradas pelo drizzle-kit escrevem `"public"."tabela"` nas chaves
 * estrangeiras. Fora do `public`, essas referências apontariam para o schema errado — e as
 * migrations versionadas não se editam. A troca acontece numa pasta temporária, a cada
 * partida, e os arquivos de `drizzle/` ficam como foram gerados.
 */
function migrationsForSchema(schema: string): string {
  const folder = mkdtempSync(join(tmpdir(), 'ticket-os-migrations-'));
  cpSync(MIGRATIONS_FOLDER, folder, { recursive: true });

  for (const file of readdirSync(folder).filter((name) => name.endsWith('.sql'))) {
    const path = join(folder, file);
    writeFileSync(path, readFileSync(path, 'utf8').replaceAll('"public".', `"${schema}".`));
  }

  return folder;
}

/**
 * Esconde a senha da string de conexão, para ela poder ser registrada em log.
 *
 * O log de partida diz em que banco o server conectou — e essa informação é útil o bastante
 * para valer o cuidado de não vazar a credencial junto. Um `.env` errado apontando para o
 * banco de produção é o tipo de coisa que só se percebe olhando essa linha.
 */
export function describeDatabaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const database = parsed.pathname.replace(/^\//, '') || '(padrão)';

    return `${parsed.host}/${database}`;
  } catch {
    return '(string de conexão ilegível)';
  }
}
