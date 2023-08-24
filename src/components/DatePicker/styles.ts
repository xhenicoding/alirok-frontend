import styled from 'styled-components'

export const PrevLabel = styled.img`
  width: 1.2rem;
  height: auto;
  transform: rotate(90deg);
  cursor: pointer;
`

export const NextLabel = styled.img`
  width: 1.2rem;
  height: auto;
  transform: rotate(-90deg);
  cursor: pointer;
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;

  .react-calendar__month-view__days__day {
    font: normal normal normal 14px/15px 'Montserrat', sans-serif;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.texts.default};
    opacity: 1;
    box-shadow: none;
    border: none;
    background: transparent;
    cursor: pointer;
    height: 4rem;
  }

  .react-calendar__tile--now {
    text-decoration: underline;
    color: ${({ theme }) => theme.texts.default};
  }

  .react-calendar__month-view__weekdays__weekday {
    font: normal normal bold 12px 'Montserrat', sans-serif;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.texts.default};
    opacity: 1;
    margin-top: 1rem;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile--active {
    border-radius: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.white} !important;
    text-decoration: none;
    display: flex;
    justify-content: center;

    abbr {
      display: flex;
      background-color: #578ef7;
      min-height: 4rem;
      border-radius: 50%;
      min-width: 4rem;
      justify-content: center;
      align-items: center;
    }
  }

  .react-calendar__tile:disabled {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.texts.default} !important;

    abbr {
      color: ${({ theme }) => theme.texts.default} !important;
    }
  }

  .react-calendar__tile:enabled {
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 1.6rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    abbr[title] {
      border-bottom: none !important;
      text-decoration: none !important;
    }
  }

  .react-calendar__navigation__arrow {
    box-shadow: none;
    border: none;
    background: transparent;
    color: #373435;
    font-size: 2rem;
    outline: none;

    &:disabled {
      opacity: 0.4;
    }
  }

  .react-calendar__navigation__prev-button {
    margin-left: 1rem;
  }

  .react-calendar__navigation__next-button {
    margin-right: 1rem;
  }

  .react-calendar__navigation {
    margin-bottom: 2rem;
    display: flex;
  }

  .react-calendar__navigation__label {
    box-shadow: none;
    border: none;
    background: transparent;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.texts.default};
  }

  .styles__NextLabel-sc-gko5pp-1 {
    width: 2rem;
    height: 2rem;
  }

  .fpdYbK {
    width: 2rem;
    height: 2rem;
  }

  .gKUIZM {
    width: 2rem;
    height: 2rem;
  }

  .react-calendar__navigation__label__labelText {
    font: normal normal bold 1.6rem 'Montserrat';
    letter-spacing: 0px;
    color: #373435;
    opacity: 1;
  }

  .react-calendar__month-view__weekNumbers {
    font-weight: bold !important;
  }

  @media only screen and (max-width: 1024px) {
    .react-calendar__navigation__prev-button {
      margin-left: 3rem;
    }

    .react-calendar__navigation__next-button {
      margin-right: 3rem;
    }
  }
`
