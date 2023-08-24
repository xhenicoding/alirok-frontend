import styled from 'styled-components'

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

  .scroll {
    position: fixed !important;
  }

  h2 {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    h2 {
      display: flex;
      line-height: 1.9rem;
    }

    span {
      display: flex;
      flex-direction: row;
      place-items: center;
      gap: 2.3rem;
    }
  }
`

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const BackBtn = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`

export const CloseBtn = styled.div`
  width: 1.42rem;
  height: 1.42rem;
  cursor: pointer;
`

export const Main = styled.main`
  max-width: 144rem;
  margin: 0 auto;
  min-height: calc(100vh - 10rem - 16rem);
  background: #fcfcfc;
  padding-bottom: 12.5rem;
`
