import AquaticsComplex from "./AquaticsComplex";
import ArenaAllocation from "./ArenaAllocation";
import CampusInspection from "./campusInspection";
import FacilitySelector from "./FacilitySelector";
import HeroHeader from "./HeroHeader";
import SportsFacilities from "./SportsFacilities";
import TrackAndField from "./TrackAndField";


export default function SportsInfrastructure() {
  return (
    <div className="w-full min-w-0">
      <HeroHeader />
      <FacilitySelector />
      <TrackAndField />
      <AquaticsComplex />
      <SportsFacilities />
      <ArenaAllocation />
      <CampusInspection />
    </div>
  );
}
