import expect from 'expect'

import {evaluate, convertRPN2Tree, postVisit, visit} from '../src/index.js'

describe('RegTree Test', () => {
  it('Evaluate test', () => {
    expect(evaluate(convertRPN2Tree("/^a/g /b$/g AND /c/ OR"), 'addcddb'))
      .toBeTruthy()
  })

  it('Postorder visit test', () => {
    let rst = postVisit(convertRPN2Tree("/^a/g /b$/g AND /c/ OR"));
    console.log(rst);
    expect(rst)
      .toBe('/^a/g /b$/g AND /c/ OR')
  })

  it('Inorder visit test', () => {
    let rst = visit(convertRPN2Tree("/^a/g /b$/g AND /c/ OR"));
    console.log(rst)
    expect(rst)
      .toBe('/^a/g AND /b$/g OR /c/')
  })
})
