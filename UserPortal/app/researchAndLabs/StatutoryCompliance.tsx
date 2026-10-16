"use client";

import { Download, Shield, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const compliancePoints = [
  {
    title: "Human Participant Safety",
    description:
      "Mandatory prior written informed assent for junior athletes (<18 yrs) and parental consent forms in Punjabi, Hindi, and English. Continuous emergency ECG monitoring required for VO₂ max tests exceeding 90% HR max.",
    badge: "ICMR Guideline Compliant",
  },
  {
    title: "WADA / NADA Integrity Code",
    description:
      "Zero tolerance for prohibited performance enhancements in scientific trials. Blood micro-samples securely destroyed 90 days post-assay per biological hazard clearance standards.",
    badge: "NADA Clean Sport Charter",
  },
];
const complianceIcons = [Shield, ShieldCheck];
const isCompleteCompliance = (value: typeof compliancePoints) =>
  Array.isArray(value) && value.length > 0 && value.every((point) => Boolean(point.title && point.description));

const StatutoryCompliance = () => {
  const points = useSectionApi(
    "researchAndLabs",
    "statutoryCompliance",
    compliancePoints,
    isCompleteCompliance,
  );

  return (
    <section className="w-full min-w-0 border border-[#D9E3F1] bg-[#F6F9FF] px-4 py-5 sm:px-5 md:px-6 lg:px-8 lg:py-6">
      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex-1 lg:max-w-[53%]">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
            <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0C1B2A]" />
            Statutory Compliance
          </span>

          <h3 className="mt-3 max-w-[620px] text-[1.85rem] font-bold leading-[1.12] tracking-[-0.06em] text-[#001229] md:text-[2.1rem]">
            Institutional Ethics Committee (IEC) &amp; Animal Research Oversight
          </h3>

          <p className="mt-3 max-w-[640px] text-[0.92rem] leading-[1.6] text-[#44474D]">
            All physiological, invasive biochemical, and cognitive testing
            conducted on human athletes strictly adheres to the Indian Council
            of Medical Research (ICMR) Ethical Guidelines (2017) and Declaration
            of Helsinki.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold leading-5 tracking-[0.02em] text-[#0D1C2C]"
            >
              <Download size={14} strokeWidth={2} className="text-[#0D1C2C]" />
              Download IEC Protocol Form 1-A (Human Subjects)
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold leading-5 tracking-[0.02em] text-[#0D1C2C]"
            >
              <Download size={14} strokeWidth={2} className="text-[#0D1C2C]" />
              CPCSEA Small Animal Exercise Testing Guidelines
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 lg:max-w-[46%]">
          <div className="space-y-3">
            {points.map(({ title, description, badge }, index) => {
              const Icon = complianceIcons[index];
              return (
              <div
                key={title}
                className="rounded-[8px] border border-[#DEE6F4] bg-[#EAF1FF] p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#001229]">
                    {title}
                  </span>
                  <Icon size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[#0C1B2A]" />
                </div>

                <p className="mt-2 text-[0.7rem] leading-[1.55] text-[#44474D]">
                  {description}
                </p>

                <div className="mt-2.5">
                  <span className="inline-block rounded-full bg-[#EEF7F1] px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.4px] text-[#001229]">
                    {badge}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatutoryCompliance;
