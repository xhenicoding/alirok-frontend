import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Avatar, Icon } from '@alirok.com/rok-ui'
import { parseCookies } from 'nookies'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import SidebarTemplate from '../../../templates/SidebarTemplate'
import * as S from '../../../styles/rates/styles'
import Flex from '../../../components/Flex/index'
import { ratesAppRoutes } from '../../../helpers/appRoutes'
import { useAuth } from 'hooks/useAuth'
import { Context } from '../../../context'
import {
  NOT_ALLOWED_PARCEL_RATE,
  COMPANY_TYPES
} from '../../../helpers/constants'

const Rates = () => {
  // Variables
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  const { selectedCompanyUuid } = parseCookies()
  const { user: authUser, loading: authLoading } = useAuth()
  const { addToast } = useToasts()
  const { push } = useRouter()

  const { state } = useContext(Context)

  const currentCompanyType = state.general.currentCompany?.company_types
    ?.name as COMPANY_TYPES

  // Check Auth
  useEffect(() => {
    if (!authUser && !authLoading) {
      push('/access')
    }
  }, [authUser, authLoading, push])

  // Allow to add rates
  useEffect(() => {
    if (
      currentCompanyType &&
      NOT_ALLOWED_PARCEL_RATE.includes(currentCompanyType)
    ) {
      push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompanyType])

  return (
    <S.Container>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Avatar elevation="card" size={50}>
          <S.FloatImage />
        </Avatar>
        <Typography variant="h2" fontWeight="bold" fontSize="25px">
          What type of rate would you like to add?
        </Typography>
      </Flex>
      <S.Options>
        <S.Box
          onClick={() => {
            if (selectedCompanyUuid) {
              push(ratesAppRoutes.PARCEL_RATE)
            } else {
              addToast('Please select company', toastErrOption)
            }
          }}
        >
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Icon name="parcel" color="black" />
            <Typography variant="p">Parcel</Typography>
          </Flex>
        </S.Box>
        <S.Box>
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Icon name="business-spot" color="black" />
            <Typography variant="p">Services</Typography>
          </Flex>
        </S.Box>
        <S.Box>
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Icon name="plane" color="black" />
            <Typography variant="p">Air</Typography>
          </Flex>
        </S.Box>
      </S.Options>
    </S.Container>
  )
}

Rates.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default Rates
