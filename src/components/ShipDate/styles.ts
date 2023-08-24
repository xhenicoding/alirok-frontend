import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
  }
`

export const ToggleWrapper = styled.div`
  max-width: 40rem;
  width: 100%;
  display: flex;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1024px) {
    align-self: center;
    max-width: 60rem;
  }
`

export const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
