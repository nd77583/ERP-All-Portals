"use client";
import React, { useState } from "react";

const manuals = [
  {
    title: "Particulars of Organization, Functions & Duties",
    description:
      "Statutory charter established under Punjab Act No. 11 of 2019. Official institutional objectives, sovereign mandate for sports sciences, administrative governance hierarchy, and Mohindra Kothi main campus jurisdiction.",
    revised: "15 Apr 2025",
    size: "2.4 MB",
    tag: "UGC 2(f) Validated",
  },
  {
    title: "Powers and Duties of Officers and Employees",
    description:
      "Statutory delegation of administrative, financial, and executive powers vested in Chancellor (Governor of Punjab), Vice-Chancellor, Registrar, Dean Academics, and Director of High-Performance Sports.",
    revised: "28 Mar 2025",
    size: "1.8 MB",
  },
  {
    title: "Decision-Making Procedures, Supervision & Accountability",
    description:
      "Workflow channels for institutional ordinances, executive resolutions, Syndicate approvals, Academic Council ratifications, and Board of Studies oversight frameworks.",
    revised: "10 Feb 2025",
    size: "1.1 MB",
  },
  {
    title: "Norms set for Discharge of University Functions & SLAs",
    description:
      "Timelines for citizen and athlete services, transcript issuances, sports trial notifications, procurement clearing cycles, and academic calendar compliance.",
    revised: "04 Jan 2025",
    size: "950 KB",
  },
  {
    title: "Rules, Regulations, Instructions & Records Held",
    description:
      "University Calendar Volume I & II, Punjab Financial Rules, UGC 2(f) Regulations, AIU Competition Bye-laws, Service Conduct Rules, and Sports Quota Directives.",
    revised: "18 Jan 2025",
    size: "3.2 MB",
  },
  {
    title: "Categories of Documents held under University Control",
    description:
      "Classification schedule of permanent university archives, academic transcripts, land titling records for Mohindra Kothi, confidential examination vaults, and procurement ledgers.",
    revised: "05 Dec 2024",
    size: "840 KB",
  },
  {
    title: "Arrangement for Consultation with Public & Athletes",
    description:
      "Mechanisms for feedback from Punjab sports federations, Olympian advisory council consultations, athlete council meets, and public open houses on curriculum design.",
    revised: "12 Nov 2024",
    size: "620 KB",
  },
  {
    title: "Boards, Councils, Committees & Statutory Bodies",
    description:
      "Composition and mandates of the University Syndicate, Finance Committee, Internal Complaints Committee (POSH Vault), Anti-Ragging Committee, and Sports Ethics Board.",
    revised: "01 Apr 2025",
    size: "1.5 MB",
  },
  {
    title: "Directory of Officers, Faculty & Staff",
    description:
      "Comprehensive roster including official designations, academic departments, coaching cadres, direct campus extension lines, and government e-mail handles.",
    revised: "10 Apr 2025",
    size: "1.3 MB",
  },
  {
    title: "Monthly Remuneration & Compensation Matrix",
    description:
      "Disclosures of salary bands, grade pay, allowances, and 7th Punjab Pay Commission mappings across all academic faculties, athletic coaches, and administrative staff.",
    revised: "01 Mar 2025",
    size: "1.9 MB",
  },
  {
    title: "Budget Allocated, Expenditures & CAG Audit Reports",
    description:
      "Annual institutional financial statement (AY 2024–25 ₹48.60 Cr allocated), capital expenditure on synthetic athletic tracks, and CAG Comptroller & Auditor General report extracts.",
    revised: "20 Mar 2025",
    size: "4.5 MB",
    tag: "State CAG Audited",
  },
  {
    title: "Execution of Subsidy & Athlete Scholarships Programme",
    description:
      "Disbursement criteria for Punjab State Elite Athlete stipends, dietary allowances, Olympic scholarship quotas, and hostel fee concession mechanisms.",
    revised: "14 Feb 2025",
    size: "1.2 MB",
  },
  {
    title: "Particulars of Concessions, Permits & Sports Authorizations",
    description:
      "Licensing frameworks for university sports complex utilization, fitness facility passes for para-athletes, and fee exemptions for state medalists.",
    revised: "08 Dec 2024",
    size: "780 KB",
  },
  {
    title: "Details in respect of Information available in Electronic Form",
    description:
      "Inventory of databases maintained across the SAMARTH ERP suite, admissions portal, examination results database, research publications repository, and digital archives.",
    revised: "15 Jan 2025",
    size: "510 KB",
  },
  {
    title: "Facilities available to Citizens for Obtaining Information",
    description:
      "Operational hours of public facilitation center, citizen reading rooms at Mohindra Kothi central library, designated inspection days, and accessible assistance services.",
    revised: "25 Mar 2025",
    size: "430 KB",
  },
  {
    title: "Names, Designations & Particulars of PIOs & Appellate Authorities",
    description:
      "Formal statutory notification declaring Central Public Information Officer (CPIO), Assistant PIO (APIO), and First Appellate Authority (FAA) with contact matrices.",
    revised: "15 Apr 2025",
    size: "670 KB",
  },
  {
    title: "Other Useful Statutory Disclosures, Annual Returns & Judgments",
    description:
      "Annual report to the Punjab Legislative Assembly, State Information Commission quarterly submissions, judicial precedents concerning state sports university autonomy.",
    revised: "18 Apr 2025",
    size: "2.1 MB",
  },
];

const CalendarIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="h-3 w-3 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2.25" y="3.5" width="11.5" height="10" rx="1" />
    <path d="M5 2v3M11 2v3M2.5 6.5h11" />
  </svg>
);

const FileIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="h-3 w-3 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M4 1.75h5l3.25 3.3v9.2H4z" />
    <path d="M9 2v3.5h3M6 8h4M6 10.5h4" />
  </svg>
);

const Mannual = () => {
  const [search, setSearch] = useState("");
  const visibleManuals = manuals.filter((manual) =>
    `${manual.title} ${manual.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <section className="w-full max-w-5xl space-y-4 bg-slate-50 p">
      <header className="rounded-sm border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-amber-800">
              RTI Act, 2005 • Section 4(1)(b)
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#001229]">
              Suo-Motu Proactive Disclosure Manuals
            </h1>
          </div>
          <span className="rounded-sm bg-[#DCE9FF] px-1 py-1 text-xs font-medium text-[#44474D]">
            {manuals.length} Statutory Manuals
          </span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
          <label className="relative block">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search manuals by subject, department, or Act..."
              aria-label="Search manuals"
              className="h-8 w-full rounded-sm border border-[#C4C6CE] bg-[#EFF4FF] py-1 pl-10 pr-3 text-xs text-[#0B1C30] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </label>
          <select
            aria-label="Filter by regulatory chapter"
            className="h-8 w-full rounded-sm border border-[#C4C6CE] bg-[#EFF4FF] px-3 text-xs text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option>All Regulatory Chapters</option>
          </select>
        </div>
      </header>

      <section aria-label="Statutory disclosure manuals" className="space-y-2">
        {visibleManuals.map((manual, index) => (
          <article
            key={manual.title}
            className="rounded-sm border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#0F2744] text-[11px] font-bold tracking-wide text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold leading-6 tracking-[-0.005em] text-[#001229]">
                    Manual {String(index + 1).padStart(2, "0")}: {manual.title}
                  </h2>
                  <p className="mt-1 text-xs leading-4 text-[#44474D]">
                    {manual.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#44474D]">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide">
                      <CalendarIcon /> Rev: {manual.revised}
                    </span>
                    <span aria-hidden="true" className="font-bold">
                      •
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FileIcon /> PDF ({manual.size})
                    </span>
                    {manual.tag && (
                      <>
                        <span aria-hidden="true" className="font-bold">
                          •
                        </span>
                        <span
                          className={`text-[10px] font-semibold tracking-wide ${manual.tag.includes("CAG") ? "text-amber-800" : "text-emerald-900"}`}
                        >
                          {manual.tag}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <a
                href="#"
                aria-label={`Download Manual ${String(index + 1).padStart(2, "0")} PDF`}
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-sm bg-[#E5EEFF] px-2 text-[10px] font-bold tracking-wide text-[#001229] hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M8 2v8m0 0 3-3m-3 3L5 7M3 11v2h10v-2" />
                </svg>
                PDF
              </a>
            </div>
          </article>
        ))}
        {visibleManuals.length === 0 && (
          <p className="rounded-sm border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
            No manuals match your search.
          </p>
        )}
      </section>
    </section>
  );
};

export default Mannual;
