import styled from 'styled-components'

export const RatingStars = styled.div`
  display: flex;
  gap: 22px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`

export const StarContainer = styled.div`
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.cherry};
  border-radius: 50%;

  &.animations {
    transition: transform 0.15s;
  }

  &:not(.static) {
    cursor: pointer;
  }

  &.animations:hover {
    transform: scale(1.3);
  }
`
