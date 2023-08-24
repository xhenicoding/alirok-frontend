import styled from 'styled-components'

import Popup from 'reactjs-popup'

export const StyledModal = styled(Popup)<{
  maxWidth?: string
}>`
  z-index: 1;
  &-overlay {
    background: rgb(30 30 30 / 62%);
    backdrop-filter: blur(1px);
  }
  &-content {
    border: none !important;
    max-width: ${({ maxWidth }) =>
      maxWidth ? `${maxWidth} !important` : '58rem !important'};
    width: 100% !important;
    min-height: 40rem !important;
    background-color: transparent !important;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`

export const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding: 2.5rem 3rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    padding: 1.5rem 2.5rem;
    max-height: unset;
  }
`
