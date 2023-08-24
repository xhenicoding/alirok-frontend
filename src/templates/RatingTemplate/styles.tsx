import styled from 'styled-components'

export const Main = styled.div`
  display: grid;
  grid-template-rows: auto 85%;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-rows: auto 80%;
  }
`

export const CloseBtn = styled.div`
  width: fit-content;
  height: 100%;
  cursor: pointer;
  align-items: center;
  display: flex;
`

export const Img = styled.img`
  width: 600px;
  justify-self: center;
  align-self: center;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const AllContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  height: 10rem;
  padding: 0 4.2rem;
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  background: #fcfcfc;

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

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 10.7rem;
  }
`

export const TermsContainer = styled.div`
  font-size: 12px;
  a {
    color: #1e1e1e;
  }
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`
