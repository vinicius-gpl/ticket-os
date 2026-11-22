# Ícones

## Origem

A origem é um SVG só, `icons/ticket-os.svg`: o selo padrão dos apps (quadrado na prata da marca,
monograma TO em blocos e a faixa âmbar) — o mesmo `favicon.svg` do dashboard. É ele que vira a
bandeja, o favicon do WebView, o cabeçalho da popup e do dashboard, o `.exe`, o instalador e o
`build/appicon.png`.

O selo é quadrado e cheio até a borda, de propósito: lido a 16×16 na bandeja, ele precisa ocupar o
quadro inteiro para ter o mesmo peso dos ícones dos outros apps.

## Por que converter para .ico

A API de bandeja do Windows (`fyne.io/systray`, e a API nativa do Windows por trás dela) espera um
`.ico` — não aceita SVG diretamente. O mesmo vale pro ícone do executável e do instalador
(`build/windows/icon.ico`). Já a interface Svelte, dentro do WebView2, renderiza SVG nativamente;
por isso `svelte/public/favicon.svg` é só uma cópia do SVG (`ic_launcher_foreground.svg`), sem
conversão — o Vite serve qualquer coisa em `public/` direto na raiz do build.

## Ferramenta usada

Nenhuma ferramenta externa (Inkscape, ImageMagick, `rsvg-convert`) estava disponível no ambiente
de build, e instalar uma dependeria da máquina de quem compila — frágil para um projeto que deve
buildar com só o Go instalado. A conversão foi feita com uma ferramenta própria, escrita em Go:
**`src-go/cmd/icongen`**.

- **Rasterização** (SVG → pixels): `github.com/srwiley/oksvg` faz o parse do SVG e
  `github.com/srwiley/rasterx` desenha (rasteriza) o resultado num `image.RGBA` do Go, em
  qualquer resolução pedida.
- **Saída**: se `-out` termina em `.ico`, empacota (à mão, `writeICO`) no formato moderno de ICO
  que embute PNGs por dentro (suportado desde o Windows Vista) — mais simples que reimplementar o
  encoder BMP/DIB clássico. Se termina em `.png`, escreve o PNG de um tamanho só direto (usado só
  pra `build/appicon.png`).

Essa ferramenta **não faz parte do binário final** do agente — é rodada uma vez, o resultado
(`icons/tray.ico`, `build/appicon.png`) é commitado, e o agente só embute o `.ico` já pronto (via
`src-go/lib/assets`, ver `architecture.md`). Isso mantém o binário do agente livre de uma dependência
de rasterização de SVG que ele nunca usa em produção.

## Como gerar (ou regenerar)

```bash
cd ticket-os/agent
go run ./src-go/cmd/icongen -src icons/ticket-os.svg -out icons/tray.ico -sizes 16,32,48,256
cp icons/tray.ico src-go/lib/assets/tray.ico     # cópia embutida no binário — ver architecture.md
cp icons/tray.ico build/windows/icon.ico     # ícone do .exe e do instalador (convenção do Wails)

go run ./src-go/cmd/icongen -src icons/ticket-os.svg -out icons/tray.png -sizes 64
cp icons/tray.png src-go/lib/assets/tray.png     # bandeja fora do Windows — o systray de lá só lê PNG

go run ./src-go/cmd/icongen -src icons/ticket-os.svg -out build/appicon.png -sizes 512
cp icons/ticket-os.svg svelte/public/favicon.svg
```

Sem `-zoom`: o selo já é desenhado até a borda do quadro, não tem margem para cortar. O `-zoom`
continua no `icongen` para uma arte de origem que venha com respiro em volta.

Tamanhos incluídos no `.ico` da bandeja: **16×16 e 32×32** (os dois exigidos, usados em telas
normal e HiDPI) mais **48×48 e 256×256** (tamanhos padrão do Windows para o Explorer e a caixa
"Alt+Tab" — comuns o bastante para incluir sem custo extra, já que o `.ico` só cresce ~15 KB por
tamanho extra).
