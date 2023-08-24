import styled, { css } from 'styled-components'
/*
export const CloseBtn = styled.div`
  width: fit-content;
  height: fit-content;
  top: 3rem;
  right: 4.5rem;
  position: absolute;

  @media only screen and (max-width: 768px) {
    right: 4.5rem;
  }
` */

export const CloseBtn = styled.div`
  width: fit-content;
  height: fit-content;
  top: 1rem;
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
    right: 0.5rem;
    top: 0rem;
  }
`

export const HTSWrapper = styled.div`
  max-width: 58rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (max-width: 768px) {
    padding-top: 4rem;
  }
`

export const Wrapper = styled.div`
  background: #fff;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce29;
  border-radius: 30px;
  padding: 3rem 0;

  * {
    box-sizing: border-box;
  }

  &:not(:last-child) {
    margin-bottom: 3.4rem;
  }
`

export const Title = styled.h2`
  font: normal normal bold 1.6rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  padding: 0 3rem;
`

export const Input = styled.input`
  border: none;
  outline: none;
  margin: 0 3rem;
  padding: 1rem 0;
  font: normal normal 600 1.6rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  ::placeholder {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 400;
  }
`

export const ResultsList = styled.div`
  max-height: 25rem;
  overflow-y: auto;
  position: relative;
`

export const Result = styled.div`
  padding: 2rem 3rem;
  cursor: pointer;

  :hover {
    background: #f2f7ff 0% 0% no-repeat padding-box;
  }
`

export const Code = styled.h4`
  font: normal normal bold 1.6rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
`
export const Description = styled.p`
  font: normal normal 500 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 768px) {
    align-items: baseline;
  }
`

export const InputWrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 768px) {
    padding-top: 1rem;
  }
`

export const Link = styled.a`
  font: normal normal 600 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #578ef7;
`

export const Empty = styled.p`
  font: normal normal 500 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  padding: 3rem;
`

export const HelperTrigger = styled.div`
  background: #e5eefe 0% 0% no-repeat padding-box;
  border: 1px solid #396cce42;
  box-shadow: 0px 3px 6px #396cce42;
  width: 3rem;
  height: 3rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.8rem;
`

export const HelperContent = styled.p`
  margin: 0;
  font: normal normal 600 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  margin-left: 1rem;
`

export const HelperTriggerContent = styled.span`
  margin: 0;
`

export const HelperWrapper = styled.div<{ alignMobile?: boolean }>`
  z-index: 10;
  position: relative;

  @media only screen and (max-width: 768px) {
    position: absolute;
    margin-top: -1rem;
    right: 1rem;

    ${({ alignMobile }) =>
      alignMobile &&
      css`
        margin-top: 1rem;
      `}
  }
`

export const HtsInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 25rem;

  input {
    width: 220px;
  }

  @media only screen and (max-width: 768px) {
    flex-flow: wrap;
    padding-top: 1rem;
  }
`

export const HtsLink = styled.a`
  font: normal normal 600 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #578ef7;
  text-decoration: none;
  padding-right: 3rem;

  @media only screen and (max-width: 768px) {
    padding: 1rem 3rem;
  }
`
