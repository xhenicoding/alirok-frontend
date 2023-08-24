import styled from 'styled-components'

export const ImagePersons = styled.img`
  width: 135px;
  align-self: center;
  margin-bottom: 40px;
`

export const MainCardContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 40px;
  width: 360px;

  @media (max-width: 425px) {
    width: 100%;
    padding-top: 10%;

    > div {
      box-shadow: none;
      border: none;
      background: transparent;
      margin: 0px;
      padding: 0px;
      width: 100%;
    }
  }
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
  margin-bottom: 120px;

  @media (max-width: 425px) {
    width: 100%;
  }
`

export const Container = styled.div`
  margin: 0 auto;

  @media (max-width: 768px) {
    margin: 0 50px;
  }

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

export const Textarea = styled.textarea`
  max-width: 0;
  min-width: 100%;
  min-height: 89px;
  max-height: 200px;

  font: normal normal normal 14px/25px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;

  padding: 15px 30px;

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #1e1e1e;
  border-radius: 30px;
  opacity: 1;

  outline: none;
`

export const TextContainer = styled.div<{ color?: string }>`
  font: normal normal 600 Montserrat;
  font-size: 25px;

  &.md {
    font-size: 18px;
  }

  color: ${({ color }) => color ?? '#1E1E1E'};
  font-weight: bold;

  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 24px;
    line-height: 40px;
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
    line-height: 24px;
  }
`

export const UserPhotoContainer = styled.div`
  position: relative;

  & > div {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -2px;
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

export const BackgroundGradient = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 102px;
  height: 102px;

  border-radius: 50%;
  z-index: 19;

  background: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
`

export const UserPhoto = styled.div`
  position: absolute;

  width: 95px;
  height: 95px;

  top: 50%;
  left: 50%;

  background-color: white;

  border-radius: 50%;

  padding: 2px;

  transform: translate(-50%, -50%);

  z-index: 20;
`
