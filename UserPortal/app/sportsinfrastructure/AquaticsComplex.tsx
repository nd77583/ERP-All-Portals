"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const aquaticsComplexMockData = {
  specs: [
    "Basin Geometry: 50.025m x 25.00m x 3.00m continuous depth, zero-wave gutter absorption.",
    "Underwater Motion Capture: 8 synchronized 240 FPS underwater high-speed optical portals for stroke efficiency index scoring.",
    "Water Purification: Advanced low-chlorine regenerative Ozone + UV-C purification cycle maintaining 26.5°C ± 0.5°C.",
    "Omega Timing: Quantum Aquatic Timer, OSV9 touchpads, and virtual false-start acoustic lane pods.",
  ],
  stats: [
    { label: "Temp", value: "26.4 °C" },
    { label: "pH Level", value: "7.22 pH" },
    { label: "Turbidity", value: "<0.08 NTU" },
  ],
  pavilionCode: "ARENA-AQ-02",
  approvalStatus: "World Aquatics (FINA) Approved",
  title: "50m 10-Lane Olympic Swimming & Diving Complex",
  description:
    "Featuring an indoor, climate-controlled 50m x 25m competition basin with motorized floating bulkhead dividers. Equipped with deep underwater observation galleries fitted with optical refractive glass for high-velocity underwater hydrodynamic kinematic capture.",
};

const isCompleteAquatics = (val: typeof aquaticsComplexMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.specs) && val.specs.length > 0 &&
    Array.isArray(val.stats) && val.stats.length > 0 &&
    typeof val.title === "string" && val.title.trim().length > 0
  );
};

const AquaticsComplex = () => {
  const data = useSectionApi<typeof aquaticsComplexMockData>(
    "sportsInfrastructure",
    "aquaticsComplex",
    aquaticsComplexMockData,
    isCompleteAquatics
  );

  return (
    <section className="w-full min-w-0 bg-[#F8F9FF] px-4 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] lg:grid-cols-12">
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] w-full lg:col-span-7 order-1 lg:order-2">
          <Image
            src="/sportsInfrastructure/aquaticComplex.png"
            alt="Aquatic Complex"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />

          <div className="absolute right-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-[4px] bg-[#001229] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
              FINA Competition Grade
            </span>
            <span className="rounded-[4px] bg-[#002D1C] px-2.5 py-1 text-[10px] font-bold uppercase text-[#6FFBBE]">
              Sub-Aquatic Telemetry Active
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-4 p-4 sm:p-5 lg:p-6 lg:col-span-5 order-2 lg:order-1">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="text-[10px] font-bold uppercase text-[#904D00]">
                Pavilion Code: {data.pavilionCode}
              </span>
              <span className="rounded-[2px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-semibold text-[#001229]">
                {data.approvalStatus}
              </span>
            </div>

            <h2 className="text-[20px] font-bold leading-tight text-[#001229]">
              {data.title}
            </h2>

            <p className="text-[13px] text-[#44474D]">
              {data.description}
            </p>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase text-[#001229]">
                Technical Specifications
              </span>
              <ul className="flex flex-col gap-1.5">
                {data.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2 text-[12px] font-semibold text-[#001229]"
                  >
                    <CircleCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-[#904D00]"
                    />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2px] bg-[#EFF4FF] p-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {data.stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-0.5 rounded-[2px] bg-white py-1.5"
                >
                  <span className="text-[10px] font-bold uppercase text-[#44474D]">
                    {label}
                  </span>
                  <span className="text-[12px] font-bold text-[#001229]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AquaticsComplex;
