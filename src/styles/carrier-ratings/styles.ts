import styled from 'styled-components'

export const ContainerWrapper = styled.div``
export const ContainerRatings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  gap: 0 25px;

  & > div {
    width: 30%;
    max-width: 30%;
    min-width: 305px;
  }
`

export const DialogContent = styled.div`
  overflow: auto;
  max-height: 390px;
`

export const DialogMessage = styled.p`
  text-align: center;
  font: normal normal 600 20px/25px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  min-height: 50px;
  text-align: justify;
  line-height: 1.5;
`

export const Rating = styled.div`
  & > .default {
    margin-top: 50px;
  }
`

export const ScreenTitle = styled.h1`
  text-align: left;
  font: normal normal bold 40px/50px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  height: fit-content;
  text-align: center;
  margin-bottom: 50px;
`

export const Input = styled.input`
  color: #1e1e1e;

  ::placeholder {
    color: #1e1e1e;
  }
`

export const ContainerInput = styled.div`
  height: 5rem;
  width: 420px;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  border-radius: 50px;
  background-color: #ffffff;
  display: flex;

  input {
    border: none;
    padding-left: 1.5rem;
    background: none;
    width: 100%;
    font-weight: bold;
    font-size: 1.4rem;

    &:focus {
      outline-width: 0;
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 340px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-right: 20px;
    max-width: 420px;
    justify-self: center;
  }
`

export const ButtonInput = styled.div`
  max-width: 22rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal 600 1.6rem Montserrat;
  color: #1e1e1e;
  border-radius: 5rem;
  padding: 15px;

  p {
    width: 100%;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const Main = styled.div`
  display: grid;
  grid-template-rows: auto 85%;
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-rows: auto 80%;
  }
`

export const LinkContainer = styled.div``

export const ContainerAlert = styled.div`
  & > div > div {
    width: 650px;
    margin: 0 20px;

    & p {
      text-align: justify;
      line-height: 1.5;
    }
  }
`

export const CloseBtn = styled.div`
  width: fit-content;
  height: 100%;
  cursor: pointer;
  align-items: center;
  display: flex;
`

export const Img = styled.img`
  width: 600px;
  justify-self: center;
  align-self: center;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const AllContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  height: 10rem;
  padding: 0 4.2rem;
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  background: #fcfcfc;
  margin-bottom: 6rem;

  @media only screen and (max-width: 768px) {
    padding: 0 2.2rem;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 144rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: relative;
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  box-shadow: none;
  border: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`

export const Logo = styled.img`
  width: 14.7rem;
  height: auto;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const TermsContainer = styled.div`
  font-size: 12px;
  a {
    color: #1e1e1e;
  }
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const SortByContainer = styled.div`
  position: absolute;
  cursor: pointer;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: 30px;
  opacity: 1;
  right: 0;
  display: flex;
  padding: 0 2rem;
  height: fit-content;
  align-items: center;
  justify-content: center;
  margin-right: 10rem;
  flex-direction: column;
  z-index: 10;

  > div {
    display: none;
  }

  &:hover {
    padding-bottom: 1rem;
    width: 20rem;
  }

  &:hover > div {
    display: flex;
  }
`

export const SortInputsContainer = styled.div`
  flex-direction: column;
  background: #fff !important;

  p {
    font-size: 1.4rem;
    color: #1e1e1e;
    font-weight: bold;
  }
`

export const SortInputLabel = styled.label`
  display: flex;
  flex-direction: row;
  height: 2.8rem;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`

export const SortInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  width: 100%;
  margin: 0.2rem 0;
`

export const TagText = styled.span`
  font: normal normal 600 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: #1e1e1e;
  opacity: 1;
  cursor: pointer;
  white-space: nowrap;
`
