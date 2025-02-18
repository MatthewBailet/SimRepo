import Features from '@/components/templates/features'
import Hero from '@/components/templates/hero'
import WaitingList from '@/components/templates/waiting-list'
import DoubleCardSection from '@/components/templates/DoubleCardSection'
import Explaination from '@/components/templates/Explaination'

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Features></Features>
      <DoubleCardSection/>
      <Explaination/>
      <WaitingList></WaitingList>

    </>
  )
}
