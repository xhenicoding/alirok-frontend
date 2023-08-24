import styled from 'styled-components'
// import { colors } from '~services/theme';

export const SelectAutocompleteStyled = styled.div`
  position: relative;
  width: 100%;
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-image: ${({ borderImage }) => borderImage};
  border-width: ${({ borderWidth }) => borderWidth};

  Input {
    border: 0;
    border-radius: ${({ borderRadius }) => borderRadius ?? '0px'};
    box-shadow: ${({ boxShadow }) =>
      boxShadow
        ? `0px 3px 6px ${({ theme }) => theme.colors.shadow}`
        : 'none !important'};
    color: ${({ color }) => `${color}`};
  }

  Input:hover {
    border-bottom: none;
  }

  Input:focus {
    border: 0;
    border-radius: ${({ borderRadius }) => borderRadius ?? '0px'};
    box-shadow: ${({ boxShadow }) =>
      boxShadow
        ? `0px 3px 6px ${({ theme }) => theme.colors.shadow}`
        : 'none !important'};
  }

  Input:focus ~ ul {
    box-shadow: ${({ boxShadow }) =>
      boxShadow
        ? `0px 3px 6px ${({ theme }) => theme.colors.shadow}`
        : 'none !important'};
  }

  .option {
    color: ${({ theme }) => theme.colors.fontDark} !important;
    font-weight: 500;
  }

  .no-options {
    padding: 0.5rem;
    pointer-events: none;
  }

  ul {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 3px 7px 2px #e8e8e8 !important;
    background-color: #fff;
    border: 0.2px 0 0.2px 0.2px solid #e8e8e8;
    border-radius: 0px 0px 5px 5px;
    list-style: none;
    max-height: 143px;
    overflow-y: auto;
    overflow-x: hidden !important;
    padding-left: 5px;
    width: 100%;
    position: absolute;
    cursor: pointer;
    z-index: 100;
  }

  ul li {
    padding: 0.5rem;
    animation: fadeInUp 500ms;
    z-index: 33;
    color: ${({ theme }) => theme.colors.primary};
  }

  .options-active,
  ul li:hover {
    background-color: #f8f8f8;
    font-weight: 700 !important;
    color: ${({ theme }) => theme.colors.fontDark};
    cursor: pointer;
    transition: all 0.1s linear;
  }

  ul li:not(:last-of-type) {
    border-bottom: 1px dashed #f5f5f5;
  }

  li p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 5px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`
