import styled, { css } from 'styled-components'

export const HowTo = styled.section`
  max-width: 120rem;
  width: 100%;
  margin: 10rem auto 0 auto;
  padding: 2rem 4.2rem 0 4.2rem;

  @media only screen and (max-width: 768px) {
    padding: 2rem 2.5rem 0 2.5rem;
    margin-top: 7rem;

    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }
`

export const Title = styled.h1`
  letter-spacing: 0px;
  text-align: center;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    text-align: center;
    margin-bottom: -3rem;
    line-height: 4.5rem;

    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    height: 26rem;

    background-image: url('https://static.alirok.io/collections/illustrations/Worldmap.svg');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
  }
`

export const Section = styled.section<{ variant?: 'invert' | 'normal' }>`
  margin-top: 12rem;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 768px) {
    flex-direction: ${({ variant }) =>
      variant === 'invert' ? 'column-reverse' : 'column'};
    justify-content: unset;
    align-items: center;
    margin-top: 7rem;
  }
`

export const Image = styled.img`
  width: 27.5rem;
  height: 27.5rem;

  @media only screen and (max-width: 768px) {
    margin-top: 3rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 55rem;
`

export const Step = styled.span<{ variant?: 'blue' | 'pink' | 'red' }>`
  width: fit-content;
  text-align: left;
  font: normal normal bold 2rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  border-radius: 50px;
  padding: 1rem 3.7rem;

  ${({ variant }) => {
    switch (variant) {
      case 'pink':
        return css`
          color: #d859b5;
          background: #f8d4ee 0% 0% no-repeat padding-box;
        `
      case 'red':
        return css`
          color: #f85353;
          background: #fccdcd 0% 0% no-repeat padding-box;
        `
      default:
        return css`
          color: #1f84da;
          background: #e2effa 0% 0% no-repeat padding-box;
        `
    }
  }}
`

export const Subtitle = styled.h2`
  font: normal normal bold 4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #373435;
  margin-top: 2.3rem;

  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
`

export const Description = styled.p`
  text-align: left;
  font: normal normal normal 2.5rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  margin-top: 2.5rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`
