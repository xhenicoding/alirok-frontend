import styled from 'styled-components'

export const DropdownFilterContainer = styled.div<{
  openWidth?: string
}>`
  position: absolute;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 3rem;
  opacity: 1;
  display: flex;
  padding: 0 2rem;
  height: fit-content;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  flex-direction: column;
  z-index: 10;

  > div {
    display: none;
  }

  &:hover {
    padding-bottom: 1rem;
    width: ${({ openWidth }) => openWidth};
  }

  &:hover > div {
    display: flex;
  }
`

export const DropdownInputsContainer = styled.div`
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white} !important;
  width: 100%;

  p {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
  }
`

export const DropdownInputLabel = styled.label`
  display: flex;
  flex-direction: row;
  height: 2.8rem;
  align-items: center;
  width: 100%;
`

export const DropdownInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  width: 100%;
  margin: 0.2rem 0;
`

export const DropdownNestedDiv = styled.div`
  margin-top: 1rem;
`

export const DropdownFilter = styled.div<{
  closedWidth?: string
}>`
  position: relative;
  width: ${({ closedWidth }) => closedWidth};
  min-width: 14rem;
`

export const TagText = styled.span`
  font: normal normal 600 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.black};
  opacity: 1;
  cursor: pointer;
  white-space: nowrap;
`

export const DropdownSubtitle = styled.span`
  font: normal normal 600 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.black};
  opacity: 1;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 0 !important;
`
