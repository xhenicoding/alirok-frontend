import styled from 'styled-components'

export const RatingContainer = styled.div`
  display: flex;

  & i:last-child {
    margin-right: 0px;
  }
`

export const OutlinedStar = styled.i`
  background: url('https://static.alirok.io/collections/icons/star-outlined.svg')
    center no-repeat;
  background-size: contain;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.4rem;
`

export const FilledStar = styled.i`
  background: url('https://static.alirok.io/collections/icons/star-filled.svg')
    center no-repeat;
  background-size: contain;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.4rem;
`
