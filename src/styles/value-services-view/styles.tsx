import styled from 'styled-components'

export const MainContainer = styled.div`
  margin-top: 3rem;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
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
  width: 257px;
`
