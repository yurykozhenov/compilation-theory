const path = require('path');
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = path.join(__dirname, 'data');
const outputPath = path.join(__dirname, 'dist');

function stripComments(code) {
  return code
    .replace(/\s+\/\/.*\s/g, '\n') // Remove single-line comments
    .replace(/\s*\/\*\s*.*\s*\*\//g, ''); // Remove multi-line comments
}

async function main() {
  const fileName = 'delete_comments_test.cpp';
  const file = await readFileAsync(path.join(inputPath, fileName), 'utf-8');
  await writeFileAsync(path.join(outputPath, fileName), stripComments(file));
}

main();
