"use client";

import React, { useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const tenders = [
  {
    ref: "MBPSPU/PUR/ERP/2026/01",
    category: "E-PROCUREMENT (TWO-COVER)",
    title:
      "Comprehensive Turnkey Solution for Cloud-Hosted Integrated University ERP, Sports High-Performance Module & Biometric Systems",
    wing: "Directorate of Digital Transformation & Registrar Secretariat",
    value: "₹4,20,00,000",
    emd: "₹8,40,000 (2.0%)",
    fee: "Tender Fee: ₹10,000 + GST",
    published: "10 May 2026",
    deadline: "15 June 2026 (15:00 IST)",
    milestone: "Tech Bid Opening: 16 June 2026",
    status: "CORRIGENDUM #1 ISSUED",
    tone: "amber",
    note: "Pre-Bid Queries Answered",
    detail: "Live on eProc Punjab",
    primary: "Download RFP (PDF)",
    secondary: "Corrigendum #1",
    link: "Bill of Quantities (BOQ.xls)",
    icon: "/tenders/erp-icon.png",
    pdf: "/tenders/pdf.png",
  },
  {
    ref: "MBPSPU/EQUIP/2026/04",
    category: "GLOBAL TENDER NOTICE",
    title:
      "Supply, Installation & Commissioning of Multi-Camera 3D High-Speed Motion Capture System with Dual Force Plates for Biomechanics Complex",
    wing: "Department of Sports Science & Olympic Training Centre",
    value: "₹1,65,00,000",
    emd: "₹3,30,000",
    fee: "Tender Fee: ₹5,000",
    published: "14 May 2026",
    deadline: "22 June 2026 (14:00 IST)",
    milestone: "Tech Demo: 24 June 2026",
    status: "ACTIVE (OPEN FOR BID)",
    tone: "green",
    note: "ICB Norms Applicable",
    detail: "OEM Authorization Mandatory",
    primary: "Tender Specs (PDF)",
    secondary: "Technical Compliance",
    link: "Schedule of Rates (BOQ)",
    icon: "/tenders/equipment-icon.png",
    pdf: "/tenders/pdf.png",
  },
  {
    ref: "MBPSPU/CIVIL/2026/09",
    category: "WORKS & SERVICES CONTRACT",
    title:
      "Annual Maintenance Contract (AMC) for 8-Lane Synthetic Track & Sub-Aquatic Olympic Pool Filtration Plant",
    wing: "University Engineering & Sports Infrastructure Division",
    value: "₹78,50,000",
    emd: "₹1,57,000",
    fee: "Period: 36 Months",
    published: "18 May 2026",
    deadline: "08 June 2026 (11:00 IST)",
    milestone: "Site Inspection: 26 May 2026",
    status: "ACTIVE (SITE VISIT OPEN)",
    tone: "green",
    note: "World Athletics / FINA",
    detail: "Compliant",
    primary: "Notice Inviting Tender (NIT)",
    secondary: "Scope & SLA",
    link: "Financial BOQ (Price Bid)",
    icon: "/tenders/civil-icon.png",
    pdf: "/tenders/pdf.png",
  },
  {
    ref: "MBPSPU/KIT/2026/12",
    category: "GEM CUSTOM BID (BOQ)",
    title:
      "Procurement of High-Performance Athlete Apparel, Matchday Kits and Footwear for Inter-University Games",
    wing: "Directorate of Sports & Student Affairs",
    value: "₹42,20,000",
    emd: "₹84,400 (MSME Exempted)",
    fee: "Units: 850 Kits",
    published: "02 May 2026",
    deadline: "Closed on: 20 May 2026",
    milestone: "Sample Evaluation in Progress",
    status: "UNDER EVALUATION",
    tone: "blue",
    note: "5 Bids Received",
    detail: "Technical Scrutiny Active",
    primary: "GeM Bid Specs (PDF)",
    secondary: "GSM & Fabric Norms",
    link: "View Live on GeM Portal",
    icon: "/tenders/gem-icon.png",
    pdf: "/tenders/pdf2.png",
  },
];
const rowsPerPage = 3;

const tenderStatusCounts = {
  active: tenders.filter((tender) => tender.status.startsWith("ACTIVE")).length,
  corrigendum: tenders.filter((tender) => tender.status.includes("CORRIGENDUM"))
    .length,
  underEvaluation: tenders.filter(
    (tender) => tender.status === "UNDER EVALUATION",
  ).length,
};

const totalOpenCount =
  tenderStatusCounts.active +
  tenderStatusCounts.corrigendum +
  tenderStatusCounts.underEvaluation;

const tableHeaders = [
  { label: "Tender Reference & Scope", width: "w-[36%]" },
  { label: "Estimated Value & EMD", width: "w-[16%]" },
  { label: "Key Dates & Deadlines", width: "w-[17%]" },
  { label: "Status & Addenda", width: "w-[17%]" },
  { label: "Documents & Actions", width: "w-[14%] text-right" },
];

const tabs = [
  {
    label: "Active Tenders (e-Procurement)",
    icon: "/tenders/hammer.png",
    count: `${totalOpenCount} Open`,
  },
  {
    label: "Archived Tenders & Awarded Contracts",
    icon: "/tenders/archive.png",
  },
  { label: "Statutory Circulars & Gazettes", icon: "/tenders/shield.png" },
  {
    label: "Recruitment Notices (Sports Quota & Faculty)",
    icon: "/tenders/idcard.png",
  },
];

const TenderTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState(`All (${totalOpenCount})`);
  const [search, setSearch] = useState("");
  const filters = [
    `All (${totalOpenCount})`,
    "Active",
    "Corrigendum Issued",
    "Under Evaluation",
  ];
  const rows = useMemo(
    () =>
      tenders.filter((tender) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          `${tender.ref} ${tender.title} ${tender.category} ${tender.wing}`
            .toLowerCase()
            .includes(query);
        const matchesFilter =
          filter === "All (4)" ||
          (filter === "Active" && tender.status.startsWith("ACTIVE")) ||
          (filter === "Corrigendum Issued" &&
            tender.status.includes("CORRIGENDUM")) ||
          (filter === "Under Evaluation" &&
            tender.status === "UNDER EVALUATION");
        return matchesSearch && matchesFilter;
      }),
    [filter, search],
  );

  const [page, setPage] = useState(1);
  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <section className="w-full min-w-0 bg-white text-[#001229]">
      <nav
        aria-label="Tender sections"
        role="tablist"
        className="overflow-hidden bg-[#EFF4FF] px-5 pt-3"
      >
        <div className="flex h-[34px] min-w-max items-stretch gap-2 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={`flex h-8 items-center gap-2 cursor-pointer rounded-t-sm px-4 text-[13px] tracking-[.13px] ${activeTab === index ? "bg-[#001229] font-bold text-white shadow-sm" : "font-semibold text-[#44474D] hover:bg-[#DCE9FF]"}`}
            >
              <span aria-hidden="true" className="text-base leading-none">
                <img
                  src={tab.icon}
                  alt="icon"
                  className={`h-3 w-3 shrink-0 ${activeTab === index ? "" : "invert"}`}
                />{" "}
              </span>
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.count && (
                <span className="rounded-full bg-[#FFDCC3] px-2 text-[10px] font-bold leading-3 tracking-[.5px] text-[#2F1500]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {activeTab === 0 ? (
        <>
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-5 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-[576px]">
              <span
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#44474D]"
              >
                ⌕
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Tender Ref, Keyword, Category or Equipment..."
                className="h-[30px] w-full rounded-sm bg-[#EFF4FF] py-1 pl-10 pr-3 text-[13px] text-[#001229] shadow-inner outline-none placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#001229]"
              />
            </label>
            <div className="flex flex-wrap items-center gap-1">
              <div className="flex rounded-sm bg-[#EFF4FF] p-0.5">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`whitespace-nowrap rounded-sm px-2 py-1 text-[10px] font-bold tracking-[.35px] cursor-pointer ${filter === item ? "bg-[#001229] text-white shadow-sm" : "text-[#44474D] hover:bg-white"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="flex h-[26px] items-center gap-1 cursor-pointer rounded-sm bg-[#DCE9FF] px-2 text-[11px] font-semibold tracking-wide text-[#001229] hover:bg-[#c8dcff]"
              >
                <span aria-hidden="true">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m7 10 5 5 5-5M12 15V3" />
                  </svg>
                </span>
                Summary CSV
              </button>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="overflow-x-auto rounded-sm bg-white shadow-sm">
              <table className="block w-full border-collapse md:table md:min-w-[1050px] md:table-fixed ">
                <thead className="hidden bg-[#DCE9FF] text-left text-[11px] font-bold uppercase tracking-[.55px] text-[#001229] md:table-header-group">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header.label}
                        className={`${header.width} px-3 py-2 `}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="block divide-y divide-slate-100 md:table-row-group">
                  {paginatedRows.map((tender) => (
                    <tr
                      key={tender.ref}
                      className="mb-3 block rounded-sm border border-slate-200 bg-white align-top shadow-sm transition-colors duration-200 hover:bg-[#e8f0ff]/70 md:mb-0 md:table-row md:rounded-none md:border-0 md:shadow-none "
                    >
                      <td className="block break-words border-b border-slate-100 px-3 py-4 md:table-cell md:border-0 md:px-3 ">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#44474D] md:hidden">
                          Tender Reference &amp; Scope
                        </span>
                        <div className="mb-2 flex flex-wrap items-center gap-1">
                          <span className="rounded-sm bg-[#E5EEFF] px-1 py-0.5 text-[12px] font-bold">
                            {tender.ref}
                          </span>
                          <span className="rounded-sm bg-[#DCE9FF] px-1 py-0.5 text-[10px] font-bold tracking-wide text-[#0B1C30]">
                            {tender.category}
                          </span>
                        </div>
                        <h3 className="mb-1 text-[16px] font-bold leading-[22px] tracking-[-.08px]">
                          {tender.title}
                        </h3>
                        <p className="text-[12px] leading-4 text-[#44474D]">
                          Procuring Wing: {tender.wing}
                        </p>
                      </td>
                      <td className="block break-words border-b border-slate-100 px-3 py-4 md:table-cell md:border-0 md:px-3">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#44474D] md:hidden">
                          Estimated Value &amp; EMD
                        </span>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.275px] text-[#44474D]">
                          Estimated Value
                        </p>
                        <p className="text-[16px] font-bold leading-6">
                          {tender.value}
                        </p>
                        <p className="mt-1 text-[12px] font-bold leading-4 text-[#904D00]">
                          EMD: {tender.emd}
                        </p>
                        <p className="mt-1 text-[10px] font-bold tracking-wide text-[#44474D]">
                          {tender.fee}
                        </p>
                      </td>
                      <td className="block break-words border-b border-slate-100 px-3 py-4 text-[12px] leading-4 text-[#44474D] md:table-cell md:border-0 md:px-3">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#44474D] md:hidden">
                          Key Dates &amp; Deadlines
                        </span>
                        <p className="mb-2 flex items-start gap-1">
                          <img
                            src="/tenders/cal.png"
                            alt=""
                            className=" h-4 w-4 shrink-0"
                          />
                          <span>Published: {tender.published}</span>
                        </p>
                        <p
                          className={`mb-2 flex items-start gap-1 font-bold ${tender.deadline.startsWith("Closed") ? "text-[#44474D]" : "text-[#BA1A1A]"}`}
                        >
                          <img
                            src="/tenders/clk.png"
                            alt=""
                            className=" h-4 w-4 shrink-0"
                          />
                          <span>
                            {tender.deadline.startsWith("Closed")
                              ? tender.deadline
                              : `Closes: ${tender.deadline}`}
                          </span>
                        </p>
                        <p className="flex items-start gap-1">
                          <img
                            src="/tenders/caltk.png"
                            alt=""
                            className=" h-4 w-4 shrink-0"
                          />
                          <span>{tender.milestone}</span>
                        </p>
                      </td>
                      <td className="block break-words border-b border-slate-100 px-3 py-4 text-[12px] leading-4 text-[#44474D] md:table-cell md:border-0 md:px-3">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#44474D] md:hidden">
                          Status &amp; Addenda
                        </span>
                        <span
                          className={`inline-block rounded-sm px-1 py-0.5 text-[10px] font-bold tracking-[.5px] ${tender.tone === "amber" ? "bg-[#904D00] text-white" : tender.tone === "green" ? "bg-[#002D1C] text-[#6FFBBE]" : "bg-[#D3E4FE] text-[#001229]"}`}
                        >
                          {tender.status}
                        </span>
                        <p className="mt-1">{tender.note}</p>
                        <p
                          className={`mt-1 text-[10px] font-bold tracking-[.35px] ${tender.tone === "amber" ? "text-[#904D00]" : ""}`}
                        >
                          {tender.detail}
                        </p>
                      </td>
                      <td className="block break-words px-3 py-4 md:table-cell md:px-3">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#44474D] md:hidden">
                          Documents &amp; Actions
                        </span>
                        <div className="flex flex-col items-start gap-1.5 md:items-end">
                          <button
                            type="button"
                            className={`flex min-h-[24px] max-w-full items-center cursor-pointer justify-center gap-1 rounded-sm px-2 py-1 text-center text-[11px] font-semibold leading-3 ${tender.tone === "blue" ? "bg-[#DCE9FF] text-[#001229]" : "bg-[#001229] text-white"}`}
                          >
                            <span aria-hidden="true">
                              <img src={tender.pdf} alt="PDF"></img>
                            </span>
                            {tender.primary}
                          </button>
                          <button
                            type="button"
                            className="flex min-h-5 max-w-full items-center cursor-pointer justify-center gap-1 rounded-sm bg-[#DCE9FF] px-1.5 py-1 text-center text-[10px] font-bold leading-3 tracking-wide text-[#001229]"
                          >
                            <img src={tender.icon} alt="" /> {tender.secondary}
                          </button>
                          <a
                            href="#"
                            className="text-left text-[10px] font-bold leading-3 tracking-wide text-[#904D00] underline underline-offset-2 md:text-right"
                          >
                            {tender.link}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr className="block md:table-row">
                      <td
                        colSpan={5}
                        className="block px-4 py-10 text-center text-sm text-[#44474D] md:table-cell"
                      >
                        No tenders match your search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {Math.ceil(rows.length / rowsPerPage) > 1 && (
                <Stack className="mt-4 items-center">
                  <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    onChange={(_, nextPage) => setPage(nextPage)}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              )}
              <footer className="flex flex-col gap-2 bg-[#E5EEFF] px-3 py-2 text-[12px] text-[#44474D] sm:flex-row sm:items-center sm:justify-between">
                <p>
                  ⓘ Showing {rows.length} of 4 active statutory procurement
                  listings. Timestamps conform to Indian Standard Time (IST).
                </p>
                <p>Cryptographic Integrity: SHA-256 Validated on Punjab SDC</p>
              </footer>
            </div>
          </div>
        </>
      ) : (
        <div className="px-5 py-8 text-sm text-[#44474D]">
          {tabs[activeTab].label}
        </div>
      )}
    </section>
  );
};

export default TenderTable;
