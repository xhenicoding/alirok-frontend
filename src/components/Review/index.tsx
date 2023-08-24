import * as S from './styles'

import { Typography } from '@alirok.com/rok-ui'
import { useLocale } from '../../hooks/useLocale'

export function Review() {
  const { t } = useLocale()

  return (
    <S.Review>
      <S.Title>
        <Typography variant="h1" fontWeight="700">
          {t.review.title}
        </Typography>
      </S.Title>
      <S.Section>
        <S.Content>
          <S.Image src="https://static.alirok.io/collections/images/Julia.png" />
          <S.Description>
            <Typography variant="h3" fontWeight="700">
              {t.review.personFeedback1}
            </Typography>
          </S.Description>
          <S.Rating src="https://static.alirok.io/collections/illustrations/rating.svg" />
          <Typography variant="h3">
            <i>-{t.review.personName1}</i>
          </Typography>
        </S.Content>
        <S.Content>
          <S.Image src="https://static.alirok.io/collections/images/Mike.svg" />
          <S.Description>
            <Typography variant="h3" fontWeight="700">
              {t.review.personFeedback2}
            </Typography>
          </S.Description>
          <S.Rating src="https://static.alirok.io/collections/illustrations/rating.svg" />
          <Typography variant="h3">
            <i>-{t.review.personName2}</i>
          </Typography>
        </S.Content>
        <S.Content>
          <S.Image src="https://static.alirok.io/collections/illustrations/Emily.svg" />
          <S.Description>
            <Typography variant="h3" fontWeight="700">
              {t.review.personFeedback3}
            </Typography>
          </S.Description>
          <S.Rating src="https://static.alirok.io/collections/illustrations/rating.svg" />
          <Typography variant="h3">
            <i>-{t.review.personName3}</i>
          </Typography>
        </S.Content>
      </S.Section>
    </S.Review>
  )
}
