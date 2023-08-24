const DotsLoader = () => {
  return (
    <svg
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 50 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      width="100%"
      height="100%"
    >
      <circle fill="#fff" stroke="none" cx="8" cy="50" r="4">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="4">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="44" cy="50" r="4">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  )
}

export default DotsLoader
