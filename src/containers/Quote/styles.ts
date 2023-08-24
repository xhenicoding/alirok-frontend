import styled from 'styled-components'
import { Button } from '@alirok.com/rok-ui'

export const QuoteContainer = styled.div`
  padding: 3rem 5rem;

  @media only screen and (max-width: 768px) {
    padding: 3rem 0rem;
  }

  p {
    font-size: 1.4rem;
  }

  &:not(:last-child) {
    padding: 2.5rem 5rem 2rem 5rem;
    border-bottom: 0.1rem solid #e5eefe;

    @media only screen and (max-width: 768px) {
      padding: 2.5rem 0 2rem 0;
    }
  }
`

export const QuoteHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    align-items: start;
  }
`

export const QuoteIconWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    order: 2;
    max-height: 50px;
    max-width: 50px;
  }
`

export const QuoteIcon = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  max-height: 50px;
  max-width: 50px;
  display: flex;
  align-items: center;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`

export const QuoteCarrierDesc = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: flex;
    order: 3;
    width: 100%;
    flex-direction: column;
    margin-top: 0px;
    gap: 2rem;
    align-items: flex-start;
  }
`

export const QuoteDescription = styled.div`
  flex-grow: 1;
  padding-left: 2rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    order: 3;
    padding: 1.4rem 0;
    width: 100%;
  }
`

export const QuotePrice = styled.div`
  font: normal normal bold 1.8rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin: 0;
  min-width: 15rem;
  text-align: right;

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
    text-align: right;
    text-overflow: ellipsis;
  }
`

export const DeliveryInfo = styled.h3`
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`

export const Companies = styled.p`
  font: normal normal 500 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin: 0;
`

export const ButtonText = styled.span`
  text-transform: uppercase;
  text-align: left;
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #ffffff;
`

export const CustomButton = styled(Button)`
  padding: 0 26px;
  width: 14.4rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 1.4rem;
  }
`

export const QuoteFooter = styled.div`
  display: flex;
  margin: 3.5rem 7rem;
  border-top: 0.1rem solid #396cce42;
  padding-top: 3.5rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    margin: 3.5rem 0;
    flex-wrap: wrap;
  }
`

export const QuoteTotal = styled.div`
  flex-grow: 1;
  font: normal normal bold 18px/12px 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
    line-height: 1.2rem;
    margin-bottom: 2rem;
  }
`

export const AvailableServices = styled.div<{ isOpen?: boolean }>`
  flex-grow: 1;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
  opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};

  @media only screen and (max-width: 768px) {
    order: 4;
    padding-right: 0;
    justify-content: flex-start;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }
`

export const ServiceIconWrapper = styled.div`
  padding: 0 0.7rem;

  @media only screen and (max-width: 768px) {
    &:first-child {
      padding: 0;
    }
  }
`

export const ServiceIcon = styled.div<{ enabled?: boolean }>`
  background: ${({ enabled }) => (enabled ? '#e5eefe' : '#ffffff')};
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    padding: 1rem;
  }
`

export const DropoffInfoWrapper = styled.div`
  background: #e5eefe 0% 0% no-repeat padding-box;
  box-shadow: 0rem 0.3rem 0.6rem #396cce42;
  border: 0.1rem solid #396cce42;
  border-radius: 5rem;
  padding: 1rem 4rem 1rem 2.3rem;
  display: flex;
  max-width: 50rem;
  margin: 3rem 0;
  align-items: center;
  font-size: 1.4rem;

  @media only screen and (max-width: 768px) {
    padding: 1rem 4rem 1rem 1rem;
  }
`

export const DropoffIcon = styled.div``

export const DropoffAddress = styled.div`
  margin-left: 2.5rem;
  p {
    font-size: 1.4rem;
  }
`

export const QuotePriceContainer = styled.div`
  min-width: 15rem;

  @media only screen and (max-width: 768px) {
    order: 2;
    flex-grow: 0;
    width: 100%;
    position: absolute;
    top: 2rem;
    right: 4rem;
  }
`

export const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  margin-top: 0.8rem;

  & span {
    color: #f8d012;
    text-align: left;
    font: normal normal 600 12px/12px Montserrat;
    letter-spacing: 0px;
    color: #f8d012;
    opacity: 1;
  }
`
