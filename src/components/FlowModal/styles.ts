import styled from 'styled-components'

export const ModalContainer = styled.div`
  padding: 1rem 6rem;
  max-width: 84.8rem;
  height: 56.6rem;

  @media only screen and (max-width: 768px) {
    padding: 1rem;
    max-width: 100vw;
  }
`

export const PrevButton = styled.span`
  cursor: pointer;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align-last: center;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    text-align-last: start;

    h2 {
      line-height: 3.1rem;
      margin-left: 2rem;
    }
  }
`

export const Content = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    overflow: hidden;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 58rem;
  margin-top: 5.8rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    width: 75%;
  }
  @media only screen and (max-width: 580px) {
    width: 95%;
  }
`

export const Title = styled.h2`
  font: normal normal bold 2.5rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  width: 60rem;
  align-self: center;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
    width: auto;
  }
`

export const Option = styled.p`
  font: normal normal bold 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
`

export const Disclaimer = styled.p`
  font: normal normal 500 1.4rem Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
`

export const InputWrapper = styled.div`
  width: 30rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const ButtonWrapper = styled.div`
  width: 16rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 4.4rem;
  }
`

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 6rem;

  .swiper-pagination {
    display: none;
  }

  .swiper-container {
    width: 58rem;
  }

  .swiper-wrapper {
    width: 35%;
  }

  @media only screen and (max-width: 768px) {
    width: 50rem;

    .swiper-container {
      width: 90vw;
      height: 14rem;
    }

    .swiper-pagination {
      bottom: 0rem;
    }

    .swiper-pagination-bullet {
      background: #e5eefe;
      border: 1px solid ${({ theme }) => theme.colors.shadow};
      width: 1.5rem;
      height: 1.5rem;
    }

    .swiper-wrapper {
      width: 75%;
    }

    .swiper-slide {
      width: 46%;
    }
  }

  @media only screen and (max-width: 600px) {
    .swiper-pagination {
      display: block;
    }
  }
`

export const Opt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const OptWrapper = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 1.1rem;
  input {
    display: none;
  }
`

export const Miniature = styled.div<{ name?: string; size?: string }>`
  background-image: url(https://static.alirok.io/collections/illustrations/${({
    name
  }) => name}.svg);
  background-size: contain;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export const Information = styled.div`
  margin-top: 8rem;
  width: 60rem;
  gap: 1.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  @media only screen and (max-width: 768px) {
    width: 80vw;
  }
`

export const Input = styled.input`
  display: none;
`

export const HelperTriggerContent = styled.span`
  margin: 0;
`

export const HelperTrigger = styled.div`
  background: #e5eefe 0% 0% no-repeat padding-box;
  border: 1px solid #396cce42;
  box-shadow: 0px 3px 6px #396cce42;
  width: 3rem;
  height: 3rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.8rem;
`
