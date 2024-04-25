#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { minify } = require('uglify-es');
const postcss = require('postcss');
const cssnano = require('cssnano');
const postcssAutoprefixer = require('autoprefixer');

// Diretório atual onde o script está localizado
const currentDir = process.cwd();

// Configuração dos diretórios de entrada e saída
const config = {
  js: {
    src: path.join(currentDir, '**/*.js'),
  },
  css: {
    src: path.join(currentDir, '**/*.css'),
  }
};

// Função para minificar arquivos JavaScript
function minifyJS(file, encoding) {
  const fileContent = fs.readFileSync(file, encoding);
  const result = minify(fileContent);
  const minFilePath = file.replace('.js', '.min.js');
  fs.writeFileSync(minFilePath, result.code, encoding);
}

// Função para minificar arquivos CSS
async function minifyCSS(file, encoding) {
  const fileContent = fs.readFileSync(file, encoding);
  const result = await postcss([postcssAutoprefixer, cssnano])
    .process(fileContent, { from: undefined });
  const minFilePath = file.replace('.css', '.min.css');
  fs.writeFileSync(minFilePath, result.css, encoding);
}

// Minificar arquivos JavaScript
glob(config.js.src, {}, (err, files) => {
  if (err) {
    console.error('Erro ao buscar arquivos JS:', err);
    return;
  }

  files.forEach(file => minifyJS(file, 'utf8'));
  console.log('Arquivos JS minificados.');
});

// Minificar arquivos CSS
glob(config.css.src, {}, (err, files) => {
  if (err) {
    console.error('Erro ao buscar arquivos CSS:', err);
    return;
  }

  files.forEach(file => minifyCSS(file, 'utf8'));
  console.log('Arquivos CSS minificados.');
});
