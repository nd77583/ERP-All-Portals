"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CircleCheck, ArrowRight } from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

const trackAndFieldMockData = {
  specs: [
    "Rekortan M99 Polyurethane: Dual-layer full-pour system for maximum energy restitution.",
    "Timing Infrastructure: FinishLynx 10,000 FPS primary camera with dual photocell break lines.",
    "Jumping Pits & Cage: Twin long/triple jump runways with ultrasonic wind velocity sensors; heavy-gauge hammer/discus safety enclosure.",
    "Broadcast Luminance: 2,200 Lux Musco LED sports illumination for 4K broadcast telemetry.",
  ],
  pavilionCode: "ARENA-TF-01",
  capacity: "Capacity: 12,500 Seated",
  title: "Class 1 IAAF / World Athletics 400m Synthetic Track",
  description:
    "Precision-engineered for national sprint camps, hurdle trials, and distance decathlons. Features complete non-porous EPDM force-reduction surfacing with high-speed micro-gate timing prisms embedded along 100m straightaways.",
  utilization: {
    label: "Real-Time Utilization",
    camp: "Punjab State Senior Camp (06:00 - 11:30 IST)",
    progressPercent: 75,
    availability: "Availability: Evening Slot Open",
  },
};

const isCompleteTrackAndField = (val: typeof trackAndFieldMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.specs) && val.specs.length > 0 &&
    typeof val.title === "string" && val.title.trim().length > 0
  );
};

const TrackAndField = () => {
  const data = useSectionApi<typeof trackAndFieldMockData>(
    "sportsInfrastructure",
    "trackAndField",
    trackAndFieldMockData,
    isCompleteTrackAndField
  );

  return (
    <section className="w-full min-w-0 bg-slate-50 px-4 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] lg:grid-cols-12">
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] w-full lg:col-span-7">
          <Image
            src="/sportsInfrastructure/track-field.png"
            alt="Track and Field arena"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-[4px] bg-[#001229] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
              Class 1 IAAF Certified
            </span>
            <span className="rounded-[4px] bg-[#904D00] px-2 py-1 text-[10px] font-bold uppercase text-white">
              8-Lane Rekortan Surface
            </span>
          </div>

          <span className="absolute bottom-3 right-3 rounded-[2px] bg-[#0F2744E5] px-2 py-1 text-[11px] sm:text-[12px] font-medium text-white">
            LAT: 30.3398° N • LON: 76.3869° E
          </span>
        </div>

        <div className="flex w-full flex-col justify-between gap-4 p-4 sm:p-5 lg:p-6 lg:col-span-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="text-[10px] font-bold uppercase text-[#904D00]">
                Pavilion Code: {data.pavilionCode}
              </span>
              <span className="rounded-[2px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-semibold text-[#001229]">
                {data.capacity}
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

          <div className="flex flex-col gap-1.5 rounded-[2px] bg-[#EFF4FF] p-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-[#44474D]">
                {data.utilization.label}
              </span>
              <span className="text-[10px] font-bold text-[#904D00]">
                {data.utilization.camp}
              </span>
            </div>

            <div className="h-1 w-full rounded-full bg-[#D3E4FE]">
              <div
                className="h-1 rounded-full bg-[#904D00]"
                style={{ width: `${data.utilization.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#44474D]">
                {data.utilization.availability}
              </span>
              <Link
                href="#"
                className="flex items-center gap-1 text-[10px] font-bold text-[#001229]"
              >
                Requisition Lane
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackAndField;
