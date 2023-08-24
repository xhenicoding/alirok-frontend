import styled from 'styled-components'
import { Box } from '@alirok.com/rok-ui'
import Flex from 'components/Flex'

export const OperationHoursBox = styled(Box)`
  flex-direction: column;
`

export const OperationHourWrapper = styled(Flex)`
  font-size: 14px;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  > input:nth-child(2),
  input:nth-child(4) {
    box-shadow: rgb(223 231 247) 0px 3px 6px;
    border: none;
    font-weight: 600;
    color: rgb(30, 30, 30);
    padding: 5px 10px;
    height: 45px;
    border-bottom: 1px solid #eee !important;
    border-image-slice: 1 !important;
    border-radius: 10px !important;
    width: 100px;
    text-align: center;

    &:focus {
      outline: none !important;
    }
  }

  span {
    width: 4rem;
    font-weight: 500;
    user-select: none;

    &:nth-child(3) {
      text-align: center;
      cursor: pointer;
    }

    &:nth-child(5) {
      cursor: pointer;
    }
  }

  p {
    user-select: none;
  }
`

export const OperationHourWrapperActions = styled(Flex)`
  flex-direction: row;
  justify-content: end;
  button:nth-child(1) {
    margin-right: 10px;
  }
`

export const ErrorMsg = styled.p`
  padding-top: 5px;
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
`
