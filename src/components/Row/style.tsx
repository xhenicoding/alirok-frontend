import styled from 'styled-components'

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
  }
`

export default StyledRow
