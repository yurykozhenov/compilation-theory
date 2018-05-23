const {
  parseExpression,
  isOperator,
  isOperand,
  applyOperator,
  infixExpressionToPostfix,
} = require('./util/expressions');
const { readDataFileAsync } = require('./util/file');

function evaluatePostfixExpression(postfixExpression) {
  const stack = [];

  for (const token of postfixExpression) {
    if (isOperator(token)) {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const result = applyOperator(token, operand1, operand2);

      stack.push(result);
    } else if (isOperand(token)) {
      stack.push(token);
    }
  }

  return stack.pop();
}

async function main() {
  const fileName = process.argv[2] || 'lab4_2.txt';
  const file = await readDataFileAsync(fileName);

  const prefixExpressions = file.split('\n');

  for (const expression of prefixExpressions) {
    if (!expression) {
      continue;
    }

    console.log(`Expression: ${expression}`);

    const postfixExpression = infixExpressionToPostfix(expression);
    console.log(`Postfix expression: ${postfixExpression}`);

    const parsedPostfixExpression = await parseExpression(postfixExpression);
    const result = evaluatePostfixExpression(parsedPostfixExpression);

    console.log(`Expression result: ${result}`);
    console.log('\n');
  }
}

main();
