"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AcademicHeroData } from "@/lib/cms-types";

const defaultHeroData: AcademicHeroData = {
  tag1: "STATUTORY ACADEMIC CURRICULUM",
  tag2: "CBCS & NEP 2020 Multi-Entry/Exit Compliant",
  heading: "WORLD-CLASS SPORTS SCIENCES, PHYSICAL EDUCATION & KINESIOLOGY DEGREES",
  subheading:
    "Engineered for Olympians, high-performance coaches, clinical biomechanists, and sports administrators. MBSPSU blends rigorous doctoral inquiry, Vicon 3D kinematic labs, and accredited physical conditioning with flexible academic calendars synchronized with National Games and World University Championships.",
  featurePills: [
    {
      id: "pill-1",
      icon: "/academic/clock.png",
      text: "Dual-Career Athlete Exemption: Active",
    },
    {
      id: "pill-2",
      icon: "/academic/dumble.png",
      text: "50% Statutory Sports Quota Reserved",
    },
    {
      id: "pill-3",
      icon: "/academic/lamp.png",
      text: "SAI & KISCE Integrated Practicums",
    },
  ],
  intakeMatrix: {
    badge: "AY 2025-26 ADMISSIONS LEDGER",
    statusLabel: "Live Intake Matrix",
    metrics: [
      { id: "im-1", value: "280", label: "Statutory Seats", color: "#FFDCC3" },
      { id: "im-2", value: "60:40", label: "Trial to Merit Ratio", color: "#6FFBBE" },
      { id: "im-3", value: "14+", label: "Olympic High-End Labs", color: "#FFFFFF" },
      { id: "im-4", value: "100%", label: "NCTE / UGC Accorded", color: "#FFB77D" },
    ],
    regulation: "Regulation: NEP UGCF-2022",
    policyText: "FR-ACAD-07 Policy",
  },
};

function HeroSection() {
  const [hero, setHero] = useState<AcademicHeroData>(defaultHeroData);

  useEffect(() => {
    async function loadData() {
      try {
        const academic = await getCmsSection("academic");
        if (academic?.hero) {
          setHero((prev) => ({
            ...prev,
            ...academic.hero,
            featurePills:
              Array.isArray(academic.hero.featurePills) && academic.hero.featurePills.length > 0
                ? academic.hero.featurePills
                : prev.featurePills,
            intakeMatrix: {
              ...prev.intakeMatrix,
              ...(academic.hero.intakeMatrix || {}),
              metrics:
                Array.isArray(academic.hero.intakeMatrix?.metrics) && academic.hero.intakeMatrix.metrics.length > 0
                  ? academic.hero.intakeMatrix.metrics
                  : prev.intakeMatrix.metrics,
            },
          }));
        }
      } catch (err) {
        console.warn("Could not load academic hero from CMS, using fallback:", err);
      }
    }
    loadData();
  }, []);

  return (
    <section className="min-h-[277px] w-full overflow-hidden bg-[#eff4ff] px-4 py-5 sm:px-5 sm:py-6">
      <div className="grid min-h-[229px] w-full grid-cols-1 gap-6 lg:grid-cols-12">
        {/* left */}
        <div className="min-h-[219.5px] min-w-0 lg:col-span-8">
          <div className="flex h-auto min-h-5 w-full flex-wrap gap-2 opacity-100">
            {hero.tag1 && (
              <div className="h-4 max-w-full rounded-[2px] bg-[#904D00] px-2 py-0.5 opacity-100">
                <h2 className="whitespace-nowrap text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-white">
                  {hero.tag1}
                </h2>
              </div>
            )}
            {hero.tag2 && (
              <div className="h-4 max-w-full rounded-[2px] bg-[#DCE9FF] px-2 py-0.5 opacity-100">
                <h2 className="whitespace-nowrap text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-black">
                  {hero.tag2}
                </h2>
              </div>
            )}
          </div>
          <div className="h-auto w-full rotate-0 opacity-100">
            <h1 className="h-auto w-full break-words font-sans text-[28px] font-bold uppercase leading-8 tracking-[-0.7px] text-[#001229] sm:text-[32px] sm:leading-10 sm:tracking-[-0.8px]">
              {hero.heading}
            </h1>
          </div>
          <div className="h-auto w-full max-w-[896px] rotate-0 opacity-100">
            <p className="max-w-[818px] font-sans text-[15px] font-normal leading-[22px] text-[#44474D]">
              {hero.subheading}
            </p>
          </div>
          <div className="flex h-auto w-full flex-wrap gap-3 pt-1 opacity-100">
            {hero.featurePills.map((pill, idx) => (
              <div
                key={pill.id || idx}
                className="flex min-h-[25.5px] w-full max-w-[257.86px] gap-1 rounded-[2px] bg-white px-3 py-1 opacity-100 shadow-[0_1px_2px_0_#0000000D]"
              >
                <div className="h-[17.5px] w-[15px] rotate-0 opacity-100">
                  <img
                    src={pill.icon || "/academic/clock.png"}
                    alt=""
                    width={15}
                    height={17.5}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="h-[16px] w-[214.86px] opacity-100">
                  <p className="font-sans text-[11px] font-semibold leading-[14px] tracking-[0.28px] text-[#0B1C30]">
                    {pill.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="min-h-[228px] min-w-0 rounded-sm bg-[#001229] p-3 sm:p-4 lg:col-span-4">
          {/* title */}
          <div className="flex h-5 w-full items-center justify-between pr-0 opacity-100 mb-2">
            <div className="h-3 min-w-0 opacity-100">
              <p className="truncate font-sans text-[10px] font-bold uppercase leading-3 tracking-[1px] text-[#FFDCC3]">
                {hero.intakeMatrix.badge}
              </p>
            </div>
            <div className="h-5 shrink-0 rounded-[2px] bg-[#4A5F7F66] px-2 py-0.5 text-[#4A5F7F66]">
              <p className="font-sans text-[12px] font-medium leading-4 text-[#D3E4FE]">
                {hero.intakeMatrix.statusLabel}
              </p>
            </div>
          </div>
          {/* grid */}
          <div className="grid h-[136px] w-full grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 opacity-100">
            {hero.intakeMatrix.metrics.map((metric, idx) => (
              <div key={metric.id || idx} className="h-[62px] w-full rounded-[2px] bg-[#0F2744] p-2">
                <h1
                  className="h-8 font-sans text-2xl font-bold leading-8 tracking-[-0.36px]"
                  style={{ color: metric.color || (idx === 0 ? "#FFDCC3" : idx === 1 ? "#6FFBBE" : idx === 2 ? "#FFFFFF" : "#FFB77D") }}
                >
                  {metric.value}
                </h1>
                <div className="h-[14px] w-full">
                  <p className="h-[14px] w-full font-sans text-[11px] font-semibold leading-[14px] tracking-[0.28px] text-[#DCE9FF]">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-4 w-full justify-between pt-1 opacity-100 mt-2">
            <div className="h-3 w-[152.14px]">
              <p className="font-sans text-[10px] font-bold leading-3 tracking-[0.5px] text-[#D3E4FE]">
                {hero.intakeMatrix.regulation}
              </p>
            </div>
            <div className="flex h-3 w-[115.88px] gap-1">
              <p className="h-3 w-[103.22px] font-sans text-[10px] font-bold leading-3 tracking-[0.5px] text-[#FFDCC3]">
                {hero.intakeMatrix.policyText}
              </p>
              <div className="h-[8.666666984558105px] w-[8.666666984558105px] opacity-100">
                <img
                  src="/academic/downArrow.png"
                  alt=""
                  className="h-[9px] w-[9px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
