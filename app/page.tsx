import Features from '@/components/templates/features'
import Hero from '@/components/templates/hero'
import WaitingList from '@/components/templates/waiting-list'
import DoubleCardSection from '@/components/templates/DoubleCardSection'
import Explaination from '@/components/templates/Explaination'
import Engines from '@/components/templates/engines'

export default function Home() {
  return (
    <>
    
      <Hero></Hero>
      <Features></Features>
      <Engines></Engines>
      <Explaination/> 
      <DoubleCardSection/>
      <WaitingList></WaitingList>

    </>
  )
}
