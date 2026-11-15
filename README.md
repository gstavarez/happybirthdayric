#  Feliz Aniversário, Ric!

Uma experiência web interativa em formato de leque de cartas com estética **flat**, sombras suaves em camadas, iluminação dinâmica que acompanha o cursor e animação 3D ao clique para revelar uma mensagem especial de aniversário.

## ✨ Funcionalidades

* **Disposição em Leque (Fan Layout):** Cartas organizadas em arco com rotação e deslocamento individuais, adaptadas automaticamente para telas desktop e mobile.

* **Iluminação Dinâmica no Hover:** Efeito de brilho sutil (`radial-gradient`) que segue a posição do mouse sobre cada carta, acompanhado de elevação suave.

* **Flip 3D Interativo:** Clique (ou pressione `Enter` / `Espaço` com foco no teclado) para girar a carta em $180^\circ$ e revelar sua frente.

* **Revelação Final Automática:** Assim que todas as cartas forem viradas, a barra de progresso desaparece e surge a mensagem **"Feliz aniversário, Ric!"** com opção para reiniciar o baralho.

* **Alternância de Tema:** Suporte nativo para fundo claro (`theme-light`) e fundo escuro (`theme-dark`).

## 📁 Estrutura do Projeto

```
projeto-cartas-ric/
├── index.html      # Estrutura das cartas, placeholders de frente/verso e mensagem final
├── style.css       # Layout em leque, sombras flat, iluminação no hover e animações 3D
├── script.js       # Rastreamento do cursor, controle de flip, contador e reset
├── assets/         # (Opcional) Pasta recomendada para salvar seus arquivos .svg ou .png
└── README.md       # Documentação do projeto

```

## 🎨 Guia de Produção Gráfica (Figma / Illustrator)

Para garantir nitidez máxima e encaixe perfeito dentro das cartas:

| Propriedade | Escala 1x (Base) | Escala 2x (Retina) | Observações | 
| ----- | ----- | ----- | ----- | 
| **Dimensões** | `240 × 350 px` | `480 × 700 px` | Proporção aproximada de carta padrão (`1 : 1.458`) | 
| **Border Radius** | `16 px` | `32 px` | O CSS já aplica `overflow: hidden` e recorta os cantos | 
| **Formato Ideal** | `.svg` | `.svg` ou `.png` | Prefira **SVG** para traços e formas flat infinitamente nítidos | 

> **Dica de exportação:** Caso exporte em SVG pelo Figma ou Illustrator, lembre-se de converter textos em curvas (*Outline Stroke / Create Outlines*) para evitar problemas com fontes personalizadas.

## 🛠️ Como Substituir os Placeholders pelas Artes Finais

### 1. Inserindo a arte no `index.html`

Localize a carta desejada no `index.html` (de `CARTA 01` a `CARTA 05`). Cada carta possui dois blocos claramente marcados: `card-back` (verso) e `card-front` (frente).

Substitua a `<div class="placeholder-art ...">...</div>` por uma das opções abaixo:

**Opção A — Usando arquivo de imagem ou SVG externo (recomendado):**

```
<div class="card-face card-front card-front--01">
  <img src="assets/carta-01-frente.svg" alt="Ilustração da Carta 01" />
  <div class="card-glare"></div>
</div>

```

**Opção B — Colando o código `<svg>` diretamente (inline):**

```
<div class="card-face card-front card-front--01">
  <svg viewBox="0 0 240 350" xmlns="http://www.w3.org/2000/svg">
    <!-- Seu código SVG aqui -->
  </svg>
  <div class="card-glare"></div>
</div>

```

> ⚠️ **Importante:** Mantenha sempre a linha `<div class="card-glare"></div>` logo abaixo da sua arte para preservar o efeito de iluminação ao passar o mouse.

### 2. Ajustando estilos individuais no `style.css`

Na **Seção 6** do arquivo `style.css`, existem classes vazias reservadas para personalizar cores de fundo, bordas ou filtros específicos de cada carta:

```
/* Carta 01 */
.card-back--01 {
  background-color: #4A2538;
}
.card-front--01 {
  background-color: #FFFFFF;
}

```

### 3. Alternando entre Fundo Claro e Escuro

No `index.html`, altere a classe da tag `<body>`:

* Fundo claro (estilo papel): `<body class="theme-light">`

* Fundo escuro (estilo galeria): `<body class="theme-dark">`

## ➕ Como Alterar a Quantidade de Cartas (Opcional)

O `script.js` calcula automaticamente o total de cartas existentes no HTML. Caso queira adicionar ou remover cartas, basta duplicar ou apagar um bloco `<article class="card-slot">` no `index.html` e ajustar as variáveis inline de posição em leque:

* `--index`: Ordem de empilhamento (`0`, `1`, `2`, ...)

* `--fan-x`: Deslocamento horizontal em pixels (ex.: `-220px`, `0px`, `220px`)

* `--fan-y`: Deslocamento vertical em pixels para formar o arco (ex.: `26px` nas pontas, `0px` no centro)

* `--fan-rot`: Inclinação da carta em graus (ex.: `-16deg`, `0deg`, `16deg`)

## 🚀 Como Visualizar Localmente

1. Mantenha os arquivos `index.html`, `style.css` e `script.js` na mesma pasta.

2. Abra o arquivo `index.html` diretamente no navegador de sua preferência (Chrome, Safari, Firefox ou Edge) ou utilize a extensão **Live Server** no VS Code para visualizar suas alterações em tempo real.
