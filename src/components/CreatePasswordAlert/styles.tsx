import styled from 'styled-components'

export const EmailForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
  width: 270px;
  align-items: center;
  place-self: center;
`

export const Container = styled.div`
  h4 {
    font-size: 2rem;
  }

  div div div:nth-child(2) div:nth-child(3) {
    padding: 0;
    height: 20px;
  }
`

export const IconShow = styled.div<{ name: string }>`
  width: 3rem;
  height: 2.5rem;
  margin: 5px;
  mask: ${({ name }) =>
    `url('https://static.alirok.io/collections/icons/${name}.svg') no-repeat center`};
  background: #396cce42;
`
