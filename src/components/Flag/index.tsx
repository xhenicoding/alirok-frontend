import React from 'react'
import { StyledFlag } from './style'

interface IFlag {
  [key: string]: string
}

function Flag(props: IFlag) {
  return <StyledFlag {...props} />
}

export default Flag
