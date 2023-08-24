import styled from 'styled-components'
import NumberFormat from 'react-number-format'

export const Container = styled.div<{ width: string | undefined }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width ?? 'fit-content'};

  input {
    width: 100% !important;
  }
`

export const Label = styled.label<{ withBorder: boolean }>`
  position: relative;
  box-shadow: ${({ withBorder }) =>
    withBorder ? '0px 3px 6px #396cce42' : 'none'};
  border-radius: 10px;
  opacity: 1;
  display: block;
  width: 100%;
  min-width: 4rem;
  white-space: nowrap;
`

export const Title = styled.span<{ expanded?: boolean }>`
  white-space: nowrap;
  position: absolute;
  background-color: #fff;
  font: normal normal normal 1.2rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -0.8rem;
  left: ${({ expanded }) => (expanded ? '1rem' : 'unset')};
`

export const EndAdornment = styled.span`
  position: absolute;
  right: 0%;
  padding: 0.5rem;
`

export const Input = styled.input`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  padding: 0.9rem 1.4rem;
  outline: none;
  border: none;
  width: ${({ width }) => (width ? width : '100%')};
  height: 45px;
  border-radius: 10px;

  :disabled {
    background: #f2f7ff;
  }
`

export const CustomNumberFormat = styled(NumberFormat)`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  padding: 0.9rem 0.5rem;
  outline: none;
  border: none;
  width: 100%;
  height: 45px;
  border-radius: 10px;
`

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`
