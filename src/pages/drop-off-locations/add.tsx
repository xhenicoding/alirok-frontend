import React, { useEffect, useState, useContext } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { Options as ToastOptions, useToasts } from 'react-toast-notifications'
import SidebarTemplate from 'templates/SidebarTemplate'
import { Wizard } from '../../components/Wizard'
import rokApiV2 from '../../services/rokApiV2'
import { Context } from '../../context/index'
import { AlertWrapper } from '../../components/CompanyForm/style'
import { Alert, Button } from '@alirok.com/rok-ui'
import Flex from '../../components/Flex'
import { dropOffLocationsAppRoutes } from 'helpers/appRoutes'
import { IPhone } from 'interfaces/global.interface'
import {
  IWarehouseTypes,
  IModals,
  MultiSelectData,
  IFetchWarehouse,
  ICarrierVendor
} from 'interfaces/dropOffLocation.interface'
import {
  warehouseTypesApiRoute,
  modalsApiRoute,
  dropOffLocationApiRoute
} from 'helpers/apiRoutes'
import { StepWarehouseType } from '../../components/Wizard/steps/warehouseTypeStep'
import { StepMultiSelect } from 'components/Wizard/steps/multiSelectStep'
import { StepSimpleText } from 'components/Wizard/steps/textStep'
import { StepAddress } from 'components/Wizard/steps/addressStep'
import { StepOperationHours } from 'components/Wizard/steps/operationHoursStep'
import { StepAppointmentPickup } from 'components/Wizard/steps/appointmentPickupStep'
import { StepEmailPhone } from 'components/Wizard/steps/emailPhoneStep'
import { IOperationHours } from 'components/OperationHours/operationHours.interface'
import { convertTime } from 'helpers/global.helper'

