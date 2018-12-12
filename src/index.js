// @flow
import type { RegTreeNode, OperatorNode, OperandNode, Operator } from './types.js';

const OPERATORS = ["AND", "OR"];

const createOperatorNode = (operator: Operator, left: RegTreeNode, right: RegTreeNode): OperatorNode => {
  return {
    kind: "operator",
    operator,
    precedence: 1,
    left,
    right
  };
};

const createOperandNode = (regLikeStr: string):OperandNode => {
  return {
    kind: "operand",
    value: regLikeStr
  };
};

const _getRegLikeStr = str => {
  let regMap = [];
  let regMapIndex = 0;

  let newStr = str.replace(/\/(.+?)\/([gimuy]*)/g, (match, p1, p2) => {
    regMap.push(match);
    return String(regMapIndex++);
  });

  return {
    newStr,
    regMap
  };
};

const _parseRegLikeStr = str => {
  let rst = (/\/(.*)\/([gimuy]*)/g.exec(str): any)
  return {
    rawStr: rst[1],
    flags: rst[2]
  }
}

const convertRPN2Tree = (rpnExpr: string): RegTreeNode => {
  let stack = [];
  let { newStr, regMap } = _getRegLikeStr(rpnExpr);
  let strList = newStr.split(" ");

  for (let item of strList) {
    if (!item) {
      continue;
    }
    // if operator
    if (OPERATORS.includes(item)) {
      let operator: Operator = (item: any);
      let rhs = stack.pop();
      let lhs = stack.pop();
      stack.push(createOperatorNode(operator, lhs, rhs));
    }
    // if operand
    if (/\d+/.test(item)) {
      let index = Number.parseInt(item, 10);
      stack.push(createOperandNode(regMap[index]));
    }
  }

  return stack.pop();
};

const _needParensOnLeft = (node:OperatorNode) => {
  if (node.left.kind === "operand") {
    return false;
  }
  return node.left.precedence < node.precedence;
};

const _needParensOnRight = (node:OperatorNode) => {
  if (node.right.kind === "operand") {
    return false;
  }
  return node.right.precedence <= node.precedence;
};

const visit = (node:RegTreeNode) => {
  if (node.kind === "operand") {
    return `${node.value}`;
  } else if (node.kind === "operator") {
    let lhs = visit(node.left);
    if (_needParensOnLeft(node)) {
      lhs = `(${lhs})`;
    }

    let rhs = visit(node.right);
    if (_needParensOnRight(node)) {
      rhs = `(${rhs})`;
    }

    return `${lhs} ${node.operator} ${rhs}`;
  } else {
    throw new Error("Invalid node kind");
  }
};

const postVisit = (node:RegTreeNode) => {
  if (node.kind === "operand") {
    return ` ${node.value}`;
  } else if (node.kind === "operator") {
    let lhs = postVisit(node.left);
    let rhs = postVisit(node.right);
    let rst = `${lhs}${rhs} ${node.operator}`;
    if (rst[0] === ' ') {
      return rst.slice(1)
    } else {
      return rst
    }
  } else {
    throw new Error("Invalid node kind");
  }
}

const _evaluateNode = (node: OperandNode, target: string) => {
  let {rawStr, flags} = _parseRegLikeStr(node.value);
  let reg = new RegExp(rawStr, flags);
  return reg.test(target)
}

const evaluate = (node: RegTreeNode, target: string) => {
  if (node.kind === "operand") {
    return _evaluateNode(node, target);
  } else if (node.kind === "operator") {
    let lhs = evaluate(node.left, target);
    let rhs = evaluate(node.right, target);
    if (node.operator === 'AND') {
      return lhs && rhs
    } else {
      return lhs || rhs
    }
  } else {
    throw new Error("Invalid node kind");
  }
};

export {
  convertRPN2Tree, evaluate, visit, postVisit
}