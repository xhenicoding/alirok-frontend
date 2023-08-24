import styled from 'styled-components'

export const Container = styled.section`
  max-width: 120rem;
  width: 100%;
  margin: 15rem auto 0 auto;
  padding: 2rem 4.2rem 0 4.2rem;
  display: grid;
  gap: 10rem;

  @media only screen and (max-width: 768px) {
    padding: 2rem 2.5rem 0 2.5rem;
    margin-top: 7rem;

    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }
`

export const Title = styled.h1`
  font: normal normal bold 4rem/7rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 2rem/2.5rem 'Montserrat', sans-serif;
    line-height: 4.5rem;
    text-align: center;
  }
`

export const Image = styled.img`
  width: 70rem;
  height: auto;
  display: flex;

  @media only screen and (max-width: 1024px) {
    width: 75%;
    margin-top: 7rem;
  }
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7rem;
  margin-top: 6rem;

  @media only screen and (max-width: 1024px) {
    max-width: 650px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 500px;
  }

  input {
    width: 100%;
    height: 4.5rem;
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
    border: 1px solid ${({ theme }) => theme.colors.primaryLight};
    border-radius: 50px;
    font-weight: 700;
    padding: 0 2rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  button {
    text-transform: uppercase;
    padding: 0;
  }
`

export const Subtitle = styled.h2`
  font: normal normal bold 4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #373435;
  width: 38.1rem;
  line-height: 5rem;
  align-self: center;
  display: grid;
  justify-items: center;

  @media only screen and (max-width: 1024px) {
    margin-top: 5rem;
    width: 80%;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
`

export const InputWrapper = styled.div``

export const AlertWrapper = styled.div`
  h4 {
    font-size: 2rem;
  }

  p {
    font-size: 1.4rem;
    font-weight: bold;
    color: #1e1e1e;
  }
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 40px;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`
