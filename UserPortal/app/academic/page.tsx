import HeroSection from "./heroSection"
import ProgrammeCard from './programmeCard '
import DualCareer from "./dual";
import Choice from './Choice';
import Calendar from './Calendar'
import Announcement from "../Components/ui/Announcement";
const page = () => {
  return (
    <div>
      <HeroSection/>
      <ProgrammeCard/>
      <DualCareer/>
      <Choice/>
      <Calendar/>
    </div>
  )
}

export default page