import styled from 'styled-components'

export const FirstLetterName = styled.h1`
  color: #ef3271;
`

export const UserPhotoContainer = styled.div`
  position: relative;

  & > div {
    background: white;

    & > span {
      border: none;
      box-shadow: none;
    }
  }

  & > div {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -4px;
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        #1880d9 10%,
        #e60791 62%,
        #f55353 100%
      );
    }
  }
`

export const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 15px;

  flex-grow: 2;

  z-index: 1;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 10px;

  & button {
    width: 45%;
  }
`

export const UserPhoto = styled.div``

export const RatingMessage = styled.p`
  text-align: center;
  font: normal normal 600 20px/25px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  height: 100px;
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`

export const Username = styled.span`
  text-align: left;
  font: italic normal normal 16px/25px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
`
