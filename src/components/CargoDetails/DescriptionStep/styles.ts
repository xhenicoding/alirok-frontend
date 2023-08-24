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
  margin-top: 1.4rem;
  margin-right: 3rem;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 4rem;
    margin-right: 0;
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  max-width: 30rem;
  margin-bottom: 2rem;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    max-width: 100%;
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
  width: 100%;

  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 30px;
    flex-direction: column;
  }

  :not(:first-child) {
    margin-top: 5rem;
  }
`

export const ItemBox = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: unset;
  gap: 0.5rem;

  @media only screen and (max-width: 1024px) {
    flex-direction: row;
    margin-top: 1.4rem;
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
  align-content: center;
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
  background: ${({ theme }) => theme.texts.danger};
  cursor: pointer;
`

export const AddButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  width: 2rem;
  cursor: pointer;
`

export const Add = styled.div`
  mask: url('https://static.alirok.io/collections/icons/add-new.svg') no-repeat
    center;
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  mask-size: contain;
  cursor: pointer;
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
    margin-top: 0rem;

    > div {
      width: 100%;
    }
  }
`

export const CustomButton = styled(Button)`
  margin-top: 30px;
  padding: 0;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    margin-top: 50px;
  }
`

export const SecondLine = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`

export const CompoundInput = styled.div`
  display: flex;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  opacity: 1;
  align-items: center;
  min-width: 20rem;

  > div {
    flex-grow: 1;
  }

  @media only screen and (max-width: 1024px) {
    margin-top: 0px !important;
    max-width: 25rem;
  }

  @media only screen and (max-width: 768px) {
  }

  @media only screen and (max-width: 425px) {
    max-width: 100%;
    > div {
      margin-right: auto;
    }
  }
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`

export const SelectWrapper = styled.div`
  width: 100%;
  max-width: 10rem;
  position: relative;

  > div > div {
    display: flex;
    border-image: none;
  }

  > div > div > div:nth-child(2) {
    display: flex;
    justify-content: right;
    width: 100%;
  }
  > div > div > div:nth-child(2) > div:nth-child(1) {
    width: 100%;
    display: flex;
    max-width: 6rem;
  }
`

export const BackIcon = styled.img`
  width: 1.6rem;
  height: auto;
  margin-right: 2rem;
  transform: rotate(90deg);
  cursor: pointer;
`

export const BackContent = styled.div`
  display: flex;
  margin-bottom: 3rem;
  margin-top: 1rem;
  align-items: center;
`
