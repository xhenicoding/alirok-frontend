import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 700px;
  max-width: 1000px;
  padding-left: 15px;
  margin-top: 2rem;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    margin-top: 4rem;
    padding: 0px;
  }
`

export const PhotoWrapper = styled.div`
  padding: 0px 30px;

  @media only screen and (max-width: 768px) {
    place-self: center;
  }
`

export const DetailsWrapper = styled.div`
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 50px;
  display: grid;
  gap: 60px;
  padding: 40px;
  height: 100%;
  align-content: start;

  @media only screen and (max-width: 768px) {
    box-shadow: none;
    width: 100%;
    border: none;
    padding: 20px 0px;
    gap: 40px;
    height: calc(100% + 150px);
  }
`

export const Row = styled.div<{
  columns?: string
  mobileColumns?: string
}>`
  display: grid;
  grid-template-columns: ${({ columns }) => (columns ? columns : '1fr 1fr')};
  gap: 40px;
  height: fit-content;
  align-items: center;

  @media only screen and (max-width: 768px) {
    grid-template-columns: ${({ mobileColumns }) =>
      mobileColumns ? mobileColumns : '1fr'};
  }
`

export const AvatarWrapper = styled.div`
  max-width: max-content;
  position: relative;
`

export const CircleAvatar = styled.div`
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
  border: 1px solid #748eb5;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  bottom: -5px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DefaultAvatar = styled.h1`
  color: #ef3271;
  font-weight: 500;
  display: flex;
`

export const AddressContainer = styled.div`
  width: 100%;
  label {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    input {
      width: 100% !important;
    }
  }
`

export const LabelPhone = styled.span`
  position: absolute;
  background-color: #fff;
  font: normal normal normal 1.2rem Montserrat;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -0.8rem;
  left: 1rem;
  z-index: 2;
`

export const PhoneInputWrapper = styled.div`
  align-self: center;
  position: relative;
  width: 100%;

  .react-tel-input .form-control {
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
    border-radius: 10px;
    height: 4.5rem;
    border: none;
    align-self: center;
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .react-tel-input {
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
    border-radius: 10px;
  }

  .country-list {
    box-shadow: 0px 3px 6px #396cce42;
  }

  .react-tel-input .flag {
    padding: 12px;
    border-radius: 100%;
    width: 5px;
  }

  .react-tel-input .selected-flag .arrow {
    left: 22px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  .react-tel-input .special-label {
    display: none;
    left: 0.5rem;
    font: normal normal normal 1.2rem Montserrat;
    font-weight: 400;
  }
`
