import styled from 'styled-components'

export const Forms = styled.section`
  max-width: 120rem;
  width: 100%;
  margin: 13rem auto 0rem auto;
  padding: 2rem 4.2rem 0 4.2rem;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    max-width: 80%;
    flex-direction: column;
    padding: 0px;
    margin: 0 auto;
  }
`

export const LeftSide = styled.div`
  vertical-align: center;

  @media only screen and (max-width: 768px) {
    button {
      display: none;
    }
  }
`

export const RightSide = styled.div`
  margin-left: 13rem;
  button {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    button {
      display: flex;
    }
    margin-left: 0;
  }
`

export const Title = styled.div`
  margin-bottom: 5rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const Text = styled.div`
  h2 {
    width: 52.4rem;
    line-height: 4.5rem;
  }

  margin-bottom: 6.1rem;

  @media only screen and (max-width: 768px) {
    h2 {
      width: 100%;
    }
  }
`

export const BoxContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-align: center;
`

export const Icon = styled.div<{ name?: string }>`
  background-image: url('https://static.alirok.io/collections/icons/${({
    name
  }) => name}.svg');
  background-position: bottom;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: contain;
  width: 3.4rem;
  height: 3.4rem;

  &:hover {
    background-image: url('https://static.alirok.io/collections/icons/printing.svg');
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.2rem;
  margin-bottom: 6.6rem;

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    gap: 0;
    justify-content: space-between;
    margin-bottom: 6.6rem;
  }
`
export const Options = styled.div`
  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    max-width: 40rem;
    margin: 0 auto 5.2rem auto;
  }
`
