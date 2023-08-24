import styled from 'styled-components'

export const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  position: relative;

  input {
    min-width: 115px;
    height: 34px;
    appearance: none;
    outline: none;
    cursor: pointer;
    border-radius: 25px;
    padding: 6px 20px;
    margin-left: 20px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
    font-size: 14px;
    transition: all 100ms linear;

    border: 1px solid ${({ theme }) => theme.borders.strong};
    box-shadow: rgb(57 108 206 / 26%) 0px 3px 6px;

    &:first-child {
      margin-left: 0px;
    }
    &:checked {
      background: #e5eefe;
    }

    &:before {
      content: attr(data-label);
      display: inline-block;
      text-align: center;
      width: 100%;
    }
  }
`
