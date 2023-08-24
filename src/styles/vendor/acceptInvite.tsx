import styled from 'styled-components'
import Flex from '../../components/Flex'

export const InviteTitle = styled.span`
  font-size: 26px;
  font-weight: 500;
  margin-top: 30px;
  margin-right: 115px;
`

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: center;

  h4 {
    font-size: 1.6rem;
  }

  @media (max-width: 1280px) {
    padding: 10px;
    flex-direction: column;
  }

  .page-header {
    @media (max-width: 1280px) {
      ${InviteTitle} {
        margin-right: 15px;
      }
    }

    @media only screen and (max-width: 620px) {
      ${InviteTitle} {
        margin: 0px 15px auto;
      }

      .close-icon {
        margin-right: 15px;
      }
    }
  }
`

export const LogoContainer = styled.div`
  margin-left: 100px;
  img {
    width: 14.7rem;
    height: auto;
  }

  @media only screen and (max-width: 620px) {
    display: none;
  }
`

export const Box = styled.div`
  position: relative;
  padding: 8rem;
  height: auto;
  width: 57%;
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0 3px 6px #c9d7f0;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  input {
    font-weight: bold;
  }

  .box-logo-row {
    div {
      position: absolute;
      top: -10%;
    }
  }
  .box-legal-row {
    margin-bottom: 25px;
    div:first-child {
      width: 65%;
      input {
        width: 100%;
      }
    }
    div:nth-child(2) {
      width: 30%;
      input {
        width: 100%;
      }
    }

    @media (max-width: 620px) {
      flex-direction: column;
      margin-bottom: 0px;
      div {
        width: 100% !important;
      }
    }
  }

  .box-address-row {
    margin-bottom: 25px;
    div:first-child {
      width: 100%;
      input {
        width: 100%;
      }
    }

    @media (max-width: 620px) {
      flex-direction: column;
      margin-bottom: 0px;
    }
  }

  .box-tax-row {
    margin-bottom: 60px;
    > div {
      width: 30%;
      input {
        width: 100%;
      }
    }

    @media (max-width: 620px) {
      flex-direction: column;
      margin-bottom: 10px;
      > div {
        width: 100% !important;
      }
    }
  }

  .box-action-row {
    @media (max-width: 620px) {
      flex-direction: column-reverse;

      button {
        width: 100%;
        margin-top: 30px;
      }
    }
  }

  @media (max-width: 1440px) {
    width: 75%;
  }

  @media (max-width: 1024px) {
    width: 85%;
    padding: 8rem 4rem;
  }

  @media (max-width: 620px) {
    width: 95%;
    padding: 6rem 2rem;
    background: none;
    box-shadow: none;
    border: none;
  }
`

export const CreditLineWrapper = styled.div`
  position: relative;

  div:nth-child(2) {
    position: absolute;
    display: flex;
    right: 10px;
    top: 33%;
    font-size: 15px;

    strong:nth-child(1) {
      margin-right: 20px;
      margin-top: 3px;
    }
  }
`

export const SelectAutocompleteWrapper = styled(Flex)`
  position: relative;

  label {
    position: absolute;
    background: #ffffff;
    font-size: 14px;
    font-weight: 500;
    color: #1e1e1e;
    margin-top: 5px;
    margin-left: 5px;
    display: flex;
    flex-direction: row;
    z-index: 1;
  }

  div:first-child input {
    background: #ffffff;
    padding: 10px 15px;
    padding-right: 30px;
    height: 45px;
    font-size: 14px;
    color: #1e1e1e;
    box-shadow: 0 3px 6px #c9d7f0;
    border-radius: 10px;
    border: 0.5px solid #ebf0fa;
    box-shadow: 0 3px 6px #c9d7f0 !important;

    &:focus {
      border: 0.5px solid #ebf0fa;
      border-radius: 10px;
      box-shadow: 0 3px 6px #c9d7f0 !important;
    }
  }

  div:nth-child(3) {
    position: absolute;
    right: 10px;
    top: 25px;
  }
`
