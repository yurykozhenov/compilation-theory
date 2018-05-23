const { readDataFileAsync, writeDistFileAsync } = require('./util/file');

function toChar(pascalSymbolCode) {
  return String.fromCharCode(
    Number(pascalSymbolCode.substring(2, pascalSymbolCode.length - 1)),
  );
}

function getStringConstants(code) {
  return code
    .replace(/(?<!\'{1})\'\s*\+\s*\'/g, '')
    .replace(/\'\s*#(\d+)\s*\'/g, match => toChar(match), code)
    .match(/(?<=\').*(?=\')/g)
    .join('\n');
}

async function main() {
  const fileName = process.argv[2] || 'string_consts_to_file_test.pas';
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, getStringConstants(file));
}

main();
