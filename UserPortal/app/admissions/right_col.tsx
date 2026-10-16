"use client";

import { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsSidebarData } from "@/lib/cms-types";

const defaultSidebarData: AdmissionsSidebarData = {
  trialsGuide: {
    tag: "TRIALS EVALUATION GUIDE",
    icon: "/admissions/run.png",
    title: "AAHPER Youth Fitness Battery",
    description:
      "Standard mandatory testing for all undergraduate and postgraduate athletic applicants.",
    trials: [
      {
        id: "tr-1",
        title: "1. 50m Speed Dash",
        detail: "Benchmark: <6.5s (Male) | <7.2s (Female)",
        score: "Max 20 Pts",
      },
      {
        id: "tr-2",
        title: "2. 4×10m Shuttle Agility",
        detail: "Benchmark: <9.8s (Male) | <10.5s (Female)",
        score: "Max 20 Pts",
      },
      {
        id: "tr-3",
        title: "3. Standing Broad Jump",
        detail: "Benchmark: >2.40m (Male) | >1.95m (Female)",
        score: "Max 20 Pts",
      },
      {
        id: "tr-4",
        title: "4. Specific Game Trial",
        detail: "Assessed by National Coach Panel in chosen discipline",
        score: "Max 40 Pts",
      },
    ],
    notice: "All field trials are 100% video-recorded with RFID timing chips for transparency.",
    noticeIcon: "/admissions/fan.png",
  },
  downloads: {
    tag: "STATUTORY PROFORMAS & PDFs",
    icon: "/admissions/download.png",
    title: "Official University Downloads",
    items: [
      {
        id: "dl-1",
        icon: "/admissions/pdf.png",
        title: "Admissions Brochure 2025-26",
        href: "/admissions/admissions-brochure-2025-26.pdf",
        detail: "PDF • 8.4 MB • Signed by Registrar",
      },
      {
        id: "dl-2",
        icon: "/admissions/pdf.png",
        title: "Sports Trials Scoring & Rubric",
        href: "/admissions/sports-trials-scoring-rubric.pdf",
        detail: "PDF • 1.2 MB • AAHPER Guidelines",
      },
      {
        id: "dl-3",
        icon: "/admissions/paper.png",
        title: "Medical Fitness Proforma",
        href: "/admissions/medical-fitness-proforma.pdf",
        detail: "Civil Surgeon / CMO Attestation Form",
      },
      {
        id: "dl-4",
        icon: "/admissions/hammer.png",
        title: "Anti-Ragging Undertaking (UGC)",
        href: "/admissions/anti-ragging-undertaking.pdf",
        detail: "Affidavit Format AY 2025-26",
      },
    ],
  },
  helpdesk: {
    tag: "ADMISSIONS BUREAU HELPDESK",
    icon: "/admissions/female.png",
    title: "Direct Assistance & Grievances",
    phoneLabel: "ADMISSIONS DESK DIRECT",
    phone: "+91-175-2920205 / 2920210",
    whatsappLabel: "WHATSAPP CANDIDATE HELPLINE",
    whatsapp: "+91-98770-12019 (9 AM - 6 PM)",
    emailLabel: "OFFICIAL BUREAU EMAIL",
    email: "admissions2025@mbpsu.ac.in",
    ticketUrl: "https://mbpsu.ac.in/admissions/ticket-generator",
    ticketButtonText: "GENERATE CANDIDATE TICKET",
    ticketSlaNotice: "Ticket Reference: FR-FD-01 / 02 Bureau SLA < 24h",
  },
  venueMap: {
    tag: "TRIALS PHYSICAL VENUE",
    icon: "/admissions/gps.png",
    venueName:
      "Raja Bhalindra Singh Sports Complex\nMaharaja Bhupinder Singh Punjab Sports University\nLower Mall Road, Patiala, Punjab - 147001",
    mapUrl: "https://maps.app.goo.gl/CrQQUz7pVhMdSTDf9",
    coordinates: "Geo-Coordinates: 30.3244° N, 76.3980° E",
    embedQuery: "30.323588,76.389838",
  },
};

