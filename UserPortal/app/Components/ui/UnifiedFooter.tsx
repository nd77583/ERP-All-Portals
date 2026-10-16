"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { getCmsSection } from "@/lib/cmsClient";
import type { FooterData } from "@/lib/cms-types";

export type FooterVariant = "footer1" | "footer2" | "footer3";

export type FooterContacts = {
  address: string;
  registrarPhone: string;
  antiRaggingTollFree: string;
};

export const MOCK_FOOTER_CONTACTS: FooterContacts = {
  address:
    "Mohindra Kothi Campus, Near Fountain Chowk, Patiala, Punjab - 147001",
  registrarPhone: "0175-2920219",
  antiRaggingTollFree: "1800-180-5522",
};

/* ─── Default Data for Footer 1 ─── */
const DEFAULT_F1_STATUTORY = [
  "University Grants Commission (UGC)",
  "Association of Indian Universities (AIU)",
  "Sports Authority of India (SAI)",
  "Ministry of Youth Affairs & Sports",
  "Khelo India Mission",
];

const DEFAULT_F1_GOVERNANCE = [
  "The Chancellor & Vice-Chancellor",
  "Syndicate & Academic Council",
  "Finance & Works Committee",
  "POSH & Grievance Cell",
  "Right to Information (RTI)",
];

const DEFAULT_F1_BADGES = [
  {
    id: "1",
    title: "GIGW & WCAG 2.1 AA",
    subtitle: "Certified Web Quality Guidelines",
  },
  {
    id: "2",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System Compliant",
  },
  {
    id: "3",
    title: "State Data Centre (SDC)",
    subtitle: "Secured on Punjab Govt Cloud Infrastructure",
  },
];

/* ─── Default Data for Footer 2 ─── */
const DEFAULT_F2_STATUTORY = [
  "University Grants Commission (UGC)",
  "Association of Indian Universities (AIU)",
  "Sports Authority of India (SAI)",
  "Ministry of Youth Affairs & Sports",
  "Khelo India State Centre of Excellence",
];

const DEFAULT_F2_GOVERNANCE = [
  "Chancellor & Governor Secretariat",
  "Vice-Chancellor's Secretariat",
  "The Syndicate & Senate Minutes",
  "Statutory Finance Committee",
  "POSH & Internal Complaints Committee",
  "Anti-Ragging Regulatory Cell",
];

const DEFAULT_F2_POLICIES = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Hyperlink Policy", href: "#" },
  { label: "Site Map", href: "#" },
  { label: "Helpdesk", href: "#" },
];

/* ─── Default Data for Footer 3 ─── */
const DEFAULT_F3_GOVERNANCE = [
  "The University Act & Statutes",
  "Statutory Governing Syndicate Council",
  "Academic Council Ordinances",
  "Finance Committee Records",
  "Internal Complaints Committee (POSH Vault)",
  "Anti-Ragging Squad & Statutory Undertakings",
];

const DEFAULT_F3_COMPLIANCE = [
  "RTI Act 2005 - Section 4(1)(b) Proactive Manual",
  "UGC / NCTE Recognition Approvals",
  "Sports Sciences Ethical Board (SSEB)",
  "e-Procurement GeM & Punjab e-Tenders",
  "Employee Digital e-Office Portal",
  "National Sports Development Code of India",
];

const DEFAULT_F3_CERTS = [
  {
    icon: "/footer/tick.png",
    title: "GIGW 3.0 & WCAG 2.1 AA",
    detail: "Standard Web Guidelines Certified",
  },
  {
    icon: "/footer/shield.png",
    title: "STQC & ISO 9001:2015",
    detail: "Institutional Quality Benchmarked",
  },
  {
    icon: "/footer/cloud.png",
    title: "MeitY Tier-III Cloud Hosted",
    detail: "National Informatics Centre Ready",
  },
];

