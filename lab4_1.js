const {
  parseExpression,
  isOperator,
  isOperand,
  applyOperator,
} = require('./util/expressions');
const { readDataFileAsync } = require('./util/file');

function evaluatePrefixExpression(prefixExpression) {
  prefixExpression = prefixExpression.reverse();
  const stack = [];

  for (const token of prefixExpression) {
    if (isOperator(token)) {
      const operand1 = stack.pop();
      const operand2 = stack.pop();
      const result = applyOperator(token, operand1, operand2);

      stack.push(result);
    } else if (isOperand(token)) {
      stack.push(token);
    }
  }

  return stack.pop();
}

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
