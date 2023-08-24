import styled from 'styled-components'

export const TriggerButtonWithValue = styled.div``

export const Title = styled.span`
  line-height: 18px;
  display: block;
`
export const Value = styled.span`
  font-weight: bold;
  line-height: 18px;
`
export const StyledDatePicker = styled.div`
  .react-calendar {
    width: 350px;
    line-height: 1.125em;
    border-radius: 50px;
    border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
    padding: 33px 43px;
    box-shadow: 0px 3px 6px ${({ theme }) => theme.colors.shadow};
    font-family: 'Montserrat', Helvetica, sans-serif;
    background: ${({ theme }) => theme.colors.white};
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
    display: flex;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button[disabled] {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray};
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    abbr[title] {
      border-bottom: none !important;
      text-decoration: none !important;
    }
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.texts.default};
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
    font-family: 'Montserrat', Helvetica, sans-serif;
  }
  .react-calendar__tile:disabled {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.texts.default};
  }
  .react-calendar__tile:enabled {
    font-weight: bold;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border-radius: 100%;
  }
  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.white};
  }
  .react-calendar__tile--hasActive {
    color: ${({ theme }) => theme.colors.primary};
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 100%;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => theme.colors.primary};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
  .react-date-picker__wrapper {
    border: none;
  }
`
