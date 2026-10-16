"use client";

import { Banknote, Camera, Medal, UsersRound } from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

type FastFactItem = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

const fastFactsMockData: FastFactItem[] = [
  {
    id: "faculty",
    value: "42+",
    label: "National & Olympian Coaches",
    detail: "SAI & NIS certified master trainers",
  },
  {
    id: "athletes",
    value: "1,400+",
    label: "Full-Time Enrolled Athletes",
    detail: "Undergraduate, PG & Doctoral Fellows",
  },
  {
    id: "investment",
    value: "₹42.5 Cr",
    label: "Olympic R&D & Tech CapEx",
    detail: "Equipped via Punjab Sports Mission",
  },
  {
    id: "sports",
    value: "24+",
    label: "Sports Disciplines",
    detail: "Across high-performance programmes",
  },
];
const fastFactPresentation = [
  { icon: Camera, border: "border-[#011229]" },
  { icon: UsersRound, border: "border-[#904D00]" },
  { icon: Banknote, border: "border-[#002D1C]" },
  { icon: Medal, border: "border-[#0F2744]" },
];

const isCompleteFastFacts = (val: FastFactItem[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((f) => Boolean(f.value && f.label));
};

export default function FastFacts() {
  const facts = useSectionApi<FastFactItem[]>(
    "about",
    "fastFacts",
    fastFactsMockData,
    isCompleteFastFacts
  );

  return (
    <section className="w-full bg-[#EFF4FF]">
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 sm:gap-4 sm:px-5 sm:py-5 md:px-6 lg:grid-cols-4 lg:px-8">
        {facts.map(({ id, value, label, detail }, index) => {
          const { icon: Icon, border } =
            fastFactPresentation[index % fastFactPresentation.length];
          return (
            <article
              key={id}
              className={`flex flex-col justify-between rounded-[4px] border-t-[4px] ${border} bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-[18px_16px_14px_16px]`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase leading-[1.4] tracking-[0.04em] text-[#44474D]">
                    {label}
                  </span>
                  <Icon className="h-6 w-6 shrink-0 text-[#011229] sm:h-7 sm:w-7" />
                </div>
                <strong className="mb-2 block text-[24px] font-bold leading-none text-[#001229] sm:text-[26px]">
                  {value}
                </strong>
                <span className="mb-1 block text-[12px] leading-[1.4] text-[#44474D]">
                  {detail}
                </span>
              </div>
              <div className="mt-2 border-t border-slate-100 pt-2 text-[10px] font-medium text-[#904D00]">
                MBSPSU institutional profile
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
