import styled from 'styled-components'

export const PopUpWrapper = styled.div`
  @media only screen and (max-width: 1024px) {
    max-width: 65rem;
    width: 100%;
  }
`

export const Container = styled.div`
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const ToggleWrapper = styled.div<{
  width?: string | undefined
  widthMobile?: string | undefined
}>`
  max-width: 50rem;
  width: ${({ width }) => width ?? '100%'};
  @media only screen and (max-width: 1024px) {
    width: ${({ widthMobile }) => widthMobile ?? '100%'};
    max-width: unset;
    margin-top: 5rem;
  }
`

export const Content = styled.div`
  margin-top: 4rem;
`

export const BackFrom = styled.img`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: flex;
    width: 1.6rem;
    height: auto;
    margin-right: 2rem;
    transform: rotate(90deg);
    cursor: pointer;
    position: absolute;
    top: 3rem;
  }
`

export const InputWrapper = styled.div<{
  maxWidth?: string
  maxWidthMobile?: string
}>`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;

  @media only screen and (max-width: 1024px) {
    max-width: ${({ maxWidthMobile }) => maxWidthMobile};
  }
`

export const Form = styled.form`
  display: grid;
  row-gap: 40px;

  @media only screen and (max-width: 1024px) {
    margin-top: -5rem;
    max-width: 65rem;
    width: 100%;
  }
`

export const FormRow = styled.div<{
  columns?: string
  gap?: string
  rowGap?: string
  mobileColumns?: string
}>`
  display: grid;
  height: fit-content;
  grid-template-columns: ${({ columns }) => `${columns ?? ''}`};
  gap: ${({ gap }) => `${gap ?? ''}`};
  row-gap: ${({ rowGap }) => `${rowGap ?? '40px'}`};

  @media only screen and (max-width: 1024px) {
    grid-template-columns: ${({ mobileColumns }) =>
      `${mobileColumns ?? '1fr'}`};
  }
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  @media only screen and (max-width: 1024px) {
    margin-right: 0rem;
  }
`

export const BackIcon = styled.img`
  width: 1.6rem;
  height: auto;
  margin-right: 2rem;
  transform: rotate(90deg);
  cursor: pointer;
`

export const BackContent = styled.div`
  display: flex;
  margin-bottom: 3rem;
  margin-top: 1rem;
  display: none;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    max-width: unset;
    width: 100%;
    display: flex;
  }
`

export const FormTitle = styled.span`
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 1;
`

export const ButtonText = styled.span`
  text-transform: uppercase;
  text-align: left;
  font: normal normal bold 1.6rem 'Montserrat', sans-serif;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.white};
`

export const ButtonWrapper = styled.div`
  margin: 0 0 0 auto;
  width: 160px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const BackContentDesk = styled.div`
  display: block;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const FormWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