const AddDropOffLocation = () => {
  // Hooks
  const { addToast } = useToasts()
  const { push, query } = useRouter()
  const { state, dispatch } = useContext(Context)

  // States
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [warehouseSelectedData, setWarehouseSelectedData] =
    useState<IFetchWarehouse>({} as IFetchWarehouse)
  const [warehouseTypes, setWarehouseTypes] = useState<IWarehouseTypes[]>([])
  const [modalsTypesList, setModalsTypesList] = useState<MultiSelectData[]>([])
  const [carrierVendorList, setCarrierVendorList] = useState<MultiSelectData[]>(
    []
  )

  // Variables
  const editMode = query.drop_off_location_uuid ? true : false
  const isCompanySelected = state.general.isCompanySelected
  const toastErrOption: ToastOptions = {
    appearance: 'error',
    autoDismiss: true
  }

  const goToDropOffLocations = () =>
    push(dropOffLocationsAppRoutes.DROP_OFF_LOCATIONS_LIST)

  // Hook, mount
  useEffect(() => {
    ;(async () => {
      // Fetch edit data for current warehouse
      if (editMode) {
        // Wait for an edit mode
        try {
          const { data } = await rokApiV2().get<IFetchWarehouse>(
            dropOffLocationApiRoute.FETCH(
              query.drop_off_location_uuid as string
            )
          )
          setWarehouseSelectedData(data)

          setCarrierVendorList(() =>
            data.drop_off_location_carrier_companies.map((row) => ({
              label: row.label,
              value: row.value,
              avatar: row.logo
            }))
          )
        } catch (error) {
          addToast(
            _.get(
              error,
              'response.data.message',
              'Something went wrong while fetching location'
            ),
            toastErrOption
          )
          goToDropOffLocations()
        }
      }

      // Fetch warehouse type
      rokApiV2()
        .get<IWarehouseTypes[]>(warehouseTypesApiRoute.LIST)
        .then(({ data }) => setWarehouseTypes(data))

      // Fetch modals
      rokApiV2()
        .get<IModals[]>(modalsApiRoute.LIST)
        .then(({ data }) =>
          setModalsTypesList(() =>
            data.map((row) => ({
              label: row.name,
              value: row.modal_uuid
            }))
          )
        )

      // Fetch vendors
      rokApiV2()
        .get<ICarrierVendor[]>(dropOffLocationApiRoute.CARRIER_VENDORS)
        .then(({ data }) =>
          setCarrierVendorList(() =>
            data.map((row) => ({
              label: row.legal_name,
              value: row.company_uuid,
              avatar: row.logo
            }))
          )
        )
    })()

    return () => {
      dispatch({
        type: 'RESET_WIZARD'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (stepData: any) => {
    if (!isCompanySelected) {
      addToast('Please select company', toastErrOption)
    }

    let operationalHours = _.get(stepData, '[5].value', []) || []

    if (Array.isArray(operationalHours)) {
      operationalHours = operationalHours.map((row: IOperationHours) => ({
        day_name: row.day_name,
        opening_time: convertTime(`${row.opening_time} ${row.opening_am_pm}`),
        closing_time: convertTime(`${row.closing_time} ${row.closing_am_pm}`),
        closed: row.closed
      }))
    }

    const additionalInstructions = String(_.get(stepData, '[8].value', ''))

    if (additionalInstructions.length > 500) {
      addToast(
        'Additional instructions should be less than 500 characters',
        toastErrOption
      )
      // Undo the final step when any error occurred from backend to submit the form again
      dispatch({
        type: 'SET_FINISH',
        value: false
      })
      return
    }

    const payload: Record<
      string,
      string | number | string[] | Record<string, string>
    > = {
      name: _.get(stepData, '[3].value', undefined),
      modal_uuids: _.get(stepData, '[1].value', undefined),
      warehouse_type_uuid: _.get(stepData, '[0].value', undefined),
      carrier_company_uuids: _.get(stepData, '[2].value', undefined),
      location_address: {
        country: _.get(stepData, '[4].value.country', undefined),
        state: _.get(stepData, '[4].value.state', undefined),
        city: _.get(stepData, '[4].value.city', undefined),
        postal_code: _.get(stepData, '[4].value.postal_code', undefined),
        address: _.get(stepData, '[4].value.address', undefined),
        street: _.get(stepData, '[4].value.street', undefined),
        street_number: _.get(stepData, '[4].value.street_number', undefined),
        raw_address: _.get(stepData, '[4].value.rawValue', {}),
        complement_address: _.get(
          stepData,
          '[4].value.additionalAddress',
          undefined
        )
      },
      appointment_type: _.get(stepData, '[6].value', undefined),
      email: _.get(stepData, '[7].value.email', undefined),
      phone: {
        countryCode: _.get(stepData, '[7].value.phone.countryCode', undefined),
        prefix: _.get(stepData, '[7].value.phone.prefix', undefined),
        number: _.get(stepData, '[7].value.phone.number', undefined)
      },
      operational_hours: operationalHours,
      additional_instructions: additionalInstructions
    }

    if (editMode) {
      payload['drop_off_location_uuid'] = query.drop_off_location_uuid as string
    }

    try {
      // Create a location
      await rokApiV2().post(dropOffLocationApiRoute.CREATE, payload)
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
          'Something went wrong while adding a location'
        ),
        toastErrOption
      )
    }
  }

  return (
    <>
      <Wizard title="" onFinish={onFinish}>
        <StepWarehouseType
          buttonText="Continue"
          text="What is type of warehouse?"
          defaultValue={warehouseSelectedData.warehouse_type_uuid}
          name="warehouse_type"
          warehouseTypes={warehouseTypes}
        />
        <StepMultiSelect
          buttonText="Continue"
          text="Select the modals that apply"
          defaultValue={warehouseSelectedData.drop_off_location_modals}
          name="modals"
          toggleLabel="All modals"
          listData={modalsTypesList}
        />
        <StepMultiSelect
          buttonText="Continue"
          multiSelectWidth="400px"
          text="Is this a delivery address used when shipping with a specific carrier(s)? Select all that apply"
          defaultValue={
            warehouseSelectedData.drop_off_location_carrier_companies
          }
          name="carriers_vendors"
          toggleLabel="All Carriers, Vendors"
          listData={carrierVendorList}
          avatar={true}
        />
        <StepSimpleText
          buttonText="Continue"
          textAlign="left"
          border="1px"
          name="warehouse_name"
          titleSize="20px"
          fontWeight="bold"
          text="Warehouse name"
          placeholder="Type your warehouse name"
          defaultValue={warehouseSelectedData.name}
          validation={(value) => !!value}
          isRequired
          stopNavigation
        />
        <StepAddress
          buttonText="Continue"
          name="address"
          text="Type the complete address"
          placeholder="Type your address"
          locationAddress={warehouseSelectedData.location_address}
          validation={(value) => value != null}
          isRequired
          stopNavigation
        />
        <StepOperationHours
          buttonText="Continue"
          text="What are the days and hours of operation?"
          defaultValue={
            warehouseSelectedData.drop_off_location_opening_hours as IOperationHours[]
          }
          name="operation_hours"
        />
        <StepAppointmentPickup
          buttonText="Continue"
          text="Does this location requires appointment to pick up or deliver cargo?"
          name="appointment_pickup"
          defaultValue={warehouseSelectedData.appointment_type}
        />
        <StepEmailPhone
          buttonText="Continue"
          text="What is the email and phone number to make the appointment?"
          name="email_phone"
          defaultValue={{
            email: warehouseSelectedData.email,
            phone: warehouseSelectedData.phone as IPhone
          }}
        />
        <StepSimpleText
          buttonText="SAVE ADDRESS"
          textAlign="left"
          border="1px"
          name="additional_instructions"
          defaultValue={warehouseSelectedData.additional_instructions}
          titleSize="20px"
          text="Is there any additional instructions to deliver to this location?"
          subTitleText="Ex: Driver must be have STA (TSA approved)"
          placeholder=""
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
          text={`Warehouse ${editMode ? 'updated' : 'added'} successfully`}
          image="https://static.alirok.io/collections/illustrations/sharing.svg"
        >
          <Flex alignSelf="center">
            <Button
              width={200}
              onClick={() => {
                setShowDialog(false)
                goToDropOffLocations()
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

AddDropOffLocation.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)

export default AddDropOffLocation
