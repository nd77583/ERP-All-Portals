"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsPathwayData } from "@/lib/cms-types";

const defaultPathwayData: AdmissionsPathwayData = {
  tag: "Mandatory Protocol",
  title: "4-Step Candidate Admission & Sports Trials Pathway",
  statusBadge: "GIGW-SECURED-FLOW",
  steps: [
    {
      id: "step-1",
      stepNumber: "01",
      badge: "ONLINE DESK",
      badgeBg: "#0F2744",
      badgeTextColor: "#FFFFFF",
      title: "Registration & DigiLocker Sync",
      description:
        "Create applicant profile via Aadhaar SSO. Direct integration with DigiLocker for instant 10th/10+2 marksheet validation and domicile records.",
      tags: ["• Aadhaar e-KYC", "• Sports Certificate Upload"],
      tagColor: "#001229",
      buttonText: "OPEN REGISTRATION FORM",
      buttonLink: "#",
      buttonIcon: "/admissions/p1.png",
      buttonTheme: "dark",
    },
    {
      id: "step-2",
      stepNumber: "02",
      badge: "GROUND SPRINT",
      badgeBg: "#904D00",
      badgeTextColor: "#FFFFFF",
      title: "Physical Fitness & Proficiency Trials",
      description:
        "Mandatory on-ground trials under the strict AAHPER battery battery standard. Biometrically logged events at Raja Bhalindra Singh Sports Complex.",
      tags: ["• 50m Dash", "• 4×10m Shuttle", "• Standing Broad Jump"],
      tagColor: "#904D00",
      buttonText: "DOWNLOAD TRIAL GUIDE",
      buttonLink: "#",
      buttonIcon: "/admissions/p2.png",
      buttonTheme: "light",
    },
    {
      id: "step-3",
      stepNumber: "03",
      badge: "TRANSPARENT AUDIT",
      badgeBg: "#0F2744",
      badgeTextColor: "#FFFFFF",
      title: "Merit List & Statutory Ranking",
      description:
        "Automated computation with 60% Sports Trial Grade + 40% Academic Qualifying Aggregate. Category-wise reservation rosters sealed by University Syndicate.",
      tags: ["• Syndicate Formula", "• Public Grievance Window"],
      tagColor: "#001229",
      buttonText: "VIEW PROVISIONAL DATES",
      buttonLink: "#",
      buttonIcon: "/admissions/p3.png",
      buttonTheme: "light",
    },
    {
      id: "step-4",
      stepNumber: "04",
      badge: "FINAL ADMIT",
      badgeBg: "#002D1C",
      badgeTextColor: "#6FFBBE",
      title: "Counselling & SBIPay Gateway",
      description:
        "In-person document verification, athletic medical fitness clearance, and instant seat allotment with State Bank of India e-Pay statutory gateway.",
      tags: ["• Instant Fee Receipt", "• Hostel Priority Queue"],
      tagColor: "#002D1C",
      buttonText: "FEE CLEARANCE STEPS",
      buttonLink: "#",
      buttonIcon: "/admissions/p4.png",
      buttonTheme: "light",
    },
  ],
};

export default function Pathway() {
  const [pathway, setPathway] = useState<AdmissionsPathwayData>(defaultPathwayData);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.pathway) {
          setPathway((prev) => ({
            ...prev,
            ...admissions.pathway,
            steps:
              Array.isArray(admissions.pathway.steps) && admissions.pathway.steps.length > 0
                ? admissions.pathway.steps
                : prev.steps,
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadData();
  }, []);

  return (
    <section className="w-full rounded bg-white p-4 shadow-sm">
      <header className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
            {pathway.tag}
          </p>
          <h2 className="text-2xl font-bold leading-8 tracking-[-0.36px] text-[#001229]">
            {pathway.title}
          </h2>
        </div>
        <span className="w-fit rounded-sm bg-[#EFF4FF] px-2 py-1 text-xs font-medium text-[#44474D]">
          {pathway.statusBadge}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {pathway.steps.map((step, index) => {
          const stepNum = step.stepNumber || `0${index + 1}`;
          const isDarkTheme = step.buttonTheme === "dark" || index === 0;

          return (
            <article
              key={step.id || index}
              className="flex min-h-[226px] flex-col justify-between rounded bg-[#EFF4FF] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover:border-[#D9E7FF]"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="text-[32px] font-bold leading-8 tracking-[-0.36px] text-[#001229]/30"
                  >
                    {stepNum}
                  </span>
                  <span
                    style={{
                      backgroundColor: step.badgeBg || "#0F2744",
                      color: step.badgeTextColor || "#FFFFFF",
                    }}
                    className="rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.5px]"
                  >
                    {step.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold leading-6 tracking-[-0.08px] text-[#001229]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[18px] text-[#44474D]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {step.tags?.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      style={{ color: step.tagColor || "#001229" }}
                      className="rounded-sm bg-[#FFFFFF] px-1.5 py-0.5 text-[11px] font-semibold leading-[18px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={step.buttonLink || "#"}
                className={`mt-4 flex h-[36px] w-full items-center justify-center rounded-sm px-2 text-center text-[11px] font-bold tracking-[0.275px] cursor-pointer transition ${
                  isDarkTheme
                    ? "bg-[#001229] text-white hover:bg-[#2b6cb0]"
                    : "bg-[#D3E4FE] text-[#001229] hover:bg-[#2b6cb0] hover:text-white"
                }`}
              >
                <img
                  src={step.buttonIcon || "/admissions/p1.png"}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                <span className="ml-1">{step.buttonText}</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
