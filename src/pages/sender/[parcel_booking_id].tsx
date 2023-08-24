import QuoteTemplate from '../../templates/QuoteTemplate'

import FormSender from 'components/Sender/FormSender'

export default function Sender() {
  return <FormSender />
}

Sender.getLayout = (page: React.ReactNode) => (
  <QuoteTemplate>{page}</QuoteTemplate>
)
