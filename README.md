# Minify - Python Script Minifier

O Minify é um script Python para minificar arquivos CSS e JS. Este README fornece instruções para configurar o projeto e gerar um executável usando o PyInstaller.

## Pré-requisitos

- Python 3.x
- Pip

## Instalação das Dependências

Instale as bibliotecas necessárias usando o `pip`:

```bash
pip install csscompressor jsmin
```

## Configuração do Projeto

1. Clone o repositório ou baixe o arquivo `minify.py`.

```bash
git clone https://github.com/seu-usuario/minify.git
```

2. Navegue até o diretório do projeto:

```bash
cd minify
```

## Compilando o Script Python

Execute o comando abaixo para criar o executável usando o PyInstaller:

```bash
pyinstaller --onefile --add-data='minify.py:.' --name=minify minify.py
```

Este comando irá gerar um executável `minify` na pasta `dist`.

## Executando o Executável

Após a compilação bem-sucedida, execute o executável `minify` na pasta `dist`:

```bash
./dist/minify
```

## Notas

- O executável inclui o script Python e as bibliotecas `csscompressor` e `jsmin`, permitindo que você o execute sem precisar ter essas bibliotecas instaladas separadamente.
