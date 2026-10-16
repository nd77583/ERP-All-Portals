"use client";

import { BookOpen, CircleDollarSign, Microscope, PersonStanding } from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

type SportsStatItem = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

const sportsStatsMockData: SportsStatItem[] = [
  { id: "grants", label: "ACTIVE SPONSORED GRANTS", value: "₹4.82 Cr", detail: "MYAS, SAI & DST Approved" },
  { id: "publications", label: "INDEXED PUBLICATIONS", value: "142", detail: "Scopus / Web of Science (Q1 & Q2)" },
  { id: "athletes", label: "ELITE ATHLETES PROFILED", value: "1,840+", detail: "Olympic & Khelo India Cadres" },
  { id: "uptime", label: "CRF INSTRUMENT UPTIME", value: "99.2%", detail: "NABL Calibrated Bi-weekly" },
];

const sportsStatsPresentation = [
  { icon: CircleDollarSign, iconClass: "text-[#B26A00]", fillClass: "w-[78%] bg-[#FE932C]", detailClass: "font-bold text-[#00966C]" },
  { icon: BookOpen, iconClass: "text-[#0F2744]", fillClass: "w-[90%] bg-[#0F2744]", detailClass: "" },
  { icon: PersonStanding, iconClass: "text-[#005C3B]", fillClass: "w-[90%] bg-[#005C3B]", detailClass: "" },
  { icon: Microscope, iconClass: "text-[#005C3B]", fillClass: "w-[99%] bg-[#4EDEA3]", detailClass: "" },
];

const isCompleteStats = (val: SportsStatItem[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((m) => Boolean(m.value && m.label));
};

export default function SportsStats() {
  const stats = useSectionApi<SportsStatItem[]>(
    "researchAndLabs",
    "sportsStats",
    sportsStatsMockData,
    isCompleteStats
  );

  return (
    <section className="w-full min-w-0 bg-[#E5EEFF] px-4 py-4 sm:px-5 md:px-6 lg:px-8">
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
        {stats.map((metric, index) => {
          const { icon: Icon, iconClass, fillClass, detailClass } =
            sportsStatsPresentation[index % sportsStatsPresentation.length];
          return (
            <article
              key={metric.id}
              className="flex min-h-[132px] flex-col justify-between rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
            >
              <header className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
                  {metric.label}
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F7FB]">
                  <Icon size={16} strokeWidth={2.2} className={iconClass} />
                </div>
              </header>
              <div className="mt-2">
                <div className="text-[1.85rem] font-bold leading-none tracking-[-0.06em] text-[#001229]">
                  {metric.value}
                </div>
                <div className={`mt-2 text-[11px] leading-[1.5] text-[#44474D] ${detailClass}`}>
                  {metric.detail}
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF2F6]">
                <span className={`${fillClass} block h-full rounded-full`} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
