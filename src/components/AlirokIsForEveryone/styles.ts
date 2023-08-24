import styled from 'styled-components'

export const Container = styled.section`
  margin: 15rem auto 0 auto;
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
  font: normal normal bold 4rem/7rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 2rem/2.5rem Montserrat;
    text-align: center;
    line-height: 4.5rem;
  }
`

export const Content = styled.div`
  margin-top: 12rem;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1060px) {
    margin-top: 7rem;
    flex-direction: column;
    align-items: center;
    justify-content: unset;

    div {
      margin-top: 5rem;
    }
  }
`

export const Text = styled.p`
  font: normal normal normal 1.6rem 'Montserrat', sans-serif;
  color: #1e1e1e;
  margin-top: 4rem;
  text-align: center;
  line-height: 3rem;
`

export const Bold = styled.span`
  font-weight: bold;
`
