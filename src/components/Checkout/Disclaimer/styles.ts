import styled from 'styled-components'

export const DisclaimerWrapper = styled.div`
  width: 25.9rem;
  margin-right: 11rem;

  @media only screen and (max-width: 768px) {
    margin-right: 0rem;
    width: 100%;
  }
`

export const Title = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  font: normal normal normal 1.4rem Montserrat;
  letter-spacing: 0rem;
  color: #1e1e1e;
  align-items: center;
`
export const QuestionMark = styled.div`
  font: normal normal 600 2rem Montserrat;
  color: #1e1e1e;
  background: #e5eefe 0% 0% no-repeat padding-box;
  box-shadow: 0rem 0.3rem 0.6rem #396cce42;
  border: 0.1rem solid #396cce42;
  border-radius: 10rem;
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
`

export const Content = styled.div`
  background: #e5eefe 0% 0% no-repeat padding-box;
  box-shadow: 0rem 0.3rem 0.6rem #396cce42;
  border: 0.1rem solid #396cce42;
  border-radius: 3rem;
  padding: 2rem;
  font: normal normal 600 1.4rem Montserrat;
  letter-spacing: 0rem;
  color: #1e1e1e;
  margin-top: 1rem;
  position: absolute;
  width: 100%;
  max-width: 29rem;
  bottom: 0rem;

  @media only screen and (max-width: 768px) {
    position: relative;
    bottom: initial;
    max-width: initial;
  }
`
