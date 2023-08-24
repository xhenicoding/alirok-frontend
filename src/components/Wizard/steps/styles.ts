import styled, { css } from 'styled-components'
import Flex from '../../Flex/index'

export const WizardTitle = styled.p<{
  fontSize?: string
}>`
  font-size: ${({ fontSize }) => `${fontSize ? fontSize : '1.7rem '}`};
  font-weight: bold;
`

export const WizardSubTitle = styled.p`
  font-size: 20px;
  font-weight: normal;
  margin-top: 2.5rem;
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

export const AvatarWrapper = styled.div`
  max-width: max-content;
  position: relative;
`

export const DefaultAvatar = styled.h1`
  color: #ef3271;
  font-weight: 500;
  display: flex;
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

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`

export const PhoneInputWrapper = styled.div<{
  inputAlign?: string
  inputBoxShadow?: boolean
}>`
  align-self: center;
  position: relative;
  width: 100%;

  .react-tel-input .form-control {
    border-radius: 10px;
    height: 4.5rem;
    align-self: center;
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
    border-bottom: 0.1rem solid;
    border-image: linear-gradient(
      90deg,
      #1880d9 10%,
      #e60791 62%,
      #f55353 100%
    );
    border-image-slice: 1;
    border-top: none;
    border-left: none;
    border-right: none;
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

  .react-tel-input .special-label {
    display: none;
    left: 0.5rem;
    font: normal normal normal 1.2rem Montserrat;
    font-weight: 400;
  }

  input {
    padding-left: 15px;
    text-align: ${({ inputAlign }) => inputAlign || 'center'};

    ${({ inputBoxShadow }) => {
      if (inputBoxShadow === false) {
        return css`
          &:focus {
            box-shadow: none !important;
          }
        `
      }
    }}
  }

  input :focus-visible {
    outline: none;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const WizardStep = styled.section`
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  height: calc(100vh - 180px) !important;
  width: 100%;
`

export const CircleButton = styled.button`
  width: 30px;
  height: 30px;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 50%;
  border: 1px solid #dfe7f7;
  cursor: pointer;
`

export const Arrow = styled.img`
  transform: rotate(180deg);
  width: 12px;
  cursor: pointer;
`

export const StepLayout = styled.div`
  margin: auto;
  display: grid;
  width: 650px;
  grid-gap: 7rem;
  justify-items: center;

  .address-input-step {
    text-align: center;
    font-weight: 400;
    color: var(--font-color-primary) !important;
  }

  .next-button {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    width: 425px;

    .next-button {
      width: 180px;
      font-size: 14px;
    }
  }

  @media (max-width: 425px) {
    width: 320px;
    .next-button {
      width: 140px;
      font-size: 12px;
    }
  }

  .vendor-legal-name,
  .vendor-tax-id {
    text-align: left;

    &::placeholder {
      font-size: 13px;
    }
  }

  .vendor-tax-id {
    margin-left: 50px;
  }

  .contact-person {
    border-width: 1px;
    margin-top: 58px;
  }

  .net-terms-ask-container {
    margin-top: -12px;
  }
`

export const AddNewVendorLink = styled.span`
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  color: #76a3f8;
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const PreviousRow = styled.div`
  display: grid;
  color: #1e1e1e;
  align-items: center;
  grid-template-columns: 1fr 30px;
  grid-gap: 10px;
  font-size: 14px;
`

export const AskContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  width: 100%;
  align-items: center;
  font-weight: bold;

  h3 {
    font-weight: bold;
  }
`

export const WizardButton = styled.button`
  color: var(--font-color-primary);
  width: 200px;
  height: 40px;
  padding: 0 30px 0 30px;
  box-shadow: 1px 1px 11px #dedede;
  border-radius: 25px;
  font-weight: bold;
  border: 1px solid #1e1e1e;

  :hover {
    color: white;
    background: linear-gradient(
      90deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    );
  }
`

export const AskImg = styled.img`
  max-width: 18px;
  max-height: 23px;
`

export const WizardInput = styled.input<{
  border?: string
  fontWeight?: string
  textAlign?: string
}>`
  background-color: transparent;
  width: 100%;
  height: 45px;
  text-align: ${({ textAlign }) => `${textAlign ? textAlign : 'center '}`};
  padding: 0 10px 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ fontWeight }) => `${fontWeight ? fontWeight : 'normal '}`};
  border-width: ${({ border }) => `${border ? border : '2px'}`};
  border-image: linear-gradient(
      90deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    )
    0 0 100 0;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;

  &[aria-invalid='false'] {
    border-width: 1px;
  }
  ::placeholder {
    color: #1e1e1e;
    font-weight: normal;
  }
  :-webkit-autofill {
    -webkit-text-fill-color: #1e1e1e !important;
  }
  :focus-visible {
    outline: none !important;
  }
`

export const CircleLogo = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  margin-right: 40px;
  box-shadow: 0px 3px 6px #dfe7f7;
  border: 1px solid #dfe7f7;
  align-self: flex-start;

  @media (max-width: 768px) {
    margin-right: 30px;
  }

  @media (max-width: 425px) {
    margin-right: 20px;
  }
`

export const InputContainer = styled.div`
  display: flex;
  border-width: 2px;
  border-image: linear-gradient(
      90deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    )
    0 0 100 0;
  width: 100%;
`

export const SelectField = styled.div<{
  width?: string
}>`
  ul {
    max-height: 180px !important;
    li {
      color: ${({ theme }) => theme.colors.black} !important;
      font-size: 14px;
      padding-top: 15px !important;
      padding-bottom: 15px !important;
    }
  }

  p {
    text-align-last: center;
    color: ${({ theme }) => theme.colors.foreground};
  }

  input {
    background: transparent;
    text-align: left;
    font-weight: 700;
    width: 100%;
    &::placeholder {
      color: black;
      text-align: center;
    }
  }

  width: ${({ width }) => (width ? width : '520px')};
  border-bottom: 1px solid;
  border-image: linear-gradient(
      90deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    )
    0 0 100 0;
  border-image-slice: 1;

  .vendor-options-row {
    font-weight: normal;
    &:hover {
      font-weight: 500;
    }
  }

  .vendor-options {
    span:nth-child(1) {
      font-size: 14px;
    }
    span:nth-child(2) {
      font-size: 10px;
    }
  }
`

export const SelectFieldWrapper = styled.div``

export const GridCompanyCreate = styled.div`
  display: grid;
  grid-template-columns: 1fr 40%;
`

export const PaymentTerm = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 23px;
`

export const TextFieldContainer = styled.div`
  ul {
    max-height: 100px !important;
    z-index: 2;
  }

  p {
    text-align-last: left;
    color: ${({ theme }) => theme.colors.black};
  }

  input {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 700;
    background: transparent;
  }

  display: flex;
  flex-direction: row;
  width: 150px;
  border-bottom: 1px solid;
  border-image: ${({ theme }) => theme.gradients.default};
  border-image-slice: 1;
`

export const CreditLineContainer = styled.div`
  display: flex;
  flex-direction: row;

  input {
    min-height: 45px !important;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.black} !important;
    height: auto !important;
    font-size: 14px;
    padding-top: 5px 10px !important;
    font-weight: bold;
  }
`

export const CreditLine = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`

export const WarehouseContainer = styled(Flex)`
  user-select: none;
  justify-content: space-between;
  width: 80%;
`

export const WarehouseType = styled(Flex)`
  padding: 2.2rem;
  height: 11.5rem;
  width: 13rem;
  min-width: 13rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 3rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }

  &:hover,
  &.selected {
    background: #e5eefe 0% 0% no-repeat padding-box;
  }
`

export const MultiSelectContainer = styled(Flex)<{ multiSelectWidth?: string }>`
  user-select: none;
  justify-content: center;

  border-bottom: 0.1rem solid;
  border-image: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
  border-image-slice: 1;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 10px;

  button {
    min-height: 37px;
    height: auto !important;
    > div > div > div:nth-child(2) > div {
      font-size: 14px;
    }
  }

  ${({ multiSelectWidth }) => {
    if (multiSelectWidth) {
      return css`
        > div > div > div {
          width: ${multiSelectWidth};
        }
      `
    }
  }}
`

export const OperationHoursContainer = styled(Flex)`
  user-select: none;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;

  border-bottom: 0.1rem solid;
  border-image: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
  border-image-slice: 1;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 10px;

  button > div > div > div:nth-child(2) > div {
    font-size: 14px;
  }
`

export const AppointmentPickupStatus = styled.span<{
  status: string
}>`
  display: flex;
  align-items: center;
  font-weight: 500;
  border-radius: 50px;
  height: 20px;
  width: max-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
  font-size: 14px;
  padding: 1.2rem;
  cursor: pointer;
  user-select: none;

  &.selected {
    border: 1px solid;
  }

  ${({ status }) => {
    switch (status) {
      default:
        return css`
          color: #0086cc;
          background: #d1e3f5;
        `
      case 'optional':
      case 'Optional':
        return css`
          color: #00b4cc;
          background: #d1f0f5;
        `
      case 'required':
      case 'Required':
        return css`
          color: #ff80aa;
          background: #ffe1eb;
        `
      case 'notAvailable':
      case 'Not Available':
        return css`
          color: #0086cc;
          background: #d1e3f5;
        `
    }
  }}
`
