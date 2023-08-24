import styled, { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #fcfcfc;
  }

    ::-webkit-scrollbar-track {
      background-color: transparent;
      border: none;
    }

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background: transparent;
      border: none;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background: hsla(232, 24%, 81%, 0.377);
      border: none;
    }

  html, body, #__next {
    height: 100%;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .ml-3{
    margin-left: 3px;
  }

  .mr-100{
    margin-right: 100px;
  }

  @media only screen and (min-width : 768px) {
    .user-account-popup-content{
      position:fixed !important;
    }
  }

  @media only screen and (min-width: 1024px) {
    .popup-content.user-account-popup-content {
      bottom: 30px !important;
      left: 70px !important;
      top: unset !important;
      border-bottom-left-radius: 0px !important;
    }

    .popup-content.login-section-content {
      border-top-right-radius: 0px !important;
    }
  }

  .mobile-menu-trigger:focus+.sub-menu-items {
    display: block;
  }

  [role=tooltip].popup-content {
    width: fit-content;
  }

  .hidden-menu{
    margin-left:-99999px;
  }

  input.mobile-menu-item:checked + label + div{
   display:block;
  }

  .primary-dot{
    height: 15px;
    width: 15px;
    background-color: #578EF7;
    border-radius: 50%;
    display: inline-block;
  }

  .red-dot{
    height: 15px;
    width: 15px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
  }

	@keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  .hovercontent {
    margin-bottom: 4.8rem;
  }
  .helper_icon:hover {
    cursor: pointer;
  }
  .helper_icon:hover ~ .hovercontent::after {
    content: "Unknown shippers can NOT ship on PAX flights only CAO flights.";
    font-size: 1.2rem;
    line-height: 1.4;
  }
`

export const AlertWrapper = styled.div`
  h4 {
    font-size: 1.6rem;
  }
`

export const Chip = styled.span<{
  variant?: string
  padding?: string
}>`
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  border-radius: 50px;
  height: 20px;
  width: max-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
  font-size: 14px;
  padding: ${({ padding }) => padding || '2px 15px 2px 15px'};

  ${({ variant }) => {
    switch (variant) {
      default:
        return css`
          color: #578ef7;
          background: #ebf0fa;
        `
      case 'primary':
        return css`
          color: #578ef7;
          background: #ebf0fa;
        `
      case 'danger':
        return css`
          color: #ff80aa;
          background: #ffe1eb;
        `
    }
  }}
`

export default GlobalStyles
