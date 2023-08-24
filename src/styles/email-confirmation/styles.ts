import styled from 'styled-components'
import { Button } from '@alirok.com/rok-ui'

export const ConfirmContainer = styled.div`
  width: 100%;
  justify-content: space-around;
  padding: 0 5%;

  @media (max-width: 1024px) {
    flex-direction: column !important;
    align-items: center;
  }

  > div > div > div > div:nth-child(2) {
    display: none;
  }
`

export const ButtonContainer = styled.div`
  margin-top: 20px;
`

export const Text = styled.span<{ fontWeight?: string }>`
  font-size: 16px;
  font-weight: ${({ fontWeight }) => fontWeight ?? ''};
  text-align: center;
  color: #000;
`

export const Img = styled.img`
  width: 80%;
  align-self: center;
`

export const TimerContainer = styled.div`
  margin-top: 10px;
`

export const StyledButton = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  width: 65%;
  height: 33px;
  border-radius: 20px;
  box-shadow: 0px 3px 7px 2px #dfe7f7;
  background: #52b788;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #74c69d;
    color: #ffffff;
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column
  width: 100%;
  height: 100vh;
`
