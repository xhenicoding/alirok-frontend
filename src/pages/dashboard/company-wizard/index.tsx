import React, { useContext, useState } from 'react'
import { Wizard } from 'components/Wizard'
import { SelectOption } from 'components/Select'

import { StepSimpleText } from 'components/Wizard/steps/textStep'
import { StepSimpleSelect } from 'components/Wizard/steps/stepSelect'
import { StepPhone } from 'components/Wizard/steps/phoneStep'
import { StepAddIcon } from 'components/Wizard/steps/stepAddIcon'
import { StepAddress } from 'components/Wizard/steps/addressStep'
import { rokApiV2 } from 'services/rokApiV2'
import axios from 'axios'
import { arrayBufferToBase64, mountImageFile } from 'scripts/imageFile'
import useSWR from 'swr'
import { useAuth } from '../../../hooks/useAuth'
import { Alert, Button } from '@alirok.com/rok-ui'
import { objectHasFalseValues } from 'scripts/validateData'
import * as S from 'styles/company-wizard/styles'
import { useRouter } from 'next/router'
import { emailFormatIsInvalid } from 'scripts/validateEmail'
import { humanizeName } from 'scripts/format'
import SidebarTemplate from 'templates/SidebarTemplate'
import { Context } from 'context'

interface CompanyRoute {
  name: string
  route: string
}

interface CompanyType {
  company_type_uuid: string
  display: boolean
  name: string
}

interface CompanyData {
  company_uuid: string
  company_types: {
    name: string
  }
}

interface ResponseData {
  name: string
  value: string
}

