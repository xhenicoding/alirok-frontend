import styled from 'styled-components'

export const ServiceItemSectionTittle = styled.p`
  padding: 0 7rem;
  padding-bottom: 1.8rem;
  font-weight: bold;
`

export const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0;

  @media only screen and (max-width: 768px) {
    padding: 2.5rem 0;
    width: 100%;
  }
`

export const ServiceIconWrapper = styled.div<{
  firstChild?: boolean
  lastChild?: boolean
}>`
  padding: 1px 0.7rem;

  &::before {
    content: '';
    border-left: 5px dotted hsl(220deg 60% 79%);
    position: absolute;
    left: 2.2rem;
    top: ${({ firstChild }) => (firstChild ? '3.1rem' : 0)};
    height: ${({ lastChild }) => (lastChild ? '3rem' : 'calc(100% - 5px)')};
  }

  @media only screen and (max-width: 768px) {
    &::before {
      top: ${({ firstChild }) => (firstChild ? '2.6rem' : 0)};
      height: ${({ lastChild }) => (lastChild ? '2.5rem' : 'calc(100% - 5px)')};
    }
  }
`

export const ServiceInput = styled.input`
  display: none;
`

export const ServiceIcon = styled.label<{ enabled?: boolean }>`
  background: ${({ enabled }) => (enabled ? '#e5eefe' : '#ffffff')};
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    padding: 1rem;
  }
`

export const ServiceDescriptionWrapper = styled.div`
  flex-grow: 1;
  padding-left: 2rem;

  @media only screen and (max-width: 768px) {
    padding-left: 1rem;
  }
`

export const ServiceDescription = styled.div`
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 14px/12px 'Montserrat', sans-serif;
  }
`

export const ServiceCompany = styled.div`
  flex-grow: 1;
  font: normal normal 500 14px/18px 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 14px/12px 'Montserrat', sans-serif;
    margin-top: 6px;
  }
`

export const ServicePrice = styled.div`
  font: normal normal bold 16px/12px 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 14px/12px 'Montserrat', sans-serif;
    max-width: 100%;
    text-align: right;
  }
`

export const ServiceItemWrapper = styled.div`
  display: flex;
  padding: 0 7rem;
  font: normal normal 500 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;

  &:not(:last-child) {
    padding-bottom: 1.8rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 3.4rem 0 6rem;
    flex-wrap: wrap;
  }
`

export const ServiceItemInput = styled.div`
  flex-grow: 1;

  input {
    border: 2px solid #396cce42;
    box-shadow: none;

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 1.4rem;
  }
`

export const ServiceItemDescription = styled.div`
  flex-grow: 1;
`

export const ServiceItemPrice = styled.div`
  display: flex;
  min-width: 10rem;
  justify-content: flex-end;
`
