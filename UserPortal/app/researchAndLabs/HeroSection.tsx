"use client";

import { CalendarDays, Circle, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const heroContentMockData = {
  tag: "APEX SCIENTIFIC WING",
  heading: "Pioneering Olympic-Grade Sports Science, Biomechanics & Kinetic Inquiry",
  subheading: "State-of-the-art laboratory infrastructure dedicated to multi-planar kinematic modeling, VO₂ max hypoxic cellular kinetics, and indigenous equipment optimization. Bridging grassroots Punjabi talent with podium finishes at Paris, Los Angeles, and Brisbane through precision biomechanics.",
  grantSummary: "₹42.5 Cr Khelo India Centre of Excellence Sanction",
  badges: ["NABL & SAI CO-ACCREDITED", "Code: MBSPSU-RSIH-2025"],
};

const isCompleteResearchHero = (val: typeof heroContentMockData): boolean => {
  return Boolean(
    val &&
    typeof val.heading === "string" && val.heading.trim().length > 0 &&
    typeof val.subheading === "string" && val.subheading.trim().length > 0 &&
    Array.isArray(val.badges) && val.badges.length > 0
  );
};

const HeroSection = () => {
  const content = useSectionApi<typeof heroContentMockData>(
    "researchAndLabs",
    "heroSection",
    heroContentMockData,
    isCompleteResearchHero
  );
  return (
    <section className="w-full min-w-0 bg-[#f5f5f7] px-4 py-6 sm:px-5 md:px-6 md:py-8 lg:px-8">
      <div className="w-full min-w-0">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[2px] bg-[#001229] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#FFDCC3]">
                {content.tag}
              </span>
              {content.badges.map((badge) => <span key={badge} className="rounded-[2px] bg-[#002D1C] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6FFBBE]">{badge}</span>)}
            </div>

            <h2 className="mt-6 break-words text-[26px] font-bold leading-[1.05] tracking-[-0.05em] text-[#001229] sm:text-[32px] lg:text-[36px] xl:text-[40px]">
              {content.heading}
            </h2>

            <p className="mt-5 max-w-[875px] text-[14px] leading-[1.65] text-[#1E2A38] sm:text-[15px]">
              State-of-the-art laboratory infrastructure dedicated to multi-planar
              kinematic modeling, VO₂ max hypoxic cellular kinetics, and
              indigenous equipment optimization. Bridging grassroots Punjabi
              talent with podium finishes at Paris, Los Angeles, and Brisbane
              through precision biomechanics.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href=""
                className="inline-flex items-center gap-3 rounded-[4px] bg-[#001229] px-5 py-3 text-[0.98rem] font-semibold text-white shadow-[0_10px_24px_rgba(0,18,41,0.16)] transition-colors hover:bg-[#0B1C30]"
              >
                <CalendarDays size={18} strokeWidth={2.2} />
                Reserve CRF Equipment
              </Link>
              <Link
                href=""
                className="inline-flex items-center gap-3 rounded-[4px] bg-[#E5EEFF] px-5 py-3 text-[0.98rem] font-semibold text-[#0B1C30] transition-colors hover:bg-[#D3E4FE]"
              >
                <FileText size={18} strokeWidth={2.2} />
                Research Fellowships
              </Link>
              <Link
                href=""
                className="inline-flex items-center gap-3 rounded-[4px] bg-[#EFF4FF] px-5 py-3 text-[0.98rem] font-semibold text-[#904D00] transition-colors hover:bg-[#D3E4FE]"
              >
                <ShieldCheck size={18} strokeWidth={2.2} />
                IEC & WADA Protocols
              </Link>
            </div>
          </div>

          <div className="mt-4 w-full min-w-0 lg:mt-0 lg:justify-self-end">
            <div
              className="relative h-[260px] w-full overflow-hidden rounded-[18px] border border-[#D5DDE8] bg-[#DADFEA] shadow-[0_20px_40px_rgba(1,18,41,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:h-[320px] lg:h-[360px]"
              style={{
                backgroundImage: `url(/researchAndLabs/kineticArena.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-x-0 bottom-12 bg-gradient-to-t from-[#0F2744] via-[#0F2744]/90 to-transparent px-4 pb-4 pt-20">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.6px] text-[#FFDCC3]">
                      LIVE DIAGNOSTIC FEED
                    </span>
                    <h3 className="mt-1 text-[1.05rem] font-bold leading-6 tracking-[-0.04em] text-white">
                      Lab Alpha: Kinematics Arena
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-[2px] bg-[#BA1A1A] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#FFFFFF] sm:text-[12px]">
                    <Circle size={10} strokeWidth={2.5} fill={"white"} className="mr-1 inline-block text-[#ffffff]"/>
                    ACTIVE TRIALS
                  </span>
                </div>
              </div>

              <div className="absolute w-full bottom-0 flex items-center justify-around gap-3 rounded-[4px] bg-[#001229B2] px-3 py-2 backdrop-blur-sm bg-gradient-to-t from-[#0F2744] via-[#0F2744]/90 to-transparent">
                <div className="flex flex-col items-center text-center">
                  <span className="text-[9px] font-medium uppercase tracking-[0.4px] text-[#D3E4FE]">
                    Sampling
                  </span>
                  <span className="mt-1 text-[12px] font-bold text-[#FFDCC3]">
                    1,000 Hz
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center text-center">
                  <span className="text-[9px] font-medium uppercase tracking-[0.4px] text-[#D3E4FE]">
                    Force Axis
                  </span>
                  <span className="mt-1 text-[12px] font-bold text-[#6FFBBE]">
                    6-DOF
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center text-center">
                  <span className="text-[9px] font-medium uppercase tracking-[0.4px] text-[#D3E4FE]">
                    Latency
                  </span>
                  <span className="mt-1 text-[12px] font-bold text-white">
                    &lt;0.8 ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
