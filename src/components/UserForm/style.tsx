import styled from 'styled-components'

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

export const UserForm = styled.form`
  width: 100%;
`

export const Container = styled.div`
  max-width: 82rem;
  margin: 0.5rem auto;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 50px;
  height: 55rem;
  margin-top: 3.2rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  @media only screen and (max-width: 768px) {
    height: max-content;
    max-height: max-content;
    box-shadow: none;
    border: none;
    margin-top: 0rem;
    background-color: transparent;
    width: 100%;
  }
`

export const Content = styled.div``

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 5rem 0.5rem 5rem;
  margin: 0 auto;
  padding-bottom: 10.8rem;
  max-width: 82rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    height: max-content;
    justify-content: center;
    padding: 0.5rem 3.2rem 3rem 3.2rem;
  }
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4.4rem;
  position: absolute;
  top: -40px;
  margin: 0 auto;
  right: 0;
  left: 0;
  width: fit-content;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
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

export const FormMember = styled.div`
  margin-top: 5.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 5rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    row-gap: 4.3rem;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3.5rem;
  width: 100%;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: '4.3rem';
    width: 100%;
    justify-content: start;

    input {
      width: 100%;
    }
  }
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  place-self: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
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

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`
