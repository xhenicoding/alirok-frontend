import React from 'react'
import Link from 'next/link'

import useSWR from 'swr'

import { Button, Typography, Box } from '@alirok.com/rok-ui'

import { Loader } from 'components/Loader'

import { rokApiV2 } from '../../services/rokApiV2'

import FormsTemplate from '../../templates/FormsTemplate'

import * as S from '../../styles/forms/styles'

import { useRouter } from 'next/router'

interface IParcelBooking {
  invoice_url: string
  label_url: string
  receipt_url: string
  bill_of_lading_url: string
  tracking_number: string
}

function Forms() {
  const {
    query: { parcel_booking_id }
  } = useRouter()

  const { data: parcelData, error } = useSWR<IParcelBooking>(
    [parcel_booking_id],
    async (id) => {
      const result = await rokApiV2.post(`parcel-checkout/${id}/get`)
      return result.data?.parcel
    }
  )

  if (!parcelData && !error) {
    return <Loader />
  }

  const mailto = (email?: string, subject?: string, body?: string) => {
    return `mailto:${email || ''}?subject=${
      encodeURIComponent(subject || '') || ''
    }&body=${encodeURIComponent(body || '') || ''}`
  }

  const share = () => {
    window.open(
      mailto(
        undefined,
        `Check your shipment status at Alirok.com - Tracking No. ${parcelData?.tracking_number}`,
        `
        Hi, track your shipment in the link below.

        ${window?.location?.origin}/tracking/${parcelData?.tracking_number}.

        Thank you.
        `
      )
    )
  }

  return (
    <S.Forms>
      <S.LeftSide>
        <S.Title>
          <Typography variant="h1" fontWeight="700">
            You are almost there!
          </Typography>
        </S.Title>
        <S.Text>
          <Typography variant="h2">
            Print your label, forms and attach to your shipment, make sure the
            bar code is visible and you are all set!
          </Typography>
        </S.Text>
        <Button onClick={share}>SHARE TRACKING</Button>
      </S.LeftSide>
      <S.RightSide>
        <S.Options>
          <S.Row>
            <a
              href={parcelData?.label_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                elevation="card"
                width="12.9rem"
                height="11.6rem"
                borderRadius="30px"
              >
                <S.BoxContent>
                  <Typography variant="h3" fontWeight="600">
                    LABEL
                  </Typography>
                  <S.Icon name="Shipping_label" />
                </S.BoxContent>
              </Box>
            </a>
            {parcelData?.invoice_url && (
              <a
                href={parcelData?.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  elevation="card"
                  width="12.9rem"
                  height="11.6rem"
                  borderRadius="30px"
                >
                  <S.BoxContent>
                    <Typography variant="h3" fontWeight="600">
                      INVOICE
                    </Typography>
                    <S.Icon name="Forms" />
                  </S.BoxContent>
                </Box>
              </a>
            )}
            {parcelData?.bill_of_lading_url && (
              <a
                href={parcelData?.bill_of_lading_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  elevation="card"
                  width="12.9rem"
                  height="11.6rem"
                  borderRadius="30px"
                >
                  <S.BoxContent>
                    <Typography variant="h3" fontWeight="600">
                      BILL OF LANDING
                    </Typography>
                    <S.Icon name="Forms" />
                  </S.BoxContent>
                </Box>
              </a>
            )}
          </S.Row>
          <a
            href={parcelData?.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              elevation="card"
              width="12.9rem"
              height="11.6rem"
              borderRadius="30px"
            >
              <S.BoxContent>
                <Typography variant="h3" fontWeight="600">
                  RECEIPT
                </Typography>
                <S.Icon name="receipt" />
              </S.BoxContent>
            </Box>
          </a>
        </S.Options>
        <Link href={`/tracking/${parcelData?.tracking_number}`}>
          <Button width="full">SHARE TRACKING</Button>
        </Link>
      </S.RightSide>
    </S.Forms>
  )
}

Forms.getLayout = (page: React.ReactNode) => (
  <FormsTemplate>{page}</FormsTemplate>
)

export default Forms
