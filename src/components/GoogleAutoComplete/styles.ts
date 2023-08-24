import { GroupTypeBase, OptionTypeBase, StylesConfig } from 'react-select'
import styled from 'styled-components'

export const GoogleAutoCompleteLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  div:nth-child(2) div:nth-child(1) {
    width: 100%;
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

  div:nth-child(3) div div::before {
    content: url(https://static.alirok.io/collections/icons/location.svg);
    width: 2em;
    height: 2em;
    padding: 0.5em;
    border: 1px solid #1e1e1e2e;
    border-radius: 50%;
    margin-right: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

export const GoogleAutoCompleteTitle = styled.span`
  font: normal normal 600 1.6rem 'Montserrat', sans-serif;
  color: #373435;
  margin-bottom: 2rem;
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
  singleValue: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
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

export const selectShipperStyle: StylesConfig<
  OptionTypeBase,
  false,
  GroupTypeBase<OptionTypeBase>
> = {
  control: (provided) => ({
    ...provided,
    border: 0,
    boxShadow: 'none',
    borderRadius: '10px',
    borderBottom: '0.1rem solid',
    borderImage:
      'linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%)',
    borderImageSlice: 1
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
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
