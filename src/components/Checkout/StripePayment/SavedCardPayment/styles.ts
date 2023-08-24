import styled from 'styled-components'
import { Button as BaseButton } from '@alirok.com/rok-ui'

export const Form = styled.div``

export const FormRow = styled.div`
  display: flex;
  gap: 6.5rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 5rem;
  }
`

export const Input = styled.div`
  padding: 1.3rem 2rem 1rem 2rem;
  height: 4.5rem;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 1rem;
`

export const InputWrapper = styled.div`
  margin-bottom: 12rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    margin-bottom: 5rem;
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
`

export const PaymentDataWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin-bottom: 12rem;

  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
  }
`

export const PaymentData = styled.div`
  display: flex;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 10px;
  height: 4.5rem;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 2rem;
  font: normal normal bold 14px/18px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
`

export const PaymentLabel = styled.span`
  position: absolute;
  background-color: #fff;
  font: normal normal normal 1.2rem Montserrat;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -0.8rem;
  left: 1rem;
`

export const PaymentValue = styled.div`
  flex-grow: 1;
`
export const PaymentCurrency = styled.div``
export const PaymentFlag = styled.div`
  margin-left: 4rem;
`
export const Disclaimer = styled.div`
  width: 100%;
`

export const Flag = styled.div<{ flag: string }>`
  width: 2rem;
  height: 2rem;
  background-image: url('https://static.alirok.io/collections/icons/flags/${({
    flag
  }) => flag}.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100%;
  padding: 0 0.2rem;
`

export const Button = styled(BaseButton)`
  text-transform: uppercase;
  width: 15rem;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const cardStyles = {
  style: {
    base: {
      height: '4.5rem',
      color: '#1E1E1E',
      fontFamily: 'Montserrat',
      fontSmoothing: 'antialiased',
      fontSize: '1rem',
      fontWeight: 700,
      padding: '10px 20px',
      borderRadius: '1rem',
      '::placeholder': {
        fontWeight: 500,
        color: '#1E1E1E'
      }
    }
  }
}
