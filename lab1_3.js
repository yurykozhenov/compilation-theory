const { readDataFileAsync, writeDistFileAsync } = require('./util/file');

function toChar(pascalSymbolCode) {
  return String.fromCharCode(
    Number(pascalSymbolCode.substring(2, pascalSymbolCode.length - 1)),
  );
}

function getStringConstants(code) {
  return code
    .replace(/(?<!\'{1})\'\s*\+\s*\'/g, '') // Concat strings separated by +
    .replace(/\'\s*#(\d+)\s*\'/g, match => toChar(match), code) // Convert special characters
    .match(/(?<=\').*(?=\')/g) // Find all strings
    .join('\n');
}

async function main() {
  const fileName = process.argv[2] || 'main.pas';
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, getStringConstants(file));
}

main();
