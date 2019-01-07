# RegExpTree

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

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

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
