import styled, { css } from 'styled-components'

export const Label = styled.label<{ checked?: boolean }>`
  cursor: pointer;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 3rem;
  opacity: 1;
  display: flex;
  padding: 2.2rem;
  height: 11.5rem;
  width: 13rem;
  min-width: 13rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ checked }) =>
    checked &&
    css`
      background: #e5eefe 0% 0% no-repeat padding-box;
    `}
`

export const Input = styled.input`
  display: none;
`

export const Text = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 1.6rem;
`
