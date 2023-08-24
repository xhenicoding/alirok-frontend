import styled from 'styled-components'

export const Section = styled.div`
  margin-left: 6rem;

  .__react_component_tooltip {
    border-radius: 30px !important;
  }

  @media only screen and (max-width: 768px) {
    margin-left: 0;
  }
`

export const SubmenuWrapper = styled.div`
  background: #050505;
  border-radius: 0 3rem 3rem 3rem;
  width: max-content;
  position: absolute;
  margin-left: 5rem;
  margin-top: -2rem;
  padding: 1.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 1;
  transition: all 0.4s ease;
`

export const SubmenuOption = styled.div`
  opacity: 1;
  color: #fff;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 5.8rem 0 2.6rem;
  transition: all 0.4s ease;

  &:not(:last-child) {
    border-bottom: 1px solid #fff;
    padding-bottom: 1.5rem;
  }

  &:hover {
    font-weight: 700;
    transition: font 0.4s ease;
    cursor: pointer;
  }
`

export const Sidebar = styled.div`
  background: #000;
  position: fixed;
  height: 100vh;
  width: 5.8rem;
  left: 0px;
  top: 0px;
  bottom: 0px;
  padding-top: 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 99;

  @media only screen and (max-width: 768px) {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    top: 2rem;
    right: 2.2rem;
    margin-top: 20px;
    z-index: 2;
    align-items: center;
    padding: 0 1rem;
    position: sticky;
    float: right;
    padding-top: 0px;
    border-radius: 50px;
    bottom: 0px !important;
    height: 50px;
    width: 12rem;
    justify-content: space-around;
  }
`

export const SidebarMenu = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`

export const SidebarOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-left: 0rem;
  align-items: center;

  #active {
    transition: ease 0.3s;
    border-left: 3px solid;
    place-items: center;
    border-image-source: linear-gradient(
      0deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    );
    border-image-slice: 1;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const OptionWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`

export const UserMiniature = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: absolute;
  border-top: 1px solid #605d5d;
  padding: 0.5rem 0;
  bottom: 0;
  margin-left: 0.2rem;
  margin-right: -21px;

  & div:first-child {
    cursor: pointer;
  }

  @media only screen and (max-width: 1024px) and (min-width: 769px) {
    bottom: 30px;
  }

  & div[class*='CardContainer'] {
    position: absolute;

    bottom: -25px;
    left: 65px;
    padding: 2rem 8rem 2rem 2rem;

    @media only screen and (max-width: 768px) {
      bottom: -275px;
      right: -40px;
      left: unset;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0;

    border-top: none;
    position: relative;
    margin-left: 0;
  }
`

export const MainContainer = styled.div<{ hasCompany: boolean }>`
  display: flex;
  flex-direction: row;
  width: fit-content;

  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: ${({ hasCompany }) =>
      hasCompany ? 'column-reverse' : 'column'};
    overflow: visible;
    height: 100%;
    max-width: 80%;
    width: 100%;
  }
`

export const AvatarWrapper = styled.div`
  cursor: pointer;

  div:first-child {
    background: #000;
    padding: 0 3px;
  }

  span {
    background: ${({ theme }) => theme.colors.white};
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 1rem;

  .__react_component_tooltip {
    border-radius: 30px !important;
  }

  @media only screen and (max-width: 1024px) {
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

  @media only screen and (max-width: 1024px) {
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

  @media only screen and (max-width: 1024px) {
    padding-top: 1.8rem;
    padding-bottom: 3.45rem;
    border-bottom: none;
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
  width: 100%;
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

  @media only screen and (max-width: 1024px) {
    overflow: hidden;

    h3 {
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
  overflow-x: hidden;
  padding: 2.5rem 0.4rem 0 2.6rem;
  gap: 3rem;
  min-width: fit-content;

  div {
    cursor: pointer;
  }

  @media only screen and (max-width: 1024px) {
    padding: 1.8rem 1rem 0 1.8rem;
    max-height: unset;
    overflow-x: hidden;
  }
`

export const PlusBtnWrapper = styled.div`
  padding: 1rem;
`

export const Children = styled.div`
  padding: 0rem 3rem;

  @media only screen and (max-width: 1024px) {
    padding: 2.2rem;
    padding-bottom: 5rem;
  }
`

export const SideMenu = styled.nav`
  position: relative;

  ul {
    list-style: none;
  }

  li {
    position: relative;
  }

  .active-menu {
    transition: ease 0.3s;
    border-left: 3px solid;
    place-items: center;
    border-image-source: linear-gradient(
      0deg,
      #1880d9 0%,
      #595ac2 20%,
      #6851bd 24%,
      #734ab9 28%,
      #8540b3 33%,
      #9536ad 38%,
      #a72ca7 43%,
      #e60791 63%,
      #f55353 100%
    );
    border-image-slice: 1;
  }
`

export const MenuItem = styled.span`
  position: relative;
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 0px 12px;
  cursor: pointer;
  background: #000;
`

export const MenuItemBadge = styled.span`
  color: ${({ theme }) => theme.colors.white};
  background: #fd66a6;
  border-radius: 10px;
  padding: 3px 8px;
  position: absolute;
  top: -8px;
  right: 0;
`

export const SubMenuItemBadge = styled.span`
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 12px;
  margin-left: 10px;
  float: right;
  width: 30px;
  text-align: center;
`

export const SubMenuItem = styled.span`
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 15px 20px 15px 26px;
  cursor: pointer;

  &:hover {
    font-weight: bold;

    ${SubMenuItemBadge} {
      background: #fd66a6;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  &: not(: first-child) {
    border-top: 0.5px solid #b1b1b1;
  }
`

export const MenuWrapper = styled.li`
  margin-bottom: 32px;
  &:hover > ul {
    border-radius: 0 3rem 3rem 3rem;
    left: 100%;
    visibility: visible;
    opacity: 1;
    margin-top: -2rem;
    padding: 1.4rem 0;
    padding-left: 7px;
    width: max-content;
    min-width: 200px;
  }
`

export const MenuItemWrapper = styled.ul`
  position: absolute;
  left: 0%;
  top: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
`

export const MenuUL = styled.ul``
export const MenuLI = styled.li`
  border-bottom: 1px solid transparent;
  background: #000;
  font-size: 1.4rem;
  font-weight: 500;

  &:first-child {
    border-top-right-radius: 3rem;
  }
  &:last-child {
    border-bottom-right-radius: 3rem;
    border-bottom-left-radius: 3rem;
  }
  &: not(: first-child) {
    border-top: 0.5px solid #b1b1b1;
  }
`
