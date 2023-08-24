import styled from 'styled-components'

export const Brand = styled.div<{ brand: string }>`
  width: 6rem;
  height: 7rem;
  background-image: url('https://static.alirok.io/collections/brands/${({
    brand
  }) => brand}.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
