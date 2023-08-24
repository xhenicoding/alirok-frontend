import styled from 'styled-components'

export const Main = styled.div`
  display: grid;
  grid-template-rows: 13% auto 16rem;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-rows: 16% auto;

    footer {
      display: none;
    }
  }
`

export const Container = styled.div`
  display: flex;
  max-width: 144rem;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const Header = styled.header`
  height: 10rem;
  padding: 0 4.2rem;
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  background: #fcfcfc;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;

  @media only screen and (max-width: 768px) {
    padding: 0 1.6rem;
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

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;
  @media only screen and (max-width: 768px) {
    display: none;
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

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  box-shadow: none;
  border: none;

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
