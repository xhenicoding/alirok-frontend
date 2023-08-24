import styled from 'styled-components'

export const Footer = styled.footer<{ isMainPage: boolean }>`
  border-top: 0.5px solid rgb(235, 240, 250);
  height: 16rem;
  padding: 0 4.2rem;
  background: #fcfcfc;

  @media only screen and (max-width: 768px) {
    height: ${({ isMainPage }) => (isMainPage ? '36rem' : 'auto')};
    padding: 0 2.2rem;
  }
`

export const FooterContent = styled.div`
  max-width: 144rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    height: 20rem;
  }
`

export const TopFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FooterLogo = styled.img`
  width: 20rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 14rem;
  }
`

export const SocialMedia = styled.div`
  padding-bottom: 10px;
`

export const Copyright = styled.span`
  text-align: right;
  font: normal normal bold 1.6rem/4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #373435;
  opacity: 1;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const CopyrightMobile = styled.span`
  display: none;
  text-align: center;
  font: normal normal bold 1.6rem/2rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #373435;
  opacity: 1;
  margin-top: 4rem;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    display: block;
  }
`

export const Instagram = styled.img`
  width: 2.4rem;
  height: auto;
  margin-right: 2rem;

  @media only screen and (max-width: 768px) {
    width: 2rem;
  }
`

export const Linkedin = styled.img`
  width: 2.4rem;
  height: auto;
  margin-right: 2rem;

  @media only screen and (max-width: 768px) {
    width: 2rem;
  }
`

export const Facebook = styled.img`
  width: 2.4rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 2rem;
  }
`

export const RightContentFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