export default function CompanyWizard() {
  const { dispatch } = useContext(Context)
  const [image, setImage] = React.useState<string>()
  const [fileLogo, setFileLogo] = useState<Blob>()
  const [companyTypes, setCompanyTypes] = useState<SelectOption[]>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [titleError, setTitleError] = useState<string>()
  const [showFailMessage, setShowFailMessage] = useState<boolean>(false)
  const { user } = useAuth()
  const { push } = useRouter()

  async function handleFile(file: Blob | undefined, companyUuid?: string) {
    if (file) {
      const { resizedBinaryStr } = await mountImageFile({ file })

      setFileLogo(file)

      const base64String = arrayBufferToBase64(resizedBinaryStr)

      const visibleImage = `data:${file.type};base64, ${base64String}`

      setImage(visibleImage)

      if (companyUuid) {
        const data = {
          company_uuid: companyUuid,
          file: {
            type: file?.type,
            field: 'logo'
          }
        }

        try {
          const fileData = (
            await rokApiV2.post(`customer/accounts/companies/updateImage`, data)
          )?.data

          await axios.put(fileData.signedRequest, resizedBinaryStr, {
            headers: {
              'Content-type': file?.type
            }
          })
        } catch (error) {
          console.error(error)
        }
      }

      return visibleImage
    }
  }

  useSWR<CompanyType[]>(
    () => 'company-types',
    async (path) => {
      const response = await rokApiV2.get(path)
      return response.data
    },
    {
      onSuccess: (data) => {
        const filter = data.map((item) => {
          return {
            label: item.name,
            value: item.company_type_uuid
          }
        })

        if (data) {
          setCompanyTypes(filter)
        }
      }
    }
  )

  function formatResponse(response: ResponseData[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formObj: any = {}
    response.forEach((item: ResponseData) => {
      item.name ? (formObj[item.name] = item.value) : null
    })

    return formObj
  }

  async function handleCompanyTypes(company: CompanyData) {
    const route = companyTypeRoutes?.find(
      (item) => company?.company_types?.name === item?.name
    )?.route

    await rokApiV2.post(`/${route}`, {
      company_uuid: company.company_uuid
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onFinish(currentState: any) {
    const data = formatResponse(currentState)

    delete data['logo']
    const dataWithVerifyAddress = {
      ...data,
      headquarter_address: data.headquarter_address != null
    }

    if (objectHasFalseValues(dataWithVerifyAddress)) {
      setTitleError('Missing data')
      setErrorMessage('You need to complete all fields')
      setShowFailMessage(true)
      return
    }

    try {
      const companyData = await rokApiV2.post('/customer/accounts/companies', {
        user_uuid: user?.user_uuid,
        ...data
      })

      handleFile(fileLogo, companyData.data.company_uuid)

      await handleCompanyTypes(companyData.data)

      dispatch({
        type: 'RESET_WIZARD'
      })

      push('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.message === 'Duplicated company data') {
        setTitleError(' This company already exist')
        setErrorMessage(
          'Is this your company? Contact us at alirok@alirok.com.'
        )
      } else {
        setTitleError('An error has occurred')
        setErrorMessage('Ops there was an error')
      }
      setShowFailMessage(true)
    }
  }

  const companyTypeRoutes: CompanyRoute[] = [
    {
      name: 'Airline',
      route: 'airlines'
    },
    {
      name: 'Importer',
      route: 'importers'
    },
    {
      name: 'Third-party',
      route: 'third-parties'
    },
    {
      name: 'Freight Forwarder',
      route: 'forwarders'
    },
    {
      name: 'Exporter',
      route: 'exporters'
    },
    {
      name: ' Shipping Line',
      route: 'shipping-lines'
    },
    {
      name: 'GSA',
      route: 'general-sale-agents'
    },
    {
      name: 'Warehouse (3PL)',
      route: 'warehouse-3pls'
    },
    {
      name: 'Trucking',
      route: 'truckings'
    }
  ]

  const fail = (
    <S.AlertWrapper>
      <Alert
        showDialog={showFailMessage}
        hasCloseButton={false}
        toggle={() => null}
        title={titleError}
        text={errorMessage}
        image="https://static.alirok.io/collections/illustrations/company_error.svg"
        width="200px"
        buttons={
          <Button width={200} onClick={() => setShowFailMessage(false)}>
            OK
          </Button>
        }
      />
    </S.AlertWrapper>
  )

  return (
    <>
      <Wizard title="" onFinish={onFinish}>
        <StepSimpleText
          buttonText="Continue"
          name="legal_name"
          text="What is the name of your company?"
          placeholder="Type your company legal name"
          validation={(value) => !!value}
          isRequired
          stopNavigation
          formatValue={humanizeName}
        />
        <StepSimpleText
          buttonText="Continue"
          name="fantasy_name"
          text="What is the fantasy name of your company?"
          placeholder="Type your company fantasy name"
          validation={(value) => !!value}
          isRequired
          stopNavigation
          maxLength={20}
          formatValue={humanizeName}
        />
        <StepSimpleText
          buttonText="Continue"
          name="email"
          text="What is the email of your company?"
          placeholder="Type your company email"
          validation={(value) => !emailFormatIsInvalid(value)}
          formatValue={(value) => value.toLowerCase()}
          isRequired
          stopNavigation
        />
        <StepSimpleText
          buttonText="Continue"
          name="tax_id"
          text="What is your tax id?"
          placeholder="Type your company tax id"
          validation={(value) => !!value}
          isRequired
          stopNavigation
          formatValue={humanizeName}
        />
        <StepSimpleSelect
          buttonText="Continue"
          name="company_type_uuid"
          options={companyTypes}
          text="What is your Company type?"
          placeholder="Select the type of your company"
          validation={(value) => !!value}
          isRequired
          stopNavigation
        />
        <StepAddress
          buttonText="Continue"
          name="headquarter_address"
          text="What is the address of your company?"
          placeholder="Type your company address"
          validation={(value) => value != null}
          isRequired
          stopNavigation
        />
        <StepPhone
          buttonText="Continue"
          name="phone"
          text="What is your phone number?"
          validation={(value) => value != null}
          isRequired
          stopNavigation
        />
        <StepAddIcon
          buttonText="Finish"
          name="logo"
          text="What is your company logo?"
          legend="Add Logo"
          image={image}
          handleFile={handleFile}
        />
      </Wizard>
      {fail}
    </>
  )
}

CompanyWizard.getLayout = (page: React.ReactNode) => (
  <SidebarTemplate>{page}</SidebarTemplate>
)
