"use client";

import { CalendarDays, Medal, ScanEye, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSectionApi } from "@/lib/useSectionApi";

const sportsHeroMockData = {
  eyebrow: "NATIONAL APEX TRAINING INFRASTRUCTURE • PATIALA",
  title: [
    "State-of-the-Art Arenas Built to",
    "Olympic & World Championship",
    "Benchmarks",
  ],
  description:
    "Engineered to satisfy stringent Class-1 World Athletics, FINA, and UCI homologations. MBSPSU's high-performance pavilions integrate synchronized multi-axis kinematic motion analysis, high-speed sub-aquatic telemetry, and elite residential conditioning ecosystems to power India's podium trajectory.",
  stats: [
    {
      label: "GROSS AREA",
      value: "142.6",
      unit: "Acres",
      detail: "Dedicated sports biomechanics enclave",
    },
    {
      label: "ARENAS CERTIFIED",
      value: "9",
      unit: "World Bodies",
      detail: "IAAF, FINA, UCI, IBA, IJF, BWF",
    },
    {
      label: "NATIONAL CAMPS",
      value: "14",
      unit: "Active",
      detail: "SAI Khelo India Elite contingent",
    },
    {
      label: "TELEMETRY SENSORS",
      value: "240+",
      unit: "Active",
      detail: "Live Vicon 3D & Kistler force sync",
    },
  ],
  actions: [
    { id: "booking", label: "Reserve Arenas • FR-FAC-03", href: "#" },
    { id: "inspection", label: "360° Campus Virtual Inspection", href: "#" },
    { id: "audit", label: "Statutory Safety & ISO Audit Logs", href: "#" },
  ],
};
const statValueColors = [
  "text-white",
  "text-[#FFDCC3]",
  "text-white",
  "text-[#FFDCC3]",
];
const statUnitColors = [
  "text-[#FFDCC3]",
  "text-white",
  "text-[#6FFBBE]",
  "text-white",
];
const actionIcons = {
  booking: CalendarDays,
  inspection: ScanEye,
  audit: ShieldCheck,
};

const isCompleteSportsHero = (val: typeof sportsHeroMockData): boolean => {
  return Boolean(
    val &&
    typeof val.eyebrow === "string" &&
    Array.isArray(val.title) && val.title.length > 0 &&
    typeof val.description === "string" &&
    Array.isArray(val.stats) && val.stats.length > 0
  );
};

export default function HeroHeader() {
  const data = useSectionApi<typeof sportsHeroMockData>(
    "sportsInfrastructure",
    "heroHeader",
    sportsHeroMockData,
    isCompleteSportsHero
  );
  return (
    <section className="w-full min-w-0 bg-gradient-to-b from-[#001229] to-[#000B1A] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-x-6 gap-y-5 md:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
        <div className="flex min-w-0 w-full flex-col md:col-span-12 md:col-start-1 md:row-start-1 lg:col-span-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-[2px] px-2.5 py-1 sm:px-3 sm:py-1.5">
            <Medal
              className="h-5 w-5 shrink-0 text-[#FFDCC3]"
              strokeWidth={2.2}
            />
            <span className="text-[10px] font-bold uppercase text-[#FFDCC3]">
              {data.eyebrow}
            </span>
          </div>
          <h1 className="max-w-[820px] pt-2 text-[26px] font-bold leading-tight text-white sm:text-[32px] md:text-[36px]">
            {data.title.map((line, index) => (
              <span key={line}>
                {index === 1 ? (
                  <span className="text-[#FFDCC3]">{line}</span>
                ) : (
                  line
                )}
                {index < data.title.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="mt-3 max-w-[830px] text-[13px] leading-relaxed text-[#D3E4FE] sm:text-[14px] md:text-[15px]">
            {data.description}
          </p>
        </div>
        <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-9 md:col-start-1 md:row-start-2 md:grid-cols-4 lg:col-span-9 lg:row-start-2">
          {data.stats.map((stat, index) => (
            <article
              key={stat.label}
              className="flex min-w-0 flex-col gap-1 rounded-[2px] bg-[#0F2744] px-3 py-3 sm:px-4 sm:py-4 md:py-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#798FB1]">
                {stat.label}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span
                  className={`text-[22px] font-bold sm:text-[24px] ${statValueColors[index]}`}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-[11px] font-semibold ${statUnitColors[index]}`}
                >
                  {stat.unit}
                </span>
              </div>
              <span className="text-[11px] text-[#DCE9FF] sm:text-[12px]">
                {stat.detail}
              </span>
            </article>
          ))}
        </div>
        <div className="flex w-full min-w-0 flex-col gap-2.5 sm:gap-3 md:col-span-3 md:col-start-10 md:row-start-2 md:h-full md:gap-2 lg:col-span-3 lg:col-start-10 lg:row-span-1 lg:row-start-2 lg:pt-0">
          {data.actions.map(({ id, label, href }) => {
            const Icon = actionIcons[id as keyof typeof actionIcons];
            return id === "audit" ? (
              <button
                key={id}
                className="flex cursor-pointer items-center justify-center gap-2 bg-[#0F2744] px-3 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#798FB1] hover:bg-[#113a6b] hover:text-white md:min-h-0 md:flex-1"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{label}</span>
              </button>
            ) : (
              <Link
                key={id}
                href={href}
                className={
                  id === "booking"
                    ? "flex items-center justify-center gap-2 rounded-[2px] bg-[#904D00] px-3 py-2.5 text-center text-[12px] font-bold leading-tight text-white hover:bg-[#c96b00] sm:text-[13px] md:min-h-0 md:flex-1"
                    : "flex items-center justify-center gap-2 rounded-[2px] border border-[#7FA6E0] bg-[#D3E4FE] px-3 py-2.5 text-center text-[12px] font-bold leading-tight text-[#001229] hover:bg-[#939caa] sm:text-[13px] md:min-h-0 md:flex-1"
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
