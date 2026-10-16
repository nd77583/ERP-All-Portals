"use client";
import { useEffect, useState } from "react";
import { getChoiceCards } from "../api/academic/Choicecard";

import { getCmsSection } from "@/lib/cmsClient";

const colors = [
  { background: "bg-[#001229]", text: "text-[#001229]" },
  { background: "bg-[#904D00]", text: "text-[#904D00]" },
  { background: "bg-[#4A5F7F]", text: "text-[#4A5F7F]" },
  { background: "bg-[#002D1C]", text: "text-[#002D1C]" },
];

const pillars = [
  {
    _id : "1",
    cardNumber: "01",
    creditRange: "48-64 Cr",
    title: "Discipline Specific Core (DSC)",
    description:
      "Fundamental pillars of Sports Sciences: Functional Anatomy, Sports Physiology, Advanced Kinesiology, Motor Learning, and Conditioning Practicums.",
    highlightText: "Mandatory Non-negotiable credits across all semesters.",
  },
  {
    _id: "2",
    cardNumber: "02",
    creditRange: "24-32 Cr",
    title: "Discipline Specific Elective (DSE)",
    description:
      "Targeted specializations: Talent Identification Protocols, Advanced Sports Nutrition, Para-Athletic Conditioning, or Advanced Match Analysis.",
    highlightText:
      "Selected from departmental elective pool in Semesters V to VIII.",
  },
  {
    _id: "3",
    cardNumber: "03",
    creditRange: "16-20 Cr",
    title: "Generic Open Electives (GE)",
    description:
      "Cross-disciplinary exposure open to university-wide learners: Sports Journalism, Sports Marketing, Ergonomics, and Community Wellness.",
    highlightText: "Inter-faculty mobility across MBSPU departments.",
  },
  {
    _id: "4",
    cardNumber: "04",
    creditRange: "20-24 Cr",
    title: "Practicum & Officiating Badges",
    description:
      "Direct technical certification: National Officiating Licenses, First Responder CPR/AED, Strength Training Apprenticeship, and Field Practicums.",
    highlightText:
      "Integrated partnership with National Sports Federations (NSFs).",
  },
];

const Choice = () => {
  const [cardsData, setCardsData] = useState(pillars);
  const [headerInfo, setHeaderInfo] = useState({
    tag: "NEP 2020 Curricular Matrix",
    title: "Choice-Based Credit System (CBCS) Structure",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academic = await getCmsSection("academic");
        if (academic?.choice) {
          if (Array.isArray(academic.choice.pillars) && academic.choice.pillars.length > 0) {
            setCardsData(academic.choice.pillars);
          }
          if (academic.choice.title) {
            setHeaderInfo({
              tag: academic.choice.tag || "NEP 2020 Curricular Matrix",
              title: academic.choice.title,
            });
          }
          return;
        }

        const cardsRes = await getChoiceCards();
        const list = cardsRes?.data;

        if (Array.isArray(list) && list.length > 0) {
          setCardsData(list);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="box-border w-full bg-white px-5 py-6 font-sans">
      <div className="w-full">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[.5px] text-[#904D00]">
              {headerInfo.tag}
            </div>
            <h2 className="m-0 text-[clamp(24px,3vw,32px)] font-bold leading-[1.2] tracking-[-.36px] text-[#001229]">
              {headerInfo.title}
            </h2>
          </div>
          <div className="rounded-[2px] bg-[#EFF4FF] px-3 py-1.5 text-sm font-medium leading-5 text-[#44474D]">
            Total Degree Credits: 132 (3-Yr) / 160 (4-Yr Honours)
          </div>
        </header>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {cardsData.map((pillar, index) => (
            <article
              key={pillar._id || pillar.cardNumber || index}
              className="box-border flex min-h-[204px] flex-col rounded-[2px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,.05)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,18,41,.12)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-xl text-xs font-bold ${
                    colors[index % colors.length].background
                  } ${pillar.cardNumber === "04" ? "text-[#6FFBBE]" : "text-white"}`}
                >
                  {pillar.cardNumber}
                </span>
                <strong
                  className={`text-base ${colors[index % colors.length].text}`}
                >
                  {pillar.creditRange}
                </strong>
              </div>
              <h3 className="mb-1 text-base font-bold leading-6 text-[#001229]">
                {pillar.title}
              </h3>
              <p className="m-0 flex-1 text-xs leading-4 text-[#44474D]">
                {pillar.description}
              </p>
              <div className="mt-3 rounded-[2px] bg-[#EFF4FF] p-1 text-[10px] font-bold leading-3 tracking-[.5px] text-[#0B1C30]">
                {pillar.highlightText}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Choice;
