import styled from 'styled-components'

export const Container = styled.div`
  padding: 5rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-child(1) {
    font-size: 25px;

    @media (max-width: 425px) {
      font-size: 18px;
    }
  }

  img {
    width: 15%;
  }
`
