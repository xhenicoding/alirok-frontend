import {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  useCallback
} from 'react'
import * as S from './styles'

import { Context } from 'context'
import { Avatar, Button, Icon, InputRadio } from '@alirok.com/rok-ui'

import { rokApiCurrencyConverter } from '../../services/rokAPICurrencyConverter'
interface IProps {
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Currency = ({ showModal }: IProps) => {
  const { state, dispatch } = useContext(Context)
  const [currencyList, setCurrencyList] = useState(
    state.currencyConverter.currencyList
  )

  const filterCurrency = (
    currency: string,
    currenciesList: Record<string, string>
  ) => {
    if ('' === currency) return currenciesList
    return Object.keys(currenciesList)
      .filter((key) => key.includes(currency.toUpperCase()))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: currenciesList[key] })
      }, {})
  }

  const filterCurrencyList = useCallback(({ target }) => {
    const searchQuery = target.value.toLowerCase()
    const updatedList = filterCurrency(
      searchQuery,
      state.currencyConverter.currencyList
    )
    setCurrencyList(updatedList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCurrency = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedCurrency = event.target.value as string
    await rokApiCurrencyConverter
      .get(
        `/fetch-one?api_key=${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}&from=USD&to=${selectedCurrency}`
      )
      .then((resp) => {
        const { data } = resp
        dispatch({
          type: 'SET_CONVERT_CURRENCY',
          value: data.result
        })
        showModal(false)
      })
      .catch(() => {
        showModal(false)
      })
  }

  function fetchCurrencies() {
    rokApiCurrencyConverter
      .get(
        `/currencies?api_key=${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}`
      )
      .then((resp) => {
        const { data } = resp
        dispatch({
          type: 'SET_SHOW_ALL_CURRENCY',
          value: data.currencies
        })
        setCurrencyList(state.currencyConverter.currencyList)
      })
      .catch(() => {
        showModal(false)
        dispatch({
          type: 'SET_SHOW_ALL_CURRENCY',
          value: { USA: 'United States Dollar' }
        })
      })
  }

  useEffect(() => {
    fetchCurrencies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.ModalContainer>
      <S.Header>
        <S.PrevButton
          onClick={() => {
            showModal(false)
          }}
        >
          <Icon name="chevron-left" color="black" />
        </S.PrevButton>
        <S.Title>Select your currency</S.Title>
      </S.Header>
      <S.SearchWrapper>
        <S.Input
          type="text"
          placeholder="Search your currency"
          onChange={filterCurrencyList}
        />
        <S.ButtonWrapper>
          <Button circle>
            <S.SearchIcon src="https://static.alirok.io/collections/icons/searchs.svg" />
          </Button>
        </S.ButtonWrapper>
      </S.SearchWrapper>
      <S.Content>
        {Object.keys(currencyList).map((currency, key) => (
          <S.OptWrapper key={key}>
            <InputRadio
              key={currency}
              name="currency"
              value={currency}
              onChange={(e) => handleCurrency(e)}
              label={
                <>
                  <S.CurrencyWrapper>
                    <Avatar
                      shape="circle"
                      size={25}
                      elevation="card"
                      src={`https://static.alirok.io/collections/icons/flags/${currency
                        .slice(0, 2)
                        .toLowerCase()}.svg`}
                    />
                    <S.CountryCode>{currency}</S.CountryCode>
                  </S.CurrencyWrapper>
                  <S.CountryName>
                    {state.currencyConverter.currencyList[currency]}
                  </S.CountryName>
                </>
              }
            />
          </S.OptWrapper>
        ))}
      </S.Content>
    </S.ModalContainer>
  )
}

export default Currency