const RightCol = () => {
  const [sidebar, setSidebar] = useState<AdmissionsSidebarData>(defaultSidebarData);
  const [mapPageOpen, setMapPageOpen] = useState(false);
  const [mapZoom] = useState(16);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.sidebar) {
          setSidebar((prev) => ({
            ...prev,
            ...admissions.sidebar,
            trialsGuide: {
              ...prev.trialsGuide,
              ...admissions.sidebar.trialsGuide,
              trials:
                Array.isArray(admissions.sidebar.trialsGuide?.trials) &&
                admissions.sidebar.trialsGuide.trials.length > 0
                  ? admissions.sidebar.trialsGuide.trials
                  : prev.trialsGuide.trials,
            },
            downloads: {
              ...prev.downloads,
              ...admissions.sidebar.downloads,
              items:
                Array.isArray(admissions.sidebar.downloads?.items) &&
                admissions.sidebar.downloads.items.length > 0
                  ? admissions.sidebar.downloads.items
                  : prev.downloads.items,
            },
            helpdesk: {
              ...prev.helpdesk,
              ...admissions.sidebar.helpdesk,
            },
            venueMap: {
              ...prev.venueMap,
              ...admissions.sidebar.venueMap,
            },
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadData();
  }, []);

  const { trialsGuide, downloads, helpdesk, venueMap } = sidebar;

  return (
    <aside className="flex w-full flex-col gap-6 text-[#001229]">
      {/* Physical Trials Live Criteria & Scoring Standards */}
      <section className="rounded bg-white p-4 shadow-sm">
        <p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.275px] text-[#904d00]">
          <img src={trialsGuide.icon || "/admissions/run.png"} alt="" /> {trialsGuide.tag}
        </p>
        <h2 className="text-base font-bold leading-6">{trialsGuide.title}</h2>
        <p className="mt-1 text-xs leading-4 text-[#44474d]">{trialsGuide.description}</p>
        <div className="mt-5 space-y-3">
          {trialsGuide.trials.map(({ title, detail, score }) => (
            <div key={title} className="rounded-sm bg-[#eff4ff] p-2">
              <div className="flex justify-between gap-2 text-[11px] font-bold">
                <span>{title}</span>
                <span className="whitespace-nowrap text-[#904d00]">{score}</span>
              </div>
              <p className="mt-1 text-[11px] leading-[18px] text-[#44474d]">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-sm bg-[#eff4ff] p-2 text-xs leading-4 text-[#44474d]">
          <span className="text-lg text-[#904d00]">
            <img src={trialsGuide.noticeIcon || "/admissions/fan.png"} alt="" />
          </span>
          {trialsGuide.notice}
        </div>
      </section>

      {/* Statutory Proformas & Downloads */}
      <section className="rounded bg-white p-4 shadow-sm">
        <p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.275px]">
          <img src={downloads.icon || "/admissions/download.png"} alt="" /> {downloads.tag}
        </p>
        <h2 className="text-base font-bold leading-6">{downloads.title}</h2>
        <div className="mt-3 space-y-1">
          {downloads.items.map(({ icon, title, detail, href }) => (
            <a
              href={href}
              key={title}
              className="flex items-center justify-between rounded-sm bg-[#eff4ff] p-2 text-[#001229] transition-colors hover:bg-[#e2ecff]"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl text-[#ba1a1a]">
                  <img src={icon || "/admissions/pdf.png"} alt="" />
                </span>
                <span>
                  <strong className="block text-[11px]">{title}</strong>
                  <small className="block text-[10px] leading-[18px] text-[#44474d]">{detail}</small>
                </span>
              </span>
              <span className="transition-transform duration-200 ease-out group-hover:scale-110">
                <img src="/admissions/dl.png" alt="" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Front Desk Enquiry CRM & Helpline Widget */}
      <section className="rounded bg-white p-4 shadow-sm">
        <p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.275px] text-[#904d00]">
          <img src={helpdesk.icon || "/admissions/female.png"} alt="" />
          {helpdesk.tag}
        </p>
        <h2 className="text-base font-bold leading-6">{helpdesk.title}</h2>
        <div className="mt-3 space-y-2 text-[11px] font-bold">
          <div className="flex items-start gap-2 rounded-sm bg-[#eff4ff] p-2">
            <img src="/admissions/call.png" alt="" className="mt-0.5 shrink-0" />
            <div className="leading-4">
              <span className="text-[#44474d]">{helpdesk.phoneLabel}</span>
              <div className="mt-0.5">{helpdesk.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-sm bg-[#eff4ff] p-2">
            <img src="/admissions/msg.png" alt="" className="mt-0.5 shrink-0" />
            <div className="leading-4">
              <span className="text-[#44474d]">{helpdesk.whatsappLabel}</span>
              <div className="mt-0.5 text-[#002d1c]">{helpdesk.whatsapp}</div>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-sm bg-[#eff4ff] p-2">
            <img src="/admissions/mail.png" alt="" className="mt-0.5 shrink-0" />
            <div className="leading-4">
              <span className="text-[#44474d]">{helpdesk.emailLabel}</span>
              <div className="mt-0.5">{helpdesk.email}</div>
            </div>
          </div>
        </div>
        <a
          href={helpdesk.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#001229] py-2 text-[11px] font-bold uppercase tracking-[.55px] text-white transition-colors duration-200 hover:bg-[#102b4a]"
        >
          <img src="/admissions/gen.png" alt="" className="h-4 w-4 object-contain" />
          {helpdesk.ticketButtonText}
        </a>
        <p className="text-center text-[10px] leading-[18px] text-[#44474d]">
          {helpdesk.ticketSlaNotice}
        </p>
      </section>

      {/* Campus Location & Clickable Map Section */}
      <section className="rounded bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.275px]">
            <img src={venueMap.icon || "/admissions/gps.png"} alt="" /> {venueMap.tag}
          </p>
          <a
            href={venueMap.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[.275px] text-[#904d00] hover:underline"
          >
            Open Map ↗
          </a>
        </div>
        <h2 className="mt-1 text-xs font-bold leading-4 text-[#0b1c30] whitespace-pre-line">
          {venueMap.venueName}
        </h2>

        {/* Clickable Map Card */}
        <button
          type="button"
          onClick={() => setMapPageOpen(true)}
          aria-label="View venue map"
          className="group relative mt-2 block h-[132px] w-full cursor-pointer overflow-hidden rounded-sm border border-[#eff4ff] bg-[#eff4ff] text-left"
        >
          <iframe
            title="Trials Physical Venue Map"
            className="pointer-events-none absolute left-0 top-0 h-[175px] w-full border-0 select-none"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            src={`https://www.google.com/maps?q=${venueMap.embedQuery}&hl=en&z=10&output=embed`}
          />

          <div className="pointer-events-none absolute bottom-2 left-2 z-10 flex items-center rounded-xs bg-[#001229]/90 px-2 py-0.5 backdrop-blur-[2px]">
            <span className="text-[10px] font-bold tracking-[0.5px] text-white">
              {venueMap.coordinates}
            </span>
          </div>
        </button>
      </section>

      {mapPageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Trials physical venue map"
          onClick={() => setMapPageOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded bg-white p-4 text-[#001229] shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold">Trials Physical Venue Map</h2>
              <div className="flex items-center gap-2">
                <a
                  href={venueMap.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-[#001229] px-3 py-2 text-xs font-bold text-white hover:bg-[#102b4a]"
                >
                  Open in Map ↗
                </a>
                <button
                  type="button"
                  onClick={() => setMapPageOpen(false)}
                  className="rounded px-2 py-1 text-sm"
                  aria-label="Close map"
                >
                  ✕
                </button>
              </div>
            </div>
            <iframe
              title="Trials Physical Venue Map"
              className="h-[65vh] min-h-[320px] w-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${venueMap.embedQuery}&hl=en&z=${mapZoom}&output=embed`}
            />
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightCol;