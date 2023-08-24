import { useContext, useState } from 'react'
import * as S from './styles'

import { Icon, Avatar, Button } from '@alirok.com/rok-ui'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import 'swiper/swiper-bundle.min.css'

import 'swiper/components/pagination/pagination.min.css'

import { QuoteInput } from '../QuoteInput'
import { Context } from 'context'
import DotsLoader from 'components/DotsLoader'

import { rokApiV2 } from 'services/rokApiV2'

interface IForm {
  actorType: string
  email: string
}
interface IProps {
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function FlowModal({ showModal }: IProps) {
  SwiperCore.use([Pagination])

  const { state, dispatch } = useContext(Context)
  const { addToast } = useToasts()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    resolver: yupResolver(
      yup.object({
        actorType: yup.string().required('Category is required'),
        email: yup.string().email().required('Email is required')
      })
    ),
    defaultValues: {
      actorType: state.parcelBooking.actorType
    }
  })

  const createBaseUser = async (email: string) => {
    setLoading(true)
    try {
      const resp = await rokApiV2.post('customer/accounts/users/identify', {
        email
      })

      const user_uuid = resp.data.user_uuid

      if (user_uuid) {
        dispatch({
          type: 'SET_ACTOR_DATA',
          value: {
            uuid: user_uuid,
            email
          }
        })

        if (
          state.parcelBooking.data.recipient &&
          (state.parcelBooking.data.recipient.userId ||
            state.parcelBooking.data.recipient.companyId ||
            state.parcelBooking.data.recipient.memberId) &&
          state.parcelBooking.data.sender &&
          (state.parcelBooking.data.sender.userId ||
            state.parcelBooking.data.sender.companyId ||
            state.parcelBooking.data.sender.memberId)
        ) {
          createParcelBookingComplete(user_uuid, email)
        } else {
          createParcelBookingDraft(user_uuid, email)
        }
      }
    } catch (e) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })
    }
  }

  const createParcelBookingDraft = async (user_uuid: string, email: string) => {
    try {
      const resp = await rokApiV2.post('parcel-bookings', {
        ...state.parcelBooking.data,
        quote: {
          ...state.parcelBooking.data.quote,
          category: state.general.category
        },
        uuid: undefined,
        user: {
          ...state.parcelBooking.data.user,
          uuid: user_uuid,
          email
        }
      })

      const parcelBookingId = resp.data.parcel_booking_uuid

      if (parcelBookingId)
        dispatch({
          type: 'SET_PARCEL_BOOKING_ID',
          value: parcelBookingId
        })

      if (
        parcelBookingId &&
        state.parcelBooking.data.sender &&
        state.parcelBooking.data.sender.userId
      ) {
        push(`/recipient/${parcelBookingId}`)
      } else {
        push(`/sender/${parcelBookingId}`)
      }

      setLoading(false)
    } catch (e) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })

      setLoading(false)
    }
  }

  const createParcelBookingComplete = async (
    user_uuid: string,
    email: string | null
  ) => {
    try {
      const resp = await rokApiV2.post('parcel-bookings', {
        ...state.parcelBooking.data,
        quote: {
          ...state.parcelBooking.data.quote,
          category: state.general.category
        },
        uuid: undefined,
        order: state.quoteList.quoteList?.[state.quoteList.selectedIndex || 0],
        user: {
          ...state.parcelBooking.data.user,
          uuid: user_uuid,
          email
        },
        draft: false
      })

      const parcelBookingId = resp.data.data.parcel_booking_uuid

      if (parcelBookingId) {
        dispatch({
          type: 'SET_PARCEL_BOOKING_ID',
          value: parcelBookingId
        })

        dispatch({
          type: 'SET_CHECKOUT_DATA',
          value: resp.data.data
        })

        push(`/checkout/${parcelBookingId}`)
      }

      setLoading(false)
    } catch (e) {
      addToast('Something went wrong! Try again later.', {
        appearance: 'error',
        autoDismiss: true,
        placement: 'top-right'
      })

      setLoading(false)
    }
  }

  const onSubmit = (data: IForm) => {
    dispatch({
      type: 'SET_ACTOR_DATA',
      value: data
    })

    switch (data.actorType) {
      case 'recipient':
        dispatch({
          type: 'SET_RECIPIENT_DATA',
          value: {
            email: data.email
          }
        })
        break
      case 'thirdParty':
        dispatch({
          type: 'SET_ACTOR_DATA',
          value: {
            ...data,
            third_party: true
          }
        })
        break
      default:
        dispatch({
          type: 'SET_SENDER_DATA',
          value: {
            email: data.email
          }
        })
    }

    createBaseUser(data.email)
  }

  return (
    <S.ModalContainer>
      <S.Header>
        <S.PrevButton
          onClick={() => {
            dispatch({
              type: 'SET_PARCEL_BOOKING_ID',
              value: undefined
            })

            showModal(false)
          }}
        >
          <Icon name="chevron-left" color="black" />
        </S.PrevButton>
        <S.Title>
          {state.general.category === 'land' || state.general.category === 'air'
            ? 'Are you the shipper, consignee or third party?'
            : 'Are you the sender, recipient or third party?'}
        </S.Title>
      </S.Header>
      <S.Content onSubmit={handleSubmit(onSubmit)}>
        <S.Options>
          <Swiper
            pagination={{ clickable: true }}
            breakpoints={{
              600: {
                slidesPerView: 3
              },
              200: {
                slidesPerView: 2
              }
            }}
            spaceBetween={10}
          >
            <SwiperSlide>
              {' '}
              <S.Opt>
                <S.OptWrapper htmlFor="sender">
                  <Avatar
                    size={74}
                    shape="circle"
                    elevation="card"
                    border={state.parcelBooking.actorType === 'sender'}
                  >
                    <S.Miniature name="box-sender" size="3.5rem" />
                  </Avatar>
                  <S.Input
                    id="sender"
                    value="sender"
                    type="radio"
                    {...register('actorType', {
                      onChange: (e) => {
                        dispatch({
                          type: 'SET_ACTOR_TYPE',
                          value: e.target.value
                        })
                      }
                    })}
                  />
                </S.OptWrapper>
                <S.Option>
                  {state.general.category === 'land' ||
                  state.general.category === 'air'
                    ? 'Shipper'
                    : 'Sender'}
                </S.Option>
              </S.Opt>
            </SwiperSlide>
            <SwiperSlide>
              <S.Opt>
                <S.OptWrapper>
                  <Avatar
                    size={74}
                    shape="circle"
                    elevation="card"
                    border={state.parcelBooking.actorType === 'recipient'}
                  >
                    <S.Miniature name="letter-box" size="4rem" />
                  </Avatar>
                  <S.Input
                    id="recipient"
                    value="recipient"
                    type="radio"
                    {...register('actorType', {
                      onChange: (e) => {
                        dispatch({
                          type: 'SET_ACTOR_TYPE',
                          value: e.target.value
                        })
                      }
                    })}
                  />
                </S.OptWrapper>
                <S.Option>
                  {state.general.category === 'land' ||
                  state.general.category === 'air'
                    ? 'Consignee'
                    : 'Recipient'}
                </S.Option>
              </S.Opt>
            </SwiperSlide>
            <SwiperSlide>
              <S.Opt>
                <S.OptWrapper>
                  <Avatar
                    size={74}
                    shape="circle"
                    elevation="card"
                    border={state.parcelBooking.actorType === 'thirdParty'}
                  >
                    <S.Miniature name="hand-truck" size="4rem" />
                  </Avatar>
                  <S.Input
                    id="thirdParty"
                    value="thirdParty"
                    type="radio"
                    {...register('actorType', {
                      onChange: (e) => {
                        dispatch({
                          type: 'SET_ACTOR_TYPE',
                          value: e.target.value
                        })
                      }
                    })}
                  />
                </S.OptWrapper>
                <S.Option>Third-party</S.Option>
              </S.Opt>
            </SwiperSlide>
          </Swiper>
        </S.Options>
        <S.Row>
          <S.InputWrapper>
            <QuoteInput
              width="100%"
              error={errors.email?.message}
              label="Email"
              {...register('email')}
            />
          </S.InputWrapper>
          <S.ButtonWrapper>
            <Button loading={loading} width="full">
              {loading ? <DotsLoader /> : 'CONTINUE'}
            </Button>
          </S.ButtonWrapper>
        </S.Row>
        <S.Information>
          <S.HelperTrigger>
            <S.HelperTriggerContent>?</S.HelperTriggerContent>
          </S.HelperTrigger>
          <S.Disclaimer>
            The shipping label and payment receipt will be sent to this email
          </S.Disclaimer>
        </S.Information>
      </S.Content>
    </S.ModalContainer>
  )
}
