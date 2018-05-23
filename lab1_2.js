const { readDataFileAsync, writeDistFileAsync } = require('./util/file');

function stripComments(code) {
  return code
    .replace(/\s+\/\/.*\s/g, '\n') // Remove single-line comments
    .replace(/\s*\/\*\s*.*\s*\*\//g, ''); // Remove multi-line comments
}

async function main() {
  const fileName = 'delete_comments_test.cpp';
  const file = await readDataFileAsync(fileName);
  await writeDistFileAsync(fileName, stripComments(file));
}

main();