const DEFAULT_F3_LINKS = [
  "Terms of Usage",
  "Privacy Policy",
  "Hyperlinking Policy",
  "Copyright Policy",
  "Help & Accessibility",
  "Feedback & Grievance",
];

interface UnifiedFooterProps {
  defaultVariant?: FooterVariant;
}

export default function UnifiedFooter({
  defaultVariant = "footer1",
}: UnifiedFooterProps) {
  const [footerCms, setFooterCms] = useState<FooterData | null>(null);

  useEffect(() => {
    async function loadCmsData() {
      try {
        const data = await getCmsSection("footer");
        if (data) setFooterCms(data);
      } catch {
        // fallback to embedded defaults
      }
    }
    loadCmsData();
  }, []);

  const f1 = footerCms?.primary;
  const f2 = footerCms?.variant2;
  const f3 = footerCms?.variant3;

  return (
    <footer className="w-full bg-[#001229] flex flex-col font-sans select-none border-t border-[#16365C]">

      {/* ─── Content Area ─── */}
      {/* 1. FOOTER 1 CONTENT */}
      {defaultVariant === "footer1" && (
        <div className="w-full bg-[#001229] text-[#F8F9FF] animate-in fade-in duration-200">
          <div className="mx-auto px-4 py-5 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1.8fr_1fr_1fr_1.1fr] xl:gap-8">
              {/* Column 1: Crest & About & Coordinates */}
              <div className="col-span-full min-w-0 pr-0 xl:col-span-1 xl:pr-4">
                <div className="mb-3 flex flex-row items-center gap-3">
                  <div className="flex h-15 w-32 shrink-0 items-center justify-center rounded-[4px] border border-[#D4E3FF]/40 bg-[#0F2744CC] text-[10px] font-bold text-[#FFDCC3] sm:w-40 lg:w-50">
                    <img
                      src={f1?.crestUrl || "/footer/MBSPSU Crest.png"}
                      alt="logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold tracking-[-0.08px] text-[#F8F9FF]">
                      {f1?.crestTitle || "MBSPSU PATIALA"}
                    </h3>
                    <span className="text-[10px] font-bold tracking-[0.5px] text-[#FFDCC3]">
                      {f1?.crestTag || "Punjab Act No. 11 of 2019"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] text-[#D4E3FF]">
                    {f1?.description ||
                      "Maharaja Bhupinder Singh Punjab Sports University is the premier apex institution established by the State Government of Punjab to advance scientific physical education, sports biomechanics, high-performance coaching, and Olympic disciplines."}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD9C4]" />
                    <span className="text-[12px] text-[#B2C8ED]">
                      {f1?.address || MOCK_FOOTER_CONTACTS.address}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD9C4]" />
                    <span className="text-[12px] text-[#B2C8ED]">
                      Registrar Desk:{" "}
                      {f1?.registrarPhone || MOCK_FOOTER_CONTACTS.registrarPhone}{" "}
                      | Anti-Ragging Toll Free:{" "}
                      {f1?.antiRaggingTollFree ||
                        MOCK_FOOTER_CONTACTS.antiRaggingTollFree}
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Statutory Bodies */}
              <div className="min-w-0 pt-1">
                <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
                  STATUTORY BODIES
                </h3>

                <ul className="space-y-2">
                  {(f1?.statutoryBodies && f1.statutoryBodies.length > 0
                    ? f1.statutoryBodies
                    : DEFAULT_F1_STATUTORY
                  ).map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-1.5 text-[12px] text-[#B2C8ED] hover:text-white transition-colors"
                      >
                        <svg
                          className="w-1.5 h-2 text-[#B2C8ED] group-hover:translate-x-0.5 transition-transform shrink-0"
                          viewBox="0 0 4 8"
                          fill="currentColor"
                        >
                          <path d="M0 0l4 4-4 4z" />
                        </svg>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Governance */}
              <div className="min-w-0 pt-1">
                <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
                  GOVERNANCE
                </h3>

                <ul className="space-y-2">
                  {(f1?.governance && f1.governance.length > 0
                    ? f1.governance
                    : DEFAULT_F1_GOVERNANCE
                  ).map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-1.5 text-[12px] text-[#B2C8ED] hover:text-white transition-colors"
                      >
                        <svg
                          className="w-1.5 h-2 text-[#B2C8ED] group-hover:translate-x-0.5 transition-transform shrink-0"
                          viewBox="0 0 4 8"
                          fill="currentColor"
                        >
                          <path d="M0 0l4 4-4 4z" />
                        </svg>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Compliance & Quality */}
              <div className="min-w-0 pt-1">
                <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
                  COMPLIANCE &amp; QUALITY
                </h3>
                <div className="space-y-3">
                  {(f1?.qualityBadges && f1.qualityBadges.length > 0
                    ? f1.qualityBadges
                    : DEFAULT_F1_BADGES
                  ).map((badge) => (
                    <div
                      key={badge.id}
                      className="rounded-[4px] bg-[#0F2744CC] p-2.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
                    >
                      <h4 className="text-[10px] font-bold text-[#FFDCC3]">
                        {badge.title}
                      </h4>
                      <span className="mt-1 block text-[12px] text-[#B2C8ED]">
                        {badge.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-[#234173] pt-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
                  {f1?.copyrightText ||
                    "© 2025 Maharaja Bhupinder Singh Punjab Sports University, Patiala. All Rights Reserved."}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
                  {f1?.tagline || "Designed for Apex Sports Governance"}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
                  •
                </span>
                <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
                  {f1?.lastUpdated || "Last Updated: 24 May 2025"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FOOTER 2 CONTENT */}
      {defaultVariant === "footer2" && (
        <div className="w-full bg-[#001229] flex flex-col font-['Inter',sans-serif] animate-in fade-in duration-200">
          {/* Top Compliance Bar */}
          <div className="w-full bg-[#0F2744] border-b border-[#C4C6CE]/10 px-5 py-2">
            <div className="w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex flex-wrap items-center gap-3">
                {(f2?.complianceBadges || [
                  "GIGW 3.0 & WCAG 2.1 AA COMPLIANT",
                  "STQC CERTIFIED SAFE",
                  "ISO 9001:2015",
                ]).map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-[#002D1C] text-[#6FFBBE] text-[10px] font-bold tracking-[0.5px] uppercase px-1.5 py-0.5 rounded-[2px] leading-3 whitespace-nowrap"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-[12px] font-medium text-[#D3E4FE] leading-4">
                {f2?.hostingText ||
                  "Hosted on Punjab State Data Centre (SDC) • National Cloud"}
              </p>
            </div>
          </div>

          {/* Main 4-Column Grid Section */}
          <div className="w-full mx-auto px-5 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {/* Column 1: Statutory Bodies */}
              <div className="flex flex-col gap-2">
                <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
                  STATUTORY BODIES
                </h3>
                <ul className="flex flex-col gap-1">
                  {(f2?.statutoryBodies || DEFAULT_F2_STATUTORY).map(
                    (item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF] hover:text-white transition-colors"
                        >
                          <svg
                            className="w-1.5 h-2 text-[#DCE9FF] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                            viewBox="0 0 4 8"
                            fill="currentColor"
                          >
                            <path d="M0 0l4 4-4 4z" />
                          </svg>
                          <span>{item}</span>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Column 2: Governance & Bodies */}
              <div className="flex flex-col gap-2">
                <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
                  GOVERNANCE &amp; BODIES
                </h3>
                <ul className="flex flex-col gap-1">
                  {(f2?.governanceBodies || DEFAULT_F2_GOVERNANCE).map(
                    (item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF] hover:text-white transition-colors"
                        >
                          <svg
                            className="w-1.5 h-2 text-[#DCE9FF] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                            viewBox="0 0 4 8"
                            fill="currentColor"
                          >
                            <path d="M0 0l4 4-4 4z" />
                          </svg>
                          <span>{item}</span>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Column 3: University Campus */}
              <div className="flex flex-col gap-2">
                <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
                  UNIVERSITY CAMPUS
                </h3>
                <div className="flex flex-col gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4">
                  <p className="font-bold text-white">
                    {f2?.campusTitle || "Maharaja Bhupinder Singh Punjab Sports University"}
                  </p>
                  <p className="text-[#DCE9FF]">
                    {f2?.campusAddress1 || "Mohindra Kothi Campus, Lower Mall Road"}
                  </p>
                  <p className="text-[#DCE9FF]">
                    {f2?.campusAddress2 || "Patiala, Punjab, PIN - 147001, India"}
                  </p>
                  <div className="flex items-center gap-1 pt-1 text-[#DCE9FF]">
                    <svg
                      className="w-3 h-2.5 text-[#DCE9FF] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="M18 0H2a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V2a2 2 0 00-2-2zm-1.4 3L10 8.2 3.4 3h13.2zM2 14V4.8l7.5 5.9a1 1 0 001.2 0L18 4.8V14H2z" />
                    </svg>
                    <a
                      href={`mailto:${f2?.campusEmail || "registrar@mbspsu.ac.in"}`}
                      className="hover:underline"
                    >
                      {f2?.campusEmail || "registrar@mbspsu.ac.in"}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 text-[#DCE9FF]">
                    <svg
                      className="w-2.5 h-2.5 text-[#DCE9FF] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a.678.678 0 01-.659-.196L6.5 8.92a.678.678 0 01-.196-.659l.547-2.19a.678.678 0 00-.122-.58L4.935 3.184l-1.281-1.856z" />
                    </svg>
                    <span>{f2?.campusPhone || "EPABX: +91-175-2920201 / 2920202"}</span>
                  </div>
                </div>
              </div>

              {/* Column 4: Institutional Mandate */}
              <div className="flex flex-col gap-2">
                <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
                  INSTITUTIONAL MANDATE
                </h3>
                <p className="font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF]">
                  {f2?.mandateDescription || "Established as a premier statutory sports university by the Punjab State Legislature to foster academic excellence in sports science, physical education, high-performance coaching, and sports management."}
                </p>
                <div className="pt-1">
                  <a
                    href={f2?.eOfficeButtonUrl || "#"}
                    className="inline-flex items-center gap-1 bg-[#0F2744] hover:bg-[#16365d] border border-[#C4C6CE]/30 rounded-[2px] px-3 py-1 text-[11px] font-semibold text-white tracking-[0.275px] transition-colors"
                  >
                    <svg
                      className="w-3 h-3 text-white flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0a4 4 0 00-4 4v2H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a4 4 0 00-4-4zm2 6V4a2 2 0 10-4 0v2h4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{f2?.eOfficeButtonLabel || "Employee e-Office"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal / Copyright Bar */}
          <div className="w-full bg-[#00160B] border-t border-[#C4C6CE]/10 px-5 py-3">
            <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <p className="font-['Public_Sans',sans-serif] text-[12px] text-[#DCE9FF] leading-4">
                {f2?.copyrightText || "© 2025 Maharaja Bhupinder Singh Punjab Sports University (MBSPSU), Patiala. All Rights Reserved."}
              </p>
              <ul className="flex flex-wrap items-center gap-4 text-[11px] font-semibold tracking-[0.275px] text-[#DCE9FF]">
                {(f2?.bottomLinks || DEFAULT_F2_POLICIES).map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. FOOTER 3 CONTENT */}
      {defaultVariant === "footer3" && (
        <div className="bg-[#001229] text-[#798fb1] animate-in fade-in duration-200">
          <div className="mx-auto flex w-full flex-col gap-12 px-5 pb-5 pt-6 sm:gap-16 lg:gap-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#fe932c] text-xl font-bold text-[#663500]">
                    {f3?.monogramLetter || "M"}
                  </span>
                  <span className="text-[14px] font-bold tracking-tight text-white sm:text-[20px]">
                    {f3?.title || "MBSPSU PATIALA"}
                  </span>
                </div>
                <p className="mb-7 text-[11px] leading-[1.6] sm:text-sm">
                  {f3?.description ||
                    "The Maharaja Bhupinder Singh Punjab Sports University is a specialized apex state university established by the Government of Punjab for sports education, biomechanics, high-performance coaching, and sports science excellence."}
                </p>
                <address className="space-y-3 not-italic text-xs leading-5 text-[#b2c8ed] sm:text-sm">
                  <p className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#fe932c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>
                      {f3?.address ||
                        "Administrative Block, Mohindra Kothi, Mall Road, Patiala, Punjab -147001"}
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-[#fe932c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="1" />
                      <path d="m3 6 9 7 9-7" />
                    </svg>
                    <a
                      href={`mailto:${f3?.registrarEmail || "registrar@mbspsu.ac.in"}`}
                      className="hover:text-white"
                    >
                      {f3?.registrarEmail || "registrar@mbspsu.ac.in"}
                    </a>
                  </p>
                </address>
              </section>

              {/* Statutory Governance Column */}
              <section>
                <h2 className="mb-5 text-sm font-bold leading-6 tracking-[0.8px] uppercase text-[#ffdcc3] sm:text-[16px]">
                  Statutory Governance
                </h2>
                <ul className="space-y-1 text-[11px] leading-4 sm:text-xs">
                  {(f3?.governanceLinks || DEFAULT_F3_GOVERNANCE).map(
                    (link, i) => (
                      <li key={i}>
                        <a href="#" className="hover:text-white">
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </section>

              {/* Mandatory Compliance Column */}
              <section>
                <h2 className="mb-5 text-sm font-bold leading-6 tracking-[0.8px] uppercase text-[#ffdcc3] sm:text-[16px]">
                  Mandatory Compliance
                </h2>
                <ul className="space-y-1 text-[11px] leading-4 sm:text-xs">
                  {(f3?.complianceLinks || DEFAULT_F3_COMPLIANCE).map(
                    (link, i) => (
                      <li key={i}>
                        <a href="#" className="hover:text-white">
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </section>

              {/* Statutory Certifications Column */}
              <section>
                <h2 className="mb-5 text-sm font-bold leading-6 tracking-[0.8px] uppercase text-[#ffdcc3] sm:text-[16px]">
                  Statutory Certifications
                </h2>
                <div className="space-y-2">
                  {(f3?.certifications || DEFAULT_F3_CERTS).map(
                    ({ icon, title, detail }) => (
                      <div
                        key={title}
                        className="flex min-h-[58px] items-center gap-3 rounded-sm bg-[#0f2744] p-2"
                      >
                        <span
                          aria-hidden="true"
                          className="w-5 shrink-0 text-center text-2xl font-bold leading-none text-[#fe932c]"
                        >
                          <img src={icon} alt="" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[11px] font-bold leading-4 tracking-wide text-white sm:text-sm">
                            {title}
                          </h3>
                          <p className="text-[11px] leading-5 sm:text-xs text-[#A2BDDF]">
                            {detail}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#19314c] pt-5 text-[10px] font-semibold tracking-wide sm:flex-row sm:items-center sm:justify-between sm:text-xs">
              <nav
                aria-label="Footer"
                className="flex flex-wrap items-center gap-x-3 gap-y-2"
              >
                {(f3?.footerLinks || DEFAULT_F3_LINKS).map((link, index) => (
                  <React.Fragment key={link}>
                    {index > 0 && (
                      <span aria-hidden="true" className="text-lg font-bold ">
                        ·
                      </span>
                    )}
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </React.Fragment>
                ))}
              </nav>
              <p className="shrink-0 text-xs">
                © 2025 MBSPSU Patiala. All Rights Reserved. Last Updated: May 2025.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
