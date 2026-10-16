import React from 'react'
import HeroBanner from './HeroBanner'
import FastFacts from './FastFacts'
import ViceChancellorMessage from './ViceChancellorMessage'
import GovernanceBodies from './GovernanceBodies'
import HistoricalLegacy from './HistoricalLegacy'
import CoreStrategies from './CoreStrategies'
import StatutoryAffiliations from './StatutoryAffiliations'
import CallToAction from './CallToAction'
import CampusMasterplan from './CampusMasterplan'

const page = () => {
  return (
    <div>
      <HeroBanner />
      <FastFacts />
      <ViceChancellorMessage />
      <HistoricalLegacy />
      <GovernanceBodies />
      <CoreStrategies />
      <CampusMasterplan />
      <StatutoryAffiliations />
      <CallToAction />
    </div>
  )
}

export default page
