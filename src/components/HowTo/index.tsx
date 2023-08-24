import * as S from './styles'

import { Typography } from '@alirok.com/rok-ui'

import { useLocale } from '../../hooks/useLocale'

export function HowTo() {
  const { t } = useLocale()

  return (
    <S.HowTo>
      <S.Title>
        <Typography variant="h1" fontWeight="700">
          {t.howTo.title}
        </Typography>
      </S.Title>
      <S.Section variant="invert">
        <S.Image src="https://static.alirok.io/collections/illustrations/quote.svg" />
        <S.Content>
          <S.Step>{t.howTo.quoteTitle}</S.Step>
          <S.Subtitle>
            <Typography variant="h1" fontWeight="700">
              {t.howTo.quoteSubtitle}
            </Typography>
          </S.Subtitle>
          <S.Description>{t.howTo.quoteDescription}</S.Description>
        </S.Content>
      </S.Section>
      <S.Section>
        <S.Content>
          <S.Step variant="pink">{t.howTo.bookTitle}</S.Step>
          <S.Subtitle>
            <Typography variant="h1" fontWeight="700">
              {t.howTo.bookSubtitle}
            </Typography>
          </S.Subtitle>
          <S.Description>{t.howTo.bookDescription}</S.Description>
        </S.Content>
        <S.Image src="https://static.alirok.io/collections/illustrations/book.svg" />
      </S.Section>
      <S.Section variant="invert">
        <S.Image src="https://static.alirok.io/collections/illustrations/ship.svg" />
        <S.Content>
          <S.Step variant="red">{t.howTo.shipTitle}</S.Step>
          <S.Subtitle>
            <Typography variant="h1" fontWeight="700">
              {t.howTo.shipSubtitle}
            </Typography>
          </S.Subtitle>
          <S.Description>{t.howTo.shipDescription}</S.Description>
        </S.Content>
      </S.Section>
    </S.HowTo>
  )
}
