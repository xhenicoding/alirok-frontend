import { Icon } from '@alirok.com/rok-ui'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .css-tlfecz-indicatorContainer {
    color: ${({ theme }) => theme.colors.black};

    &:hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }

  .css-1wa3eu0-placeholder {
    color: ${({ theme }) => theme.colors.black};
  }

  .css-107lb6w-singleValue {
    color: ${({ theme }) => theme.colors.black};
  }

  > div > div:nth-child(3) {
    z-index: 100;
    width: 100%;
  }
`

export const Label = styled.label`
  position: relative;
  display: block;
  width: 100%;
  min-width: 5.5rem;
`

export const Title = styled.span`
  position: absolute;
  background-color: #fff;
  font: normal normal normal 1.2rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -0.8rem;
  left: 1.5rem;
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`

export const Flag = styled.div<{ flag: string }>`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
  background-image: url('https://static.alirok.io/collections/icons/flags/${({
    flag
  }) => flag}.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100%;
  margin: 1rem;
`

export const Arrow = styled(Icon)`
  padding: 0.2rem;
`

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`
