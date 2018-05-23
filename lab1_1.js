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
  const fileName = process.argv[2] || 'main.pas';
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, oneOperatorOneLine(file));
}

main();
