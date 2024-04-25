#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const { minify } = require('uglify-es');
const postcss = require('postcss');
const cssnano = require('cssnano');
const postcssAutoprefixer = require('autoprefixer');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('input', {
    alias: 'i',
    description: 'File or directory to minify',
    type: 'string',
  })
  .option('encoding', {
    alias: 'e',
    description: 'File encoding (e.g., utf8, ascii)',
    type: 'string',
    default: 'utf8'
  })
  .help()
  .alias('help', 'h')
  .argv;

// Diretório atual onde o script está localizado
const currentDir = process.cwd();

// Verificar se o caminho fornecido é um arquivo ou diretório
function isDirectory(filePath) {
  return fs.statSync(filePath).isDirectory();
}

const inputPath = argv.input ? path.resolve(argv.input) : currentDir;
const isDir = isDirectory(inputPath);

// Configuração dos diretórios de entrada e saída
const config = {
  js: {
    src: isDir ? path.join(inputPath, '**/*.js') : inputPath,
  },
  css: {
    src: isDir ? path.join(inputPath, '**/*.css') : inputPath,
  }
};

// Função para minificar arquivos JavaScript
function minifyJS(file, encoding) {
  if (path.extname(file) === '.min.js') {
    try {
      const fileContent = fs.readFileSync(file, encoding);
      const result = minify(fileContent);
      fs.writeFileSync(file, result.code, encoding);
      console.log(`Arquivo ${file} atualizado.`);
    } catch (error) {
      console.error(`Erro ao atualizar ${file}:`, error);
    }
    return;
  }
  
  try {
    const fileContent = fs.readFileSync(file, encoding);
    const result = minify(fileContent);
    const minFilePath = path.join(path.dirname(file), path.basename(file, '.js') + '.min.js');
    fs.writeFileSync(minFilePath, result.code, encoding);
    console.log(`Arquivo ${file} minificado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao minificar ${file}:`, error);
  }
}

// Função para minificar arquivos CSS
async function minifyCSS(file, encoding) {
  if (path.extname(file) === '.min.css') {
    try {
      const fileContent = fs.readFileSync(file, encoding);
      const result = await postcss([postcssAutoprefixer, cssnano])
        .process(fileContent, { from: undefined });
      fs.writeFileSync(file, result.css, encoding);
      console.log(`Arquivo ${file} atualizado.`);
    } catch (error) {
      console.error(`Erro ao atualizar ${file}:`, error);
    }
    return;
  }
  
  try {
    const fileContent = fs.readFileSync(file, encoding);
    const result = await postcss([postcssAutoprefixer, cssnano])
      .process(fileContent, { from: undefined });
    const minFilePath = path.join(path.dirname(file), path.basename(file, '.css') + '.min.css');
    fs.writeFileSync(minFilePath, result.css, encoding);
    console.log(`Arquivo ${file} minificado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao minificar ${file}:`, error);
  }
}

// Verificar arquivos baseado na entrada fornecida ou nos padrões de caminho
const jsFiles = isDir ? globSync(config.js.src) : [config.js.src];
const cssFiles = isDir ? globSync(config.css.src) : [config.css.src];

// Minificar arquivos JavaScript
if (jsFiles.length > 0) {
  jsFiles.forEach(file => {
    console.log(`Minificando ${file}...`);
    minifyJS(file, argv.encoding);
  });
  console.log('Arquivos JS minificados.');
} else {
  console.error('Nenhum arquivo JS encontrado');
}

// Minificar arquivos CSS
if (cssFiles.length > 0) {
  cssFiles.forEach(file => {
    console.log(`Minificando ${file}...`);
    minifyCSS(file, argv.encoding);
  });
  console.log('Arquivos CSS minificados.');
} else {
  console.error('Nenhum arquivo CSS encontrado');
}
