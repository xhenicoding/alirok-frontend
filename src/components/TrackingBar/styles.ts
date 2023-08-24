import styled, { css } from 'styled-components'

export const Container = styled.form<{
  isMobileMode?: boolean
}>`
  height: 6.6rem;
  width: 100%;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  background-color: #ffffff;
  display: flex;

  input {
    border: none;
    padding-left: 2rem;
    background: none;
    width: 100%;
    font-weight: bold;
    font-size: 1.6rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.black};
    }

    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors.black};
    }

    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors.black};
    }
    color: ${({ theme }) => theme.colors.black};

    &:focus {
      outline-width: 0;
    }
  }

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      height: 5rem;
      margin-top: 0;
    `}
`

export const ButtonInput = styled.div<{
  isMobileMode?: boolean
}>`
  max-width: 22rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal 600 1.6rem 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5rem;
  padding: 15px;

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      max-width: unset;
    `}

  p {
    width: 100%;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const ButtonWrapper = styled.div<{
  readyToSearch: boolean
  isMobileMode: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem 0 auto;

  button {
    width: ${({ readyToSearch, isMobileMode }) =>
      readyToSearch ? ' 15rem' : isMobileMode ? '3.2rem' : '4.6rem'};
    transition: width 0.06s ease;
  }

  h3 {
    color: ${({ theme }) => theme.colors.white};
  }
`

export const SearchIcon = styled.img<{
  isMobileMode?: boolean
  readyToSearch: boolean
}>`
  width: 2em;
  height: auto;

  ${({ isMobileMode }) =>
    isMobileMode &&
    css`
      width: 1.5rem;
    `}
  ${({ readyToSearch }) =>
    readyToSearch &&
    css`
      width: 1.5rem;
    `}
`
