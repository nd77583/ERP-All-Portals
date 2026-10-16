"use client";

import {
  BadgeCheck,
  Gavel,
  GraduationCap,
  Medal,
  Trophy,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const governanceBodiesMockData = [
  {
    label: "CHANCELLOR",
    title: "Governor of Punjab",
    description:
      "Constitutional head and ultimate visitor of the university. Confers supreme statutory sanctions, assents to university statutes, and presides over annual convocations.",
    contact: "Raj Bhavan Secretariat",
    detail: "Apex Visitor",
    filters: ["All Councils"],
  },
  {
    label: "CHIEF EXECUTIVE",
    title: "Vice-Chancellor & Executive Council",
    description:
      "Principal academic and administrative executive officer. Exercises direct jurisdiction over the administrative hierarchy, sports science faculties, and training centers.",
    contact: "Statutory Head of Syndicate",
    detail: "Standing Term",
    filters: ["All Councils"],
  },
  {
    label: "LEGISLATIVE CORE",
    title: "The Syndicate",
    description:
      "Supreme executive authority of MBSPSU comprising Principal Secretary (Sports), Principal Secretary (Higher Education), Director Sports Punjab, and nominated scholars.",
    contact: "Quarterly Statutory Sessions",
    detail: "16 Members",
    filters: ["All Councils", "The Syndicate"],
  },
  {
    label: "CURRICULAR BODY",
    title: "Academic Council",
    description:
      "Regulates academic standards, curriculum architecture (NEP-2020), examinations, pedagogical research frameworks, and admission merit standards.",
    contact: "Dean Academic Affairs",
    detail: "24 Faculty Chairs",
    filters: ["All Councils", "Academic Council"],
  },
  {
    label: "AUDIT & FISCAL",
    title: "Finance & Planning Board",
    description:
      "Exercises fiduciary scrutiny over annual fiscal estimates, capital development projects, UGC recurring allocations, and Khelo India state center grants.",
    contact: "Finance Officer Secretarial",
    detail: "CAG / State Audited",
    filters: ["All Councils"],
  },
  {
    label: "SPORTS ADVISORY",
    title: "Sports Advisory Board",
    description:
      "Comprises Olympic medalists, Arjuna awardees, biomechanics scientists, and high-performance directors guiding training doctrines and talent scouts.",
    contact: "Olympic Feeder Directorship",
    detail: "12 Olympians",
    filters: ["All Councils", "Sports Advisory"],
  },
];
const governanceFiltersMockData = [
  "All Councils",
  "The Syndicate",
  "Academic Council",
  "Sports Advisory",
];
// Icons and visual colors are fixed in code, separate from content data.
const governancePresentation = {
  "Governor of Punjab": {
    icon: BadgeCheck,
    color: "bg-[#001229]",
    tagColor: "text-white",
    iconColor: "text-[#904D00]",
  },
  "Vice-Chancellor & Executive Council": {
    icon: Medal,
    color: "bg-[#904D00]",
    tagColor: "text-white",
    iconColor: "text-[#001229]",
  },
  "The Syndicate": {
    icon: Gavel,
    color: "bg-[#D3E4FE]",
    tagColor: "text-[#0B1C30]",
    iconColor: "text-[#904D00]",
  },
  "Academic Council": {
    icon: GraduationCap,
    color: "bg-[#E5EEFF]",
    tagColor: "text-[#44474D]",
    iconColor: "text-[#001229]",
  },
  "Finance & Planning Board": {
    icon: Wallet,
    color: "bg-[#E5EEFF]",
    tagColor: "text-[#44474D]",
    iconColor: "text-[#001229]",
  },
  "Sports Advisory Board": {
    icon: Trophy,
    color: "bg-[#002D1C]",
    tagColor: "text-[#6FFBBE]",
    iconColor: "text-[#4EDEA3]",
  },
} as const;

import { useSectionApi } from "@/lib/useSectionApi";

const isCompleteGovernance = (val: typeof governanceBodiesMockData): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((b) => Boolean(b.title && b.label));
};

export default function GovernanceBodies() {
  const [activeFilter, setActiveFilter] = useState("All Councils");
  const bodies = useSectionApi<typeof governanceBodiesMockData>(
    "about",
    "governanceBodies",
    governanceBodiesMockData,
    isCompleteGovernance
  );
  const visibleBodies = bodies.filter((body) =>
    body.filters.includes(activeFilter),
  );
  return (
    <section className="w-full bg-[#EFF4FF]">
      <div className="w-full min-w-0 px-4 py-6 sm:px-5 md:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <span className="text-[10px] font-bold tracking-[0.5px] text-[#904D00]">
              ADMINISTRATIVE COMMAND
            </span>
            <h2 className="mt-2 text-[22px] font-bold tracking-[-0.3px] text-[#001229]">
              Apex Statutory Governance Bodies
            </h2>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#44474D]">
              Structured in stringent accordance with University Grants
              Commission statutes and State Legislative mandates.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-[12px] bg-[#DCE9FF] px-2.5 py-1.5">
            {governanceFiltersMockData.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(option)}
                  className={`rounded-[12px] px-2.5 py-1.5 transition-colors duration-200 ${isActive ? "bg-[#001229] text-[#DCE9FF]" : "text-[#001229] hover:bg-[#001229] hover:text-[#DCE9FF]"}`}
                >
                  <span className="text-[11px] font-semibold tracking-[0.28px]">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {visibleBodies.map(
            ({ label, title, description, contact, detail }) => {
              const {
                icon: Icon,
                color,
                tagColor,
                iconColor,
              } = governancePresentation[
                title as keyof typeof governancePresentation
              ];
              return (
                <article
                  key={title}
                  className="w-full min-w-0 flex flex-col justify-between rounded-[12px] border border-[#dfe7f0] bg-white p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span
                      className={`min-w-0 break-words rounded-[4px] ${color} px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] ${tagColor}`}
                    >
                      {label}
                    </span>
                    <Icon
                      className={`${iconColor}`}
                      size={30}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2.5 text-[18px] font-bold tracking-[-0.2px] text-[#001229]">
                    {title}
                  </h3>
                  <p className="mb-3 text-[12px] leading-[1.6] text-[#44474D]">
                    {description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex flex-col items-start justify-between gap-1 rounded-[4px] bg-[#DCE9FF] px-3 py-2 sm:flex-row sm:items-center sm:gap-2 sm:px-4">
                      <span className="min-w-0 break-words text-[12px] font-medium text-[#0B1C30]">
                        {contact}
                      </span>
                      <span className="min-w-0 break-words text-[12px] font-bold text-[#001229] sm:text-right">
                        {detail}
                      </span>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
