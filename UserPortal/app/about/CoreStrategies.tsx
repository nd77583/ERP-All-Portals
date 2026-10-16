"use client";

import {
  ArrowBigRight,
  GraduationCap,
  Lightbulb,
  Microscope,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useSectionApi } from "@/lib/useSectionApi";

type StrategyItem = {
  id: string;
  title: string;
  description: string;
  link: string;
};

const coreStrategiesMockData: StrategyItem[] = [
  {
    id: "athlete",
    title: "Elite Athlete Grooming",
    description:
      "Targeted individual development plans with high-load periodization cycles, Olympic standard strength & conditioning, and physiological threshold management.",
    link: "Microcycle Tracking",
  },
  {
    id: "biomechanics",
    title: "Biomechanical Optimization",
    description:
      "3D high-speed motion capture, force-plate vector analysis, and electromyography (EMG) telemetry to eliminate micro-inefficiencies in athletic execution.",
    link: "Kinematic Lab Protocols",
  },
  {
    id: "career",
    title: "Dual-Career Safeguards (NEP)",
    description:
      "Flexible Academic Bank of Credits (ABC), remote hybrid examinations during national camps, and recognized sports apprenticeships guaranteeing lifelong degree security.",
    link: "Academic Credit Transfer",
  },
  {
    id: "scouting",
    title: "Grassroots Scouting Matrix",
    description:
      "Mobile scientific testing vans deploying across all 23 districts of Punjab and neighboring states to detect raw anthropometric markers and explosive fast-twitch talent.",
    link: "District Outreach Portal",
  },
];
const strategyIcons = {
  athlete: Lightbulb,
  biomechanics: Microscope,
  career: GraduationCap,
  scouting: Target,
};

const isCompleteStrategies = (val: StrategyItem[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((s) => Boolean(s.title && s.description));
};

export default function CoreStrategies() {
  const strategies = useSectionApi<StrategyItem[]>(
    "about",
    "coreStrategies",
    coreStrategiesMockData,
    isCompleteStrategies
  );

  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#904D00]">
            CHARTER DIRECTIVES
          </span>
          <h2 className="mt-2.5 text-[24px] font-bold leading-[1.12] text-[#001229] sm:text-[30px] md:text-[34px] lg:text-[42px]">
            Core Strategic Pillars &amp; Mandates
          </h2>
          <p className="mt-3 max-w-[1180px] text-[13px] leading-[1.7] text-[#44474D] md:text-[15px]">
            Engineered to systematically resolve India&apos;s historical
            transition bottleneck from national youth medalist to international
            Olympic podium finisher.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map(({ id, title, description, link }) => {
            const Icon = strategyIcons[id as keyof typeof strategyIcons];
            return (
              <article
                key={id}
                className="flex flex-col justify-between min-w-0 w-full rounded-[4px] border border-[#E5EAF5] bg-white p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
              >
                <div>
                  <div className="mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[4px] bg-[#0F2744]">
                    <Icon
                      className="h-[22px] w-[22px] text-[#FFDCC3]"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-[16px] font-bold leading-[1.3] text-[#001229]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7] text-[#44474D]">
                    {description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 pt-2">
                  <Link
                    href="#"
                    className="text-[11px] font-bold text-[#904D00]"
                  >
                    {link}
                  </Link>
                  <ArrowBigRight className="h-4 w-4 text-[#904D00]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
