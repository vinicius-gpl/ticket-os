import { type DocumentTone } from './document.type';

/**
 * As cores dos documentos, num lugar só: os três geradores (PDF, Word e Excel) leem daqui, e é
 * por isso que um título é do mesmo roxo nos três.
 *
 * Os valores são os do TEMA CLARO da tela (`client/src/lib/theme/tokens.css`), copiados sem
 * alteração — o documento tem a mesma identidade do painel. O servidor não lê CSS, então a
 * cópia é à mão: mudou um token lá, muda o mesmo nome aqui.
 *
 * Sempre em hexadecimal SEM `#`: é o formato que o ExcelJS e o docx esperam. O PDF precisa do
 * `#` na frente, e por isso `pdfColor` o acrescenta.
 */
export const DOCUMENT_PALETTE = {
  /** `--primary-strong` — título, cabeçalho de tabela, faixa de ficha, fio sob o cabeçalho.
   *  A prata cheia (`--primary`) some no papel; a versão forte é a que passa no contraste. */
  primary: '5F7386',
  /** `--background` — o texto claro sobre a faixa da marca. */
  primaryForeground: 'F5F6FA',
  /** `--foreground`. */
  foreground: '11111A',
  /** `--muted-foreground`. */
  subtext: '5B6276',
  /** `--border`. */
  border: 'DFE2EA',
  /** `--background` — a linha zebrada da tabela. */
  surfaceAlt: 'F5F6FA',
  /** `--card` — o papel. */
  background: 'FBFBFD',
} as const;

/**
 * A fonte dos documentos. No Word e no Excel vai só o NOME (quem abre o arquivo usa a fonte do
 * próprio computador); no PDF a fonte vai embutida, e por isso lá se usa a Liberation Sans
 * Narrow de `fonts/` — de mesma largura, e de licença livre.
 */
export const DOCUMENT_FONT_NAME = 'Arial Narrow';

/**
 * O selo CHEIO — fundo saturado, texto claro. Bom como uma etiqueta isolada, cercada de espaço
 * em branco; numa CÉLULA de planilha ou de tabela, a mesma cor de lado a lado pesa demais.
 */
export const DOCUMENT_TONE_COLORS: Record<DocumentTone, { fill: string; text: string }> = {
  neutral: { fill: 'DFE2EA', text: '11111A' },
  info: { fill: '1D4ED8', text: 'F5F6FA' },
  success: { fill: '137337', text: 'F5F6FA' },
  warning: { fill: 'A14A08', text: 'F5F6FA' },
  danger: { fill: 'BB1E1E', text: 'F5F6FA' },
  brand: { fill: '5F7386', text: 'F5F6FA' },
};

/**
 * O selo SUAVE — fundo claro, texto saturado. São os pares `--<tom>-soft` / `--<tom>` do tema,
 * os mesmos do selo de situação da tela: dentro de uma célula, uma etiqueta clara com texto
 * colorido lê como destaque; uma célula inteira de vermelho lê como erro de formatação.
 */
export const DOCUMENT_TONE_SOFT_COLORS: Record<DocumentTone, { fill: string; text: string }> = {
  neutral: { fill: 'ECEEF4', text: '5B6276' },
  info: { fill: 'D3DCF6', text: '1D4ED8' },
  success: { fill: 'D2E5DA', text: '137337' },
  warning: { fill: 'EEDDD1', text: 'A14A08' },
  danger: { fill: 'F5D5D6', text: 'BB1E1E' },
  brand: { fill: 'EEF0F4', text: '5F7386' },
};

/** O hexadecimal com `FF` de opacidade na frente — o formato ARGB que o ExcelJS pede. */
export function excelColor(hex: string): string {
  return `FF${hex}`;
}

/** O hexadecimal com `#` na frente — o formato que o pdfmake entende. */
export function pdfColor(hex: string): string {
  return `#${hex}`;
}
