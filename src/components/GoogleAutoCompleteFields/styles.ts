import { GroupTypeBase, OptionTypeBase, StylesConfig } from 'react-select'
import styled, { css } from 'styled-components'

export const Trigger = styled.div`
  font-size: 2rem;
  position: absolute;
  z-index: 90;
  top: 30%;
  right: 10px;
  font-size: 16px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: pointer;
`

export const TriggerText = styled.span`
  align-self: end;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
`

export const GoogleAutoCompleteLabel = styled.label`
  position: relative;
  opacity: 1;
  display: block;
  width: 100%;
  min-width: 7rem;
  max-height: 4.6rem;
  background: #fff;

  &.place-select-autocomplete-label {
    margin-top: 10px;
    margin-left: 5px;
  }
`

export const PlacesContainer = styled.div<{
  withBorder: boolean
  optionsShadow: boolean
  textAlign?: string
}>`
  display: flex;
  width: 100%;
  flex-direction: row;
  position: relative;

  > div > div:nth-child(2) {
    box-shadow: ${({ withBorder }) =>
      withBorder ? '0px 3px 6px #396cce42' : 'none'};
    border-radius: 10px;
    max-height: 4.6rem;
    z-index: 9;
    background: #fff;
  }

  > div > div:nth-child(3) {
    box-shadow: ${({ optionsShadow }) =>
      optionsShadow ? '0px 3px 6px #396cce42' : 'none'};
    border-radius: 10px;
    z-index: 100;
    position: absolute;
    background: #fff;
  }

  > div:nth-child(1) > div:nth-child(2) {
    padding: 0px;
    ${({ withBorder }) =>
      withBorder &&
      css`
        border: none;
      `}
    overflow: visible;
    border-radius: 10px;
  }

  > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    justify-content: ${({ textAlign }) => textAlign ?? 'left'};
  }

  > div:nth-child(1) > div:nth-child(2) > div > div {
    font-weight: bold;
  }

  > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) {
    display: none;
  }

  > div:nth-child(1) {
    width: 100%;
    overflow: visible;

    input {
      font-weight: bold;
    }
  }

  div:nth-child(3) div div {
    :hover {
      background: #f2f7ff;
      font-weight: bold;
    }
    border-radius: 10px;
  }

  div:nth-child(3) {
    z-index: 9990;
    border-radius: 10px;
  }

  &.place-select-container {
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.primaryLight};

    > div > div:nth-child(2) {
      box-shadow: none;

      > div > div {
        font-weight: normal;
        font-size: 14px;
        border: 0;
        border-radius: 0px;
        color: ${({ theme }) => theme.colors.black};
      }
    }
  }
`

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  top: 0;
  right: -1rem;
  font-size: 1.4rem;
  font-weight: 500;
`

export const Title = styled.span`
  position: absolute;
  background-color: #fff;
  font: normal normal normal 1.2rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -0.8rem;
  left: 1rem;
  z-index: 10;
`

export const selectStyle: StylesConfig<
  OptionTypeBase,
  false,
  GroupTypeBase<OptionTypeBase>
> = {
  control: (provided) => ({
    ...provided,
    border: 0,
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: '0.1rem solid',
    borderImage:
      'linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%)',
    borderImageSlice: 1,
    paddingBottom: '1rem'
  }),
  container: (provided) => ({
    ...provided,
    zIndex: 1
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.6rem',
    fontFamily: 'Montserrat'
  }),
  input: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.6rem',
    fontFamily: 'Montserrat'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.6rem',
    fontFamily: 'Montserrat'
  }),
  option: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
    fontFamily: 'Montserrat',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: 'none',
    padding: '1rem 1.5rem'
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
    fontFamily: 'Montserrat'
  }),
  loadingMessage: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
    fontFamily: 'Montserrat'
  }),
  menu: (provided) => ({
    ...provided,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    position: 'unset'
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: 46
  })
}
