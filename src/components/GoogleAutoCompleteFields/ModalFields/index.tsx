import React, { useState, SetStateAction, useEffect } from 'react'

import * as S from './styles'
import { QuoteInput } from 'components/QuoteInput'
import { Button } from '@alirok.com/rok-ui'
import { Toggle } from 'components/Toggle'
import { Address } from '../index'

interface IProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>
  onFinish: () => void
  addressFields: Address
  setAddressFields: React.Dispatch<SetStateAction<Address>>
  useAddressType?: boolean
}

export const ModalFields = ({
  setShowModal,
  onFinish,
  addressFields,
  setAddressFields,
  useAddressType
}: IProps) => {
  const [filledFields, setFilledFields] = useState<boolean>(false)

  useEffect(() => {
    if (addressFields) setFilledFields(true)
  }, [addressFields])

  const handleFields = (data: Address) => {
    setAddressFields({ ...data })
    setShowModal(false)
    onFinish()
  }

  return filledFields ? (
    <>
      <S.FormWrapper>
        <S.Form>
          {useAddressType && (
            <S.ToggleWrapper width={'285px'}>
              <Toggle
                checked={addressFields.address_type}
                onChange={(e) => {
                  setAddressFields({
                    ...addressFields,
                    address_type: e.target.value as 'RESIDENTIAL' | 'COMMERCIAL'
                  })
                }}
                name="addressType"
                items={[
                  {
                    label: 'Residential',
                    value: 'RESIDENTIAL'
                  },
                  {
                    label: 'Commercial',
                    value: 'COMMERCIAL'
                  }
                ]}
              />
            </S.ToggleWrapper>
          )}
          <S.FormRow
            columns={'1fr 1fr 1fr 1fr'}
            gap="40px"
            mobileColumns="1fr 1fr"
          >
            <S.InputWrapper maxWidth="16.1rem" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.postal_code}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    postal_code: e.target.value
                  })
                }
                label={'Zip code'}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="15.8rem" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.country}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    country: e.target.value
                  })
                }
                label={'Country'}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="16.5rem" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.state}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    state: e.target.value
                  })
                }
                label={'State'}
              />
            </S.InputWrapper>
            <S.InputWrapper maxWidth="16.5rem" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.city}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    city: e.target.value
                  })
                }
                label={'City'}
              />
            </S.InputWrapper>
          </S.FormRow>
          <S.FormRow columns={'1fr 1fr'} gap="40px">
            <S.InputWrapper maxWidth="100%" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.street}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    street: e.target.value
                  })
                }
                label={'Street'}
                maxLength={35}
              />
            </S.InputWrapper>
            <S.FormRow columns={'1fr 1fr'} gap="40px" mobileColumns="1fr 1fr">
              <S.InputWrapper maxWidth="15.8rem" maxWidthMobile="100%">
                <QuoteInput
                  width="100%"
                  defaultValue={addressFields.street_number}
                  onChange={(e) =>
                    setAddressFields({
                      ...addressFields,
                      street_number: e.target.value
                    })
                  }
                  label={'Street Number'}
                />
              </S.InputWrapper>
              <S.InputWrapper maxWidth="16.1rem" maxWidthMobile="100%">
                <QuoteInput
                  width="100%"
                  defaultValue={addressFields?.additionalAddress}
                  onChange={(e) =>
                    setAddressFields({
                      ...addressFields,
                      additionalAddress: e.target.value
                    })
                  }
                  label={'Additional'}
                  maxLength={5}
                />
              </S.InputWrapper>
            </S.FormRow>
          </S.FormRow>
          <S.FormRow columns="60% 1fr" gap="40px">
            <S.InputWrapper maxWidth="100%" maxWidthMobile="100%">
              <QuoteInput
                width="100%"
                defaultValue={addressFields.complement_address}
                label={'Complement'}
                maxLength={35}
                onChange={(e) =>
                  setAddressFields({
                    ...addressFields,
                    complement_address: e.target.value
                  })
                }
              />
            </S.InputWrapper>
            <S.ButtonWrapper>
              <Button
                width="full"
                onClick={() => {
                  handleFields(addressFields)
                }}
              >
                <S.ButtonText>{'Done'}</S.ButtonText>
              </Button>
            </S.ButtonWrapper>
          </S.FormRow>
        </S.Form>
      </S.FormWrapper>
    </>
  ) : null
}
