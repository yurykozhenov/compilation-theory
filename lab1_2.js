const { readDataFileAsync, writeDistFileAsync } = require('./util/file');

function stripComments(code) {
  return code
    .replace(/\s+\/\/.*\s/g, '\n') // Remove single-line comments
    .replace(/\s*\/\*\s*.*\s*\*\//g, ''); // Remove multi-line comments
}

async function main() {
  const fileName = process.argv[2] || 'main.cpp';
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, stripComments(file));
}

main();
