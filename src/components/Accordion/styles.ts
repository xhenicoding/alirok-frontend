import styled from 'styled-components'

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
`

export const Header = styled.div<{ collapseAlignment?: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    align-items: ${({ collapseAlignment }) =>
      collapseAlignment ? collapseAlignment : 'center'};
  }
`

export const HeaderContent = styled.div`
  flex-grow: 1;
`

export const CollapseIcon = styled.div`
  padding: 0 2.5rem;
  min-width: 7rem;

  @media only screen and (max-width: 768px) {
    padding: 2rem 1rem;
    min-width: 3rem;
  }
`

export const Arrow = styled.div<{ isOpen: boolean }>`
  width: 2rem;
  height: 2rem;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  mask: url('https://static.alirok.io/collections/icons/chevron-down.svg')
    no-repeat center;
  background: #000;
`

export const Body = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : 0)};
  overflow: hidden;
  transition: all 0.3s ease-out;
`
