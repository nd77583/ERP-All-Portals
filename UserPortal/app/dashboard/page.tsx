import Banner from "./Banner";
import ErpDispatchBanner from "./ErpDispatchBanner";
import FrontDesk from "./FrontDesk";
import HeroSection from "./HeroSection";
import Infrastructure from "./Infrastructure";
import NoticeBoard from "./NoticeBoard";
import Programmes from "./Programmes";

export default function Dashboard() {
  return (
    <div className="w-full min-w-0">
      <ErpDispatchBanner />
      <HeroSection />
      <NoticeBoard />
      <Programmes />
      <FrontDesk />
      <Infrastructure />
      <Banner />
    </div>
  );
}
