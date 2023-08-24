import styled, { css } from 'styled-components'

export const CardContainer = styled.div<{
  display?: string
  borderRadius?: string
  width?: string
  minHeight?: string
  flexDirection?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  margin?: string
  alignItems?: string
  height?: string
}>`
  display: ${({ display }) => `${display ? display || '' : 'flex'}`};
  flex-direction: ${({ flexDirection }) =>
    `${flexDirection ? flexDirection || '' : 'column'}`};
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ borderRadius }) =>
    `${borderRadius ? borderRadius || '50px' : '50px'}`};
  padding: 5rem 2rem;
  width: ${({ width }) => `${width ? width || '' : '100%'}`};
  min-height: ${({ minHeight }) => `${minHeight || ''}`};
  margin-top: ${({ marginTop }) => `${marginTop ? marginTop || '' : '10px'}`};
  margin-bottom: ${({ marginBottom }) =>
    `${marginBottom ? marginBottom || '' : '10px'}`};
  margin-left: ${({ marginLeft }) =>
    `${marginLeft ? marginLeft || '' : '10px'}`};
  margin-right: ${({ marginRight }) =>
    `${marginRight ? marginRight || '' : '10px'}`};
  height: ${({ height }) => `${height ? height : ''}`}
    ${({ alignItems }) =>
      alignItems &&
      css`
        align-items: ${alignItems};
      `};
  margin: ${({ margin }) => margin || ''};
`
