import React from 'react'
import StyledRow from './style'

interface IRow {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function Row({ children, ...rest }: IRow) {
  return <StyledRow {...rest}>{children}</StyledRow>
}

export default Row
