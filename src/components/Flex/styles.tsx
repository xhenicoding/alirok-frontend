import styled from 'styled-components'

export const StyledFlex = styled.div<{
  isDisplayBlock?: string
  textAlign?: string
  flexDirection?: string
  flexWrap?: string
  flexFlow?: string
  float?: string
  justifyContent?: string
  justifySelf?: string
  alignItems?: string
  alignContent?: string
  alignSelf?: string
  marginTop?: string
  marginRight?: string
  marginLeft?: string
  marginBottom?: string
  lineHeight?: string
  width?: string
  padding?: string
  paddingTop?: string
  paddingRight?: string
  paddingLeft?: string
  paddingBottom?: string
  zIndex?: string
  cursor?: string
  height?: string
  position?: string
  placeItems?: string
  gap?: string
}>`
  display: ${({ isDisplayBlock }) => `${isDisplayBlock ? '' : 'flex'}`};
  text-align: ${({ textAlign }) => `${textAlign || ''}`};
  flex-direction: ${({ flexDirection }) => `${flexDirection || 'column'}`};
  flex-wrap: ${({ flexWrap }) => `${flexWrap || ''}`};
  flex-flow: ${({ flexFlow }) => `${flexFlow || ''}`};
  float: ${({ float }) => float};
  justify-content: ${({ justifyContent }) => `${justifyContent || ''}`};
  justify-self: ${({ justifySelf }) => justifySelf};
  align-items: ${({ alignItems }) => `${alignItems || ''}`};
  align-content: ${({ alignContent }) => `${alignContent || ''}`};
  align-self: ${({ alignSelf }) => `${alignSelf ?? ''}`};
  margin-top: ${({ marginTop }) => `${marginTop || ''}`};
  margin-right: ${({ marginRight }) => `${marginRight || ''}`};
  margin-left: ${({ marginLeft }) => `${marginLeft || ''}`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom || ''}`};
  line-height: ${({ lineHeight }) => lineHeight};
  width: ${({ width }) => `${width || ''}`};
  padding: ${({ padding }) => `${padding || ''}`};
  padding-top: ${({ paddingTop }) => `${paddingTop || ''}`};
  padding-right: ${({ paddingRight }) => `${paddingRight || ''}`};
  padding-left: ${({ paddingLeft }) => `${paddingLeft || ''}`};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom || ''}`};
  z-index: ${({ zIndex }) => `${zIndex || ''}`};
  cursor: ${({ cursor }) => cursor};
  height: ${({ height }) => height};
  position: ${({ position }) => position};
  place-items: ${({ placeItems }) => placeItems};
  gap: ${({ gap }) => gap};
`
