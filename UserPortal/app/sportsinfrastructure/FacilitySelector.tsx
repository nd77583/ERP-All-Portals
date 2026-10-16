"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  PersonStanding,
  Waves,
  Bike,
  Activity,
  Swords,
  BedDouble,
  SlidersHorizontal,
} from "lucide-react";

import { useSectionApi } from "@/lib/useSectionApi";

type FacilityOption = {
  id: string;
  name: string;
};

const facilitySelectorMockData: FacilityOption[] = [
  { id: "all", name: "All Arenas (6)" },
  { id: "track", name: "Track & Field" },
  { id: "aquatics", name: "Aquatics Complex" },
  { id: "cycling", name: "Velodrome & Cycling" },
  { id: "science", name: "Sports Science & Labs" },
  { id: "combat", name: "Combat & Martial Arts" },
  { id: "village", name: "Athlete Village & S&C" },
];
const facilitySelectorIcons = [LayoutGrid, PersonStanding, Waves, Bike, Activity, Swords, BedDouble];

const isCompleteFacilitySelector = (val: FacilityOption[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((f) => Boolean(f.id && f.name));
};

const FacilitySelector = () => {
  const [active, setActive] = useState("all");
  const options = useSectionApi<FacilityOption[]>(
    "sportsInfrastructure",
    "facilitySelector",
    facilitySelectorMockData,
    isCompleteFacilitySelector
  );

  return (
    <section className="w-full min-w-0 bg-[#E5EEFF] px-4 py-3 sm:px-5 md:px-6 lg:px-8">
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
          {options.map(({ id, name }, index) => {
            const Icon = facilitySelectorIcons[index % facilitySelectorIcons.length];
            return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold transition-colors hover:border-blue-950 hover:bg-[#001229] hover:text-white cursor-pointer ${
                active === id
                  ? "border-blue-950 bg-[#001229] text-white"
                  : "border-slate-200 bg-white text-[#0B1C30]"
              }`}
            >
              <Icon size={16} />
              {name}
            </button>
          ); })}
        </div>

        <button className="flex max-w-full self-start items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B1C30] transition-colors hover:border-blue-950 hover:bg-[#001229] hover:text-white cursor-pointer lg:self-auto">
          <SlidersHorizontal size={16} />
          Filtered live by MSA criteria
        </button>
      </div>
    </section>
  );
};

export default FacilitySelector;
