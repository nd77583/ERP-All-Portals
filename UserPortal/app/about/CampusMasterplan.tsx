"use client";

import { Building2, Compass, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import { useSectionApi } from "@/lib/useSectionApi";

const campusMasterplanMockData = {
  heading: "Campus Ecosystem & World-Class Facilities",
  eyebrow: "MULTI-CAMPUS ARCHITECTURE",
  description:
    "Spanning historic sovereign grounds, state-of-the-art training gymnasiums, and a massive 250-acre greenfield Olympic city.",
  address: "Patiala, Punjab, PIN: 147001",
  locations: [
    {
      id: "mohindra",
      title: "Mohindra Kothi Campus",
      category: "ADMINISTRATIVE CITADEL",
      image: "/about/campus_img1.png",
      description:
        "Lower Mall Road, Patiala. Houses the Chancellor's Protocol, Vice-Chancellor's Secretariat, Registrar's Office, Statutory Board Rooms, and the Central Sports Library.",
      features: ["VC Chambers", "ERP Server Core", "Syndicate Hall"],
      action: "View Building Blueprint",
    },
    {
      id: "gymnasium",
      title: "Gymnasium Road Training Complex",
      category: "HIGH-PERFORMANCE TRAINING",
      image: "/about/campus_img2.png",
      description:
        "Dedicated training grounds for track and field athletics, weightlifting arenas, sports psychology pods, and the apex Human Performance & VO2 Max Testing Lab.",
      features: ["3D MoCap Lab", "Strength Hall", "Cryo Rehab"],
      action: "Lab Equipment Inventory",
    },
    {
      id: "olympic-city",
      title: "New Olympic City Campus",
      category: "UPCOMING 250-ACRE CITY",
      image: "/about/campus_img3.png",
      description:
        "Masterplanned sovereign campus featuring an Olympic synthetic velodrome, FINA aquatic center, 10,000-seat athletic stadium, student athlete villages, and research institutes.",
      features: ["Olympic Velodrome", "Aquatic Center", "Hostel Towers"],
      action: "Phase II Construction Status",
    },
  ],
  map: {
    title: "Geographic Campus Distribution • Patiala Cluster",
    badge: "GIS GEOCODED",
    src: "https://maps.google.com/maps?q=Maharaja%20Bhupinder%20Singh%20Punjab%20Sports%20University%20Patiala&z=13&output=embed",
  },
};
const campusActionPresentation = {
  mohindra: { icon: Eye, className: "bg-[#E5EEFF] text-[#001229]" },
  gymnasium: { icon: Eye, className: "bg-[#E5EEFF] text-[#001229]" },
  "olympic-city": { icon: Building2, className: "bg-[#001229] text-white" },
} as const;

const isCompleteMasterplan = (val: typeof campusMasterplanMockData): boolean => {
  return Boolean(
    val &&
    typeof val.heading === "string" &&
    Array.isArray(val.locations) && val.locations.length > 0 &&
    val.map && typeof val.map.src === "string"
  );
};

export default function CampusMasterplan() {
  const data = useSectionApi<typeof campusMasterplanMockData>(
    "about",
    "campusMasterplan",
    campusMasterplanMockData,
    isCompleteMasterplan
  );
  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="flex w-full min-w-0 flex-col gap-5">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
              {data.eyebrow}
            </span>
            <h2 className="mt-1 text-[22px] sm:text-[24px] font-bold text-[#001229]">
              {data.heading}
            </h2>
            <span className="mt-1 block text-[12px] sm:text-[13px] text-[#44474D]">
              {data.description}
            </span>
          </div>
          <div className="flex min-w-0 items-start gap-1.5 sm:shrink-0 sm:items-center">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#904D00] sm:mt-0" />
            <span className="break-words text-[12px] font-medium text-[#44474D]">
              {data.address}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.locations.map((campus) => {
            const { icon: ActionIcon, className } =
              campusActionPresentation[
                campus.id as keyof typeof campusActionPresentation
              ];
            return (
              <article
                key={campus.title}
                className="flex flex-col overflow-hidden rounded-[8px] bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
              >
                <div className="flex-1">
                  <div className="relative">
                    <Image
                      src={campus.image}
                      alt={campus.title}
                      width={600}
                      height={300}
                      className="block h-[220px] w-full object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold tracking-[0.5px] text-white bg-[#001229] px-2 py-1 rounded-[2px]">
                      {campus.category}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[16px] font-bold text-[#001229]">
                      {campus.title}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#44474D]">
                      {campus.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {campus.features.map((feature) => (
                        <span
                          key={feature}
                          className="bg-[#E5EEFF] px-2 py-1 rounded-[2px] text-[12px] font-medium text-[#0B1C30]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className={`mx-3.5 mb-3.5 flex items-center justify-center py-2 rounded-[2px] gap-2 text-[11px] font-semibold ${className}`}
                >
                  <ActionIcon className="w-4 h-4" />
                  {campus.action}
                </button>
              </article>
            );
          })}
        </div>
        <div className="rounded-[8px] bg-white p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="flex min-w-0 flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-1.5">
              <Compass className="h-4 w-4 shrink-0 text-[#904D00]" />
              <span className="break-words text-[16px] font-bold text-[#001229]">
                {data.map.title}
              </span>
              </div>
            <span className="max-w-full break-words rounded-[2px] bg-[#E5EEFF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
              {data.map.badge}
            </span>
          </div>
          <div className="mt-2.5 h-[235px] overflow-hidden rounded-[4px] bg-[#E5E9F0]">
            <iframe
              title={data.map.title}
              src={data.map.src}
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
