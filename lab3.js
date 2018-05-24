const { input } = require('./util/io');
const { Tree } = require('./util/tree');

// EXAMPLE EXPRESSION: − × ÷ 15 − 7 + 1 1 3 + 2 + 1 1
async function main() {
  const tree = new Tree();
  const expression = [];

  let node = await input('Введіть головний елемент: ');
  console.log('Введіть quit для закінчення');

  expression.push(node);

  while (true) {
    node = await input('Введіть наступний елемент: ');

    if (node === 'quit') {
      break;
    }

    expression.push(node);
  }

  tree.makeTree(expression);
  console.log('\nЗначення виразу:', await tree.evaluate());
  tree.print();
}

main();
