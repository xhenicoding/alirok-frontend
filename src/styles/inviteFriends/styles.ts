import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3vh;

  h4 {
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 768px) {
    margin: 0 auto;
    display: contents;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  position: relative;
`

export const ErrorWrapper = styled.span`
  position: absolute;
  color: red;
  bottom: -15px;
  right: 15px;
`

export const AlertBtnWrapper = styled.div`
  display: flex;
  align-self: center;
`

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 10.4rem;
  align-items: center;
  border-radius: 50px;
  width: 78.1rem;
  height: 65.4rem;
  box-shadow: 0 3px 6px ${({ theme }) => theme.colors.shadow};
  background: ${({ theme }) => theme.colors.white};

  @media only screen and (max-width: 768px) {
    padding: 7rem 2.7rem;
    box-shadow: none;
    border: none;
    width: 100%;
    background: transparent;
  }
`

export const ImageWrapper = styled.div`
  width: 21.8rem;
  height: 19.1rem;
  margin-top: 2.8rem;
`

export const ButtonWrapper = styled.div`
  width: 13.3rem;
  button {
    text-transform: uppercase;
  }
  .icon {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    button {
      display: none;
    }
    .icon {
      display: flex;
    }
    border-radius: 50px;
    width: 4rem;
    height: 4rem;
    position: absolute;
    margin-right: -23rem;
    align-items: center;
    justify-content: center;
    padding-top: 0.3rem;
    display: flex;
    background: ${({ theme }) => theme.colors.gradient};
  }
`

export const TextWrapper = styled.div`
  line-height: 3rem;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;

  @media only screen and (max-width: 425px) {
    font-size: 2rem;
  }
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11.1rem;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const inputWrapper = styled.input`
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 50px;
  width: 277px;
  height: 45px;
  padding-left: 28px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.black};
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`
