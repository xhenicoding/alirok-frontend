import styled, { css } from 'styled-components'

export const Header = styled.header<{
  position: boolean
  expandSearchBar: boolean
  isMobileMode: boolean
}>`
  height: 10rem;
  padding: 0 5rem;
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  background: #fcfcfc;

  ${({ position }) =>
    position
      ? css`
          position: initial;
          background: #fcfcfc;
          box-shadow: 0px 3px 6px #396cce29;
          width: 100%;
          z-index: 1;
          @media only screen and (max-width: 768px) {
            position: initial;
          }
        `
      : css`
          position: initial;
        `}

  ${({ expandSearchBar, isMobileMode }) =>
    expandSearchBar &&
    !isMobileMode &&
    css`
      padding: 5rem 5rem 15rem 5rem;
      -webkit-transition: padding 0.4s ease-out;
      transition: height 0.4s ease-in-out;
    `}

  @media only screen and (max-width: 768px) {
    padding: 0 2.2rem;
    height: 8rem;
    background: #fcfcfc;
    position: fixed;
    z-index: 1;
    width: 100%;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: relative;
  background: #fcfcfc;

  .scroll {
    position: fixed !important;
  }
`

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 13.6rem;
    position: fixed;
  }
`

export const LoginSection = styled.div`
  display: flex;

  button {
    :not(:last-child) {
      margin-right: 3.2rem;
    }
  }

  @media only screen and (max-width: 1024px) {
    button {
      :not(:last-child) {
        margin-right: 2rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const SwitchLink = styled.div<{ expandSearchBar: boolean }>`
  position: absolute;
  background-color: transparent;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  ${({ expandSearchBar }) =>
    expandSearchBar &&
    css`
      display: none;
    `}
`

export const CloseBtn = styled.div`
  width: 1.42rem;
  height: 1.42rem;
  cursor: pointer;
  position: absolute;
  right: 3rem;
  top: -1.3rem;

  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    z-index: 3;
  }
`

export const ExpandedContainer = styled.div<{ isMobileMode: boolean }>`
  flex-direction: column;
  margin-left: calc(10vw - 147px);
  height: 23rem;
  margin-top: 11rem;
  align-items: center;
  justify-content: space-evenly;
  -webkit-transition: padding 0.4s ease-out;
  transition: height 0.4s ease-in-out;
  width: 100%;
  max-width: 95rem;
  display: ${({ isMobileMode }) => (isMobileMode ? 'none' : 'flex')};
`

export const SearchWrapper = styled.div<{ isMobileMode: boolean }>`
  width: 30rem;
  margin-left: 16.9rem;
  display: ${({ isMobileMode }) => (isMobileMode ? 'none' : 'flex')};
`

export const SearchContainer = styled.div<{
  expandSearchBar: boolean
  isMobileMode: boolean
}>`
  width: 100%;
  z-index: 100;
  max-width: 30rem;
  margin-left: 16.9rem;
  display: ${({ isMobileMode }) => (isMobileMode ? 'none' : 'flex')};

  ${({ expandSearchBar }) =>
    expandSearchBar &&
    css`
      position: absolute;
      margin: 15rem auto 0 16.9rem;
      left: 0;
      right: 0;
      max-width: 95rem;
      transition: all 0.4s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const Main = styled.main`
  max-width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 10rem - 16rem);
  background: #fcfcfc;
  padding-bottom: 12.5rem;
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  box-shadow: none;
  border: none;
  position: relative;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`

export const MenuButtonImg = styled.div`
  width: 2.4rem;
  height: 2.6rem;
  transform: rotate(180deg);
  mask: url('https://static.alirok.io/collections/icons/menu2.svg') center
    center / cover no-repeat;
  background: linear-gradient(
    90deg,
    rgb(24, 128, 217) 0%,
    rgb(89, 90, 194) 20%,
    rgb(104, 81, 189) 24%,
    rgb(115, 74, 185) 28%,
    rgb(133, 64, 179) 33%,
    rgb(149, 54, 173) 38%,
    rgb(167, 44, 167) 43%,
    rgb(230, 7, 145) 63%,
    rgb(245, 83, 83) 100%
  );
`

export const TabHead = styled.header<{ isLogged?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  display: flex;
  grid-template-columns: 6rem 6rem 7.5rem;
  place-content: center;
  margin-left: 0;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const Tab = styled.label<{ selected: boolean }>`
  position: relative;

  a {
    text-decoration: none !important;
    font: normal normal normal 1.4rem 'Montserrat', sans-serif;
    font-weight: bold;
    color: #191919;
    text-transform: uppercase;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 1s ease-out;
`
export const TabTag = styled.div<{ isActive?: boolean }>`
  position: absolute;
  display: block;
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  background: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
  border-radius: 50px;
  width: 2.5rem;
  height: 0.5rem;
  bottom: -1rem;
  transition: opacity 0.2s ease-in-out;
`

export const FloatImage = styled.div`
  width: 2rem !important;
  height: 2rem !important;
  background-image: url('https://static.alirok.io/collections/logos/favicon-transparent.png');
  background-repeat: no-repeat;
  background-size: contain;
  border: none !important;
  z-index: 999;
`

export const FloatActionButton = styled.div`
  position: sticky;
  float: right;
  right: 5rem;
  bottom: 5rem;
  z-index: 100;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    right: 2rem;
    bottom: 18rem;
  }
`
