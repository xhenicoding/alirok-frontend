import styled from 'styled-components'
import Flex from 'components/Flex'

export const AddIcon = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  z-index: 2;
`

export const PageTitle = styled.div`
  font-weight: bold;
  color: #1e1e1e;
  line-height: 70px;
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 10px;
  display: flex;
  place-items: center;

  div:first-child {
    display: none;
  }

  @media (max-width: 768px) {
    div:first-child {
      display: flex;
    }
    span {
      margin-left: 20px;
    }
  }
`

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  #main-table thead {
    th {
      div {
        user-select: none;
      }
    }
  }

  > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    background: #000;
  }
`
export const FiltersWrapperMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    float: right;
    gap: 15px;
    font-weight: 700;
    font-size: 1.4rem;
    top: 66px;
    right: 5%;
    z-index: 2;
    position: absolute;
  }
`

export const MobileWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 15px;
  padding: 10px;
  top: 190px;
  right: 32px;
`

export const FiltersWrapper = styled.div`
  display: flex;
  float: right;
  gap: 15px;
  font-weight: 700;
  font-size: 1.4rem;
  top: 66px;
  right: 5%;
  z-index: 2;
  width: max-content;
  position: absolute;

  @media (max-width: 768px) {
    right: 0%;
    top: 69px;
  }

  @media (max-width: 768px) {
    div:first-child {
      width: 200px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const AdditionalInstructions = styled(Flex)`
  gap: 20px;
  width: 100%;
  min-height: 300px;

  span {
    font-size: 14px;
  }

  button {
    margin-top: auto;
    margin-left: auto;
  }
`

export const OperationHoursWrapper = styled(Flex)`
  gap: 25px;
  width: 100%;
  min-height: 300px;

  span {
    font-size: 14px;
    font-weight: 500;

    &:first-child {
      font-weight: bold;
    }

    &.closed {
      color: ${({ theme }) => theme.colors.red};
    }
  }

  button {
    margin-top: auto;
    margin-left: auto;
  }
`

export const ShowHours = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

export const DropOffLocationActions = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 15px;
  padding: 10px 0px;
  right: 32px;

  div {
    padding: 7px 10px;
    margin-left: 7px;
    margin-right: 7px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight};
      border-radius: 25px;
    }
  }

  span {
    margin-left: 2rem;
  }
`

export const ModalIconWrapper = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.colors.black};
  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`
export const ModalIcon = styled.div<{ icon: string }>`
  width: auto;
  height: 30px;
  margin-top: 5px;

  background: ${({ theme }) => theme.colors.black};
  &.selected {
    background: ${({ theme }) => theme.colors.primary};
  }
  mask: url(https://static.alirok.io/collections/icons/${({ icon }) =>
      icon}.svg)
    no-repeat center / contain;
  padding: 5px;
`
