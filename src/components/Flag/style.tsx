import styled from 'styled-components'

export const StyledFlag = styled.div<{
  width?: string
  height?: string
  minHeight?: string
  minWidth?: string
  marginRight?: string
  name?: string
}>`
  width: ${({ width }) => width ?? '28px'};
  height: ${({ height }) => height ?? '28px'};
  min-height: ${({ minHeight }) => minHeight ?? '15px'};
  min-width: ${({ minWidth }) => minWidth ?? '15px'};
  background-image: url('https://static.alirok.io/collections/icons/flags/${({
    name
  }) => name}.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100%;
  margin-right: ${({ marginRight }) => marginRight ?? '10%'};

  @media screen and (max-width: 1440px) {
    width: ${({ width }) => width ?? '37px'};
    height: ${({ height }) => height ?? '25px'};
  }
`
