"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getCmsSection } from "@/lib/cmsClient";

type AcademicLevel = "ALL" | "UG" | "PG" | "PHD" | "PG_DIPLOMA";

type ProgrammeCardItem = {
  id: string;
  level: AcademicLevel;
  durationLabel: string;
  title: string;
  faculty: string;
  statusBadge?: {
    label: string;
    icon?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  facts: {
    icon: string;
    title: string;
    description: string;
  }[];
  footer?: {
    label: string;
    value: string;
  };
  pdfLabel: string;
};

const PROGRAMME_CARDS: ProgrammeCardItem[] = [
  {
    id: "bped",
    level: "UG",
    durationLabel: "2 YEARS / 4 SEMESTERS",
    title: "Bachelor of Physical Education (B.P.Ed)",
    faculty: "Faculty of Pedagogical & Applied Sports Sciences",
    statusBadge: {
      label: "NCTE APPROVED",
      icon: "/academic/tick.png",
    },
    stats: [
      {
        label: "SANCTIONED SEATS",
        value: "100 Seats",
      },
      {
        label: "SPORTS QUOTA",
        value: "50% Reserved",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "Bachelor's Degree in any discipline with 50% marks and mandatory inter-college/district sports participation.",
      },
      {
        icon: "/programmeCard/flag.png",
        title: "Trial Weightage: ",
        description:
          "60% Physical Fitness & Skill Trials + 40% Qualifying Academic Merit.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Head of Department: ",
        description:
          "Prof. (Dr.) Gursharan Singh, Senior Coach Athletic Pedagogy.",
      },
    ],
    footer: {
      label: "Trials Window: 18 - 22 August 2025",
      value: "Venue: Raja Bhalindra Track",
    },
    pdfLabel: "Syllabus PDF (1.4MB)",
  },
  {
    id: "msc-biomechanics",
    level: "PG",
    durationLabel: "2 YEARS / 4 SEMESTERS",
    title: "M.Sc Sports Science & Biomechanics",
    faculty: "School of High-Performance Kinetics & Diagnostics",
    statusBadge: {
      label: "LAB INTENSIVE",
      icon: "/programmeCard/bar.png",
    },
    stats: [
      { label: "TOTAL SEATS", value: "40 Seats" },
      {
        label: "PRACTICUM RATIO",
        value: "65% Lab / 35% Th",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "B.Sc Sports Science, B.P.Ed, B.P.T, or B.Sc Life Sciences with min. 55% aggregate marks.",
      },
      {
        icon: "/programmeCard/icon.png",
        title: "Hardware Practicum: ",
        description:
          "12-Camera Vicon 3D Motion Analysis, Dual AMTI Force Plates, Cosmed K5 VO2 Max Telemetry.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Lead Scientist: ",
        description:
          "Dr. Harpreet Kaur (Ex-SAI High Performance Biomechanist).",
      },
    ],
    footer: {
      label: "Industry Internship: 1 Full Semester",
      value: "SAI NCOE Certified",
    },
    pdfLabel: "Lab Manual & Syllabus (2.2MB)",
  },
  {
    id: "bsc-sports-science",
    level: "UG",
    durationLabel: "4 YEARS / 8 SEMESTERS",
    title: "B.Sc (Hons) Sports Science",
    faculty: "Faculty of Sports Medicine, Kinesiology & Nutrition",
    statusBadge: {
      label: "NEP-2020 HONOURS W/ RESEARCH",
    },
    stats: [
      { label: "CAPACITY", value: "60 Seats" },
      {
        label: "EXIT OPTIONS",
        value: "Cert/Dip/Degree/Hons",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "10+2 (Senior Secondary) with Physics, Chemistry & Biology / Math / Physical Ed with 50% aggregate.",
      },
      {
        icon: "/programmeCard/lamp.png",
        title: "Core Modules: ",
        description:
          "Exercise Biochemistry, Performance Analysis, Strength & Conditioning, Sports Ergonomics.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Programme Lead: ",
        description: "Dr. Manavendra Rawat, NSCA-CSCS Certified Specialist.",
      },
    ],
    footer: {
      label: "UGC Credit Framework: 160 Total",
      value: "Research Dissertation Sem VIII",
    },
    pdfLabel: "NEP Model Curriculum (1.8MB)",
  },
  {
    id: "mped",
    level: "PG",
    durationLabel: "2 YEARS / 4 SEMESTERS",
    title: "Master of Physical Education (M.P.Ed)",
    faculty: "Faculty of Pedagogical Leadership & Athletic Administration",
    statusBadge: {
      label: "NCTE APPROVED",
      icon: "/academic/tick.png",
    },
    stats: [
      {
        label: "SANCTIONED SEATS",
        value: "40 Seats",
      },
      {
        label: "FIELD TRAINING",
        value: "Compulsory Residency",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "B.P.Ed or B.Sc in Health & Physical Education with minimum 50% marks.",
      },
      {
        icon: "/programmeCard/cap.png",
        title: "Core Modules: ",
        description:
          "Advanced Coaching Pedagogy, Test & Measurement in Sports, Athletic Curriculum Engineering.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Dean of Studies: ",
        description: "Prof. (Dr.) Rajeshwar Dass, Member AIU Sports Board.",
      },
    ],
    footer: {
      label: "Specialization: 1 Major Team/Individual Game",
      value: "NIS Certified Faculty",
    },
    pdfLabel: "Syllabus & Ordinances (1.2MB)",
  },
  {
    id: "phd-sports-science",
    level: "PHD",
    durationLabel: "3 - 5 YEARS DURATION",
    title: "Ph.D in Physical Education & Sports Sciences",
    faculty: "Centre for Advanced Doctoral Inquiry & Sports Innovation",
    statusBadge: {
      label: "UGC MINIMUM STANDARDS 2022",
    },
    stats: [
      {
        label: "FELLOWSHIP TYPE",
        value: "UGC-JRF / State Stipend",
      },
      {
        label: "ANNUAL INTAKE",
        value: "Subject to Vacancies",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "Master's (M.P.Ed / M.Sc Sports Science) with 55% marks + MBPSU Doctoral Entrance Test (DET) or UGC-NET/JRF.",
      },
      {
        icon: "/programmeCard/brain.png",
        title: "Priority Thrusts: ",
        description:
          "Parasports kinematics, athletic polymorphism genetics, cognitive reaction times under stress, youth athlete monitoring.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Research Directorate: ",
        description: "Dean Academic Affairs & University Research Board (URB).",
      },
    ],
    footer: {
      label: "Coursework: 12 Credits",
      value: "Research Ethics & SPSS Lab",
    },
    pdfLabel: "Ph.D Ordinance & Guidelines (980KB)",
  },
  {
    id: "pg-diploma-sports-mgmt",
    level: "PG_DIPLOMA",
    durationLabel: "1 YEAR / 2 SEMESTERS",
    title: "PG Diploma in Sports Management & Analytics",
    faculty: "Centre for Sports Governance, Leagues & Commercial Law",
    statusBadge: {
      label: "PROFESSIONAL EXECUTIVE TRACK",
    },
    stats: [
      {
        label: "SANCTIONED SEATS",
        value: "40 Seats",
      },
      {
        label: "PLACEMENT CELL",
        value: "Leagues & Federations",
      },
    ],
    facts: [
      {
        icon: "/programmeCard/cardTick.png",
        title: "Eligibility: ",
        description:
          "Graduation in any discipline with min. 50% marks. Direct weightage for National/All India Inter-Varsity athletes.",
      },
      {
        icon: "/programmeCard/search.png",
        title: "Applied Syllabi: ",
        description:
          "League Operations, Athlete Contract Law, Sports Broadcasting Rights, Python & Tableau Sports Analytics.",
      },
      {
        icon: "/programmeCard/idCard.png",
        title: "Chair: ",
        description:
          "Adv. K. S. Mann, Sports Arbitrator & CAS Accredited Counsel.",
      },
    ],
    footer: {
      label: "Practicum: 8 Weeks Live Tournament Ops",
      value: "IPL / PKL / ISL Case Studies",
    },
    pdfLabel: "PGDSMA Framework (850KB)",
  },
];

export default function AcademicProgrammes() {
  const [programmes, setProgrammes] = useState<ProgrammeCardItem[]>(PROGRAMME_CARDS);
  const [activeLevel, setActiveLevel] = useState<AcademicLevel>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const academic = await getCmsSection("academic");
        if (Array.isArray(academic?.programmes) && academic.programmes.length > 0) {
          const valid = academic.programmes.filter((p) => p.isActive !== false) as unknown as ProgrammeCardItem[];
          if (valid.length > 0) {
            setProgrammes(valid);
          }
        }
      } catch (err) {
        console.warn("Could not load programmes from CMS:", err);
      }
    }
    loadData();
  }, []);

  const downloadCompendium = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const escapeHtml = (value: string) =>
      value.replace(
        /[&<>"']/g,
        (character) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
          })[character] ?? character,
      );

    const programmeMarkup = programmes.map(
      (card) => `
      <section class="programme">
        <h2>${escapeHtml(card.title)}</h2>
        <table><tbody>
          <tr><th>Level</th><td>${escapeHtml(card.level)}</td><th>Duration</th><td>${escapeHtml(card.durationLabel)}</td></tr>
          <tr><th>Faculty</th><td colspan="3">${escapeHtml(card.faculty)}</td></tr>
          ${card.statusBadge ? `<tr><th>Status</th><td colspan="3">${escapeHtml(card.statusBadge.label)}</td></tr>` : ""}
          ${card.stats.map((stat) => `<tr><th>${escapeHtml(stat.label)}</th><td colspan="3">${escapeHtml(stat.value)}</td></tr>`).join("")}
          ${card.facts.map((fact) => `<tr><th>${escapeHtml(fact.title)}</th><td colspan="3">${escapeHtml(fact.description)}</td></tr>`).join("")}
          ${card.footer ? `<tr><th>${escapeHtml(card.footer.label)}</th><td colspan="3">${escapeHtml(card.footer.value)}</td></tr>` : ""}
          <tr><th>Source</th><td colspan="3">${escapeHtml(card.pdfLabel)}</td></tr>
        </tbody></table>
      </section>`,
    ).join("");

    printWindow.document
      .write(`<!doctype html><html><head><title>Complete Academic Programmes Compendium</title><style>
      *{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#001229;margin:28px;font-size:12px}h1{font-size:24px;margin:0 0 4px}header{border-bottom:3px solid #904D00;padding-bottom:14px;margin-bottom:20px}.subtitle{color:#44474D;margin:0}.programme{margin:0 0 20px;break-inside:avoid}.programme h2{font-size:16px;margin:0;padding:8px;background:#001229;color:#fff}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d9e1ec;padding:7px;text-align:left;vertical-align:top}th{width:18%;background:#eff4ff;color:#001229}td{overflow-wrap:anywhere}@media print{body{margin:14mm}.programme{break-inside:avoid}}
    </style></head><body><header><h1>Complete Academic Programmes Compendium</h1><p class="subtitle">All ${programmes.length} programme cards and complete academic data</p></header><main>${programmeMarkup}</main><script>window.onload=function(){window.print();}</script></body></html>`);
    printWindow.document.close();
  };

  const printProgrammeMatrix = (card: ProgrammeCardItem) => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character,
      );
    const rows = [
      `<tr><th>Level</th><td>${escapeHtml(card.level)}</td><th>Duration</th><td>${escapeHtml(card.durationLabel)}</td></tr>`,
      `<tr><th>Faculty</th><td colspan="3">${escapeHtml(card.faculty)}</td></tr>`,
      ...(card.statusBadge ? [`<tr><th>Status</th><td colspan="3">${escapeHtml(card.statusBadge.label)}</td></tr>`] : []),
      ...card.stats.map((stat) => `<tr><th>${escapeHtml(stat.label)}</th><td colspan="3">${escapeHtml(stat.value)}</td></tr>`),
      ...card.facts.map((fact) => `<tr><th>${escapeHtml(fact.title)}</th><td colspan="3">${escapeHtml(fact.description)}</td></tr>`),
      ...(card.footer ? [`<tr><th>${escapeHtml(card.footer.label)}</th><td colspan="3">${escapeHtml(card.footer.value)}</td></tr>`] : []),
      `<tr><th>Source</th><td colspan="3">${escapeHtml(card.pdfLabel)}</td></tr>`,
    ].join("");

    printWindow.document.write(`<!doctype html><html><head><title>${escapeHtml(card.title)} Matrix</title><style>
      *{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#001229;margin:28px;font-size:12px}h1{font-size:20px;margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d9e1ec;padding:8px;text-align:left;vertical-align:top}th{background:#eff4ff}td{overflow-wrap:anywhere}@media print{body{margin:14mm}}
    </style></head><body><h1>${escapeHtml(card.title)}</h1><table><tbody>${rows}</tbody></table><script>window.onload=function(){window.print();}</script></body></html>`);
    printWindow.document.close();
  };

  const filterTabs: { label: string; subLabel?: string; key: AcademicLevel }[] =
    [
      {
        label: "All Degrees",
        subLabel: `(${programmes.length})`,
        key: "ALL",
      },
      { label: "Undergraduate", subLabel: "(UG)", key: "UG" },
      { label: "Postgraduate", subLabel: "(PG)", key: "PG" },
      { label: "Doctoral", subLabel: "(Ph.D)", key: "PHD" },
      { label: "PG Diploma", key: "PG_DIPLOMA" },
    ];

  const filteredCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return programmes.filter((card) => {
      const matchesLevel = activeLevel === "ALL" || card.level === activeLevel;

      if (!matchesLevel) return false;
      if (!query) return true;

      const searchableBlob = [
        card.title,
        card.faculty,
        card.durationLabel,
        card.statusBadge?.label ?? "",
        ...card.stats.map((s) => `${s.label} ${s.value}`),
        ...card.facts.map((f) => `${f.title} ${f.description}`),
        card.footer?.label ?? "",
        card.footer?.value ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableBlob.includes(query);
    });
  }, [programmes, activeLevel, searchQuery]);

  return (
    <div className="w-full">
      {/* Filter & Search Bar */}
      <section className="mx-auto min-h-[52px] overflow-hidden bg-[#E5EEFF] px-3 py-3 shadow-[0px_1px_2px_0px_#0000000D] sm:px-5">
        <div className="mx-auto flex min-h-[28px] min-w-0 flex-col gap-3 opacity-100 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Level Tabs */}
          <div
            className="flex h-[26px] min-w-0 w-full shrink-0 gap-1 overflow-x-auto opacity-100 lg:flex-1 lg:w-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex h-[26px] items-center pr-1 shrink-0">
              <div className="flex h-[26px] items-center justify-center gap-1">
                <Image
                  src="/academic/level.png"
                  alt=""
                  width={12}
                  height={8}
                  className="w-3 h-2"
                />
                <span className="flex items-center font-['Inter'] text-[11px] font-bold uppercase tracking-[0.28px] text-[#44474D]">
                  Programs:
                </span>
              </div>
            </div>

            {filterTabs.map((tab) => {
              const isActive = activeLevel === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveLevel(tab.key)}
                  className={`flex h-[26px] shrink-0 items-center justify-center gap-1 rounded-[2px] px-3 py-1.5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#001229] text-white shadow-sm"
                      : "bg-[#FFFFFF] text-[#0B1C30] hover:bg-[#F3F7FF] hover:shadow-sm"
                  }`}
                >
                  <span className="font-['Inter'] text-[11px] font-semibold tracking-[0.28px] whitespace-nowrap">
                    {tab.label}
                  </span>
                  {tab.subLabel && (
                    <span
                      className={`font-['Inter'] text-[11px] font-semibold tracking-[0.28px] ${
                        isActive ? "text-white" : "text-[#0B1C30]"
                      }`}
                    >
                      {tab.subLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Search Input & Action */}
          <div className="flex min-w-0 w-full flex-col gap-2 sm:flex-row lg:ml-auto lg:w-auto">
            <div className="relative flex h-[28px] w-full items-center rounded-[2px] border border-[#D9E1EC] bg-white shadow-[0px_1px_2px_0px_#0000000D] transition-all duration-200 hover:border-[#B7C6D8] sm:w-[240px]">
              <label
                htmlFor="academic-search"
                className="flex h-full w-full items-center gap-2 px-2.5"
              >
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6E7A86"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="6" />
                    <path d="m16 16 5 5" />
                  </svg>
                </span>

                <input
                  type="search"
                  name="search"
                  id="academic-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programmes..."
                  aria-label="Search programmes"
                  className="h-full w-full border-0 bg-transparent p-0 text-[11px] text-[#0B1C30] placeholder:text-[#6E7A86] focus:outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </label>
            </div>

            <button
              type="button"
              onClick={downloadCompendium}
              className="flex h-[26px] w-full items-center justify-center gap-1 rounded-[2px] bg-[#904D00] px-3 py-1.5 text-white shadow-[0px_1px_2px_0px_#0000000D] transition-all duration-200 hover:bg-[#A35E00] hover:shadow-[0px_2px_6px_0px_#0000001A] cursor-pointer sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <span className="whitespace-nowrap font-['Inter'] text-[11px] font-bold leading-[14px] tracking-[0.28px] uppercase">
                COMPLETE COMPENDIUM PDF
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Program Cards Grid */}
      <section className="w-full py-6 px-4 md:px-6 lg:px-8">
        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-['Public_Sans'] text-[16px] font-semibold text-[#001229]">
              No programmes found
            </p>
            <p className="mt-1 font-['Inter'] text-[13px] text-[#44474D]">
              Try adjusting your search query or switching the level filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveLevel("ALL");
                setSearchQuery("");
              }}
              className="mt-4 rounded-[2px] bg-[#001229] px-3 py-1.5 font-['Inter'] text-[11px] font-semibold text-white transition-all hover:bg-[#00224a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredCards.map((card) => {
              const accentClass =
                card.id === "bped" || card.id === "mped"
                  ? "bg-[#904D00]"
                  : card.id === "bsc-sports-science"
                    ? "bg-[#002D1C]"
                    : card.id === "pg-diploma-sports-mgmt"
                      ? "bg-[#FE932C]"
                      : card.id === "msc-biomechanics"
                        ? "bg-[#0F2744]"
                        : "bg-[#001229]";
              const durationTextColor =
                card.id === "bped" || card.id === "mped" || card.id === "pg-diploma-sports-mgmt"
                  ? "text-[#904D00]"
                  : card.id === "bsc-sports-science"
                    ? "text-[#002D1C]"
                    : "text-[#001229]";
              const cardHeightClass =
                card.id === "bped" || card.id === "msc-biomechanics" || card.id === "bsc-sports-science"
                  ? "min-h-[368.5px]"
                  : card.id === "phd-sports-science"
                    ? "min-h-[434px]"
                    : "min-h-[433.5px]";
              const footerValueTextColor =
                card.id === "bped" || card.id === "mped" || card.id === "pg-diploma-sports-mgmt"
                  ? "text-[#904D00]"
                  : "text-[#001229]";
              const statusBadgeColors =
                card.id === "bped" || card.id === "mped"
                  ? "bg-[#002D1C] text-[#6FFBBE]"
                  : card.id === "msc-biomechanics"
                    ? "bg-[#D3E4FE] text-[#0B1C30]"
                    : card.id === "bsc-sports-science"
                      ? "bg-[#FFDCC3] text-[#2F1500]"
                      : card.id === "phd-sports-science"
                        ? "bg-[#0F2744] text-[#FFFFFF]"
                        : "bg-[#DCE9FF] text-[#001229]";

              return (
              <article
                key={card.id}
                className={`group w-full ${cardHeightClass} bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] overflow-hidden border border-[#EEF0F4] flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover:border-[#D9E7FF]`}
              >
                {/* Top Accent Strip */}
                <div className={`w-full h-[6px] shrink-0 ${accentClass}`} />

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-3 w-full justify-between">
                  {/* Badge & Duration Row */}
                  <div className="flex items-center justify-between w-full h-[20px] gap-2">
                    <div className="flex items-center px-1.5 py-[2px] bg-[#E5EEFF] rounded-[2px] shrink-0">
                      <span
                        className={`font-['Inter'] text-[12px] font-bold uppercase leading-[16px] ${
                          durationTextColor
                        }`}
                      >
                        {card.durationLabel}
                      </span>
                    </div>

                    {card.statusBadge && (
                      <div
                        className={`flex items-center gap-1 px-1.5 py-[2px] ${statusBadgeColors} rounded-[2px] shrink-0`}
                      >
                        {card.statusBadge.icon && (
                          <Image
                            src={card.statusBadge.icon}
                            alt=""
                            width={11}
                            height={11}
                            className="w-[11px] h-[10.5px] object-contain"
                          />
                        )}
                        <span
                          className="font-['Inter'] text-[10px] font-bold uppercase leading-[12px] tracking-[0.5px]"
                        >
                          {card.statusBadge.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Faculty Header */}
                  <div className="flex flex-col items-start w-full gap-[2px]">
                    <h2 className="font-['Public_Sans'] text-[20px] font-bold leading-[25px] tracking-[-0.2px] text-[#001229] line-clamp-2">
                      {card.title}
                    </h2>
                    <p className="font-['Inter'] text-[11px] font-semibold leading-[14px] tracking-[0.275px] text-[#44474D]">
                      {card.faculty}
                    </p>
                  </div>

                  {/* Stats Box */}
                  <div className="flex items-start justify-center w-full min-h-[51.5px] p-2 bg-[#EFF4FF] rounded-[2px]">
                    {card.stats.map((stat, statIndex) => (
                      <div
                        key={`${stat.label}-${statIndex}`}
                        className="flex flex-col items-start flex-1"
                      >
                        <span className="font-['Inter'] text-[10px] font-bold uppercase leading-[12px] tracking-[0.5px] text-[#44474D]">
                          {stat.label}
                        </span>
                        <span
                          className={`font-['Public_Sans'] text-[16px] font-semibold leading-[24px] tracking-[-0.08px] ${
                            statIndex === 1 && (card.id === "bped" || card.id === "mped" || card.id === "phd-sports-science")
                              ? "text-[#904D00]"
                              : statIndex === 1 && card.id === "msc-biomechanics"
                                ? "text-[#002D1C]"
                                : statIndex === 1 && (card.id === "bsc-sports-science" || card.id === "pg-diploma-sports-mgmt")
                                  ? "text-[#0B1C30]"
                                  : "text-[#001229]"
                          }`}
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Bullet Facts */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    {card.facts.map((fact, factIndex) => (
                      <div
                        key={`${fact.title}-${factIndex}`}
                        className="flex items-start gap-1.5 w-full"
                      >
                        <div className="w-[13.33px] h-[15.33px] pt-[2px] shrink-0">
                          <Image
                            src={fact.icon}
                            alt=""
                            width={13}
                            height={13}
                            className="w-[13px] h-[13px] object-contain"
                          />
                        </div>
                        <p className="font-['Public_Sans'] text-[12px] font-normal leading-[16px] text-[#0B1C30]">
                          <span className="font-bold">{fact.title}</span>
                          {fact.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer SLA / Metadata Pill */}
                  {card.footer && (
                    <div className="flex items-center justify-between w-full min-h-[22px] bg-[#E5EEFF] rounded-[2px] px-2 py-1 gap-2">
                      <span className="font-['Inter'] text-[10px] font-bold leading-[12px] tracking-[0.5px] text-[#44474D]">
                        {card.footer.label}
                      </span>
                      <span
                        className={`font-['Inter'] text-[10px] font-bold leading-[12px] tracking-[0.5px] shrink-0 ${
                          footerValueTextColor
                        }`}
                      >
                        {card.footer.value}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between w-full h-[38px] bg-[#EFF4FF] px-4 py-2 shrink-0">
                  <div className="flex items-center gap-1 cursor-pointer transition-opacity duration-200 hover:opacity-80">
                    <Image
                      src="/programmeCard/pdf.png"
                      alt=""
                      width={13}
                      height={13}
                      className="w-[13px] h-[13px] object-contain"
                    />
                    <span className="font-['Inter'] text-[11px] font-bold leading-[14px] tracking-[0.275px] text-[#001229]">
                      {card.pdfLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => printProgrammeMatrix(card)}
                    className="flex items-center justify-center px-3 h-[22px] bg-[#001229] rounded-[2px] text-white font-['Inter'] text-[11px] font-semibold leading-[14px] tracking-[0.275px] hover:bg-[#00224a] hover:shadow-[0px_4px_12px_rgba(0,18,41,0.2)] transition-all duration-200 cursor-pointer"
                  >
                    View Matrix
                  </button>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
