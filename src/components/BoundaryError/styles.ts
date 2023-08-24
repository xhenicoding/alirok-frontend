import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: 100rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 45rem;
`

export const Title = styled.h1`
  text-align: left;
  font: normal normal bold 3rem/3.7rem Montserrat;
  letter-spacing: 0;
  color: #1e1e1e;
  opacity: 1;

  @media only screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`

export const Text = styled.p`
  text-align: left;
  font: normal normal bold 2.5rem/4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  margin: 3rem 0 3rem 0;

  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
`

export const Right = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const Image = styled.img`
  width: 40rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`
