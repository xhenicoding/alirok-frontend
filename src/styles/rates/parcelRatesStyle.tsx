import styled, { css } from 'styled-components'
import { colors } from '../../theme'
import Flex from '../../components/Flex'
import { Box } from '@alirok.com/rok-ui'

export const Container = styled.div<{
  hideLeft?: boolean
  hideRight?: boolean
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${({ hideLeft }) => (hideLeft ? '3' : '9')}% 1fr ${({
        hideRight
      }) => (hideRight ? '3' : '9')}%;
    grid-template-rows: 90vh;
    overflow-y: hidden;
  }
`

export const LeftAside = styled.nav`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.borderLight};
  box-shadow: 0px 1px 0px ${colors.shadow};
  text-align: left;
  padding-top: 10%;
  padding-left: 20px;
  padding-right: 10px;
  margin-top: 18px;
  position: relative;
`

export const RightAside = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  border-bottom: 1px solid ${colors.borderLight};
  box-shadow: 0px 1px 0px ${colors.shadow};
  font-size: 14px;
  text-align: right;
  color: ${colors.icon};
  padding-top: 10%;
  margin-top: 18px;
  position: relative;
`

export const ParcelLogo = styled.img<{ display?: string }>`
  display: ${({ display }) => display || 'block'};
  width: 100px;
`

export const IntroductionVideoWrapper = styled.div<{ display?: string }>`
  height: 100vh;
  display: ${({ display }) => display || 'flex'};
  flex-direction: column;
  gap: 40px;
  margin-top: 50px;
  overflow-x: scroll;
`

export const IntroductionVideo = styled.div`
  display: flex;
  font-weight: 500;
  flex-direction: column;
  font-size: 14px;
  gap: 7px;
  color: ${({ theme }) => theme.colors.black};

  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`

export const IntroductionIcon = styled.img`
  width: 20px;
`

export const Main = styled.main`
  flex: 1;
  border-bottom: 1px solid ${colors.borderLight};
  box-shadow: 0px 1px 0px ${colors.shadow};
  border-left: 1px solid ${colors.borderLight};
  border-right: 1px solid ${colors.borderLight};
  overflow-y: scroll;
  padding-top: 30px;
  @media (max-width: 768px) {
    padding-top: 12px;
  }
  .container-btn {
    float: right;
    display: flex;
    margin-left: 22vw;
  }
  .dashed-btn {
    margin-right: 20px;
    display: flex;
    width: 30px;
    height: 30px;
    border: 1px dashed ${colors.borderDark};
    padding: 4px;
    border-radius: 100px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .dashed-btn:hover {
    border: 1px dashed ${colors.primary};
    cursor: pointer;
  }

  .dashed-btn:hover {
    border: 1px solid ${colors.primary};
  }

  .rounded-icon {
    background-color: ${colors.secondary} !important;
    width: 20px !important;
    height: 20px !important;
  }

  .dashed-btn:hover .rounded-icon {
    background-color: ${colors.primary} !important;
  }

  .rounded-icon:hover {
    background-color: ${colors.primary} !important;
  }

  input:checked ~ .dashed-btn {
    border: 1px solid ${colors.primary};
  }

  .dashed-btn::after {
    border: 1px dashed ${colors.borderDark};
  }

  .check-act:checked + .dashed-btn .rounded-icon {
    background-color: ${colors.primary} !important;
  }

  .main-options {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: ${colors.borderDark};
    text-align: left;
    margin-top: 38px;
  }

  .selects-div {
    display: flex;
  }

  .round-checkbox {
    display: flex;
    position: relative;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    margin-left: -6px;
    margin-right: 6px;
    color: ${colors.secondary};
  }

  .round-checkbox:hover {
    background: ${colors.primaryLight};
  }

  .round-checkbox label {
    cursor: pointer;
    height: 28px;
    width: 28px;
    font-size: 14px;
  }

  .round-checkbox input[type='checkbox'] {
    display: none;
  }

  .round-checkbox input[type='checkbox']:checked + label {
    color: ${colors.fontDark};
  }

  table {
    width: 100%;
    border-spacing: 0px;
    min-width: 100%;
  }

  th {
    padding: 15px 20px 20px 0px;
    font-size: 14px;
    text-align: left;
    color: ${colors.icon};
    font-weight: normal;
    min-width: 90px;
  }

  td {
    font-size: 14px;
    color: ${colors.fontDark};
    text-align: left;
    padding-right: 10px;
    height: 50px;
    min-width: 90px;
  }

  td img {
    max-width: 100px;
    max-height: 35px;
  }
`
export const ScrollableContent = styled.div`
  height: calc(100vh - 162px);
  overflow-y: auto;
  overflow-x: hidden;
  margin: 10px 0;
  padding: 0 40px;
  @media only screen and (max-width: 992px) {
    padding: 0 15px;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 5px;
  }
`
export const CargoinfoWrapper = styled(Flex)`
  > div {
    padding: 35px 15px 30px 65px;
    @media only screen and (max-width: 650px) {
      flex-wrap: wrap;
    }
    > div {
      @media only screen and (max-width: 650px) {
        width: 100%;
        margin: 5px 0;
      }
      button {
        > div {
          > div:nth-child(2) {
            padding-left: 0;
          }
        }
      }
    }
    div:nth-child(3) {
      @media only screen and (max-width: 650px) {
        width: 18%;
      }
    }
  }
`

