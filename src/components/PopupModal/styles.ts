import styled, { css } from 'styled-components'

import Popup from 'reactjs-popup'

export const StyledPopup = styled(Popup)<{
  isMobileMode?: boolean
  maxWidth?: string
  dynamicHeight?: boolean
  marginAdmin?: boolean
  borderRadius?: string
}>`
  z-index: 1;

  ${({ isMobileMode }) =>
    !isMobileMode &&
    css`
      display: none;
    `}

  &-content {
    ${({ marginAdmin }) =>
      marginAdmin
        ? css`
            margin-left: 1rem !important;
            margin-top: -1.5rem !important;
            @media only screen and (max-width: 1024px) {
              margin-left: 0 !important;
              margin-top: 0 !important;
            }
          `
        : ''}
    box-shadow: 0px 3px 6px #396cce42 !important;
    border: 1px solid #aebcd842 !important;
    border-radius: ${({ borderRadius }) =>
      borderRadius ? `${borderRadius} !important` : '50px !important'};
    overflow-y: hidden;
    max-width: ${({ maxWidth }) =>
      maxWidth ? `${maxWidth} !important` : '74rem !important'};
    min-height: ${({ dynamicHeight }) => (dynamicHeight ? 'unset' : '40rem')};
    width: 100% !important;

    ${({ isMobileMode }) =>
      isMobileMode &&
      css`
        max-width: unset !important;
        width: 100% !important;
        height: 100%;
        border-radius: 0 !important;
        bottom: unset !important;
        left: unset !important;
        padding-right: unset;
      `}
  }
`

export const PopupContent = styled.div<{
  dynamicHeight?: boolean
  dynamicPadding?: boolean
  maxHeight?: string
}>`
  height: 100%;
  min-height: ${({ dynamicHeight }) => (dynamicHeight ? 'unset' : '30rem')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'unset')};
  width: 100%;
  position: relative;
  padding: ${({ dynamicPadding }) =>
    dynamicPadding ? 'unset' : '2.5rem 3rem'};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};

  @media only screen and (max-width: 1024px) {
    padding: ${({ dynamicPadding }) =>
      dynamicPadding ? 'unset' : ' 1.5rem 1rem'};
    max-height: unset;
  }
`

export const CloseBtn = styled.div`
  mask: url('https://static.alirok.io/collections/icons/close.svg') no-repeat
    center / contain;
  background: transparent
    linear-gradient(180deg, #1880d9 0%, #e60791 63%, #f55353 100%) 0% 0%
    no-repeat padding-box;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 3rem;
  top: 3rem;
  cursor: pointer;
  opacity: 0;
  display: none;

  @media only screen and (max-width: 1024px) {
    top: 2.4rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    opacity: 1;
    display: block;
  }
`
