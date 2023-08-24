import styled from 'styled-components'

export const SortByContainer = styled.div`
  position: absolute;
  cursor: pointer;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 3rem;
  opacity: 1;
  display: flex;
  padding: 0 2rem;
  height: fit-content;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  flex-direction: column;
  z-index: 10;

  > div {
    display: none;
  }

  &:hover {
    padding-bottom: 1rem;
    width: 17rem;
  }

  &:hover > div {
    display: flex;
  }
`

export const SortInputsContainer = styled.div`
  flex-direction: column;
  background: #fff !important;

  p {
    font-size: 1.4rem;
    color: #1e1e1e;
    font-weight: bold;
  }
`

export const SortInputLabel = styled.label`
  display: flex;
  flex-direction: row;
  height: 2.8rem;
  align-items: center;
  width: 100%;
`

export const SortInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  width: 100%;
  margin: 0.2rem 0;
`

export const SortBy = styled.div`
  position: relative;
  width: 14rem;
  min-width: 14rem;
`

export const QuoteWrapper = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  opacity: 1;
  padding: 0rem;
  max-width: 96rem;
  margin: 3.5rem auto;

  @media only screen and (max-width: 1024px) {
    padding: 0 2rem;
    margin: 9rem 0;
  }
`

export const ResultsWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 1024px) {
    margin-top: -47rem;
  }
`

export const FilterContainer = styled.div`
  margin: 3.5rem auto 3.5rem auto;
  max-width: fit-content;
  overflow: visible;
  padding: 0 2rem 0.5rem 2rem;

  ::-webkit-scrollbar {
    display: none;
  }

  label:not(:first-child) {
    margin-left: 1rem;
  }

  button,
  span {
    margin-left: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    overflow-x: auto;
    min-height: 50rem;
  }
`

export const FilterWrapper = styled.div`
  width: 950px;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: fit-content;
    overflow-x: scroll;
    height: 300px;
  }
`

export const ShareButton = styled.button`
  cursor: pointer;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  opacity: 1;
  display: flex;
  padding: 0 2rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
`

export const FlagButton = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  opacity: 1;
  display: flex;
  padding: 0 1rem 0 0;
  height: 3rem;
  align-items: center;
  justify-content: center;
`

export const TagText = styled.span`
  font: normal normal 600 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  cursor: pointer;
  white-space: nowrap;
`

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 99999;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;

  @media only screen and (max-width: 768px) {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const Modal = styled.div`
  position: relative;
  vertical-align: middle;
  margin: 30px auto;
  width: 84.4rem;
  height: 56rem;
  z-index: 999999;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 50px;
  padding: 0.5rem;

  @media only screen and (max-width: 768px) {
    width: 100vw;
    position: fixed;
    height: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`
