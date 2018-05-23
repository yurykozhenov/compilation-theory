const {
  parseExpression,
  isOperator,
  isOperand,
  applyOperator,
} = require('./util/expressions');
const { readDataFileAsync } = require('./util/file');

function evaluatePrefixExpression(prefixExpression) {
  const operatorStack = [];
  const operandStack = [];
  let pendingOperand = false;

  for (const token of prefixExpression) {
    if (isOperator(token)) {
      operatorStack.push(token);
      pendingOperand = false;
    } else if (isOperand(token)) {
      let operand = token;

      if (pendingOperand) {
        while (operandStack.length > 0) {
          const operand1 = operandStack.pop();
          const operator = operatorStack.pop();
          operand = applyOperator(operator, operand1, operand);
        }
      }

      operandStack.push(operand);
      pendingOperand = true;
    }
  }

  return operandStack.pop();
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
