import styled from 'styled-components'
import { Button } from '@alirok.com/rok-ui'

export const Form = styled.form`
  @media only screen and (max-width: 1024px) {
    max-width: 65rem;
    width: 100%;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const BackIcon = styled.img`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: flex;
    width: 1.6rem;
    height: auto;
    margin-right: 2rem;
    transform: rotate(90deg);
    cursor: pointer;
    position: absolute;
    top: 3rem;
  }
`

export const ToggleWrapper = styled.div<{ widthMobile?: string | undefined }>`
  max-width: 28.4rem;
  margin-bottom: 4.8rem;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    width: ${({ widthMobile }) => widthMobile ?? '100%'};
    max-width: unset;
    margin-top: 5rem;
  }
`

export const Content = styled.div`
  margin-top: 3.8rem;
`

export const Label = styled.span`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.black};
  opacity: 1;
`

export const Row = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 14px;
  wisth: 100%;

  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    flex-direction: column;
  }

  :not(:first-child) {
    margin-top: 5rem;
  }
`

export const ButtonText = styled.span`
  text-transform: uppercase;
  text-align: left;
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.white};
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const HelperLink = styled.a`
  font: normal normal 500 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-left: 4rem;
  outline: none;

  @media only screen and (max-width: 1024px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`

export const DeleteButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  width: 2rem;
  cursor: pointer;
`

export const Delete = styled.div`
  mask: url('https://static.alirok.io/collections/icons/delete.svg') no-repeat
    center;
  width: 2rem;
  height: 2rem;
  background: #ef3271;
`

export const AppendButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 50px 0 20px 0;
  text-transform: uppercase;
  cursor: pointer;
`

export const InputWrapper = styled.div<{
  maxWidth?: string
  maxWidthMobile?: string
}>`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;

  @media only screen and (max-width: 1024px) {
    max-width: ${({ maxWidthMobile }) => maxWidthMobile};
    margin-top: 2rem;
  }
`

export const CustomButton = styled(Button)`
  margin-top: 30px;
  align-content: center;
  padding: 0;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const CompoundInput = styled.div`
  display: flex;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  opacity: 1;

  > div {
    flex-grow: 1;
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`

export const SelectWrapper = styled.div`
  width: 5.5rem;
  div {
    > div {
      border-image: none;
    }
  }
`
