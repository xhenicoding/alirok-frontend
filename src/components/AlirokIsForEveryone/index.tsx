import { AlirokIsForEveryoneCard } from 'components/AlirokIsForEveryoneCard'
import * as S from './styles'

import { Typography } from '@alirok.com/rok-ui'
import { useRouter } from 'next/router'
import { useLocale } from '../../hooks/useLocale'

export function AlirokIsForEveryone() {
  const { push } = useRouter()

  const { t } = useLocale()

  return (
    <S.Container>
      <S.Title>
        <Typography variant="h1" fontWeight="700">
          {t.alirokIsForEveryone.title}
        </Typography>
      </S.Title>
      <S.Content>
        <AlirokIsForEveryoneCard
          title={t.alirokIsForEveryone.personalShipmentsTitle}
          image="https://static.alirok.io/collections/illustrations/personal-shipments.svg"
          callButton={{
            label: t.alirokIsForEveryone.personalShipmentsButton,
            onClick: () => push('/access?section=joinUs')
          }}
        >
          <S.Text>
            <S.Bold>
              {t.alirokIsForEveryone.personalShipmentsDescription1}
            </S.Bold>{' '}
            {t.alirokIsForEveryone.personalShipmentsDescription2}
          </S.Text>
          <S.Text>
            <S.Bold>
              {t.alirokIsForEveryone.personalShipmentsDescription3}
            </S.Bold>{' '}
            {t.alirokIsForEveryone.personalShipmentsDescription4}
          </S.Text>
        </AlirokIsForEveryoneCard>
        <AlirokIsForEveryoneCard
          title={t.alirokIsForEveryone.businessesTitle}
          image="https://static.alirok.io/collections/illustrations/for-business.svg"
          callButton={{
            label: t.alirokIsForEveryone.businessesButton,
            onClick: () => push('/access?section=joinUs')
          }}
        >
          <S.Text>
            <S.Bold>{t.alirokIsForEveryone.businessesDescription1}</S.Bold>{' '}
            {t.alirokIsForEveryone.businessesDescription2}
          </S.Text>
          <S.Text>
            {t.alirokIsForEveryone.businessesDescription3}{' '}
            <S.Bold>{t.alirokIsForEveryone.businessesDescription4}</S.Bold>{' '}
            {t.alirokIsForEveryone.businessesDescription5}
          </S.Text>
        </AlirokIsForEveryoneCard>
        <AlirokIsForEveryoneCard
          title={t.alirokIsForEveryone.carriersTitle}
          image="https://static.alirok.io/collections/illustrations/for-carrier.svg"
          callButton={{
            label: t.alirokIsForEveryone.carriersButton,
            onClick: () => push('/access?section=joinUs')
          }}
        >
          <S.Text>
            <S.Bold>{t.alirokIsForEveryone.carriersDescription1}</S.Bold>
          </S.Text>
          <S.Text>{t.alirokIsForEveryone.carriersDescription2}</S.Text>
          <S.Text>
            <S.Bold>{t.alirokIsForEveryone.carriersDescription3}</S.Bold>
          </S.Text>
        </AlirokIsForEveryoneCard>
      </S.Content>
    </S.Container>
  )
}
