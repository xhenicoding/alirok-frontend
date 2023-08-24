import styled from 'styled-components'

export const Break = styled.div`
  margin-top: 30px;
`

export const NotFoundContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  padding: 20px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    gap: 20px;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    justify-items: center;
  }
`
export const NotFoundText = styled.div<{
  fontSize: string
  fontWeight: string
  mobileFontSize: string
}>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};

  @media screen and (max-width: 768px) {
    font-size: ${({ mobileFontSize }) => mobileFontSize};
  }
`

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  align-self: center;
  max-width: 450px;

  @media screen and (max-width: 1024px) {
    margin-top: 0px;
    align-items: center;
    text-align: center;
    align-self: center;
    width: 100%;
    grid-row: 2;
  }
`

export const ImgContainer = styled.div`
  align-self: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    margin: 0;
    width: 80%;
    grid-row: 1;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  position: relative;

  .react-modal-sheet-content {
    border-top-right-radius: 50px !important;
    border-top-left-radius: 50px !important;
    box-shadow: 0px 0px 6px #396cce42;
    border: 1px solid #396cce42 !important;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
    padding: 0;
    overflow: hidden;
  }
`

export const Img = styled.img`
  width: 400px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
