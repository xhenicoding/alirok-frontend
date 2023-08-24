import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import _ from 'lodash'
import { StepVendorSelect } from '../../components/Wizard/steps/stepVendorSelect'
import { PaymentTermStep } from '../../components/Wizard/steps/paymentTermsStep'
import { StepSimpleText } from '../../components/Wizard/steps/textStep'
import { emailFormatIsInvalid } from '../../scripts/validateEmail/index'
import { customerApiRoutes } from '../../helpers/apiRoutes'
import SidebarTemplate from 'templates/SidebarTemplate'
import { Wizard } from '../../components/Wizard/index'
import { customerAppRoutes } from 'helpers/appRoutes'
import rokApiV2 from 'services/rokApiV2'
import { Context } from '../../context'
import { Alert, Button } from '@alirok.com/rok-ui'
import Flex from '../../components/Flex/index'
import { AlertWrapper } from '../../styles/global'
import useInvitationsCount from '../../hooks/useInvitationsCount'

const CreateCustomer = () => {
  // Variables
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  // Hooks
  const { addToast } = useToasts()
  const { push } = useRouter()
  const { dispatch } = useContext(Context)
  const { refreshInvitationsCount } = useInvitationsCount()

  // States
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const goToCustomerInviteList = () => push(customerAppRoutes.LIST)

  useEffect(() => {
    return () => {
      dispatch({
        type: 'RESET_WIZARD'
      })

      refreshInvitationsCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (stepData: any) => {
    const payload: Record<string, string | number> = {
      customer_company_uuid: _.get(
        stepData,
        '[0].value.company_uuid',
        undefined
      ),
      contact_person: _.get(stepData, '[1].value', undefined),
      payment_term: _.get(stepData, '[2].value.payment_term', undefined),
      credit_line: Number(_.get(stepData, '[2].value.credit_line', 0)),
      currency_uuid: _.get(stepData, '[2].value.currency_uuid', undefined)
    }

    try {
      // Invite a customer
      await rokApiV2().post(customerApiRoutes.INVITE_CUSTOMER, payload)
      setShowDialog(true)
    } catch (error) {
      setShowDialog(false)

      // Undo the final step when any error occurred from backend to submit the form again
      dispatch({
        type: 'SET_FINISH',
        value: false
      })

      addToast(
        _.get(
          error,
          'response.data.message',
          'Something went wrong while sending invite'
        ),
        toastErrOption
      )
    }
  }

  return (
    <>
      <Wizard title="" onFinish={onFinish}>
        <StepVendorSelect
          type="customer"
          buttonText="Continue"
          name="legal_name"
          text="What is the name of your company?"
          placeholder="Type or paste your customer's legal name"
        />
        <StepSimpleText
          buttonText="Continue"
          name="contact_person"
          text="Who is the contact person?"
          titleSize="20px"
          placeholder="Type or paste email address"
          validation={(value) => !emailFormatIsInvalid(value)}
          formatValue={(value) => value.toLowerCase()}
          fontWeight="bold"
          textAlign="left"
          isRequired
          stopNavigation
        />
        <PaymentTermStep
          buttonText="Finish"
          name="terms"
          text="Do you have payment terms with this customer?"
        />
      </Wizard>
      <AlertWrapper>
        <Alert
          showDialog={showDialog}
          hasCloseButton={false}
          toggle={() => setShowDialog(false)}
          width="240px"
          height="240px"
          title="Success"
          text={'Invitation sent successfully'}
          image="https://static.alirok.io/collections/illustrations/sharing.svg"
        >
          <Flex alignSelf="center">
            <Button
              width={200}
              onClick={() => {
                setShowDialog(false)
                goToCustomerInviteList()
              }}
            >
              OK
            </Button>
          </Flex>
        </Alert>
      </AlertWrapper>
    </>
  )
}

CreateCustomer.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default CreateCustomer
