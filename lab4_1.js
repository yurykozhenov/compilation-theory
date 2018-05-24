const {
  parseExpression,
  evaluatePrefixExpression,
} = require('./util/expressions');
const { readDataFileAsync } = require('./util/file');

async function main() {
  const fileName = process.argv[2] || 'lab4_1.txt';
  const file = await readDataFileAsync(fileName);

  const prefixExpressions = file.split('\n');

  for (const expression of prefixExpressions) {
    if (!expression) {
      continue;
    }

    console.log(`Prefix expression: ${expression}`);

    const parsedExpression = await parseExpression(expression);
    const result = evaluatePrefixExpression(parsedExpression);

    console.log(`Expression result: ${result}`);
    console.log('\n');
  }
}

main();
