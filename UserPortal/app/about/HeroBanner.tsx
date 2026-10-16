"use client";

import { Landmark, Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSectionApi } from "@/lib/useSectionApi";

const heroBannerMockData = {
  badges: [
    { id: "statutory", text: "STATUTORY STATE SPORTS UNIVERSITY" },
    { id: "location", text: "EST. 2019 • PATIALA, PUNJAB" },
    { id: "apex", text: "APEX COLLEGIATE CENTER" },
  ],
  title: "A Sovereign Mandate for Olympic & Scientific Athletic Excellence",
  description:
    "Chartered under the Punjab State Legislature Act No. 11 of 2019, Maharaja Bhupinder Singh Punjab Sports University is India's preeminent public citadel for sports biomechanics, advanced kinesiology, Olympic podium conditioning, and dual-career academic pathways.",
  actions: [
    { id: "governance", text: "Inspect Governance Matrix", href: "#" },
    { id: "campus", text: "Campus Masterplan & R&D Labs", href: "#" },
  ],
  verification: {
    eyebrow: "STATUTORY VERIFICATION",
    status: "UGC 2(f) Validated",
    rank: "Rank #1",
    description:
      "Dedicated Olympic feeder university in Northern India integrating physiological telemetry with collegiate degree conferrals.",
    slaLabel: "High-Performance SLA Adherence",
    slaValue: "99.4%",
    graph: "/about/hero-graph.png",
  },
  metrics: [
    { label: "ACTIVE CADRES", value: "14 Disciplines" },
    { label: "STATE GRANTS", value: "₹42.5 Cr CapEx" },
  ],
};
// Presentation stays in code so API content can never choose icons or colors.
const heroBadgeStyles: Record<string, string> = {
  statutory: "bg-[#001229] text-[#FFDCC3]",
  location: "bg-[#E5EEFF] text-[#44474D]",
  apex: "bg-[#002D1C] text-[#6FFBBE]",
};
const heroActionPresentation = {
  governance: {
    icon: Landmark,
    className: "bg-[#001229] text-white hover:bg-[#002555]",
  },
  campus: {
    icon: Map,
    className: "bg-[#E5EEFF] text-[#0B1C30] hover:bg-[#a7afbf]",
  },
};

const isCompleteHeroBanner = (val: typeof heroBannerMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.badges) && val.badges.length > 0 &&
    typeof val.title === "string" && val.title.trim().length > 0 &&
    typeof val.description === "string" && val.description.trim().length > 0 &&
    Array.isArray(val.actions) && val.actions.length > 0 &&
    val.verification && typeof val.verification.status === "string" &&
    Array.isArray(val.metrics) && val.metrics.length > 0
  );
};

export default function HeroBanner() {
  const data = useSectionApi<typeof heroBannerMockData>(
    "about",
    "heroBanner",
    heroBannerMockData,
    isCompleteHeroBanner
  );
  return (
    <section className="w-full bg-[#EFF4FF]">
      <div className="flex w-full min-w-0 flex-col items-start justify-between gap-6 px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:flex-row lg:items-center lg:gap-[38px] lg:px-8">
        <div className="w-full min-w-0 py-[6px]">
          <div className="mb-[18px] flex flex-wrap items-center gap-[8px] sm:gap-[10px]">
            {data.badges.map((badge) => (
              <span
                key={badge.id}
                className={`rounded-[2px] px-2.5 sm:px-[12px] py-[4px] sm:py-[5px] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] ${heroBadgeStyles[badge.id]}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] xl:text-[54px] font-bold leading-[1.08] tracking-[-0.04em] text-[#001229] break-words">
            {data.title}
          </h1>
          <p className="mt-[14px] sm:mt-[18px] text-[14px] sm:text-[15px] leading-[1.72] text-[#44474D] max-w-[920px]">
            {data.description}
          </p>
          <div className="mt-5 sm:mt-[26px] flex flex-wrap items-center gap-[10px] sm:gap-[12px]">
            {data.actions.map(({ id, text, href }) => {
              const { icon: Icon, className } =
                heroActionPresentation[
                  id as keyof typeof heroActionPresentation
                ];
              return (
                <Link
                  key={id}
                  href={href}
                  className={`inline-flex items-center gap-[8px] sm:gap-[10px] rounded-[2px] px-4 sm:px-[18px] py-2.5 sm:py-[11px] text-[12px] sm:text-[13px] font-bold transition-colors ${className}`}
                >
                  <Icon className="h-4 w-4" />
                  {text}
                </Link>
              );
            })}
          </div>
        </div>
        <aside className="w-full max-w-full lg:max-w-[400px] shrink-0 rounded-[4px] border-t-[6px] border-[#9A5700] bg-white p-4 sm:p-[18px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="mb-[16px] flex flex-col items-start justify-between gap-1 border-b border-[#EEF3FF] pb-[12px] sm:flex-row sm:items-center sm:gap-4">
            <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.08em] text-[#904D00]">
              {data.verification.eyebrow}
            </span>
            <span className="min-w-0 break-words text-[11px] font-medium uppercase text-[#44474D] sm:text-right">
              {data.verification.status}
            </span>
          </div>
          <div className="mb-[14px]">
            <h2 className="text-[24px] font-bold leading-none text-[#0B1C30]">
              {data.verification.rank}
            </h2>
            <p className="mt-[8px] text-[12px] leading-[1.7] text-[#44474D]">
              {data.verification.description}
            </p>
          </div>
          <div className="mb-[16px]">
            <div className="mb-[8px] flex items-center justify-between gap-3">
              <span className="text-[9px] font-bold text-[#44474D]">
                {data.verification.slaLabel}
              </span>
              <span className="text-[9px] font-bold text-[#001229]">
                {data.verification.slaValue}
              </span>
            </div>
            <div className="overflow-hidden rounded-[2px] bg-[#F7F9FF] p-[8px]">
              <Image
                src={data.verification.graph}
                alt="High-performance service level adherence graph"
                width={210}
                height={56}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            {data.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[2px] bg-[#E5EEFF] px-[10px] py-[10px]"
              >
                <span className="block text-[9px] font-medium uppercase tracking-[0.04em] text-[#44474D]">
                  {metric.label}
                </span>
                <span className="mt-[4px] block text-[12px] font-bold uppercase text-[#001229]">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
