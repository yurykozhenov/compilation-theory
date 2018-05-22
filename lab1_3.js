const path = require('path');
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = path.join(__dirname, 'data');
const outputPath = path.join(__dirname, 'dist');

function toChar(pascalSymbolCode) {
  return String.fromCharCode(Number(pascalSymbolCode.substring(2, pascalSymbolCode.length - 1)));
}

function getStringConstants(code) {
  return code
    .replace(/(?<!\'{1})\'\s*\+\s*\'/g, '')
    .replace(/\'\s*#(\d+)\s*\'/g, match => toChar(match), code)
    .match(/(?<=\').*(?=\')/g)
    .join('\n');
}

async function main() {
  const fileName = 'string_consts_to_file_test.pas';
  const file = await readFileAsync(path.join(inputPath, fileName), 'utf-8');
  await writeFileAsync(path.join(outputPath, fileName), getStringConstants(file));
}

main();
