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

export const PageTitle = styled.h2`
  font-weight: bold;
  color: #1e1e1e;
  line-height: 70px;
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 10px;
`
export const ListWrapper = styled.div``

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`

export const FiltersWrapper = styled.div`
  display: flex;
  float: right;
  gap: 15px;
  font-weight: 700;
  font-size: 1.4rem;
  top: 66px;
  right: 0;
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

export const CarrierWrapper = styled.div`
  display: flex;
  width: 300px;
`

export const Row = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap ?? ''};
`
export const RateTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
`

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 257px;
`

export const SpanTitle = styled.span`
  text-transform: capitalize;
`

export const Link = styled.a`
  color: rgb(87, 142, 247);
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
`

export const LocationChip = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  color: #578ef7;
  background: #ebf0fa;
  border-radius: 50px;
  height: 20px;
  width: max-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
  font-size: 13px;
  padding: 8px 15px 8px 15px;
  margin-left: 5px;
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

  ${({ status }) => {
    switch (status) {
      default:
        return css`
          color: #578ef7;
          background: #e0e7f7;
        `
      case 'published':
        return css`
          color: #00b4cc;
          background: #d1f0f5;
        `
      case 'expired':
        return css`
          color: #ff80aa;
          background: #ffe1eb;
        `
      case 'readyToRok':
        return css`
          color: #ec73f7;
          background: #fce3fd;
        `
    }
  }}
`
