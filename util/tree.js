const treeify = require('treeify');

const {
  isOperator,
  parseExpression,
  evaluatePrefixExpression,
} = require('./expressions');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

exports.Tree = class Tree {
  constructor() {
    this.nodesValues = [];
    this.obj = {};
    this.root = null;
  }

  fromPostfixExpression(expression) {
    const stack = [];

    for (const value of expression) {
      const node = new Node(value);

      if (isOperator(value)) {
        node.right = stack.pop();
        node.left = stack.pop();
        stack.push(node);
      } else {
        stack.push(node);
      }
    }

    this.root = stack.pop();
  }

  fromPrefixExpression(expression) {
    if (expression.length > 0) {
      this.root = new Node(expression[0]);
    }

    if (expression.length > 0) {
      this._fromPrefixExpression(this.root, expression.slice(1));
    }
  }

  _fromPrefixExpression(node, expression) {
    if (node.left == null) {
      node.left = new Node(expression.shift());

      if (expression.length > 0) {
        this._fromPrefixExpression(
          isOperator(node.left.data) ? node.left : node,
          expression,
        );
      }
    }

    if (node.right == null) {
      node.right = new Node(expression.shift());

      if (expression.length > 0) {
        this._fromPrefixExpression(
          isOperator(node.right.data) ? node.right : node,
          expression,
        );
      }
    }
  }

  traverseTree(node) {
    if (node == null) {
      return;
    }

    this.nodesValues.push(node.data);

    this.traverseTree(node.left);
    this.traverseTree(node.right);
  }

  async evaluate() {
    this.nodesValues = [];
    this.traverseTree(this.root);
    const parsedExpression = await parseExpression(this.nodesValues.join(' '));

    return evaluatePrefixExpression(parsedExpression);
  }

  makeObject(obj, expression) {
    if (obj.left == null) {
      delete obj.left;
      const value = expression.shift();

      if (isOperator(value)) {
        obj[value] = {
          left: null,
          right: null,
        };
        this.makeObject(obj[value], expression);
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
        this.makeObject(obj[value], expression);
      } else {
        obj[value] = null;
      }
    }
  }

  print() {
    this.nodesValues = [];
    this.traverseTree(this.root);
    const expression = this.nodesValues;

    if (expression.length > 0) {
      this.obj[expression[0]] = {
        left: null,
        right: null,
      };
    }

    if (expression.length > 0) {
      this.makeObject(this.obj[expression[0]], expression.slice(1));
    }

    console.log(treeify.asTree(this.obj));
  }
};
