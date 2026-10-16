"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsApprovedFeeData, AdmissionsFeeCard } from "@/lib/cms-types";

const defaultFeeData: AdmissionsApprovedFeeData = {
  tag: "Statutory Finance Ledger",
  title: "Approved Academic Fee Structure (AY 2025-26)",
  icon: "/admissions/approved.png",
  feeCards: [
    {
      id: "fee-ug",
      category: "UNDERGRADUATE",
      title: "B.P.Ed / B.Sc. Sports",
      rows: [
        { label: "Tuition Fee (Per Sem):", amount: "₹ 18,500" },
        { label: "Sports Lab & Gym Fund:", amount: "₹ 4,000" },
        { label: "Library & E-Resource:", amount: "₹ 1,500" },
        { label: "Refundable Caution:", amount: "₹ 2,000" },
      ],
      totalLabel: "Total 1st Sem:",
    },
    {
      id: "fee-pg",
      category: "POSTGRADUATE",
      title: "M.P.Ed / M.Sc. Biomechanics",
      rows: [
        { label: "Tuition Fee (Per Sem):", amount: "₹ 22,000" },
        { label: "High-Perf. Testing Fee:", amount: "₹ 6,500" },
        { label: "Library & E-Resource:", amount: "₹ 2,000" },
        { label: "Refundable Caution:", amount: "₹ 3,000" },
      ],
      totalLabel: "Total 1st Sem:",
    },
    {
      id: "fee-hostel",
      category: "CAMPUS HOSTEL",
      title: "Athletes Village Lodging",
      rows: [
        { label: "Hostel Rent (Per Sem):", amount: "₹ 12,000" },
        { label: "Nutritional Mess Deposit:", amount: "₹ 15,000" },
        { label: "Laundry & Conditioning:", amount: "₹ 2,500" },
        { label: "Hostel Caution Deposit:", amount: "₹ 2,500" },
      ],
      totalLabel: "Total Sem Boarding:",
    },
  ],
};

const getCardTotal = (rows: { label: string; amount: string }[]) =>
  rows.reduce((sum, { amount }) => sum + Number(amount.replace(/[^\d]/g, "")), 0);

const getBadgeClass = (category: string) => {
  switch (category) {
    case "UNDERGRADUATE":
      return "bg-[#0F2744] text-white";
    case "POSTGRADUATE":
      return "bg-[#904D00] text-white";
    case "CAMPUS HOSTEL":
      return "bg-[#002D1C] text-[#6FFBBE]";
    default:
      return "bg-[#0F2744] text-white";
  }
};

const Approved = () => {
  const [feeData, setFeeData] = useState<AdmissionsApprovedFeeData>(defaultFeeData);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.feeStructure) {
          setFeeData((prev) => ({
            ...prev,
            ...admissions.feeStructure,
            feeCards:
              Array.isArray(admissions.feeStructure.feeCards) &&
              admissions.feeStructure.feeCards.length > 0
                ? admissions.feeStructure.feeCards
                : prev.feeCards,
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadData();
  }, []);

  return (
    <section className="w-full rounded-md bg-white p-4 shadow-sm mb-3">
      <header className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
            {feeData.tag}
          </p>
          <h1 className="text-2xl font-bold tracking-[-0.36px] text-[#001229] sm:text-3xl">
            {feeData.title}
          </h1>
        </div>
        <img src={feeData.icon || "/admissions/approved.png"} alt="" />
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {feeData.feeCards.map((card) => (
          <article
            key={card.id || card.category}
            className="flex min-w-0 flex-col justify-between gap-4 rounded-md bg-[#EFF4FF] p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover:border-[#D9E7FF]"
          >
            <div>
              <span
                className={`inline-flex rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-[0.5px] ${getBadgeClass(
                  card.category
                )}`}
              >
                {card.category}
              </span>
              <h2 className="mt-1 text-base font-bold leading-6 tracking-[-0.08px] text-[#001229]">
                {card.title}
              </h2>
              <dl className="mt-2 space-y-1 text-xs text-[#0B1C30]">
                {card.rows.map(({ label, amount }, rIdx) => (
                  <div key={rIdx} className="flex items-start justify-between gap-2">
                    <dt>{label}</dt>
                    <dd className="shrink-0 font-bold">{amount}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-sm bg-white p-1 text-[#0B1C30]">
              <span className="text-[11px] font-bold tracking-[0.275px]">{card.totalLabel}</span>
              <span className="text-base font-bold text-[#904D00]">
                ₹ {getCardTotal(card.rows).toLocaleString("en-IN")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Approved;