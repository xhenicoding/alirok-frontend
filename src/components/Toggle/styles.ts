import styled, { css } from 'styled-components'

export const Container = styled.div<{ isMobileMode?: boolean }>`
  height: 4rem;
  width: 100%;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  border-radius: 5rem;
  background-color: #ffffff;
  display: flex;
`

export const Label = styled.label<{
  isActive?: boolean
}>`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  cursor: pointer;
  box-sizing: border-box;

  ${({ isActive }) =>
    isActive &&
    css`
      border-right: 1px solid #396cce42;
      border-left: 1px solid #396cce42;
      background: #f2f7ff 0% 0% no-repeat padding-box;
    `}
`

export const LabelText = styled.span`
  font: normal normal 600 1.6rem 'Montserrat', sans-serif;
  color: #1e1e1e;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`

export const Input = styled.input`
  display: none;
`
