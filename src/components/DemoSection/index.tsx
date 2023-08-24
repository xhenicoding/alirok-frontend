import { useState } from 'react'
import * as S from './styles'

import { Typography, Modal, Icon } from '@alirok.com/rok-ui'

import { useLocale } from '../../hooks/useLocale'
import { useMediaQuery } from 'hooks/useWindowSize'

interface VideoContent {
  title: string
  text: string
  video: string
}

interface Object {
  // whyAlirok: VideoContent
  domestic: VideoContent
  international: VideoContent
  tracking: VideoContent
}

export function DemoSection() {
  const { t } = useLocale()
  const [selected, setSelected] = useState<
    'international' | 'domestic' | 'tracking'
  >('domestic')
  const [showModal, setShowModal] = useState<boolean>(false)
  const { useQuery } = useMediaQuery('(max-width: 768px)', true, false)
  const { useQuery: adjustOrder } = useMediaQuery(
    '(max-width: 1024px)',
    true,
    false
  )
  const arrayContent = ['domestic', 'international', 'tracking']

  // eslint-disable-next-line @typescript-eslint/ban-types
  const content: Object = {
    /*     whyAlirok: {
      title: t.demoSection.whyAlirokTittle,
      text: t.demoSection.whyAlirokDescription,
      video: ''
    }, */
    domestic: {
      title: t.demoSection.domesticTittle,
      text: t.demoSection.domesticDescription,
      video:
        'https://static.alirok.io/collections/videos/domestic-package-demo.mp4'
    },
    international: {
      title: t.demoSection.internationalTittle,
      text: t.demoSection.internationalDescription,
      video:
        'https://static.alirok.io/collections/videos/international-package-demo.mp4'
    },
    tracking: {
      title: t.demoSection.trackingTittle,
      text: t.demoSection.trackingDescription,
      video: 'https://static.alirok.io/collections/videos/tracking-demo.mp4'
    }
  }

  const next = () => {
    const index = arrayContent.findIndex((item) => item === selected)

    if (index === arrayContent.length - 1) {
      setSelected(arrayContent[0] as 'international' | 'domestic' | 'tracking')
    } else {
      setSelected(
        arrayContent[index + 1] as 'international' | 'domestic' | 'tracking'
      )
    }
  }

  const back = () => {
    const index = arrayContent.findIndex((item) => item === selected)
    if (index === 0) {
      setSelected(
        arrayContent[arrayContent.length - 1] as
          | 'international'
          | 'domestic'
          | 'tracking'
      )
    } else {
      setSelected(
        arrayContent[index - 1] as 'international' | 'domestic' | 'tracking'
      )
    }
  }

  const video = (item: VideoContent) => {
    return (
      <S.ModalWrapper>
        <Modal open={showModal}>
          <S.CloseBtn onClick={() => setShowModal(!showModal)}>
            <Icon name="close" color="gradient" width="30px" height="30px" />
          </S.CloseBtn>
          <S.Video autoPlay controls src={item.video}></S.Video>
        </Modal>
      </S.ModalWrapper>
    )
  }

  const videoContent = (item: VideoContent) => {
    return (
      <>
        <S.Content>
          <S.SubTitle>{item.title}</S.SubTitle>
          <S.Text dangerouslySetInnerHTML={{ __html: item.text }} />
          {adjustOrder && (
            <S.Image src="https://static.alirok.io/collections/images/Mari.svg" />
          )}
          {!useQuery && item.video && (
            <S.ButtonStyled
              width={200}
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              {t.demoSection.watchBtn}
            </S.ButtonStyled>
          )}{' '}
          {!item.video && <S.SpaceAlign />}
        </S.Content>
        <S.ButtonsBottom hasButton={!!item.video}>
          <S.ButtonWrapper onClick={() => back()}>
            {' '}
            <S.Arrow
              name="chevron-down"
              width="3.5rem"
              height="3.5rem"
              color="black"
              hoverColor="black"
            />
          </S.ButtonWrapper>
          {useQuery && item.video && (
            <S.ButtonStyled
              width={200}
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              {t.demoSection.watchBtn}
            </S.ButtonStyled>
          )}
          <S.ButtonWrapper right onClick={() => next()}>
            <S.Arrow
              name="chevron-down"
              width="3.5rem"
              height="3.5rem"
              color="white"
              hoverColor="black"
              rotate="270deg"
            />
          </S.ButtonWrapper>
        </S.ButtonsBottom>

        {showModal && video(item)}
      </>
    )
  }

  return (
    <S.DemoSection>
      <S.Title>
        <Typography variant="h1" fontWeight="700">
          {t.demoSection.title}
        </Typography>
      </S.Title>
      <S.DemoCard>
        {!adjustOrder && (
          <S.Image src="https://static.alirok.io/collections/images/Mari.svg"></S.Image>
        )}
        <S.RightSide>
          <S.MenuWrapper>
            <S.MenuUp>
              {!useQuery ? (
                <>
                  {/*    <S.MenuText onClick={() => setSelected('whyAlirok')}>
                    {t.demoSection.whyAlirok}{' '}
                    {selected === 'whyAlirok' && <S.ActiveGradient />}
                  </S.MenuText> */}
                  <S.MenuText onClick={() => setSelected('domestic')}>
                    {t.demoSection.domestic}{' '}
                    {selected === 'domestic' && <S.ActiveGradient />}
                  </S.MenuText>
                  <S.MenuText onClick={() => setSelected('international')}>
                    {t.demoSection.international}{' '}
                    {selected === 'international' && <S.ActiveGradient />}
                  </S.MenuText>
                  <S.MenuText onClick={() => setSelected('tracking')}>
                    {t.demoSection.tracking}{' '}
                    {selected === 'tracking' && <S.ActiveGradient />}
                  </S.MenuText>
                </>
              ) : (
                <>
                  {/*  {selected === 'whyAlirok' && (
                    <S.MenuText onClick={() => setSelected('whyAlirok')}>
                      {t.demoSection.whyAlirok} <S.ActiveGradient />
                    </S.MenuText>
                  )} */}
                  {selected === 'domestic' && (
                    <S.MenuText onClick={() => setSelected('domestic')}>
                      {t.demoSection.domestic} <S.ActiveGradient />
                    </S.MenuText>
                  )}
                  {selected === 'international' && (
                    <S.MenuText onClick={() => setSelected('international')}>
                      {t.demoSection.international} <S.ActiveGradient />
                    </S.MenuText>
                  )}
                  {selected === 'tracking' && (
                    <S.MenuText onClick={() => setSelected('tracking')}>
                      {t.demoSection.tracking} <S.ActiveGradient />
                    </S.MenuText>
                  )}
                </>
              )}
            </S.MenuUp>
          </S.MenuWrapper>
          {videoContent(
            content[selected as 'international' | 'domestic' | 'tracking']
          )}
        </S.RightSide>
      </S.DemoCard>
    </S.DemoSection>
  )
}
