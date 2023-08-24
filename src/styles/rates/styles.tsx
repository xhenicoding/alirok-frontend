import styled from 'styled-components'
import colors from '../../theme/colors'

export const Container = styled.div`
  margin-top: 68px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: center;

  @media (max-width: 1280px) {
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr;
  }
  > div {
    @media only screen and (max-width: 620px) {
      align-items: flex-start;
    }
    > div {
      margin-right: 30px;
      @media only screen and (max-width: 620px) {
        margin-right: 20px;
      }
      h2 {
        @media only screen and (max-width: 620px) {
          font-size: 18px;
          line-height: 26px;
        }
      }
    }
  }
`

export const Options = styled.div`
  margin-top: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 620px) {
    flex-wrap: wrap;
  }
  & > div {
    place-content: center !important;
    width: 150px;
    height: 115px;
    margin: 0 30px;
    @media only screen and (max-width: 620px) {
      margin: 0 20px 15px 20px;
    }
  }
`

export const FloatImage = styled.div`
  width: 2rem !important;
  height: 2rem !important;
  background-image: url('https://static.alirok.io/collections/logos/favicon-transparent.png');
  background-repeat: no-repeat;
  background-size: contain;
  border: none !important;
`

export const Box = styled.div`
  padding: 2.2rem;
  height: 115px;
  width: 130px;
  border-radius: 30px;
  min-width: 13rem;
  cursor: pointer;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  display: flex;
  justify-content: center;
  flex-direction: column;

  p {
    font-weight: bold;
    margin-top: 15px;
  }

  &:hover {
    background: #e5eefe 0% 0% no-repeat padding-box;
  }
`
