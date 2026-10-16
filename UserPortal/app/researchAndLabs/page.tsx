import React from 'react'
import HeroSection from './HeroSection'
import SportsStats from './SportsStats'
import ScienceLaboratories from './ScienceLaboratories'
import NationalResearchGrants from './nationalResearchGrants'
import AcademicPublications from './AcademicPublications'
import SlotBooking from './SlotBooking'
import StatutoryCompliance from './StatutoryCompliance'

const page = () => {
  return (
    <div className="w-full min-w-0">
      <HeroSection />
      <SportsStats />
      <ScienceLaboratories />
      <NationalResearchGrants />
      <AcademicPublications />
      <SlotBooking />
      <StatutoryCompliance />
    </div>
  )
}

export default page
