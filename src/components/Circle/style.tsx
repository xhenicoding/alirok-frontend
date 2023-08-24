import styled from 'styled-components'

export const StyledCircle = styled.div<{
  minWidth?: string
  minHeight?: string
  radius?: string
  border?: string
  borderImage?: string
  justifySelf?: string
  borderColor?: string
  backgroundColor?: string
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ minWidth }) => `${minWidth ?? ''}`};
  min-height: ${({ minHeight }) => `${minHeight ?? ''}`};
  width: ${({ radius }) => radius ?? '100px'};
  height: ${({ radius }) => radius ?? '100px'};
  border: ${({ border }) => border ?? 'none'};
  justify-self: ${({ justifySelf }) => justifySelf};
  border-color: ${({ borderColor, theme }) =>
    borderColor ?? theme.colors.primaryLight}};
  background-color: ${({ backgroundColor }) => `${backgroundColor ?? ''}`};
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  border-radius: 100%;
`

export default StyledCircle
