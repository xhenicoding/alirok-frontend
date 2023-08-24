import styled, { css } from 'styled-components'

export const AccessButtons = styled.div`
  display: flex;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const MainContainer = styled.div<{ hasCompany: boolean }>`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: ${({ hasCompany }) =>
      hasCompany ? 'column-reverse' : 'column'};
    overflow: visible;
    height: 100%;
    max-width: 80%;
    width: 100%;
  }
`

export const LoginSection = styled.div`
  display: flex;

  button {
    :not(:last-child) {
      margin-right: 3.2rem;
    }
  }

  @media only screen and (max-width: 1024px) {
    button {
      :not(:last-child) {
        margin-right: 2rem;
      }
    }
  }
`

export const ButtonText = styled.span`
  text-transform: uppercase;
`

export const AvatarWrapper = styled.div`
  cursor: pointer;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 39rem;
  gap: 1rem;

  .__react_component_tooltip {
    border-radius: 30px !important;
  }

  @media only screen and (max-width: 768px) {
    max-width: unset;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }
`

export const CompanyContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.2rem;
  padding-top: 2.6rem;
  width: 24rem;
  border-left: 0.5px solid ${({ theme }) => theme.colors.gray};

  @media only screen and (max-width: 768px) {
    padding-top: 3.45rem;
    width: 100%;
    height: 100%;
  }
`

export const ProfileContent = styled.div<{ hasCompany?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-left: 2.2rem;
  padding-top: 2.6rem;
  border-left: 0.5px solid ${({ theme }) => theme.colors.gray};
  width: 240px;

  @media only screen and (max-width: 768px) {
    padding-top: 1.8rem;
    padding-bottom: 3.45rem;
    ${({ hasCompany }) =>
      hasCompany
        ? css`
            border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray};
          `
        : css`
            border-bottom: none;
          `};
    width: 100%;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

export const ProfileTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  padding-left: 0.5rem;

  h3 {
    text-overflow: ellipsis;
    flex-wrap: wrap;
    overflow: hidden;
    white-space: nowrap;
    max-width: 13rem;
  }
`

export const Line = styled.div`
  width: 16.7rem;
  margin-left: 0rem;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray};

  @media only screen and (max-width: 768px) {
    margin-left: 1rem;
  }
`

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.7rem;

  h3 {
    width: 16.7rem;
    cursor: pointer;
    padding: 1.5rem 1.5rem 1.5rem 1rem;
    white-space: nowrap;

    &:hover {
      background: #f2f7ff;
      border-radius: 50px;
      font-weight: bold;
    }
  }

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    overflow: hidden;

    h3 {
      width: 100%;
      padding: 2rem 2rem 2rem 0.5rem;
    }
  }
`

export const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 33rem;
  overflow-y: scroll;
  padding: 2.5rem 0.4rem 0 2.6rem;
  gap: 3rem;

  div {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    padding: 1.8rem 1rem 0 1.8rem;
    max-height: unset;
    overflow-x: hidden;
  }
`

export const PlusBtnWrapper = styled.div`
  padding: 1rem;
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  box-shadow: none;
  border: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`

export const MenuButtonImg = styled.div`
  width: 2.4rem;
  height: 2.6rem;
  transform: rotate(180deg);
  mask: url('https://static.alirok.io/collections/icons/menu2.svg') center
    center / cover no-repeat;
  background: linear-gradient(
    90deg,
    rgb(24, 128, 217) 0%,
    rgb(89, 90, 194) 20%,
    rgb(104, 81, 189) 24%,
    rgb(115, 74, 185) 28%,
    rgb(133, 64, 179) 33%,
    rgb(149, 54, 173) 38%,
    rgb(167, 44, 167) 43%,
    rgb(230, 7, 145) 63%,
    rgb(245, 83, 83) 100%
  );
`
