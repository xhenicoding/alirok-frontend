import styled from 'styled-components'

export const BarContainer = styled.div`
  display: none;
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  box-shadow: 0px -1px 6px ${({ theme }) => theme.colors.primaryLight};
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  padding: 2rem 0 2rem 0;
  border-radius: 0;
  z-index: 2;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`

export const BarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 10px 10px 0 10px;
  width: 90vw;
`

export const SearchContainer = styled.div`
  width: 100%;
  z-index: 100;
  max-width: 50rem;
  margin: 0 auto;
`

export const TabHead = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  display: flex;
  grid-template-columns: 6rem 6rem 7.5rem;
  place-content: center;
  margin-bottom: 2rem;
`

export const Tab = styled.label<{ selected: boolean }>`
  position: relative;

  a {
    text-decoration: none !important;
    font: normal normal normal 1.4rem 'Montserrat', sans-serif;
    font-weight: bold;
    color: #191919;
    text-transform: uppercase;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 1s ease-out;
`
export const TabTag = styled.div<{ isActive?: boolean }>`
  position: absolute;
  display: block;
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  background: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
  border-radius: 5px;
  width: 2.5rem;
  height: 0.5rem;
  bottom: -1rem;
  transition: opacity 0.2s ease-in-out;
`
