# Minify Project

Este projeto é um script Node.js para minificar arquivos JavaScript (.js) e CSS (.css) de forma automática. Ele lê recursivamente todos os arquivos `.js` e `.css` do projeto, gera os arquivos `.min.js` e `.min.css` ao lado dos arquivos originais e respeita a estrutura de pastas existente.

## Requisitos

- Python3 
- Node.js instalado
- npm (geralmente vem junto com o Node.js)

## Configuração do Python

Após instalar o Python, você precisa garantir que a variável de ambiente PYTHON aponte para o executável do Python.

```bash
echo $PYTHON
export PYTHON=$(which python3)
```

## Instalação

1. **Clone o repositório ou baixe os arquivos**

    ```bash
    git clone git@github.com:danilsonvss/minify.git
    cd minify
    ```

2. **Instale as dependências**

    ```bash
    npm install
    ```

## Gerando o executável

```bash
npx nexe -i src/main.js -o dist/minify --build
```

## Utilização

Para minificar os arquivos `.js` e `.css`, execute o seguinte comando no terminal:

```bash
minify -h || minify --help # Dicas de como usar
```
