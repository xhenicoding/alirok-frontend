import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: PromiseLike<Stripe | null>
const getStripe = () => {
  if (!stripePromise && process.env.NEXT_PUBLIC_STRIPE_PK) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK)
  }
  return stripePromise
}

export default getStripe
