"use client";

import {
  Gavel,
  Download,
  Grip,
  ShieldCheck,
  Footprints,
  Waves,
  Bike,
  Activity,
  Swords,
  CircleAlert,
} from "lucide-react";
import Link from "next/link";
import { useSectionApi } from "@/lib/useSectionApi";

type TariffItem = {
  id: number;
  facility: string;
  govt: string;
  federation: string;
  private: string;
  floodlight: string;
  applyUrl: string;
};

const tariffs: TariffItem[] = [
  {
    id: 1,
    facility: "400m Synthetic Track (Rekortan)",
    govt: "Exempt (Govt. MOA)",
    federation: "₹ 15,000 / Day",
    private: "₹ 45,000 / Day",
    floodlight: "₹ 4,500 (2,200 Lux)",
    applyUrl: "/booking/synthetic-track",
  },
  {
    id: 2,
    facility: "50m 10-Lane Olympic Aquatics Center",
    govt: "Priority Allocated",
    federation: "₹ 20,000 / Day",
    private: "₹ 60,000 / Day",
    floodlight: "₹ 5,000 / Hr (Indoor HVAC)",
    applyUrl: "/booking/aquatics-complex",
  },
  {
    id: 3,
    facility: "250m Siberian Pine Indoor Velodrome",
    govt: "Priority Allocated",
    federation: "₹ 25,000 / Day",
    private: "₹ 75,000 / Day",
    floodlight: "Included in Day Tariff",
    applyUrl: "/booking/velodrome",
  },
  {
    id: 4,
    facility: "3D Biomechanics & Kinematic Lab Unit",
    govt: "AY Quota Free",
    federation: "₹ 3,500 / Athlete Profile",
    private: "₹ 8,000 / Athlete Profile",
    floodlight: "N/A (Indoor Lab)",
    applyUrl: "/booking/biomechanics-lab",
  },
  {
    id: 5,
    facility: "Combat Arena (Boxing Rings / Judo / Mats)",
    govt: "SAI Camps Free",
    federation: "₹ 12,000 / Day",
    private: "₹ 35,000 / Day",
    floodlight: "₹ 2,500 / Hr",
    applyUrl: "/booking/combat-arena",
  },
];
const tariffIcons = [Footprints, Waves, Bike, Activity, Swords];

const tableHeads = [
  "Facility / Arena",
  "Govt. / SAI National Camps",
  "Recognized National Federations",
  "Private Academy / Corporate",
  "Floodlight Surcharge (Per Hour)",
];

const steps = [
  {
    id: 1,
    stage: "Stage 01 • 21 Days Prior",
    title: "Requisition Submission",
    desc: "Upload Form FR-FAC-03 on the university ERP SSO portal with federation affiliation letter and roster size.",
  },
  {
    id: 2,
    stage: "Stage 02 • 14 Days Prior",
    title: "Director Sports Scrutiny",
    desc: "Verification of anti-doping certifications, insurance clearances, and athletic accreditation.",
  },
  {
    id: 3,
    stage: "Stage 03 • 7 Days Prior",
    title: "Registrar & VC Sanction",
    desc: "Formal e-Office green-note file sanction issued with gate security passes and floodlight access allotment.",
  },
  {
    id: 4,
    stage: "Stage 04 • Departure",
    title: "Biomechanical Handover",
    desc: "Post-event surface integrity audit and high-speed sensor diagnostic log handover to federation head.",
  },
];

const gridCols =
  "grid grid-cols-[2.3fr_1.5fr_1.6fr_1.6fr_1.7fr_0.6fr] items-center gap-4";

const isCompleteTariffs = (val: TariffItem[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((t) => Boolean(t.facility));
};

const ArenaAllocation = () => {
  const tariffList = useSectionApi<TariffItem[]>(
    "sportsInfrastructure",
    "arenaAllocation",
    tariffs,
    isCompleteTariffs
  );
  return (
    <section className="w-full min-w-0 bg-[#EFF4FF] px-4 py-6 sm:px-5 md:px-6 lg:px-8">
      <div className="w-full min-w-0">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#904D00]">
              <Gavel size={13} />
              Statutory Protocol Document • Form FR-FAC-03
            </p>
            <h2 className="mt-1 break-words text-xl font-bold text-[#001229] sm:text-2xl">
              Arena Allocation, Tariffs &amp; External Federation Booking
              Guidelines
            </h2>
            <p className="mt-1 text-[13px] text-[#44474D]">
              Governed by Punjab Sports University Act Section 24(3). National
              federations, state sports associations, and international teams
              may apply for accredited facility allotments under designated
              priority windows.
            </p>
          </div>

          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:mt-0 lg:w-auto lg:shrink-0">
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#001229] px-3 py-2 text-[11px] font-bold text-white hover:bg-slate-800 cursor-pointer sm:w-auto">
              <Download size={14} />
              Download FR-FAC-03 PDF
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#904D00] px-3 py-2 text-[11px] font-bold text-white hover:bg-amber-800 cursor-pointer sm:w-auto">
              <Grip size={14} />
              Submit Digital Requisition
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-[#E5EEFF] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3 pt-1 sm:px-2">
            <h3 className="text-[16px] font-bold text-[#001229]">
              Approved Institutional Tariff Schedule (AY 2025-26)
            </h3>
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-[#44474D]">
              <ShieldCheck size={14} className="text-[#002D1C]" />
              Ratified by Statutory Syndicate Resolution #SYND-84/2024
            </p>
          </div>

          <div className="overflow-x-auto bg-[#C4C6CE]">
            <div className="min-w-[900px]">
              <div
                className={`${gridCols} px-3 py-2 text-[11px] font-bold uppercase text-[#0B1C30]`}
              >
                {tableHeads.map((head) => (
                  <span key={head}>{head}</span>
                ))}
                <span className="text-right">Action</span>
              </div>

              <div className="rounded bg-white">
                {tariffList.map((row, index) => {
                  const Icon = tariffIcons[index % tariffIcons.length];
                  return (
                    <div
                      key={row.id}
                      className={`${gridCols} border-b border-gray-100 px-3 py-3 text-sm text-[#001229] last:border-b-0`}
                    >
                      <span className="flex items-center gap-2 font-bold text-[#001229]">
                        <Icon size={16} className="shrink-0 text-[#904D00]" />
                        {row.facility}
                      </span>
                      <span>{row.govt}</span>
                      <span>{row.federation}</span>
                      <span>{row.private}</span>
                      <span>{row.floodlight}</span>
                      <Link href={row.applyUrl || "#"} className="text-right text-xs font-bold text-[#904D00] hover:underline cursor-pointer">
                        Apply
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            <p className="flex items-center gap-1.5 text-[#44474D]">
              <CircleAlert size={14} className="text-[#BA1A1A]" />
              Security deposit of 20% mandatory for private bookings. All
              revenue credited directly to Punjab State Sports University
              Consolidated Fund.
            </p>
            <p className="font-semibold uppercase text-[#44474D]">
              Tax exemption under 12AA / 80G of IT Act
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded border-t-2 border-[#001229] bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
            >
              <p className="text-[11px] font-bold uppercase text-[#904D00]">
                {step.stage}
              </p>
              <h4 className="mt-1 text-base font-extrabold text-[#001229]">
                {step.title}
              </h4>
              <p className="mt-1 text-sm text-[#44474D]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArenaAllocation;
