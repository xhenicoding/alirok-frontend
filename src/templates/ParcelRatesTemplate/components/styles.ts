import Flex from '../../../components/Flex'
import styled from 'styled-components'
import { Box } from '@alirok.com/rok-ui'

export const ModalCard = styled.div<{ bottom: string; right: string }>`
  left: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  z-index: 9999999;
  position: fixed;
  width: 400px;
  height: auto;
  font-weight: 700;
`
export const Weight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 15px;
  font-weight: 700;

  input {
    border-radius: 30px;
    font-weight: 700;

    &::-webkit-inner-spin-button {
      -moz-appearance: textfield;
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

export const AutomatedRateModalCard = styled.div<{
  bottom: string
  right: string
  display?: string
}>`
  left: 33vw;
  bottom: 50vh;
  z-index: 9999999;
  width: auto;
  height: auto;
  font-weight: 700;
  border-radius: 0px 20px 30px 30px;
  display: ${({ display }) => (display ? display : 'none')};
  margin-bottom: 5px;
  .weight-row-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  box {
    border-radius: 0px 20px 30px 30px;
  }
`

export const AutoRateRowFlex = styled(Flex)`
  overflow-y: scroll;
  max-height: 500px;
  overflow-x: hidden;

  .weight-row {
    border-top: 1px solid #ccc;

    &:first-child {
      border-top: 0px;
    }
  }
`

export const CheckboxWrapper = styled(Flex)`
  overflow-y: hidden;
  overflow-x: scroll;
`

export const ActionLinks = styled(Flex)`
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    padding: 10px 15px;

    :hover {
      border-radius: 50px;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`

export const TriggerSpan = styled.span`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  gap: 12px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  outline: none;
  border-radius: 50px;
  min-width: 22px;
  min-height: 22px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  width: 32px;
  height: 32px;
  color: rgb(87, 142, 247);
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  border: 0.5px solid ${({ theme }) => theme.colors.primary};
  box-shadow: none;
`

export const AutomatedRow = styled.div`
  display: flex;
  margin: 30px 0px 30px 12px;
  gap: 20px;
  width: 100%;
  align-items: center;

  div:first-child {
    > p {
      min-width: 200px;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
  }

  :not(:first-child) {
    margin-top: 20px;
  }

  .auto-del-ico {
    cursor: pointer;
    margin-right: 15px;
  }
`

export const InputWrapper = styled.div<{
  maxWidth?: string
  maxWidthMobile?: string
}>`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;

  @media only screen and (max-width: 768px) {
    max-width: ${({ maxWidthMobile }) => maxWidthMobile};
    margin-top: 20px;
  }
`

export const CompoundInput = styled.div`
  display: flex;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 10px;
  opacity: 1;

  > div {
    flex-grow: 1;

    > label {
      > span {
        color: black;
        font-weight: normal;
        text-transform: capitalize;
      }
    }
  }
`

export const CompoundInputHelper = styled.label`
  color: ${({ theme }) => theme.colors.black} !important;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.borders.strong};
  box-shadow: rgb(57 108 206 / 26%) 0px 3px 6px;
  background: #e5eefe;
  border-radius: 10px;
  padding: 13px;
  font-size: 14px;
`

export const CompoundInputCurrencyHelper = styled.div`
  padding: 0 13px;
  padding-top: 3px;
  font-size: 14px;

  div:first-child {
    float: right;
  }
`

export const RulesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 181px;
  text-align: left;
  align-self: center;
  text-align-last: left;
  gap: 5px;
  width: 100%;

  > div {
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px 15px;

    :hover {
      border-radius: 50px;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`

export const RulesWrapperBox = styled(Box)<{ borderRadius?: string }>`
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '0 30px 30px'};
  margin-left: 25px;
`
