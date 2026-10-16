"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsEligibilityData } from "@/lib/cms-types";

const defaultEligibilityData: AdmissionsEligibilityData = {
  tag: "Interactive Calculator",
  title: "Eligibility Checker & Fee Estimator",
  icon: "/admissions/e1.png",
  selectOptions: {
    programme: {
      label: "Target Programme",
      options: [
        { label: "B.P.Ed (Bachelor of Physical Education) - 2 Yrs" },
        { label: "M.Ed (Master of Education) - 2 Yrs" },
        { label: "B.Ed (Bachelor of Education) - 2 Yrs" },
      ],
    },
    domicile: {
      label: "Applicant Domicile / Quota",
      options: [
        { label: "Punjab Domicile - General (85% Quota)" },
        { label: "Other State (15% Quota)" },
        { label: "Punjab Domicile - Reserved Category" },
      ],
    },
    accommodation: {
      label: "Hostel & Mess Accommodation",
      options: [
        { label: "Day Scholar (No Campus Lodging)" },
        { label: "Hostel & Mess Accommodation" },
      ],
    },
  },
  commitment: {
    tag: "Estimated Semester Commitment",
    amount: "₹ 24,850",
    periodSuffix: "/ Semester (inclusive of Gym & Sports Labs)",
    waiverSchemeBadge: "Eligible for Punjab Post-Matric / Medallist Direct Waiver Scheme",
    buttonText: "Apply Calculation",
  },
};

const Eligibility = () => {
  const [eligibility, setEligibility] = useState<AdmissionsEligibilityData>(defaultEligibilityData);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.eligibility) {
          setEligibility((prev) => ({
            ...prev,
            ...admissions.eligibility,
            selectOptions: {
              programme:
                admissions.eligibility.selectOptions?.programme?.options?.length > 0
                  ? admissions.eligibility.selectOptions.programme
                  : prev.selectOptions.programme,
              domicile:
                admissions.eligibility.selectOptions?.domicile?.options?.length > 0
                  ? admissions.eligibility.selectOptions.domicile
                  : prev.selectOptions.domicile,
              accommodation:
                admissions.eligibility.selectOptions?.accommodation?.options?.length > 0
                  ? admissions.eligibility.selectOptions.accommodation
                  : prev.selectOptions.accommodation,
            },
            commitment: {
              ...prev.commitment,
              ...admissions.eligibility.commitment,
            },
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadData();
  }, []);

  return (
    <section className="w-full rounded-md bg-white p-4 shadow-sm">
      <header className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904d00]">
            {eligibility.tag}
          </p>
          <h2 className="text-2xl font-bold tracking-[-0.36px] text-[#001229] sm:text-3xl">
            {eligibility.title}
          </h2>
        </div>
        <img src={eligibility.icon || "/admissions/e1.png"} alt="" />
      </header>

      <div className="rounded-md bg-[#eff4ff] p-3 sm:p-4">
        <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {Object.entries(eligibility.selectOptions).map(([key, field]) => (
            <label key={key} className="flex min-w-0 flex-col gap-2 text-sm font-bold text-[#0b1c30]">
              {field.label}
              <select
                defaultValue={field.options?.[0]?.label || ""}
                className="h-12 w-full rounded-sm border-0 bg-white px-3 text-sm font-normal text-[#0b1c30] outline-none focus:ring-2 focus:ring-blue-400"
              >
                {field.options?.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-sm bg-white p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#904d00]">
              {eligibility.commitment.tag}
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm text-[#44474d]">
              <strong className="text-3xl font-bold tracking-[-0.36px] text-[#001229]">
                {eligibility.commitment.amount}
              </strong>
              <span>{eligibility.commitment.periodSuffix}</span>
            </p>
            <p className="mt-3 inline-block rounded-sm bg-[rgba(78,222,163,0.4)] px-2 py-1 text-xs font-bold tracking-wide text-[#00a16f] sm:text-sm">
              {eligibility.commitment.waiverSchemeBadge}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-sm bg-[#001229] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#102b4a] cursor-pointer"
          >
            {eligibility.commitment.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;