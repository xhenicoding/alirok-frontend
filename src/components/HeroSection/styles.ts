import styled, { css } from 'styled-components'
import { SearchBar } from '../SearchBar'
import { LandBar } from '../LandBar'
import { AirBar } from '../AirBar'
import { TrackingBar } from '../TrackingBar'

export const Hero = styled.section<{ withoutSearchBar?: boolean }>`
  max-width: 120rem;
  width: 100%;
  margin: 0 auto -15rem auto;
  padding: 2rem 4.2rem 0 4.2rem;
  min-height: 58rem;

  background-image: url('https://static.alirok.io/collections/illustrations/Worldmap.svg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-origin: content-box;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  ${({ withoutSearchBar }) =>
    withoutSearchBar &&
    css`
      min-height: 85vh;
      background-position: top center;

      @media only screen and (max-width: 768px) {
        display: block;
      }
    `}
`

export const Title = styled.h1`
  font: normal normal bold 4rem/7rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin-bottom: 5rem;

  @media only screen and (max-width: 768px) {
    font: normal normal bold 20px/25px 'Montserrat', sans-serif;
  }
`

export const SearchBarWrapper = styled(SearchBar)`
  max-width: 95rem;
  margin: 0 auto;
  transition: all 0.4s ease;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const LandBarWrapper = styled(LandBar)`
  max-width: 95rem;
  margin: 0 auto;
  transition: all 0.4s ease;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const AirBarWrapper = styled(AirBar)`
  max-width: 95rem;
  margin: 0 auto;
  transition: all 0.4s ease;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const TrackBarWrapper = styled(TrackingBar)`
  margin: 0 auto;
  max-width: 95rem;
  transition: all 0.4s ease;
  z-index: 100;
`
