import { useContext, useState, useEffect } from 'react'

import { Context } from '../../context'

import { DatePicker } from '../DatePicker'

import * as S from './styles'

interface IProps {
  onFinish: () => void
}

export const ShipDate = ({ onFinish }: IProps) => {
  const { state, dispatch } = useContext(Context)
  const [shipDate, setShipDate] = useState<Date>()

  useEffect(() => {
    if (shipDate) onFinish()
  }, [shipDate, onFinish])

  return (
    <S.Container>
      <S.DateContainer>
        <DatePicker
          value={
            state.quote.data.shipDate.data?.date
              ? new Date(state.quote.data.shipDate.data.date)
              : null
          }
          onChange={(date) => {
            dispatch({
              type: 'SET_SHIP_DATE_DATA',
              value: {
                ...state.quote.data.shipDate.data,
                date
              }
            })

            setShipDate(date)
          }}
        />
      </S.DateContainer>
    </S.Container>
  )
}
