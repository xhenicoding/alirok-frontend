import styled from 'styled-components'
import { Button as UIButton } from '@alirok.com/rok-ui'

export const Container = styled.div`
  max-width: 84.8rem;
  margin: 3.2rem auto;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 50px;
  max-height: 56.6rem;
  background: ${({ theme }) => theme.colors.white};

  @media only screen and (max-width: 768px) {
    height: max-content;
    max-height: max-content;
    box-shadow: none;
    border: none;
  }
`

export const StepperContainer = styled.div`
  width: fit-content;
  margin: 3.2rem auto 0 auto;
`

export const Content = styled.div``

export const Header = styled.header`
  height: 5rem;
  padding: 4rem 6.3rem 2rem 6.3rem;

  @media only screen and (max-width: 768px) {
    padding: 2.2rem;
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
`

export const PrevButton = styled.span`
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    position: absolute;
    top: 3.5rem;
    left: 1.5rem;
    z-index: 3;
  }
`

export const ButtonText = styled.span`
  color: #578ef7;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
`

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 10rem;
  margin: 0 auto;
  padding-left: 10rem;
  padding-bottom: 10.8rem;

  @media only screen and (max-width: 768px) {
    height: max-content;
    justify-content: center;
    padding: 0.5rem 3.4rem 8rem 3.4rem;
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
`

export const PaymentOptions = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  margin-bottom: 8rem;
  padding-bottom: 1rem;
  gap: 4rem;
  height: 13rem;

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    .swiper-container {
      width: 90vw;
      height: 15.5rem;
    }

    .swiper-pagination {
      bottom: 0rem;
    }

    .swiper-pagination-bullet {
      background: #e5eefe;
      border: 1px solid ${({ theme }) => theme.colors.shadow};
      width: 1.5rem;
      height: 1.5rem;
    }

    .swiper-wrapper {
      width: 60%;
    }

    .swiper-slide {
      width: 46%;
    }
  }
`

export const PaymentWrapper = styled.div`
  display: flex;
  width: 100%;
`

export const PaymentForms = styled.div`
  width: 100%;
  flex-wrap: wrap;

  form {
    width: 100%;
  }
`

export const AlertWrapper = styled.div`
  h4 {
    font-size: 2rem;
  }

  p {
    font-size: 1.4rem;
    font-weight: bold;
    color: #1e1e1e;
  }
`

export const Button = styled(UIButton)`
  margin: 0 auto;
`
