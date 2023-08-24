import QuoteTemplate from '../../templates/QuoteTemplate'

import Checkout from 'components/Checkout'

export default function CheckoutPage() {
  return (
    <>
      <Checkout />
    </>
  )
}

CheckoutPage.getLayout = (page: React.ReactNode) => (
  <QuoteTemplate>{page}</QuoteTemplate>
)
