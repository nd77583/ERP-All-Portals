"use client";

import { CircleCheck, RefreshCw } from "lucide-react";
import React from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const nationalResearchGrantsMockData = [
  { id: "myas", grant: "MYAS Grant 2024-27", amount: "₹1.85 Cr", title: "Kinematic Optimization in Javelin Release Dynamics for Elite Indian Throwers", description: "Collaborative inquiry with Netaji Subhas National Institute of Sports (NSNIS) Patiala analyzing run-up braking impulses, thoracic twist angle, and aerodynamic flutter coefficients under varying wind resistance.", investigator: "PI: Prof. H. Singh", target: "Target: Paris & LA 2028", status: "Stage 2 In-Field Testing Active", progress: "ongoing" },
  { id: "sai", grant: "SAI Fellowship", amount: "₹95.0 Lakhs", title: "Genetic Polymorphisms & Aerobic Response in Elite Punjab Endurance Runners", description: "Investigation into ACE I/D and ACTN3 R577X allele frequency distributions among state cross-country squads, cross-referenced with red-cell volume changes during 6-week altitude adaptation regimes.", investigator: "PI: Dr. G. K. Sandhu", target: "Cohort: 210 Athletes", status: "Genotyping Phase (75% Complete)", progress: "ongoing" },
  { id: "wada", grant: "WADA / NADA Alliance", amount: "₹68.4 Lakhs", title: "Endogenous Steroid Profile Longitudinal Profiling & Steroid Passports", description: "Establishment of localized biological passport reference ranges for sub-continental athletes to distinguish between natural physiological fluctuations and doping adulterations in hot-humid conditions.", investigator: "PI: Dr. Simrat Dhillon", target: "Regulatory: ICMR & NADA", status: "Baseline Urine Assay Aggregation", progress: "completed" },
];
const isCompleteNationalResearchGrants = (value: typeof nationalResearchGrantsMockData) =>
  Array.isArray(value) && value.length > 0 && value.every((grant) => Boolean(grant.id && grant.title));
const grantStatusIcon = [CircleCheck, CircleCheck, RefreshCw];

export default function NationalResearchGrants() {
  const grants = useSectionApi(
    "researchAndLabs",
    "nationalResearchGrants",
    nationalResearchGrantsMockData,
    isCompleteNationalResearchGrants,
  );
  const [selectedGrantStatus, setSelectedGrantStatus] = React.useState("ongoing");
  const visibleGrants = grants.filter((grant) => grant.progress === selectedGrantStatus || selectedGrantStatus === "all");
  return <section className="w-full min-w-0 bg-[#EFF4FF] px-4 py-8 sm:px-5 sm:py-10 md:px-6 lg:px-8"><div className="w-full min-w-0"><div className="mb-8 flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6"><div className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">Sponsored Grants &amp; Consortia</span><h2 className="mt-2 text-xl font-bold text-[#001229] sm:text-2xl">High-Impact National Research Grants</h2><p className="mt-2 text-sm leading-5 text-[#44474D]">Statutory projects funded by the Government of India and apex sports bodies, targeting quantifiable performance breakthroughs for Commonwealth, Asian, and Olympic competitions.</p></div><div className="flex w-fit max-w-full flex-wrap gap-2 rounded-[2px] bg-white px-2 py-1">{[{ id: "ongoing", label: "Ongoing (5)" }, { id: "completed", label: "Completed (12)" }, { id: "all", label: "All grants" }].map((status) => <button key={status.id} type="button" aria-pressed={selectedGrantStatus === status.id} onClick={() => setSelectedGrantStatus(status.id)} className={`rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] ${selectedGrantStatus === status.id ? "bg-[#001229] text-white" : "text-[#44474D]"}`}>{status.label}</button>)}</div></div>
    <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleGrants.map((grant) => { const StatusIcon = grant.progress === "completed" ? CircleCheck : RefreshCw; return <article key={grant.id} className="flex min-w-0 min-h-[280px] flex-col justify-between rounded-lg border border-[#E4E7EB] bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5"><div><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="max-w-full break-words rounded-sm bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold tracking-[0.5px] text-[#021C39]">{grant.grant}</span><span className="text-base font-bold text-[#904D00]">{grant.amount}</span></div><h3 className="break-words text-base font-bold text-[#001229]">{grant.title}</h3><p className="mt-3 text-xs leading-4 text-[#44474D]">{grant.description}</p></div><div className="mt-6 flex flex-col gap-2 border-t border-[#E4E7EB] pt-4 text-[10px] font-bold"><div className="flex flex-wrap items-center justify-between gap-2 text-[#44474D]"><span>{grant.investigator}</span><span>{grant.target}</span></div><span className="inline-flex items-start gap-2 text-[#002D1C]"><StatusIcon size={12} strokeWidth={2.5} className="mt-0.5 shrink-0"/>{grant.status}</span></div></article>; })}</div>
  </div></section>;
}
