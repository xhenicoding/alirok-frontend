import { Button, Icon } from '@alirok.com/rok-ui'
import styled from 'styled-components'

export const DemoSection = styled.section`
  max-width: 120rem;
  width: 100%;
  margin: 15rem auto 0 auto;
  padding: 2rem 2rem 0 2rem;
  display: grid;
  gap: 60px;

  @media only screen and (max-width: 768px) {
    padding: 2rem 2.5rem 0 2.5rem;
    margin-top: 0rem;
    margin-bottom: 7rem;

    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }
`

export const Title = styled.h1`
  letter-spacing: 0px;
  text-align: center;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    text-align: center;
    margin-bottom: -3rem;
    line-height: 4.5rem;

    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    height: 26rem;

    background-image: url('https://static.alirok.io/collections/illustrations/Worldmap.svg');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
  }
`

export const Section = styled.section<{ variant?: 'invert' | 'normal' }>`
  @media only screen and (max-width: 768px) {
    flex-direction: ${({ variant }) =>
      variant === 'invert' ? 'column-reverse' : 'column'};
    justify-content: unset;
    align-items: center;
    margin-top: 7rem;
  }
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  height: fit-content;

  @media only screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
  }
`

export const ModalWrapper = styled.div`
  height: 100%;

  > div {
    display: grid;
  }

  > div > div {
    padding: 0px;
    overflow: hidden;
    background: transparent;
    width: 80%;
    display: grid;
    margin: auto;
    align-content: center;

    @media only screen and (max-width: 1024px) {
      width: 95%;
      height: 100%;
      margin-top: 0px;
    }
  }
`

export const CloseBtn = styled.div`
  width: fit-content;
  height: fit-content;
  top: 3rem;
  right: 4.5rem;
  position: absolute;
  background: #fff;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  z-index: 100000;

  @media only screen and (max-width: 1024px) {
    right: 2rem;
    top: 2rem;
  }
`

export const DemoCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  border-radius: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 55%;
  height: 700px;
  padding: 40px;
  position: relative;
  gap: 40px;
  justify-items: center;

  @media only screen and (max-width: 1024px) {
    padding: 20px;
    grid-template-columns: 1fr;
    height: fit-content;
    box-shadow: none;
    border: none;
    background: transparent;
    border-radius: none;
  }

  @media only screen and (max-width: 768px) {
    padding: 0px;
  }
`

export const Image = styled.img`
  width: 100%;
  align-self: center;

  @media only screen and (max-width: 1024px) {
    max-width: 400px;
    width: 90%;
    place-self: center;
  }
  @media only screen and (max-width: 768px) {
    max-width: 300px;
  }
`

export const RightSide = styled.div`
  display: grid;
  height: 100%;
  position: relative;
  grid-template-rows: auto 1fr;
  gap: 50px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    gap: 30px;
  }
`

export const Content = styled.div`
  display: grid;
  gap: 60px;
  height: fit-content;
  align-self: center;
  position: relative;
  width: 100%;
  justify-self: center;

  @media only screen and (max-width: 1024px) {
    gap: 50px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 550px;
    gap: 30px;
  }
`

export const SubTitle = styled.div`
  font-size: 35px;
  font-weight: bold;

  @media only screen and (max-width: 1024px) {
    font-size: 24px;
  }
`

export const Text = styled.div`
  font-size: 25px;
  line-height: 35px;

  @media only screen and (max-width: 1024px) {
    line-height: 30px;
    font-size: 18px;
  }
`

export const MenuUp = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 30px;
  position: absolute;
  width: fit-content;
  //right: 0px;

  @media only screen and (max-width: 1024px) {
    position: relative;
    width: 100%;
    right: auto;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
    place-content: center;
  }
`

export const MenuWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  display: grid;
  height: 30px;
`

export const SpaceAlign = styled.div`
  height: 50px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const ButtonsBottom = styled.div<{ hasButton: boolean }>`
  position: absolute;
  bottom: 0px;
  display: grid;
  gap: 80px;
  grid-template-columns: 50px 50px;
  justify-content: right;
  right: 30px;

  @media only screen and (max-width: 768px) {
    position: relative;
    grid-template-columns: ${({ hasButton }) =>
      hasButton ? '40px auto 40px' : '40px 40px'};
    gap: 30px;
    place-content: center;
    right: 0;

    button {
      height: 40px;
    }
  }
`

export const ButtonStyled = styled(Button)`
  height: 50px;
  z-index: 0;

  @media only screen and (max-width: 768px) {
    width: 180px;
  }
`

export const MenuText = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  width: fit-content;
  position: relative;
  white-space: nowrap;
`

export const ActiveGradient = styled.div`
  height: 5px;
  width: 25px;
  position: absolute;
  background: linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%);
  border-radius: 3px;
  left: 40%;
  margin-top: 5px;
`

export const Arrow = styled(Icon)<{ rotate?: string }>`
  transform: ${({ rotate }) =>
    rotate ? `rotate(${rotate})` : 'rotate(90deg)'};
  padding: 0.2rem;
`

export const ButtonWrapper = styled.div<{ right?: boolean }>`
  background: ${({ right }) =>
    right
      ? ` linear-gradient(90deg, #1880d9 10%, #e60791 62%, #f55353 100%)`
      : '#ffffff'};
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  display: flex;
  place-content: center;
  cursor: pointer;
  align-items: center;

  @media only screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`
