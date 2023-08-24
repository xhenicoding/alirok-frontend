import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { Icon, Input, Avatar, Button, Alert } from '@alirok.com/rok-ui'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import Flex from '../../../components/Flex/index'
import * as S from '../../../styles/vendor/acceptInvite'
import FullPageViewTemplate from '../../../templates/FullPageViewTemplate/index'
import AliRokLogo from '../../../components/AliRokLogo/index'
import rokApiV2 from 'services/rokApiV2'
import { vendorApiRoutes } from '../../../helpers/apiRoutes'
import { IVendorInvite } from 'interfaces/invitations.interface'
import { vendorAppRoutes } from 'helpers/appRoutes'
import { Loader } from 'components/Loader'
import useInvitationsCount from '../../../hooks/useInvitationsCount'
import { SelectAutocomplete } from 'components/SelectAutocomplete'
import NumberFormat, {
  INumberFormatValue
} from '../../../components/NumberFormat'
import { PAYMENT_TERMS_OPTIONS } from 'helpers/constants'

const AcceptVendorInvite = () => {
  // Variables
  const INPUT_HEIGHT = '45px'
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  // Hooks
  const { addToast } = useToasts()
  const { push } = useRouter()
  const { refreshInvitationsCount } = useInvitationsCount()

  const defaultVendorInviteData: IVendorInvite = {} as IVendorInvite
  const { isReady, query } = useRouter()

  // States
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [loadingConnect, setLoadingConnect] = useState<boolean>(false)
  const [loadingInviteData, setLoadingInviteData] = useState<boolean>(true)
  const [creditLineAmount, setCreditLineAmount] = useState<string | null>(null)
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<string>('')
  const [inviteData, setInviteData] = useState<IVendorInvite>(
    defaultVendorInviteData
  )
  const [currentConnectType, setCurrentConnectType] = useState<
    'CONNECTED' | 'REFUSED'
  >('CONNECTED')

  const relationshipUUID = String(query.relation_invite_uuid || '')

  const goToList = () => push(vendorAppRoutes.LIST)

  useEffect(() => {
    return () => {
      refreshInvitationsCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isReady) {
      setLoadingInviteData(true)
      rokApiV2()
        .get<IVendorInvite>(
          vendorApiRoutes.FETCH_PENDING_INVITE('vendor', relationshipUUID)
        )
        .then(({ data }) => {
          if (data) {
            setCreditLineAmount(data?.credit_line || '')
            setInviteData(data)
          } else {
            setInviteData(defaultVendorInviteData)
          }
        })
        .catch((error) => {
          setInviteData(defaultVendorInviteData)
          addToast(
            _.get(
              error,
              'response.data.message',
              'Something went wrong while fetching invite'
            ),
            toastErrOption
          )
          goToList()
        })
        .finally(() => setLoadingInviteData(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  const handleOnConnect = async (connectType: 'CONNECTED' | 'REFUSED') => {
    setLoadingConnect(true)
    setCurrentConnectType(connectType)

    try {
      const payload: Record<string, string | number> = {
        connectType
      }

      const prevCreditLine = Number(inviteData.credit_line || 0)

      if (prevCreditLine !== Number(creditLineAmount)) {
        payload['credit_line'] = Number(creditLineAmount)
      }

      if (
        selectedPaymentTerm &&
        selectedPaymentTerm !== inviteData.payment_term
      ) {
        payload['payment_term'] = selectedPaymentTerm
      }

      await rokApiV2().put(
        vendorApiRoutes.ACCEPT_PENDING_INVITE('vendor', relationshipUUID),
        payload
      )
      setShowDialog(true)
    } catch (error) {
      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while connecting invite'
        ),
        toastErrOption
      )
    } finally {
      setLoadingConnect(false)
    }
  }

  return (
    <S.Container>
      <Flex
        className="page-header"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
      >
        <S.LogoContainer>
          <AliRokLogo />
        </S.LogoContainer>
        <S.InviteTitle>
          {!loadingInviteData && `Connect with ${inviteData?.legal_name || ''}`}
        </S.InviteTitle>
        <div className="mr-100 close-icon" onClick={() => goToList()}>
          <Icon
            name="close"
            width="30px"
            height="20px"
            color="gradient"
            cursor="pointer"
          />
        </div>
      </Flex>
      {loadingInviteData ? (
        <Loader />
      ) : (
        <Flex
          flexDirection="row"
          width="100%"
          justifyContent="center"
          marginTop="100px"
        >
          <S.Box>
            <Flex
              flexDirection="row"
              className="box-logo-row"
              justifyContent="center"
            >
              <Avatar
                size={100}
                src={
                  inviteData?.logo ||
                  'https://static.alirok.io/collections/icons/question-mark-alt.svg'
                }
                shape="circle"
                elevation="card"
              />
            </Flex>
            <Flex
              flexDirection="row"
              className="box-legal-row"
              justifyContent="space-between"
            >
              <Input
                id="legal_name"
                disabled
                value={inviteData?.legal_name || '-'}
                height={INPUT_HEIGHT}
                label="Legal name"
                shadowBox={true}
              />
              <Input
                id="company_type"
                disabled
                value={inviteData?.company_type || '-'}
                height={INPUT_HEIGHT}
                label="Company type"
                shadowBox={true}
              />
            </Flex>
            <Flex
              flexDirection="row"
              className="box-address-row"
              justifyContent="space-between"
            >
              <Input
                id="address"
                disabled
                value={`${inviteData?.address?.street_number || ''} ${
                  inviteData?.address?.complement || ''
                }`}
                height={INPUT_HEIGHT}
                label="Address"
                shadowBox={true}
              />
            </Flex>
            <Flex
              flexDirection="row"
              className="box-tax-row"
              justifyContent="space-between"
            >
              <Input
                id="tax_id"
                disabled
                value={inviteData?.tax_id || ''}
                height={INPUT_HEIGHT}
                label="Tax id"
                shadowBox={true}
              />
              <S.CreditLineWrapper>
                <NumberFormat
                  fontWeight="bold"
                  name="credit_line"
                  type="text"
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator={true}
                  value={creditLineAmount}
                  label="Credit line"
                  height={INPUT_HEIGHT}
                  shadowBox={true}
                  customInput={Input}
                  onValueChange={({ value }: INumberFormatValue) =>
                    setCreditLineAmount(value)
                  }
                />
                <div className="number-prefix">
                  <strong>{inviteData?.currency_code}</strong>{' '}
                  <strong>
                    <Icon
                      name="edit-line"
                      color="blue"
                      width="25px"
                      height="25px"
                    />
                  </strong>
                </div>
              </S.CreditLineWrapper>
              <S.SelectAutocompleteWrapper>
                <label>Net terms</label>
                <SelectAutocomplete
                  defaultInputValue={
                    inviteData?.payment_term === '0'
                      ? 'Advanced'
                      : `Net ${inviteData?.payment_term || '-'} day${
                          Number(inviteData?.payment_term) > 1 ? 's' : ''
                        }`
                  }
                  showOptionsOnClick={true}
                  options={PAYMENT_TERMS_OPTIONS}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  getOptionLabel={(option: any) =>
                    option === '0'
                      ? 'Advanced'
                      : `Net ${option} day${Number(option) > 1 ? 's' : ''}`
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectChange={(option: any) =>
                    setSelectedPaymentTerm(option.value)
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  customOption={(option: any) => (
                    <Flex style={{ padding: '2px' }}>
                      <strong
                        style={{
                          fontSize: '14px',
                          color: 'black',
                          fontWeight: 'normal'
                        }}
                      >
                        {option?.label || ''}
                      </strong>
                    </Flex>
                  )}
                />
                <Icon
                  name="edit-line"
                  color="blue"
                  width="25px"
                  height="25px"
                />
              </S.SelectAutocompleteWrapper>
            </Flex>
            <Flex
              flexDirection="row"
              className="box-action-row"
              justifyContent="space-between"
            >
              <Button
                disabled={loadingConnect}
                variant="white"
                floating={true}
                width={200}
                onClick={() => handleOnConnect('REFUSED')}
              >
                DECLINE
              </Button>
              <Button
                disabled={loadingConnect}
                variant="default"
                floating={true}
                width={200}
                onClick={() => handleOnConnect('CONNECTED')}
              >
                CONNECT
              </Button>
            </Flex>
          </S.Box>
        </Flex>
      )}
      <Alert
        showDialog={showDialog}
        hasCloseButton={false}
        toggle={() => setShowDialog(false)}
        width="240px"
        height="240px"
        title="Success"
        text={`Invitation ${currentConnectType.toLocaleLowerCase()} successfully`}
        image="https://static.alirok.io/collections/illustrations/sharing.svg"
      >
        <Flex alignSelf="center">
          <Button
            width={200}
            onClick={() => {
              setShowDialog(false)
              goToList()
            }}
          >
            OK
          </Button>
        </Flex>
      </Alert>
    </S.Container>
  )
}

AcceptVendorInvite.getLayout = (page: React.ReactNode) => (
  <FullPageViewTemplate>{page}</FullPageViewTemplate>
)

export default AcceptVendorInvite
