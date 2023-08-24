import styled from 'styled-components'

export const FullContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
`

export const Container = styled.div`
  display: grid;
  max-width: 95rem;
  margin: 0 auto;
  width: 100%;

  @media only screen and (max-width: 768px) {
    height: auto;
    max-height: auto;
    box-shadow: none;
    border: none;
    width: 100%;
  }
`

export const Main = styled.main``

export const Content = styled.div`
  align-self: center;

  @media only screen and (max-width: 768px) {
    align-self: start;
    padding-top: 75px;
  }
`

export const Tittle = styled.div`
  margin-top: -30px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  height: 30px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    display: none;
  }
`

export const Logo = styled.img`
  max-width: 14.7rem;
  height: auto;
  display: block;
`

export const CloseBtn = styled.div`
  width: 1.42rem;
  height: 1.42rem;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    position: absolute;
    z-index: 3;
    right: -4rem;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 144rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`

export const Header = styled.header`
  height: 10rem;
  padding: 0 4.2rem;
  //box-shadow: 0px 3px 6px #396cce42;

  @media only screen and (max-width: 768px) {
    padding: 0 2.2rem;
    position: relative;
  }
`

export const CloseContainer = styled.div`
  position: absolute;
  right: 10rem;
`
