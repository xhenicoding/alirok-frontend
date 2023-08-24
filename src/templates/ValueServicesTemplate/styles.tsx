import styled, { keyframes } from 'styled-components'

const colors = {
  black: '#000000',
  white: '#ffffff',
  gray: '#808080',
  gray90: '#e5e5e5',
  shutlleGray: '#585f6c',
  tooltip: '#5984D5',
  primary: '#578EF7',
  primaryDark: '#1B68E2',
  primaryLight: '#E5EEFE',
  secondary: '#C2C5DA',
  secondaryLight: '#d4d6e1',
  fontDark: '#1E1E1E',
  iconDark: '#1E1E1E',
  accent:
    'linear-gradient(90deg, #1880D9 0%, #595AC2 20%, #6851BD 24%, #734AB9 28%, #8540B3 33%, #9536AD 38%, #A72CA7 43%, #E60791 63%, #F55353 100%)',
  shadow: '#DFE7F7',
  verticalAccent:
    'linear-gradient(0deg, #1880D9 0%, #595AC2 20%, #6851BD 24%, #734AB9 28%, #8540B3 33%, #9536AD 38%, #A72CA7 43%, #E60791 63%, #F55353 100%)',
  warning: '#FFC107',
  danger: '#FD656E',
  disabled: '#e0e0e0',
  background: '#fcfcfc',
  backgroundSecondary: '#EDEEF1',
  backgroundSidebar: '#050505',
  foreground: '#1E1E1E',
  borderDark: '#AEBCD842',
  borderLight: '#EBF0FA',
  borderLightBlue: '#dfe7f7',
  verticalDivider: '#EDE5E5',
  timeline: '#dfe7f7',
  timelineHover: '#a83279',
  timelineThumbnail: '#ef795a',
  sunsetOrange: '#f55353',
  icon: '#959A9E',
  black50: 'rgba(0, 0, 0, 0.54)',
  borderViolet: '#ef88df',
  borderNavy: '#1880d9',
  borderGreen: '#1cb7b2',
  cherry: '#e576ad',
  contextIconsColor: '#d3d3d3',
  blueIconPin: '#85BFF1',
  success: '#52b788',
  successHover: '#74c69d',
  disclaimerBg: '#f0f5fe',
  disclaimerBorder: '#e5eefe',
  sidebarDivider: '#605d5d'
}

export const StyledValueServicesTemplate = styled.div`
  display: grid;
  min-height: calc(100vh - 80px);
  padding: 16px;
  grid-template-areas:
    'nav content aside'
    'footer footer footer';
  grid-template-columns: 160px 1fr 160px;
  grid-template-rows: 1fr 100px;

  font-family: 'Montserrat', Helvetica, sans-serif !important;
`

export const StyledNav = styled.nav`
  grid-area: nav;
  padding: 16px;
  border-right: 1px solid ${colors.borderLight};
`

const opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const BoxShadow = styled.div<{ padding?: number }>`
  position: relative;
  padding: ${({ padding }) => padding ?? 16}px;
  display: flex;
  animation: ${opacity} 200ms linear;
  background: ${colors.white};
  box-shadow: 0px 2px 12px ${colors.shadow};
  border-radius: 15px;
`

export const StyledContent = {
  DescriptionWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Container: styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    grid-area: content;
    display: grid;
    grid-template-rows: 100px 160px 50px auto;
    padding: 32px 70px;
    .btn-add {
      margin-top: 32px;
      float: left;
    }
  `,
  Navbar: styled.div`
    height: 41px;
    display: flex;
    align-items: center;
    > div:first-child {
      margin-right: 32px;
    }
  `,

  Dashed: styled.div`
    border: 1px dashed #578ef7;
    border-radius: 50%;
    height: 46px;
    width: 46px;
  `,

  Content: styled(BoxShadow)<{ display?: string; height?: number }>`
    display: ${({ display }) => display || 'flex'};
    justify-content: space-between;
    min-height: ${({ height }) => `${height}px` || 'auto'};
    margin-bottom: 37px;
    padding-bottom: 34px;
  `,
  Header: styled.div`
    display: flex;
    height: max-content;
    gap: 32px;
    align-items: center;
  `,
  Table: styled.table`
    width: 100%;
    text-align: left;

    .__react_component_tooltip {
      border-radius: 30px !important;
    }

    tbody > tr:last-child {
      input {
        border-bottom: 1px solid ${colors.secondaryLight};
      }
    }

    tr {
      th {
        font-size: 14px;
        font-weight: 500;
        color: ${colors.foreground};
        text-align: left;
      }
      td {
        padding-top: 32px;
        padding-left: 4px;
        font-weight: 900;
        min-width: 90px;
        color: ${colors.foreground};

        span {
          display: flex;
          align-items: center;
        }
      }
    }
    .table-input {
      height: 32px;
      width: 80px;
      font-weight: 900;
      background-color: transparent;
    }
    .button-flag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid ${colors.success};
      color: ${colors.success};
    }
    .button-flag-warning {
      border-color: ${colors.danger};
      color: ${colors.danger};
    }
    .btn-remove {
      margin-left: 24px;
      color: ${colors.danger};
    }
  `
}

export const StyledAside = styled.aside`
  grid-area: aside;
  border-left: 1px solid ${colors.borderLight};
  padding: 16px;
`

export const StyledFooter = styled.footer`
  grid-area: footer;
  display: flex;
  padding: 0px 32px;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${colors.borderLight};
  > div:first-child {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    div {
      display: flex;
      align-items: center;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
  .danger {
    color: ${colors.danger};
  }
  .blue {
    color: ${colors.primaryDark};
  }
  input {
    padding-top: 2px;
    padding-left: 16px;
    color: ${colors.foreground} !important;
    ::placeholder {
      font-weight: 500;
      color: ${colors.foreground};
      opacity: 1;
    }
  }
`

export const StyledCircle = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid ${colors.foreground};
`
