#!/usr/bin/env python3
import os
import sys
import glob
import argparse
from csscompressor import compress as css_compress
from jsmin import jsmin

def is_directory(path):
    return os.path.isdir(path)

def minify_js(file_path, encoding='utf-8'):
    if file_path.endswith('.min.js'):
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                minified_code = jsmin(f.read())
            with open(file_path, 'w', encoding=encoding) as f:
                f.write(minified_code)
            print(f"Arquivo {file_path} atualizado.")
        except Exception as e:
            print(f"Erro ao atualizar {file_path}: {e}")
    else:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                code = f.read()
            minified_code = jsmin(code)
            min_file_path = os.path.splitext(file_path)[0] + '.min.js'
            with open(min_file_path, 'w', encoding=encoding) as f:
                f.write(minified_code)
            print(f"Arquivo {file_path} minificado com sucesso.")
        except Exception as e:
            print(f"Erro ao minificar {file_path}: {e}")

def minify_css(file_path, encoding='utf-8'):
    if file_path.endswith('.min.css'):
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                minified_css = css_compress(f.read())
            with open(file_path, 'w', encoding=encoding) as f:
                f.write(minified_css)
            print(f"Arquivo {file_path} atualizado.")
        except Exception as e:
            print(f"Erro ao atualizar {file_path}: {e}")
    else:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                css_content = f.read()
            minified_css = css_compress(css_content)
            min_file_path = os.path.splitext(file_path)[0] + '.min.css'
            with open(min_file_path, 'w', encoding=encoding) as f:
                f.write(minified_css)
            print(f"Arquivo {file_path} minificado com sucesso.")
        except Exception as e:
            print(f"Erro ao minificar {file_path}: {e}")

def main():
    parser = argparse.ArgumentParser(description='Minify CSS and JS files.')
    parser.add_argument('path', nargs='?', default=os.getcwd(), help='Path to directory or file')
    parser.add_argument('--encoding', '-e', default='utf-8', help='File encoding (e.g., utf-8, ascii)')
    args = parser.parse_args()

    input_path = args.path
    encoding = args.encoding
    is_dir = is_directory(input_path)

    js_files = glob.glob(os.path.join(input_path, '**/*.js' if is_dir else '*.js'), recursive=True)
    css_files = glob.glob(os.path.join(input_path, '**/*.css' if is_dir else '*.css'), recursive=True)

    for js_file in js_files:
        print(f"Minificando {js_file}...")
        minify_js(js_file, encoding=encoding)

    for css_file in css_files:
        print(f"Minificando {css_file}...")
        minify_css(css_file, encoding=encoding)

    if not js_files:
        print('Nenhum arquivo JS encontrado')

    if not css_files:
        print('Nenhum arquivo CSS encontrado')

if __name__ == "__main__":
    main()
