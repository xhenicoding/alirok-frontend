import * as S from 'styles/inviteFriends/styles'
import { useState } from 'react'
import SidebarTemplate from '../../../templates/SidebarTemplate'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon, Button, Alert } from '@alirok.com/rok-ui'
import { rokApiV2 } from '../../../services/rokApiV2'

interface IForm {
  email: string
}
export default function InviteFriends() {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showInvalidDialog, setShowInvalidDialog] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IForm>({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('Email is not valid')
          .required('Email is required')
      })
    ),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: IForm) => {
    if (data.email) {
      try {
        await rokApiV2.post('/invite-friends', { email: data.email })
        setShowDialog(true)
      } catch (error) {
        setShowInvalidDialog(true)
        return
      }
    }
  }

  const success = (
    <Alert
      showDialog={showDialog}
      hasCloseButton={true}
      toggle={() => setShowDialog(false)}
      width="240px"
      height="240px"
      title="Success"
      text="Your invite has been sent"
      image="https://static.alirok.io/collections/illustrations/sharing.svg"
    >
      <S.AlertBtnWrapper>
        <Button
          width={200}
          onClick={() => {
            reset()
            setShowDialog(false)
          }}
        >
          OK
        </Button>
      </S.AlertBtnWrapper>
    </Alert>
  )

  const invalid = (
    <Alert
      showDialog={showInvalidDialog}
      hasCloseButton={true}
      toggle={() => setShowInvalidDialog(false)}
      width="240px"
      height="240px"
      title="Sorry! Something went wrong"
      text="Something went wrong and your email was not send"
      image="https://static.alirok.io/collections/illustrations/sharing.svg"
    >
      <S.AlertBtnWrapper>
        <Button width={200} onClick={() => setShowInvalidDialog(false)}>
          Try again
        </Button>
      </S.AlertBtnWrapper>
    </Alert>
  )

  return (
    <S.Container>
      <S.BoxContent>
        <S.TextWrapper>
          Invite your friends and help them save up to 65 % when shipping
        </S.TextWrapper>
        <S.ImageWrapper>
          <img src="https://static.alirok.io/collections/illustrations/sharing.svg" />
        </S.ImageWrapper>
        <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <S.InputContainer>
            <S.inputWrapper
              id="email"
              placeholder="type your friend’s email here"
              {...register('email')}
            />{' '}
            {errors.email && (
              <S.ErrorWrapper>{errors.email.message}</S.ErrorWrapper>
            )}
          </S.InputContainer>
          <S.ButtonWrapper>
            <Button width="full">Invite</Button>
            <Icon
              name="parcel-send"
              color="white"
              width="23px"
              height="23px"
              className="icon"
              onClick={handleSubmit(onSubmit)}
            />
          </S.ButtonWrapper>
        </S.FormWrapper>
      </S.BoxContent>
      {success}
      {invalid}
    </S.Container>
  )
}

InviteFriends.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
