import React from 'react'
import { Bar, Percent } from './styles'

export const Loader = () => {
  return (
    <Bar>
      <img
        src="https://static.alirok.io/collections/logos/logo.svg"
        alt="Alirok logo"
      />
      <br />
      <Percent className="progress-bar">
        <span className="bar">
          <span className="progress"></span>
        </span>
      </Percent>
    </Bar>
  )
}

export default Loader
