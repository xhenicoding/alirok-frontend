import React from 'react'
import StyledCircle from './style'

interface ICircle {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Circle = ({
  children,
  radius,
  border,
  borderColor,
  borderImage,
  minWidth,
  minHeight,
  backgroundColor,
  ...props
}: ICircle) => (
  <StyledCircle
    radius={radius}
    border={border}
    borderColor={borderColor}
    borderImage={borderImage}
    minWidth={minWidth}
    minHeight={minHeight}
    backgroundColor={backgroundColor}
    {...props}
  >
    {children}
  </StyledCircle>
)

export default Circle
