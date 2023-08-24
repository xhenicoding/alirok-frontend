import { GroupTypeBase, OptionTypeBase, StylesConfig } from 'react-select'
import styled from 'styled-components'

export const UserSearchLabel = styled.label`
  display: flex;
  flex-direction: column;
  .css-g1d714-ValueContainer {
    border: none !important;
  }

  .react-select__input input {
    font-weight: bold;
  }

  .react-select__option {
    :hover {
      background: #f2f7ff;
    }
    border-radius: 10px;
  }
`

export const UserSearchTitle = styled.span`
  font: normal normal 600 1.6rem 'Montserrat', sans-serif;
  color: #373435;
  margin-bottom: 2rem;
`

export const CompanyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  align-items: center;
`

export const Option = styled.span`
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 1rem;
  align-items: center;

  div {
    line-height: 18px;
  }
`

export const AddressText = styled.p<{ fontWeight?: string | undefined }>`
  font-size: 1.6rem;
  font-weight: ${({ fontWeight }) => fontWeight ?? 'normal'};
  padding-bottom: 5px;
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
    borderBottom: '1px solid',
    borderImage:
      'linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%)',
    borderImageSlice: 1,
    paddingBottom: '1rem'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#373435',
    fontSize: '1.4rem',
    fontFamily: 'Montserrat',
    height: 40
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
    backgroundColor: ':focus{#f2f7ff}',
    padding: '10px'
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: 46
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
  })
}
