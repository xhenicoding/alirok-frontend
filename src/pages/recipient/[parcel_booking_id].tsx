import QuoteTemplate from '../../templates/QuoteTemplate'

import FormRecipient from '../../components/Recipient/FormRecipient'

export default function Recipient() {
  return (
    <>
      <FormRecipient />
    </>
  )
}

Recipient.getLayout = (page: React.ReactNode) => (
  <QuoteTemplate>{page}</QuoteTemplate>
)
