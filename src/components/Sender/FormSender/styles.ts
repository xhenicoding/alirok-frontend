import styled from 'styled-components'

export const Container = styled.div<{ height?: boolean }>`
  max-width: 84.8rem;
  margin: 0.5rem auto;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 50px;
  height: ${({ height }) => (height ? `80rem` : '65rem')};
  margin-top: 3.2rem;
  background-color: ${({ theme }) => theme.colors.white};

  @media only screen and (max-width: 768px) {
    height: max-content;
    max-height: max-content;
    box-shadow: none;
    border: none;
    margin-top: 0rem;
    background-color: transparent;
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

export const SenderContainer = styled.div`
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
    padding: 0.5rem 3.2rem 8rem 3.2rem;
  }
`

export const ButtonText = styled.span`
  color: #578ef7;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4.4rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const AvatarWrapper = styled.div`
  max-width: max-content;
`

export const ToggleWrapper = styled.div<{ width?: boolean }>`
  max-width: ${({ width }) => (width ? `285px` : '28rem')};
  width: 100%;

  @media only screen and (max-width: 768px) {
    max-width: unset;
  }
`

export const DefaultAvatar = styled.h1`
  color: #ef3271;
  font-weight: 500;
`

export const FormSender = styled.div<{ corporation?: boolean }>`
  margin-top: 5.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 5rem;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    row-gap: 4.3rem;
  }
`

export const Row = styled.div<{ corporation?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 3.5rem;
  width: 55.2rem;
  justify-content: space-between;

  input {
    width: 25.4rem;
  }

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

export const TaxIdWrapper = styled.div<{ withBorder: boolean }>`
  display: flex;
  box-shadow: ${({ withBorder }) =>
    withBorder ? '0px 3px 6px #396cce42' : 'none'};
  border-radius: 1rem;
  opacity: 1;
  width: 100%;
  position: relative;

  input {
    width: 20rem;
    height: 4.5rem;
  }
`

export const HelperWrapper = styled.div`
  z-index: 10;
  position: relative;
`

export const HelperContent = styled.p`
  margin: 0;
  font: normal normal 600 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin-left: 1rem;
`

export const HelperTriggerContent = styled.span`
  margin: 0;
`

export const HelperTrigger = styled.div`
  background: #e5eefe 0% 0% no-repeat padding-box;
  border: 1px solid #396cce42;
  box-shadow: 0px 3px 6px #396cce42;
  width: 3rem;
  height: 3rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.8rem;
`

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`
