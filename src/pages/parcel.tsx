import { HeroSection } from '../components/HeroSection'

import QuoteTemplate from '../templates/QuoteTemplate'

export default function Parcel() {
  return (
    <>
      <HeroSection withoutSearchBar />
    </>
  )
}

Parcel.getLayout = (page: React.ReactNode) => (
  <QuoteTemplate>{page}</QuoteTemplate>
)
