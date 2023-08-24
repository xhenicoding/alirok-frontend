import styled, { css } from 'styled-components'

export const MainContainer = styled.div`
  margin-left: 2rem;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0rem;
    padding-right: 0rem;
  }
`

export const AddVendorIcon = styled.div`
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
export const ListWrapper = styled.div``

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
  background: #fff;
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

export const StatusChip = styled.span<{
  status?: string
}>`
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  border-radius: 50px;
  width: max-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
  font-size: 13px;
  padding: 8px 15px 8px 15px;
  text-transform: capitalize;

  ${({ status }) => {
    switch (status) {
      default:
        return css`
          color: #578ef7;
          background: #e5eefe;
        `
      case 'accept_now':
        return css`
          color: #1db8b2;
          background: #cbf0e8;
        `
      case 'connected':
        return css`
          color: #578ef7;
          background: #e5eefe;
        `
      case 'pending':
      case 'refused':
        return css`
          color: #ff73a1;
          background: #ffe1eb;
        `
    }
  }}
`
