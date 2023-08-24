import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  align-items: center;
  margin-top: 1.5rem;
`

export const ButtonWrapper = styled.div`
  float: right;
  display: flex;
  justify-content: right;
  margin-top: 1rem;
`

export const Wrapper = styled.div`
  button {
    background: transparent;
    border: none;
    font-size: 1.4rem;
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoxWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
`
