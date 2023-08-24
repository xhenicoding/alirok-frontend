import styled from 'styled-components'

export const Column = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 40px;
    width: 300px;
    align-self: center;
    justify-self: center;
    margin-bottom: 40px;
    button {
      padding: 0;
    }
  }
`

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 425px;
  align-self: flex-start;
  grid-gap: 35px;
  place-self: center;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 50px;
  padding: 5rem 4rem;
  height: 440px;

  button {
    align-self: end;
  }

  @media only screen and (max-width: 768px) {
    margin: 0;
    padding: 3rem;
    background: #fff;
    border-radius: 50px;
    width: 100%;
    max-width: 500px;
    box-shadow: none;
    bottom: 0px;
    border: none;
    justify-items: center;
    height: 400px;

    button {
      width: 100%;
      min-width: 200px;
      max-width: 500px;
    }
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

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin: 0px;
  height: 40px;
  overflow: visible;
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  position: relative;
`

export const ForgotText = styled.a`
  cursor: pointer;
  margin-top: 5px;
  color: #578ef7;
  font-size: 14px;
  text-align: end;
  position: absolute;
  align-self: end;
  bottom: -30px;
`

export const TermsContainer = styled.div`
  text-align: left;
  padding-top: 5px;
  font-size: 12px;
  a {
    color: #1e1e1e;
  }
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const ResendLink = styled.div`
  cursor: pointer;
  padding-bottom: 2rem;

  &:hover {
    h3 {
      text-decoration: underline;
    }
  }
`

export const AlertWrapper = styled.div`
  h4 {
    font-size: 2rem;
  }

  p {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
  }
`
