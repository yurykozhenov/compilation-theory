const { input } = require('./io');

const OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^': (a, b) => a ** b,
  '=': (a, b) => `${a} = ${b} (${String(a === b)})`,
};

async function setVariables(expression) {
  const variables = expression.match(/([a-zA-Z])+/g);

  if (!variables) {
    return expression;
  }

  for (const variable of variables) {
    const value = await input(`Enter variable ${variable}: `);
    expression = expression.replace(new RegExp(variable, 'g'), value);
  }

  return expression;
}

exports.parseExpression = async expression =>
  (await setVariables(expression))
    .split(' ')
    .map(x => (!Number.isNaN(Number(x)) ? Number(x) : x));

const isOperator = token => Object.keys(OPERATORS).includes(token);
const isOperand = token => typeof token === 'number';
const applyOperator = (operator, operand1, operand2) =>
  OPERATORS[operator](operand1, operand2);

exports.isOperator = isOperator;
exports.isOperand = isOperand;
exports.applyOperator = applyOperator;

const OPERATORS_PRECEDENCE = {
  '^': 4,
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  '(': 1,
};

exports.infixExpressionToPostfix = expression => {
  const stack = [];
  const postfixList = [];

  for (const token of expression.split(' ')) {
    if (token.match(/[a-zA-Z]/) || !Number.isNaN(Number(token))) {
      postfixList.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      let topToken = stack.pop();

      while (topToken !== '(') {
        postfixList.push(topToken);
        topToken = stack.pop();
      }
    } else {
      while (
        stack.length > 0 &&
        OPERATORS_PRECEDENCE[stack[stack.length - 1]] >=
          OPERATORS_PRECEDENCE[token]
      ) {
        postfixList.push(stack.pop());
      }

      stack.push(token);
    }
  }

  while (stack.length > 0) {
    postfixList.push(stack.pop());
  }

  return postfixList.join(' ');
};

exports.evaluatePrefixExpression = prefixExpression => {
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
};
