import { useState } from 'react'

import * as S from './style'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Button, Avatar, Icon, Alert } from '@alirok.com/rok-ui'
import { Select, SelectOption } from 'components/Select'
import { useForm, Controller } from 'react-hook-form'
import { QuoteInput } from 'components/QuoteInput'
import { CreatePassword } from 'components/CreatePasswordAlert'

import { rokApiV2 } from 'services/rokApiV2'
import {
  GoogleAutoCompleteFields,
  Address
} from 'components/GoogleAutoCompleteFields'

import DotsLoader from 'components/DotsLoader'
import useSWR from 'swr'
import { DragAndDropFile } from 'components/DragAndDrop'
import { mountImageFile, arrayBufferToBase64 } from 'scripts/imageFile'
import axios from 'axios'

interface CompanyType {
  company_type_uuid: string
  display: boolean
  name: string
}

interface CompanyRoute {
  name: string
  route: string
}

interface Member {
  user_uuid?: string
  parcel_member_uuid?: string
  first_name: string
  last_name: string
  address: Address
  email: string
  phone: {
    countryCode: string | undefined
    dialCode?: string
    number: string
  }
  tax_id: string | undefined
  company_name: string | undefined
  company_uuid?: string | undefined
  parent: string
}

interface Phone {
  phone: string
  dialCode: string
  countryCode: string
}

interface Company {
  legal_name: string
  fantasy_name: string
  headquarter_address: Address
  email: string
  phone: {
    countryCode: string | undefined
    dialCode?: string
    number: string
  }
  tax_id: string | undefined
  company_type_uuid: string | undefined
}

interface CompanyData {
  company_uuid: string
  company_types: {
    name: string
  }
}

interface UserData {
  user_uuid: string
  email: string
}

interface IProps {
  from?: string
  memberData: Member
}

