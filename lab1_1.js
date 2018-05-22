const path = require('path');
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = path.join(__dirname, 'data');
const outputPath = path.join(__dirname, 'dist');

OPERATORS = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '=',
  '<>',
  '>',
  '<',
  '>=',
  '<=',
  '><',
  '&',
  '|',
  '!',
  '~',
  '<<',
  '>>',
  ':=',
  ';',
  'and',
  'and then',
  'or',
  'or else',
  'not'
];

function oneOperatorOneLine(code) {
  let result = code;

  for (const op of OPERATORS) {
    if (code.includes(op)) {
      result = result.split(op).join(`${op}\n`);
    }
  }

  return result;
}

async function main() {
  const fileName = 'single_operator_in_line_test.pas';
  const file = await readFileAsync(path.join(inputPath, fileName), 'utf-8');
  await writeFileAsync(path.join(outputPath, fileName), oneOperatorOneLine(file));
}

main();
