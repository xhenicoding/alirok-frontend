import styled from 'styled-components'

export const TrackingInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;
  height: fit-content;
  align-self: center;
  padding: 30px;
  margin-left: 60px;

  @media screen and (max-width: 1024px) {
    margin: 0px;
    padding: 80px 0px;
  }

  @media screen and (max-width: 768px) {
    margin: 0px 30px;
    padding: 40px 0px;

    button {
      justify-self: center;
    }
  }
`

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`

export const TextContainer = styled.div<{ color?: string }>`
  font-size: 30px;
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
