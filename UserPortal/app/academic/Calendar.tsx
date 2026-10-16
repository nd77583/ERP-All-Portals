"use client";

import React, { useEffect, useState } from "react";
import { getDossierCards } from "../api/academic/DossierCard";
import { getCmsSection } from "@/lib/cmsClient";

type CalendarEvent = {
  milestone: string;
  programmes: string;
  window: string;
  regulation: string;
  actionText: string;
  actionHref: string;
};

type DossierCard = {
  title: string;
  description: string;
  icon: string;
  fileUrl: string;
};

const calendarEvents: CalendarEvent[] = [
  {
    milestone: "Semester Registration & Fee Remittance",
    programmes: "All UG (Sem III, V, VII) & PG (Sem III)",
    window: "July 15, 2025 - July 28, 2025",
    regulation: "Ord. 4.1(A)",
    actionText: "Download Circular",
    actionHref: "#",
  },
  {
    milestone: "National Sports Trials & Fitness Battery Test",
    programmes: "Fresh Entrants (B.P.Ed, B.Sc, M.Sc)",
    window: "August 18, 2025 - August 22, 2025",
    regulation: "Statute 19(2)",
    actionText: "Trial Protocols",
    actionHref: "#",
  },
  {
    milestone: "Commencement of Odd Semester Classes",
    programmes: "All Faculties & Teaching Labs",
    window: "September 01, 2025",
    regulation: "NEP Guideline 8",
    actionText: "Timetable PDF",
    actionHref: "#",
  },
  {
    milestone: "Mid-Term Continuous Assessment (MST-I)",
    programmes: "B.Sc, B.P.Ed, M.P.Ed, M.Sc Sports Sci",
    window: "October 20, 2025 - October 27, 2025",
    regulation: "CBCS Assessment 2.4",
    actionText: "Assessment Rubric",
    actionHref: "#",
  },
  {
    milestone: "End-Term Theory & Lab Practical Examinations",
    programmes: "All Semester Programmes",
    window: "December 08, 2025 - December 24, 2025",
    regulation: "COE Act 2020",
    actionText: "Date-Sheet Gazette",
    actionHref: "#",
  },
  {
    milestone: "Dual-Career Elite Athlete Special Window",
    programmes: "Sanctioned National/Intl Competitors",
    window: "January 05, 2026 - January 15, 2026",
    regulation: "FR-ACAD-07",
    actionText: "Form FR-07A",
    actionHref: "#",
  },
];

const eventDotClasses = [
  "bg-[#904D00]",
  "bg-[#002D1C]",
  "bg-[#001229]",
  "bg-[#FFB77D]",
  "bg-[#BA1A1A]",
  "bg-[#4EDEA3]",
];

const dossierCards: DossierCard[] = [
  {
    title: "Ordinance Vol. II",
    description: "Rules for Award of Degrees (2025)",
    fileUrl: "#",
    icon: "/programmeCard/book.png",
  },
  {
    title: "NEP Credit Transfer",
    description: "Academic Bank of Credits (ABC) Guide",
    fileUrl: "#",
    icon: "/programmeCard/shield.png",
  },
  {
    title: "Sports Quota Bylaws",
    description: "Gradation & Verification Rules",
    fileUrl: "#",
    icon: "/programmeCard/hand.png",
  },
];

