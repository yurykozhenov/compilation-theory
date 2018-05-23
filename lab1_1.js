const { readDataFileAsync, writeDistFileAsync } = require('./util/file');

const OPERATORS = [
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
  'not',
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
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, oneOperatorOneLine(file));
}

main();
