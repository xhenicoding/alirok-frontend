import styled from 'styled-components'
import { Button } from '@alirok.com/rok-ui'

export const Summary = styled.div`
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
    margin-top: 5rem;
    margin-right: 0;
  }
`

export const Content = styled.div`
  margin-top: 3.8rem;
`

export const Label = styled.span`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 1;
`

export const Row = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 14px;
  width: 100%;

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
`

export const EditButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  width: 2rem;
  margin-left: 2rem;
  cursor: pointer;
`

export const Edit = styled.div`
  mask: url('https://static.alirok.io/collections/icons/edit-line.svg')
    no-repeat center;
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  margin-right: 2rem;
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

export const ResumeItem = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  padding: 1.5rem 1.4rem;
  align-items: center;
  heigth: 4.5rem;

  @media only screen and (max-width: 1024px) {
    margin-top: 2rem;
  }
`

export const CustomButton = styled(Button)`
  padding: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const ResumeLabel = styled.span`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  font: normal normal normal 1.2rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 1;
  top: -0.8rem;
  left: 1rem;
`

export const ResumeDescription = styled.div`
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.colors.black};
`

export const Excerpt = styled.div`
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.colors.black};
  background: #f2f7ff 0% 0% no-repeat padding-box;
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  border-radius: 50px;
  padding: 1.1rem 4rem;

  @media only screen and (max-width: 1024px) {
    margin-top: 0px !important;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 8rem;
`