const Calendar = () => {
  const [cardsData, setCardsData] = useState(dossierCards);
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEvents);
  const [headerInfo, setHeaderInfo] = useState({
    tag: "Official University Gazette",
    title: "Academic Calendar 2025-26 & Regulatory Downloads",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academic = await getCmsSection("academic");
        if (academic?.calendar) {
          const cmsEvts = Array.isArray(academic.calendar.events)
            ? academic.calendar.events
            : Array.isArray(academic.calendar)
            ? (academic.calendar as unknown as CalendarEvent[])
            : [];
          if (cmsEvts.length > 0) {
            setEvents(
              cmsEvts.map((e: Partial<CalendarEvent & { event?: string; semester?: string; date?: string }>) => ({
                milestone: e.milestone || e.event || "",
                programmes: e.programmes || e.semester || "All Programmes",
                window: e.window || e.date || "",
                regulation: e.regulation || "Ord. 4.1",
                actionText: e.actionText || "Download Circular",
                actionHref: e.actionHref || "#",
              }))
            );
          }
          if (Array.isArray(academic.calendar.dossierCards) && academic.calendar.dossierCards.length > 0) {
            setCardsData(academic.calendar.dossierCards);
          }
          if (academic.calendar.title) {
            setHeaderInfo({
              tag: academic.calendar.tag || "Official University Gazette",
              title: academic.calendar.title,
            });
          }
          return;
        }

        const res = await getDossierCards();
        const list = res?.data;

        if (Array.isArray(list) && list.length > 0) {
          setCardsData(list);
        }
      } catch (err) {
        console.error("Error fetching dossier cards:", err);
      }
    };

    fetchData();
  }, []);

  const printGazette = () => {
    const table = document.querySelector("#academic-calendar-table");
    if (!table) return;

    const printWindow = window.open("", "_blank", "width=1000,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Academic Calendar 2025-26</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            h1 { font-size: 20px; margin: 0 0 16px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #999; padding: 8px; text-align: left; }
            th { background: #e5eeff; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>Academic Calendar 2025-26</h1>
          ${table.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onafterprint = () => printWindow.close();
    printWindow.print();
  };

  return (
    <section className="w-full bg-[#EFF4FF] py-6 px-5 font-['Inter',sans-serif]">
      <div className="w-full">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
              {headerInfo.tag}
            </span>
            <h2 className="font-['Public_Sans',sans-serif] text-2xl font-bold tracking-[-0.36px] text-[#001229]">
              {headerInfo.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={printGazette}
              className="inline-flex items-center gap-1 bg-white text-[#001229] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] px-3 py-1.5 text-[11px] font-semibold tracking-[0.275px] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3 text-[#001229]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Gazette
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-1 bg-[#001229] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[2px] px-3 py-1.5 text-[11px] font-semibold tracking-[0.275px] hover:bg-[#001e44] transition-colors"
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Verify Digital Signature
            </a>
          </div>
        </div>

        {/* High Density Calendar Table */}
        <div className="w-full bg-white rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-x-auto">
          <table
            id="academic-calendar-table"
            className="w-full text-left border-collapse min-w-[980px]"
          >
            <thead>
              <tr className="bg-[#E5EEFF] h-[30px] text-[11px] font-bold text-[#0B1C30] uppercase tracking-[0.55px]">
                <th className="px-3 py-2 w-[28%] font-bold">
                  Academic Milestone / Statutory Event
                </th>
                <th className="px-3 py-2 w-[22%] font-bold">
                  Applicable Programmes
                </th>
                <th className="px-3 py-2 w-[24%] font-bold">
                  Scheduled Window
                </th>
                <th className="px-3 py-2 w-[16%] font-bold">
                  Statutory Regulation
                </th>
                <th className="px-3 py-2 w-[10%] font-bold text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent text-[12px]">
              {events.map((event, index) => (
                <tr
                  key={index}
                  className={`h-[32px] transition-colors duration-200 hover:bg-[#e8f0ff] ${
                    index % 2 === 1 ? "bg-[#EFF4FF]/30" : ""
                  }`}
                >
                  <td className="px-3 py-2 font-['Public_Sans',sans-serif] font-bold text-[#001229] whitespace-nowrap">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${eventDotClasses[index % eventDotClasses.length]}`}
                    />
                    <span className="align-middle">{event.milestone}</span>
                  </td>
                  <td className="px-3 py-2 font-medium text-[#44474D] whitespace-nowrap">
                    {event.programmes}
                  </td>
                  <td className="px-3 py-2 font-['Public_Sans',sans-serif] font-bold text-[#0B1C30] whitespace-nowrap">
                    {event.window}
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-block bg-[#E5EEFF] text-[#0B1C30] font-bold text-[10px] tracking-[0.5px] px-2 py-[2px] rounded-[2px] whitespace-nowrap">
                      {event.regulation}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <a
                      href={event.actionHref}
                      className="font-bold text-[10px] tracking-[0.5px] text-[#904D00] hover:underline whitespace-nowrap"
                    >
                      {event.actionText}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statutory Ordinance & Dossier Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2px] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between gap-2 mt-3 transition-all duration-200  ease-out hover:-translate-y-1 hover:shadow-md hover:bg-[#f8faff]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={card.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain flex-shrink-0"
                />

                <div className="flex flex-col truncate">
                  <span className="font-['Public_Sans',sans-serif] font-bold text-[16px] leading-6 tracking-[-0.08px] text-[#001229] truncate">
                    {card.title}
                  </span>
                  <span className="font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#44474D] truncate">
                    {card.description}
                  </span>
                </div>
              </div>
              <a
                href={card.fileUrl}
                aria-label={`Download ${card.title}`}
                className="w-5 h-[25px] flex items-center justify-center bg-[#EFF4FF] hover:bg-[#dbe7ff] rounded-[2px] transition-colors flex-shrink-0"
              >
                <svg
                  className="w-3 h-3 text-[#001229]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
