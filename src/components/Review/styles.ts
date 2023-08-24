import styled from 'styled-components'

export const Review = styled.section`
  max-width: 120rem;
  width: 100%;
  min-width: 100%;
  margin: 15rem 0 0 0;
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
  color: #1e1e1e;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 2rem Montserrat;
    text-align: center;
    margin-bottom: -3rem;
  }
`

export const Section = styled.section<{ variant?: 'invert' | 'normal' }>`
  margin-top: 12rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: ${({ variant }) =>
      variant === 'invert' ? 'column-reverse' : 'column'};
    justify-content: unset;
    align-items: center;
    margin-top: 7rem;
  }
`

export const Image = styled.img`
  width: 22.5rem;
  height: 22.5rem;

  @media only screen and (max-width: 1024px) {
    width: 20rem;
    height: 20rem;
  }

  @media only screen and (max-width: 768px) {
    width: 22.5rem;
    height: 22.5rem;
    margin-top: 3rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 36.5rem;
  max-width: 55rem;
  align-items: center;
  gap: 2rem;
  margin: 0 2rem;
`

export const Rating = styled.img`
  width: 12.57rem;
  height: 1.43rem;
  margin-top: 2.4rem;
`
export const Description = styled.div`
  width: 28rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: center;

  @media only screen and (max-width: 1024px) {
    width: 20rem;
  }

  @media only screen and (max-width: 768px) {
    width: 28rem;
  }
`
