import HomeTemplate from '../templates/HomeTemplate'

import { HeroSection } from '../components/HeroSection'
import { DemoSection } from '../components/DemoSection'
import { HowTo } from '../components/HowTo'
import { FavoriteCarriers } from 'components/FavoriteCarriers'
import { AlirokIsForEveryone } from 'components/AlirokIsForEveryone'
import { Review } from '../components/Review'
import React from 'react'

export default function Home() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <HowTo />
      <FavoriteCarriers />
      <AlirokIsForEveryone />
      <Review />
    </>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeTemplate>{page}</HomeTemplate>
