import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: auto;

  strong {
    font-size: 14px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  input {
    &:disabled {
      background: #ffffff;
      height: 40px;
      font-size: 1.4rem;
    }
  }
`

export const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 520px;
  align-self: flex-start;
  grid-gap: 50px;
  place-self: center;
  box-shadow: 0px 3px 6px #396cce42;
  border: 0.5px solid #396cce42;
  border-radius: 50px;
  padding: 5rem;
  height: 630px;

  ul {
    height: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 4rem;
  }

  @media screen and (max-width: 768px) {
    box-shadow: none;
    border: none;
    padding-top: 0px;
    height: 600px;
  }
`

export const Flex = styled.div<{
  flexDirection?: string
  padding?: string
  alignItems?: string
  marginRight?: string
  height?: string
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  padding: ${({ padding }) => padding};
  align-items: ${({ alignItems }) => alignItems};
  margin-right: ${({ marginRight }) => marginRight};
  height: ${({ height }) => height};
`

export const LastUpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const TextContainer = styled.span`
  font-size: 1.4rem;
  padding: 5px;
`

export const Details = styled.div`
  height: 100%;
  text-align: left;
  p {
    font-size: 12px;
  }
`

export const Dots = styled.div`
  display: flex;
  margin-left: -0.8rem;
  margin-right: 1.2rem;
`

export const Timeline = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 3%;
  padding-bottom: 5%;
  list-style-type: none;

  :before {
    background-color: #ebf0fa;
    content: '';
    margin-left: -19px;
    position: absolute;
    top: 0;
    left: 2em;
    width: 2px;
    height: 100%;
  }
`

export const TimelineEvent = styled.li`
  position: relative;
`

export const InputContainer = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
`
