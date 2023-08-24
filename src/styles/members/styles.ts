import styled from 'styled-components'

export const MobileMenuButton = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
`

export const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 15px;
  padding: 10px;
  margin-right: 20px;
  margin-top: 20px;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem 0rem 0rem 2rem;

  td {
    min-width: 150px;
    max-width: 250px;
  }

  th {
    min-width: 150px;
    max-width: 250px;
  }

  @media only screen and (max-width: 1024px) {
    margin: auto;
    padding-left: 0rem;
  }
`

export const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

export const ImageWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  align-items: center;
  max-width: 400px;
`

export const Img = styled.img`
  height: auto;
  width: 300px;
  margin-top: 20px;
`

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    height: 100%;
  }
`

export const Text = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const PhoneInputWrapper = styled.div`
  align-self: center;
  position: relative;
  width: 100%;

  .react-tel-input .flag-dropdown {
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0;
    border-radius: 3px 0 0 3px;
  }

  .react-tel-input .form-control {
    height: 4.5rem;
    border: none;
    align-self: center;
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
    color: #1e1e1e;
    padding-left: 50px;
  }

  .react-tel-input .form-control:disabled {
    background: transparent;
  }

  .react-tel-input .flag {
    padding: 12px;
    border-radius: 100%;
    width: 5px;
  }

  .react-tel-input .selected-flag .arrow {
    left: 22px;
    display: none;
  }

  .react-tel-input .special-label {
    display: none;
    left: 0.5rem;
    font: normal normal normal 1.2rem Montserrat;
    font-weight: 400;
  }
`

export const FiltersWrapper = styled.div`
  display: flex;
  float: right;
  gap: 15px;
  font-weight: 700;
  font-size: 1.4rem;
  right: 0;
  top: -1rem;
  right: 5%;
  z-index: 2;
  position: absolute;
  align-items: center;

  > div:nth-child(1) > div:nth-child(2) {
    position: relative;
  }
`

export const AccordionWrapper = styled.div`
  position: relative;
  overflow: auto;

  .table-scroll {
    overflow: auto;
  }

  // border from arrow
  > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    border: 1px solid #000;
  }

  // list label
  > div:nth-child(1) > div:nth-child(1) > p {
    font-size: 14px;
  }

  // color from arrow
  > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    background: #000;
  }
`

export const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  position: relative;
`

export const ArrowBack = styled.div`
  margin-right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  transform: rotate(90deg);
  mask: url('https://static.alirok.io/collections/icons/chevron-down.svg')
    no-repeat center;
  background: #000;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`

export const TittleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  align-items: center;
  margin-left: -8px;
`

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
`

export const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  align-items: center;
`

export const AddressIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  align-items: center;
`

export const MemberImageWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
`

export const AddressWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
`
