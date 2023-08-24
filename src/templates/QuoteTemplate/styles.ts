import styled, { css } from 'styled-components'

export const Header = styled.header<{ editSummary: boolean }>`
  height: 10rem;
  padding: 0 4.2rem;
  box-shadow: 0px 3px 6px #396cce42;

  @media only screen and (max-width: 1024px) {
    padding: 0 2.2rem;
    position: relative;
    background: ${({ theme }) => theme.colors.white};

    ${({ editSummary }) =>
      editSummary &&
      css`
        margin-top: 0rem;
        height: 35rem;
        z-index: 4;
      `}
  }
`

export const HeaderContent = styled.div<{ editSummary: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr 14.7rem;
  align-items: center;
  max-width: 144rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    ${({ editSummary }) =>
      editSummary &&
      css`
        margin-top: -10rem;
      `}
  }
`

export const EditTitle = styled.h2`
  display: none;
  @media only screen and (max-width: 1024px) {
    display: flex;
    padding-top: 2rem;
    padding-left: 1rem;
  }
`

export const Logo = styled.img`
  max-width: 14.7rem;
  height: auto;
  display: block;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const BackBtn = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    cursor: pointer;
    transform: rotate(-90deg);
  }
`

export const CloseBtn = styled.div<{ editSummary: boolean }>`
  width: 1.42rem;
  height: 1.42rem;
  cursor: pointer;
  position: absolute;
  top: 3rem;
  right: 3rem;

  @media only screen and (max-width: 1024px) {
    position: absolute;
    z-index: 3;
    top: 4.1rem;
  }
`

export const SearchBarWrapper = styled.div<{ editSummary: boolean }>`
  max-width: 69.4rem;
  max-height: 5rem;
  width: 100%;
  place-self: center;
  margin: 0 3rem;

  @media only screen and (max-width: 1024px) {
    max-width: ${({ editSummary }) => (editSummary ? '100%' : '78%')};
    ${({ editSummary }) => (editSummary ? 'margin-top: -5rem' : '')}
  }

  @media only screen and (max-width: 768px) {
    max-width: ${({ editSummary }) => (editSummary ? '100%' : '78%')};
    margin: ${({ editSummary }) => (editSummary ? '-5rem auto 0' : '0 auto;')};
    place-self: center;
    margin-left: ${({ editSummary }) => (editSummary ? '0px' : '2rem')};
  }
`
export const SwitchLink = styled.div<{ editSummary: boolean }>`
  position: absolute;
  background-color: transparent;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;

    ${({ editSummary }) =>
      editSummary &&
      css`
        display: none;
      `}
  }
`

export const Main = styled.main`
  max-width: 144rem;
  margin: 0 auto;
  min-height: calc(100vh - 10rem - 16rem);
`
