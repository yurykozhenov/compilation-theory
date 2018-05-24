const {
  isOperator,
  parseExpression,
  evaluatePrefixExpression,
} = require('./util/expressions');

const { input } = require('./util/io');
const treeify = require('treeify');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.nodesValues = [];
    this.obj = {};
    this.root = null;
  }

  makeTree(expression) {
    if (expression.length > 0) {
      this.root = new Node(expression[0]);
    }

    if (expression.length > 0) {
      this._makeTree(this.root, expression.slice(1));
    }
  }

  _makeTree(node, expression) {
    if (node.left == null) {
      node.left = new Node(expression.shift());

      if (expression.length > 0) {
        this._makeTree(
          isOperator(node.left.data) ? node.left : node,
          expression,
        );
      }
    }

    if (node.right == null) {
      node.right = new Node(expression.shift());

      if (expression.length > 0) {
        this._makeTree(
          isOperator(node.right.data) ? node.right : node,
          expression,
        );
      }
    }
  }

  preOrder(node) {
    if (node == null) {
      return;
    }

    this.nodesValues.push(node.data);

    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  postOrder(node) {
    if (node == null) {
      return;
    }

    this.preOrder(node.left);
    this.preOrder(node.right);

    this.nodesValues.push(node.data);
  }

  async evaluate() {
    this.preOrder(this.root);
    const parsedExpression = await parseExpression(this.nodesValues.join(' '));

    return evaluatePrefixExpression(parsedExpression);
  }

  _makeObject(obj, expression) {
    if (obj.left == null) {
      delete obj.left;
      const value = expression.shift();

      if (isOperator(value)) {
        obj[value] = {
          left: null,
          right: null,
        };
        this._makeObject(isOperator(value) ? obj[value] : obj, expression);
      } else {
        obj[value] = null;
      }
    }

    if (obj.right == null) {
      delete obj.right;
      const value = expression.shift();

      if (isOperator(value)) {
        obj[value] = {
          left: null,
          right: null,
        };
        this._makeObject(isOperator(value) ? obj[value] : obj, expression);
      } else {
        obj[value] = null;
      }
    }
  }

  print() {
    this.preOrder(this.root);
    const expression = this.nodesValues;

    if (expression.length > 0) {
      this.obj[expression[0]] = {
        left: null,
        right: null,
      };
    }

    if (expression.length > 0) {
      this._makeObject(this.obj[expression[0]], expression.slice(1));
    }

    console.log(treeify.asTree(this.obj));
  }
}

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
