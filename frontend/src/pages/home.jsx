import React from 'react'
import Hero from '../component/hero'
import LatestCollection from '../component/latestcollection'
import BestSeller from '../component/bestseller'
import OurPolicy from '../component/ourpolicy'
import NewsletterBox from '../component/newsletterbox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home