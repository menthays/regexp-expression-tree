# RegExpTree

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![codecov](https://codecov.io/gh/menthays/regexp-expression-tree/branch/master/graph/badge.svg)](https://codecov.io/gh/menthays/regexp-expression-tree)

Use `Expression Tree` to represent regexp with logical operation (AND/OR).

## Usage

```javascript
// construct tree from postfix notation
const regExprTree = convertRPN2Tree("/^a/g /b$/g AND /c/ OR")
// visit tree in postorder
postVisit(regExprTree) // '/^a/g /b$/g AND /c/ OR'
// visit tree in order
visit(regExprTree) // '/^a/g AND /b$/g OR /c/'
// evaluate tree
evaluate(regExprTree, 'addcddb') // true
```

[build-badge]: https://img.shields.io/travis/menthays/regexp-expression-tree/master.png?style=flat-square
[build]: https://travis-ci.org/menthays/regexp-expression-tree

[npm-badge]: https://img.shields.io/npm/v/regexp-expression-tree.png?style=flat-square
[npm]: https://www.npmjs.org/package/regexp-expression-tree
