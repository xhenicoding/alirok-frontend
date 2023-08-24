import { Button, Icon, Dropdown } from '@alirok.com/rok-ui'
import Calendar, { CalendarProps, OnChangeDateCallback } from 'react-calendar'

import * as S from './styles'

interface IProps extends CalendarProps {
  label: string
  value: Date | null
  minDate?: Date
  onChangeDateValue?: OnChangeDateCallback
}

function TriggerButton({ label, value }: IProps) {
  return (
    <S.TriggerButtonWithValue>
      <S.Title>{label}</S.Title>
      <S.Value>{value?.toDateString()}</S.Value>
    </S.TriggerButtonWithValue>
  )
}

export function DropdownDatePicker({
  label,
  value,
  onChangeDateValue,
  minDate,
  ...otherProps
}: IProps) {
  function renderTriggerComponent(value: Date | null) {
    if (value === null)
      return (
        <Button
          dashed
          circle
          borderColor="primary"
          icon
          variant="bordered"
          size="large"
        >
          <Icon name="calendar" width="24px" height="20px" />
        </Button>
      )
    return <TriggerButton label={label} value={value} />
  }

  return (
    <S.StyledDatePicker>
      <Dropdown trigger={renderTriggerComponent(value)}>
        <Calendar
          onChange={onChangeDateValue}
          value={value}
          minDate={minDate || new Date()}
          calendarType="US"
          next2Label={null}
          prev2Label={null}
          locale="en-EN"
          navigationLabel={({ label }) => label}
          showNeighboringMonth={false}
          minDetail="year"
          {...otherProps}
        />
      </Dropdown>
    </S.StyledDatePicker>
  )
}
