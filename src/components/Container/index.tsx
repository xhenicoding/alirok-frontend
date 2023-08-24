import styled from 'styled-components'

export const Container = styled.div`
  margin-left: 2rem;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0rem;
    padding-right: 0rem;
  }
`
