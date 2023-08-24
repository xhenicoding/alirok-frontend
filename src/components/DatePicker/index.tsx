import Calendar, { OnChangeDateCallback } from 'react-calendar'

import * as S from './styles'

interface IProps {
  onChange: OnChangeDateCallback
  value: Date | null
}

export function DatePicker({ onChange, value }: IProps) {
  return (
    <S.Wrapper>
      <Calendar
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        prevLabel={
          <S.PrevLabel src="https://static.alirok.io/collections/icons/arrow-down.svg" />
        }
        nextLabel={
          <S.NextLabel src="https://static.alirok.io/collections/icons/arrow-down.svg" />
        }
        minDetail="month"
        maxDetail="month"
        onChange={onChange}
        value={value}
        calendarType="US"
      />
    </S.Wrapper>
  )
}
