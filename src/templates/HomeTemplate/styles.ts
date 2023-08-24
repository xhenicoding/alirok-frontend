import styled, { css } from 'styled-components'

export const LogoContainer = styled.div`
  min-width: 25.2rem;

  @media only screen and (max-width: 1024px) {
    min-width: fit-content;
  }
`

export const Header = styled.header<{
  position: boolean
  expandSearchBar: boolean
}>`
  height: 10rem;
  padding: 0 4.2rem;
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  background: #fcfcfc;

  ${({ position }) =>
    position
      ? css`
          position: fixed;
          background: #fff;
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

  ${({ expandSearchBar }) =>
    expandSearchBar &&
    css`
      padding: 5rem 5rem 15rem 5rem;
      -webkit-transition: padding 0.4s ease-out;
      transition: height 0.4s ease-in-out;
    `}

  @media only screen and (max-width: 768px) {
    padding: 0 2.2rem;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 144rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: relative;

  .scroll {
    position: fixed !important;
  }
`

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 10.7rem;
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
  width: 65%;
  margin: 0 auto;

  ${({ expandSearchBar }) =>
    expandSearchBar &&
    css`
      display: none;
    `}
`

export const SearchContainer = styled.div<{
  expandSearchBar: boolean
  fromHomePageLogin?: boolean
}>`
  width: 100%;
  z-index: 100;
  max-width: 30rem;
  top: -20px;
  ${({ fromHomePageLogin }) =>
    fromHomePageLogin &&
    css`
      margin-left: -95px;
    `}
  @media only screen and (max-width: 768px) {
    display: none;
  }

  ${({ expandSearchBar }) =>
    expandSearchBar &&
    css`
      position: absolute;
      top: 45px;
      margin-left: auto;
      margin-right: auto;
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
  max-width: 144rem;
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
  gap: 4rem;
  place-content: center;
  margin-left: ${({ isLogged }) => (isLogged ? '-20em' : '0')};

  @media only screen and (max-width: 1024px) {
    gap: 3rem;
  }

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
