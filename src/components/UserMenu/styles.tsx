import styled from 'styled-components'

export const Container = styled.form`
  height: 5rem;
  width: 420px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 3.3rem;
  padding: 2.4rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    gap: unset;
  }
`

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  padding: 15px 0;
  position: relative;
  border-bottom: 1px solid #2f65cb29;
  box-shadow: rgb(57 108 206 / 16%) 0px 3px 6px;

  > div:first-child {
    margin-left: 36px;
  }

  p {
    font-size: 1.8rem;
    font-weight: bold;
  }
`

export const OptionWrapper = styled.div`
  display: block;
  gap: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  &.active-menu {
    transition: ease 0.3s;
    border-right: 3px solid;
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

export const MobileMenuItem = styled.label.attrs({
  className: 'mobile-menu-trigger'
})`
  width: 100%;
  outline: none;
  cursor: pointer;
  display: flex;
  position: relative;
  padding: 25px 20px;
  align-items: center;
  transition: 0.2s;

  &:hover {
    background: #f2f7ff;
  }

  & > div:last-child {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  span {
    text-align: left;
    font-size: 1.6rem;
    margin-top: 2px;
    margin-left: 40px;
    font-weight: 500;

    &.active-menu {
      font-weight: bold;
    }
  }
`

export const MenuItemBadge = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background: #fd66a6;
  border-radius: 10px;
  padding: 5px 10px;
  position: absolute;
  right: 10%;
  width: 30px;
  text-align: center;
`

export const SubMenuItemBadge = styled.span`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 12px;
  margin-left: 10px;
  width: 30px;
  text-align: center;
  position: absolute;
  right: 10%;
`

export const MobileMenuItemHelper = styled.input.attrs({
  type: 'checkbox',
  className: 'mobile-menu-item'
})`
  margin-left: -99999px;
`

export const MobileSubMenuItems = styled.div.attrs({
  className: 'sub-menu-items'
})`
  margin-top: 10px;
`

export const MobileSubMenuItem = styled.span`
  position: relative;
  width: 100%;
  color: black;
  font-size: 14px;
  border-bottom: 1px solid #fff;
  padding: 20px 0 20px 92px;
  display: block;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 30px;

  &:hover {
    font-weight: 600;
    background: #f2f7ff;
  }
`

export const Arrow = styled.i`
  border-bottom: 10px solid black;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  height: 0px;
  width: 0px;
  position: absolute;
  transition: 0.5s ease all;
  right: 12px;
  transform: rotate(180deg);
  /* z-index: -1; */
`
