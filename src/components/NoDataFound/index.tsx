import React from 'react'
import * as S from './styles'
import { INoDataFound } from './noDataFound.dto'

const NoDataFound = ({
  content,
  showImage,
  ...rest
}: INoDataFound): JSX.Element => {
  return (
    <S.Container {...rest}>
      {typeof content === 'string' ? <span>{content}</span> : content}
      {showImage && (
        <img
          src="https://static.alirok.io/collections/illustrations/no-records.svg"
          alt="No data found"
        />
      )}
    </S.Container>
  )
}

NoDataFound.defaultProps = {
  content: 'No data found'
}

export default NoDataFound
