import styled from 'styled-components'

export const Bar = styled.div`
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  flex-direction: column;
  text-align: center;
  text-align-last: center;
  -ms-text-align-last: center;
  z-index: 2;
  img {
    width: 150px;
    height: 50px;
    position: relative;
    align-self: center;
  }
`

export const Percent = styled.div`
  border-radius: 60px;
  overflow: hidden;
  width: 250px;
  align-self: center;
  justify-self: center;

  @keyframes loader {
    0% {
      width: 0;
    }

    20% {
      width: 10%;
    }

    43% {
      width: 41%;
    }

    56% {
      width: 50%;
    }

    66% {
      width: 52%;
    }

    75% {
      width: 76%;
    }

    94% {
      width: 86%;
    }

    100% {
      width: 100%;
    }
  }

  span {
    display: block;
  }

  .bar {
    background: #ebf0fa;
  }

  .progress {
    animation: loader 3s ease infinite;
    background: linear-gradient(
      90deg,
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
    color: #ffffff;
    padding: 2px;
    width: 0;
  }

  .progress-bar {
    left: 50%;
    max-width: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
`
