import styled from 'styled-components'

export const MainContainer = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
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
  right: 0;
  top: 1.5rem;
  right: 5%;
  z-index: 2;
  position: absolute;
  align-items: center;
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
