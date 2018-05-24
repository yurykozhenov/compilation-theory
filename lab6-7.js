const { Tree } = require('./util/tree');
const { infixExpressionToPostfix, parseExpression } = require('./util/expressions');

async function main() {
  const expression = '4 - ( 5 - 6 ) * ( 7 + 8 )';
  console.log(`Вираз: ${expression}`);

  const postfixExpression = infixExpressionToPostfix(expression);
  const parsedPostfixExpression = await parseExpression(postfixExpression);
  console.log(`Обернений польський запис: ${postfixExpression}`);

  const tree = new Tree();
  tree.fromPostfixExpression(parsedPostfixExpression);

  console.log('\nЗначення виразу:', await tree.evaluate());
  tree.print();
}

main();