export const MainNav = styled.div`
  display: flex;
  padding: 0 50px;
  align-items: center;
  margin-bottom: 16px;
  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
  > div:first-child {
    margin-right: 90px;
    align-items: center;
    @media only screen and (max-width: 575px) {
      margin-right: 25px;
    }
    > div {
      button {
        div {
          padding: 0;
        }
      }
    }
  }
`

export const MainNavDivider = styled.div`
  border-left: 0.5px solid ${({ theme }) => theme.colors.gray};
  height: 25px;
  margin: 6px 50px 0 50px;
  @media only screen and (max-width: 575px) {
    margin: 6px 20px 0 20px;
  }
`

export const DatePickerWrapper = styled.div`
  display: inline-block;
  text-align: left;
  font-weight: 500;
  border-radius: 30px;
  p {
    color: ${colors.black};
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
  }
`

export const ModalOptions = styled.div`
  width: max-content;
  margin-left: auto;
`

export const LabelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 30px;
  min-height: 300px;
  height: max-content;

  button {
    width: max-content;
    padding: 8px 12px;
    align-self: flex-end;
    margin-top: auto;
  }
`

export const CarrierLogos = styled(Flex)`
  flex-direction: row;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    > div {
      cursor: pointer;
      padding: 1px;
      > span {
        box-shadow: 0px 3px 6px ${({ theme }) => theme.borders.strong};
        background: ${({ theme }) => theme.colors.white};
      }
    }
  }
