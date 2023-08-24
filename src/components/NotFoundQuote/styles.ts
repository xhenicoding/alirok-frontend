import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50px;
  padding: 5rem 2rem;
  max-width: 35rem;
  margin: 0 auto 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Illustration = styled.img``

export const Title = styled.h2`
  text-align: center;
  font: normal normal bold 20px/24px 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  margin: 2rem 0 3rem 0;
`

export const Text = styled.span`
  font: normal normal 600 16px/25px 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  text-align: center;
  margin-bottom: 3rem;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const ButtonWrapper = styled.div`
  margin-top: 5rem;
  width: 28rem;
  justify-content: center;
  display: flex;
`
