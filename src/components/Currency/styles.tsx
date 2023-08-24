import styled from 'styled-components'

export const ModalContainer = styled.div`
  padding: 1rem 6rem;
  max-width: 84.8rem;
  height: 56.6rem;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    padding: 1rem;
    max-width: 100vw;
    height: 95vh;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-align-last: center;
  justify-content: flex-start;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    text-align-last: start;

    h2 {
      line-height: 3.1rem;
      margin-left: 2rem;
    }
  }
`

export const PrevButton = styled.span`
  cursor: pointer;
`
export const Title = styled.h2`
  font: normal normal bold 2.5rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  width: 60rem;
  align-self: center;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
    width: auto;
  }
`

export const Content = styled.form`
  margin: 0 auto;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  align-items: flex-start;
  max-height: 75%;
  width: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    overflow-y: scroll;
    height: 90vh;
    width: 90%;
    margin: 0 auto;
  }
`
export const CountryCode = styled.div`
  font-weight: 700;
  padding: 0 5px;
`

export const CountryName = styled.div`
  padding: 2px 0;
`

export const OptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex: 1 1 100%;

  @media only screen and (min-width: 480px) {
    flex: 1 1 100%;
  }

  @media only screen and (min-width: 768px) {
    flex: 1 1 48%;
  }
`
export const CurrencyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`
export const Input = styled.input`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  padding: 0.9rem 1.4rem;
  outline: none;
  border: none;
  width: 100%;
  height: 45px;
  border-radius: 10px;

  :disabled {
    background: #f2f7ff;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1.5rem 0 auto;
  position: absolute;
  top: 10px;
  right: 0;
`

export const SearchIcon = styled.img`
  width: 1.6em;
  height: auto;
`