`

export const AvatarWrapper = styled.div`
  > div {
    > div {
      > span {
        background: white;
        border: 0;
      }
    }
  }

  &.selected {
    border: 1px solid transparent;
    border-radius: 30px;
    background-image: linear-gradient(#1880d9, #e60791),
      linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`

export const ModalIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px dashed ${({ theme }) => theme.colors.black};
  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.primary};

    > div,
    > img {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  img.shipping-label {
    width: 16px;
    height: auto;
    margin-top: 9px;
    margin-left: 11px;
  }
`
export const ModalIcon = styled.div<{
  icon: string
  height?: string
  marginTop?: string
}>`
  width: auto;
  height: ${({ height }) => height || '25px'};
  margin-top: ${({ marginTop }) => marginTop || '7px'};

  background: ${({ theme }) => theme.colors.black};

  mask: url(https://static.alirok.io/collections/icons/${({ icon }) =>
      icon}.svg)
    no-repeat center / contain;
  padding: 5px;
`

export const MiddleSection = styled(Flex)`
  margin-top: 50px;
  margin-left: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  @media (max-width: 1800px) {
    width: 60%;
  }
`
export const ControlWrapper = styled(Flex)`
  margin-top: 20px;
  margin-left: 30px;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1024px) {
    margin-left: 10px;
  }
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
  > div {
    @media (min-width: 1190px) {
      margin-right: 15px;
    }
    @media (max-width: 767px) {
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
`
export const CurrencyWrapper = styled.div`
  display: flex;
  margin-top: 4px;
  cursor: pointer;
  label {
    font-weight: bold;
    margin-top: 10px;
    font-size: 14px;
    margin-left: 10px;
    margin-right: 10px;
  }
`
export const RatetableWrapper = styled.div`
  >div{
    padding:10px 10px 30px 20px;
    table{
      thead{
        tr{
          th{
            padding-bottom: 10px;
            div#weight-dropdown{
              button{
                span{
                  min-width: 15px;
                  min-height: 15px;
                  width: 20px;
                  height: 20px;
                }
              }
              >div{
                margin-top: 12px;
                >div{
                  >div{
                    height: 80px;
                    padding: 16px 30px;
                    border-radius: 0 30px 30px 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const CurrencyConvertedLabel = styled.span`
  font-weight: bold;
  margin-top: 4px;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
`

export const TableWrapper = styled.div`
  height: 300px;
  margin-bottom: 30px;
  overflow: scroll;

  #table-scroll {
    overflow: visible;
  }

  table {
    thead > tr {
      th {
        color: black;
      }
      th:first-child,
      th:nth-child(2) {
        padding: 0px;
        min-width: 10px;
      }
    }

    tbody tr {
      th:first-child,
      td:nth-child(2) {
        padding: 0px;
        min-width: 10px;
      }
    }
  }
`

export const LinkSection = styled(Flex)`
  flex-direction: row;
  align-items: center;
  width: 60%;
  gap: 20px;

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px 15px;

    :hover {
      border-radius: 50px;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`

export const ColumnHeader = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '50px')};

  &.weight-break-col {
    display: flex;

    .btn-remove {
      visibility: hidden;
    }

    &:hover {
      .btn-remove {
        visibility: visible;
      }
    }
  }
`

export const InputWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: row;
  place-items: center;

  > div legend {
    font-size: 14px;
  }

  input {
    font-weight: 700;
    margin-left: 5px;
    width: ${({ width }) => width || ''};
    font-size: 14px;
    height: 25px;
    background: none;
    border: none;
    &::-webkit-inner-spin-button {
      -moz-appearance: textfield;
      -webkit-appearance: none;
      margin: 0;
    }

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.foreground};
    }

    &:focus {
      outline: none;
    }
  }
`

export const TransitInput = styled.div`
  display: flex;
  flex-direction: row;
  place-items: center;
  width: 100px;
  input {
    font-weight: 700;
    margin-left: 5px;
    width: 20px;

    text-align: center;
    font-size: 14px;
    height: 25px;
    background: none;
    border: none;
    &::-webkit-inner-spin-button {
      -moz-appearance: textfield;
      -webkit-appearance: none;
      margin: 0;
    }

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.foreground};
    }
    &:focus {
      outline: none;
    }
  }
`

export const StyledFooter = styled.footer`
  grid-area: footer;
  display: flex;
  padding: 15px 32px;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${colors.borderLight};

  .danger {
    color: ${colors.danger};
  }
  .blue {
    color: ${colors.primaryDark};
  }
  input {
    padding-top: 2px;
    padding-left: 16px;
    color: ${colors.black50} !important;
    ::placeholder {
      font-weight: 500;
      color: ${colors.black50};
      opacity: 1;
    }
  }
