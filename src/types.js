// @flow
export type RegTreeNode = OperatorNode | OperandNode

export type OperatorNode = {
  left: RegTreeNode,
  right: RegTreeNode,
  precedence: number,
  kind: 'operator',
  operator: 'AND' | 'OR'
}

export type OperandNode = {
  kind: 'operand',
  value: string
}

export type Operator = 'AND' | 'OR'