export default function CompanyForm({ from, memberData }: IProps) {
  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [companyTypes, setCompanyTypes] = useState<SelectOption[]>()
  const [companyData, setCompanyData] = useState<Company>()
  const [companyType, setCompanyType] = useState<SelectOption | null>(null)
  const [showFailMessage, setShowFailMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [titleError, setTitleError] = useState<string>()
  const [logo, setLogo] = useState<string | ArrayBuffer | null | undefined>('')
  const [fileLogo, setFileLogo] = useState<Blob>()

  const schema = yup.object({
    legal_name: yup.string().required('Legal name is required'),
    fantasy_name: yup.string().required('Fantasy name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup.object({
      countryCode: yup.string().required('Country code is required'),
      number: yup.string().required('Phone is required')
    }),
    tax_id: yup.string().required(),
    company_type_uuid: yup.string().required('Company type is required')
  })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm<Company>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      legal_name: memberData?.company_name || '',
      fantasy_name: memberData?.company_name || '',
      email: memberData?.email || '',
      company_type_uuid: '',
      phone: {
        countryCode: memberData?.phone?.countryCode || '',
        number: memberData?.phone?.number || ''
      },
      tax_id: memberData?.tax_id || '',
      headquarter_address: {
        postal_code: memberData.address.postal_code || '',
        country: memberData.address.country || '',
        state: memberData.address.state || '',
        street: memberData.address.street || '',
        street_number: memberData.address.street_number || '',
        city: memberData.address.city || '',
        address_type: memberData.address.address_type || 'RESIDENTIAL',
        additionalAddress: memberData.address.additionalAddress || '',
        complement_address: memberData.address.complement_address || '',
        address: memberData.address.address || ''
      }
    }
  })

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

  function handleCompanyTypes(company: CompanyData) {
    const route = companyTypeRoutes?.find(
      (item) => company?.company_types?.name === item?.name
    )?.route

    rokApiV2.post(`/${route}`, {
      company_uuid: company.company_uuid
    })
  }

  const onSubmit = async (data: Company) => {
    setCompanyData(data)
    setShowPasswordAlert(true)
  }

  const handleAccount = async (user: UserData) => {
    try {
      setLoading(true)
      if (!companyData) {
        setLoading(false)
        return
      }

      const userUUID = from === 'invite' ? memberData.user_uuid : user.user_uuid

      const formatData = {
        ...companyData,
        company_uuid: memberData.company_uuid || undefined,
        phone: {
          prefix: `+${companyData.phone.dialCode || '1'}`,
          countryCode: companyData.phone.countryCode,
          number: companyData.phone.number
        }
      }

      const resp = await rokApiV2.post(
        `/customer/accounts/companies/${userUUID}/user`,
        {
          ...formatData
        }
      )

      if (from !== 'invite') {
        await rokApiV2.post(
          `customer/accounts/members/update/${memberData.parcel_member_uuid}`,
          { company_uuid: resp.data.company_uuid }
        )
      }

      await handleFile(fileLogo, resp.data.company_uuid)
      handleCompanyTypes(resp.data)
      setLoading(false)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || ''

      if (errMsg === 'Duplicated company data') {
        setTitleError('This company already exist')
        setErrorMessage(
          'Is this your company? Contact us at alirok@alirok.com.'
        )
      } else if (errMsg.slice(0, 5) === 'exist') {
        const parts = errMsg.split('_')
        setTitleError(`${parts[1]} already exist`)
        setErrorMessage(`Please check your company ${parts[1]}.`)
      } else {
        setTitleError('An error has occurred')
        setErrorMessage('Please check company information')
      }
      setShowFailMessage(true)

      return true
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

  async function handleFile(file: Blob | undefined, companyUuid?: string) {
    if (file) {
      const { resizedBinaryStr } = await mountImageFile({ file })

      setFileLogo(file)

      const base64String = arrayBufferToBase64(resizedBinaryStr)

      setLogo(`data:${file.type};base64, ${base64String}`)

      if (!companyUuid) {
        return
      }

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
  }

  const fail = (
    <S.AlertWrapper>
      <Alert
        showDialog={showFailMessage}
        hasCloseButton={true}
        toggle={() => setShowFailMessage((old) => !old)}
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

  const dragAndDrop = (
    <DragAndDropFile
      multiple={false}
      kind="clean"
      accept="image/jpeg, image/jpg, image/png"
      handleFile={(file) => {
        handleFile(file)
      }}
    >
      <S.AvatarWrapper>
        <Avatar shape="circle" size={80} elevation="card" border={true}>
          {!logo ? (
            <S.DefaultAvatar>
              <Icon name="briefcase" color="gradient" />
            </S.DefaultAvatar>
          ) : (
            <S.DefaultAvatar>
              <img src={logo as string} alt="logo" />
            </S.DefaultAvatar>
          )}
        </Avatar>
        <S.CircleAvatar>
          <Icon name="plus-icon" width="15px" height="15px" color={'black'} />
        </S.CircleAvatar>
      </S.AvatarWrapper>
    </DragAndDropFile>
  )

  return (
    <>
      <S.Container>
        <S.Content>
          <S.InformationContainer>
            <S.CompanyForm onSubmit={handleSubmit(onSubmit)}>
              <S.ProfileSection>{dragAndDrop}</S.ProfileSection>
              <S.FormMember>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="Company legal name"
                    id="legal_name"
                    error={errors?.legal_name?.message}
                    {...register('legal_name')}
                  />
                </S.Row>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="Fantasy name"
                    id="fantasy_name"
                    error={errors?.fantasy_name?.message}
                    {...register('fantasy_name')}
                  />
                  <QuoteInput
                    width="100%"
                    label={'Tax id'}
                    id="tax_id"
                    error={errors?.tax_id?.message}
                    {...register('tax_id')}
                  />
                  <Select
                    label="Company types"
                    value={companyType}
                    placeholder="Select company type"
                    options={companyTypes}
                    error={errors?.company_type_uuid?.message}
                    onChange={(option) => {
                      if (option && !Array.isArray(option)) {
                        setValue('company_type_uuid', option.value)
                        const type = companyTypes?.find(
                          (item) =>
                            item.value === getValues('company_type_uuid')
                        )
                        type && setCompanyType(type)
                      }
                    }}
                  />
                </S.Row>
                <S.Row>
                  <S.AddressContainer>
                    <GoogleAutoCompleteFields
                      onResult={(e: Address | null) => {
                        if (e) setValue('headquarter_address', e)
                      }}
                      placeholder={'Type your address'}
                      label="Address"
                      useAddressType={true}
                      defaultValue={getValues('headquarter_address')}
                    />
                  </S.AddressContainer>
                </S.Row>
                <S.Row>
                  <QuoteInput
                    width="100%"
                    required={true}
                    label="Email"
                    id="email"
                    error={errors?.email?.message}
                    {...register('email')}
                  />
                  <S.PhoneInputWrapper>
                    <S.LabelPhone>
                      Phone <S.Required>*</S.Required>
                    </S.LabelPhone>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          country={getValues('phone').countryCode || 'us'}
                          countryCodeEditable={false}
                          value={value && value.number}
                          onChange={(
                            phone,
                            { dialCode, countryCode }: Phone
                          ) => {
                            onChange({
                              dialCode: dialCode,
                              countryCode: countryCode,
                              number: phone
                            })
                          }}
                        />
                      )}
                    />
                    {errors?.phone && <S.Error>Phone is required</S.Error>}
                  </S.PhoneInputWrapper>
                  <S.ButtonWrapper>
                    <Button width="full">
                      {loading ? <DotsLoader /> : "It's correct"}
                    </Button>
                  </S.ButtonWrapper>
                </S.Row>
              </S.FormMember>
            </S.CompanyForm>
          </S.InformationContainer>
        </S.Content>
      </S.Container>{' '}
      {showPasswordAlert && (
        <CreatePassword
          from={from}
          email={getValues('email') || ''}
          activeAccount={getValues('email') === memberData.email}
          showPasswordDialog={showPasswordAlert}
          setShowPasswordDialog={setShowPasswordAlert}
          createCompany={handleAccount}
        />
      )}
      {fail}
    </>
  )
}