`

export const FooterButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 1060px;
  margin: 0 auto;
  @media only screen and (max-width: 1060px) {
    min-width: 100%;
  }
  @media only screen and (max-width: 575px) {
    flex-wrap: wrap;
  }
  div {
    display: flex;
    align-items: center;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  button {
    @media only screen and (max-width: 767px) {
      margin: 0 5px;
      padding: 8px 12px;
    }
    @media only screen and (max-width: 575px) {
      margin: 5px 5px;
      width: 140px;
    }
  }
`

export const ParcelRateHistoryWrapper = styled.div<{ display: string }>`
  height: 100vh;
  display: ${({ display }) => display || 'flex'};
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
  overflow-x: scroll;
`

export const ParcelRateHistory = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 7px;
  color: ${({ theme }) => theme.colors.black};
`

export const ParcelRateHistoryCreatedAt = styled.div`
  font-weight: bold;
`

export const ProfitType = styled.span`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.foregroundLight};
  padding: 3px 8px;
  border-radius: 25px;
  font-weight: 500;
  user-select: none;
`

export const AlertWrapper = styled.div`
  h4 {
    font-size: 2rem;
  }
`

export const Link = styled.span`
  user-select: none;
  color: rgb(87, 142, 247);
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 15px;

  &:hover {
    border-radius: 50px;
    color: #578ef7;
    background: #ebf0fa;
  }
`

export const FetchDropOffLocationsLink = styled.span`
  cursor: pointer;
  .fetching-data {
    animation: rotate 1.5s linear infinite;
  }
`

export const CloseIcon = styled.div`
  align-self: end;
`

export const HideLeft = styled.img<{ hideLeft: boolean }>`
  padding: 8px 13px;
  position: absolute;
  top: 10vh;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: white;
  right: -20px;
  cursor: pointer;
  transform: rotate(180deg);
  box-shadow: 3px 0px 6px #396cce42;

  ${({ hideLeft }) =>
    hideLeft &&
    css`
      box-shadow: 0px 3px 6px #396cce42;
      transform: rotate(0deg);
    `}
`

export const PreviousParcelRate = styled.img`
  width: 50px;
  padding: 5px;
  position: absolute;
  top: 40vh;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: white;
  box-shadow: 0px 3px 6px #396cce42;
  right: -26px;
  cursor: pointer;
`

export const HideRight = styled.img<{ hideRight: boolean }>`
  padding: 8px 13px;
  position: absolute;
  top: 10vh;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: white;
  box-shadow: 0px 3px 6px #396cce42;
  left: -20px;
  cursor: pointer;

  ${({ hideRight }) =>
    hideRight &&
    css`
      transform: rotate(180deg);
      box-shadow: 3px 0px 6px #396cce42;
    `}
`

export const NextParcelRate = styled.img`
  width: 50px;
  padding: 5px;
  position: absolute;
  top: 40vh;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  background: white;
  box-shadow: 0px 3px 6px #396cce42;
  left: -26px;
  cursor: pointer;
`

export const HelpIcon = styled.div`
  width: 25px;
  height: 25px;
  padding: 2px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-weight: bold !important;
  cursor: default;
  user-select: none;
`

export const CompoundInput = styled.div`
  display: flex;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 10px;
  opacity: 1;

  &.currency-icon {
    > div:first-child > label > span {
      width: 120px;
    }
  }
`

export const CompoundInputHelper = styled.label`
  color: ${({ theme }) => theme.colors.black} !important;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.borders.strong};
  box-shadow: rgb(57 108 206 / 26%) 0px 3px 6px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 10px;
  padding: 13px 17px;
  font-size: 14px;
  margin-left: 10px;
  font-weight: bold;
`

export const CompoundInputCurrencyHelper = styled.div`
  padding: 0 10px;
  padding-top: 6px;
  font-size: 14px;

  div:first-child {
    float: right;
  }
`

export const DDPWrapper = styled.label`
  display: flex;
  margin-right: 10px;
`

export const EmptySelect = styled.div`
  padding: 0px;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`
