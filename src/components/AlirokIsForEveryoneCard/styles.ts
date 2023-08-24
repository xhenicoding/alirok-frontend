import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 6px #396cce42;
  border: 1px solid #396cce42;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 68rem;
  max-width: 36.5rem;
  width: 100%;
  padding: 3.5rem;
  margin: 0 2rem;
`

export const Title = styled.h3`
  font: normal normal bold 2rem 'Montserrat', sans-serif;
  color: #1e1e1e;
  text-align: center;
`

export const Image = styled.img`
  width: 12rem;
  height: 12rem;
  margin-top: 3.6rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonWrapper = styled.div`
  height: 100%;
  width: 18rem;
  display: flex;
  align-items: flex-end;
`

export const ButtonText = styled.span`
  text-transform: uppercase;
  font-size: 1.6rem;
`
