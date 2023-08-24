import { Elements } from '@stripe/react-stripe-js'
import getStripe from 'services/stripe'

interface IProps {
  children: React.ReactNode
}

type StripeTheme = 'stripe' | 'night' | 'none' | undefined

const stripeTheme = {
  fonts: [
    {
      cssSrc:
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap'
    }
  ],
  appearance: {
    theme: 'stripe' as StripeTheme,

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#1E1E1E',
      colorDanger: '#df1b41',
      fontFamily: 'Montserrat, sans-serif',
      fontSizeBase: '1.4rem',
      spacingUnit: '0.2rem',
      borderRadius: '1rem'
    }
  }
}

export default function StripePayment({ children }: IProps) {
  const stripePromise = getStripe()

  return (
    <Elements options={stripeTheme} stripe={stripePromise}>
      {children}
    </Elements>
  )
}
