import React, { ReactElement } from 'react'
import { StyledFlex } from './styles'

interface IFlex {
  children: React.ReactNode
  [key: string]: unknown
}

const Flex = ({ children, ...props }: IFlex): ReactElement => {
  return <StyledFlex {...props}>{children}</StyledFlex>
}

export default Flex
