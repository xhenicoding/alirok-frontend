import styled from 'styled-components'

export const Input = styled.input`
  color: #1e1e1e;

  ::placeholder {
    color: #1e1e1e;
  }
`

export const Container = styled.div`
  height: 5rem;
  width: 420px;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  border-radius: 50px;
  background-color: #ffffff;
  display: flex;

  input {
    border: none;
    padding-left: 1.5rem;
    background: none;
    width: 100%;
    font-weight: bold;
    font-size: 1.4rem;

    &:focus {
      outline-width: 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 340px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-right: 20px;
    max-width: 420px;
    justify-self: center;
  }
`

export const ButtonInput = styled.div`
  max-width: 22rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal 600 1.6rem Montserrat;
  color: #1e1e1e;
  border-radius: 5rem;
  padding: 15px;

  p {
    width: 100%;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1.5rem 0 auto;
`

export const SearchIcon = styled.img`
  width: 1.6em;
  height: auto;
`
