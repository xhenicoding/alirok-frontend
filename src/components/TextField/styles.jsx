import styled from 'styled-components'
// import { colors } from '~services/theme';

export const StyledTextField = styled.div`
  position: relative;
  width: ${({ externWidth }) => `${externWidth ?? ''}`};
  height: fit-content;

  input:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.fontDark} !important;
  }

  label {
    position: absolute;
    top: ${({ labelTop }) => `${labelTop ?? '50%'}`};
    left: ${({ labelLeft }) => `${labelLeft ?? '0%'}`};
    color: ${({ theme }) => theme.colors.secondary};
    transform: translate(0%, -50%);
    padding: 0px 10px;
    pointer-events: none;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    font-weight: 500;
    border-bottom: none !important;
  }

  Input:required:invalid + label:before {
    content: '*';
  }

  Input:not(:focus) + label {
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.white};
  }

  Input:focus + label,
  Input:not(:placeholder-shown) + label {
    background-color: ${({ theme }) => theme.colors.white};
    top: ${({ labelTop }) => `${labelTop ?? '-0.2em'}`};
    font-size: 11px;
    color: ${({ theme }) => theme.colors.fontDark};
    border-bottom: none;
  }

  Input::placeholder {
    color: ${({ theme }) => theme.colors.fontDark};
    font-weight: 400;
  }

  Input {
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
    border: none;
    font-weight: 600;
    color: ${({ theme }) => `${theme.colors.black ?? theme.colors.fontDark}`};
  }

  .input-error {
    border: 1px solid ${({ theme }) => theme.colors.danger};
  }

  Input:focus + .label-error,
  Input:not(:placeholder-shown) + .label-error {
    color: ${({ theme }) => theme.colors.danger};
  }

  .adornment {
    font-size: 0.7em;
    color: ${({ theme }) => theme.colors.secondary};
  }
`

export const InputAdornment = styled.span`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(0%, -50%);
  padding: 0.5em 0.75em;
`
