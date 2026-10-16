"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { getCmsSection } from "@/lib/cmsClient";
import type { FooterData } from "@/lib/cms-types";

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

const DEFAULT_STATUTORY = [
  "University Grants Commission (UGC)",
  "Association of Indian Universities (AIU)",
  "Sports Authority of India (SAI)",
  "Ministry of Youth Affairs & Sports",
  "Khelo India Mission",
];

const DEFAULT_GOVERNANCE = [
  "The Chancellor & Vice-Chancellor",
  "Syndicate & Academic Council",
  "Finance & Works Committee",
  "POSH & Grievance Cell",
  "Right to Information (RTI)",
];

const DEFAULT_BADGES = [
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

const Footer = () => {
  const [data, setData] = useState<FooterData["primary"] | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fullFooter = await getCmsSection("footer");
        if (fullFooter?.primary) {
          setData(fullFooter.primary);
        }
      } catch {
        // fallback to defaults
      }
    }
    loadData();
  }, []);

  const crestUrl = data?.crestUrl || "/footer/MBSPSU Crest.png";
  const crestTitle = data?.crestTitle || "MBSPSU PATIALA";
  const crestTag = data?.crestTag || "Punjab Act No. 11 of 2019";
  const description =
    data?.description ||
    "Maharaja Bhupinder Singh Punjab Sports University is the premier apex institution established by the State Government of Punjab to advance scientific physical education, sports biomechanics, high-performance coaching, and Olympic disciplines.";
  const address = data?.address || MOCK_FOOTER_CONTACTS.address;
  const registrarPhone =
    data?.registrarPhone || MOCK_FOOTER_CONTACTS.registrarPhone;
  const antiRaggingTollFree =
    data?.antiRaggingTollFree || MOCK_FOOTER_CONTACTS.antiRaggingTollFree;

  const statutoryBodies =
    data?.statutoryBodies && data.statutoryBodies.length > 0
      ? data.statutoryBodies
      : DEFAULT_STATUTORY;

  const governance =
    data?.governance && data.governance.length > 0
      ? data.governance
      : DEFAULT_GOVERNANCE;

  const qualityBadges =
    data?.qualityBadges && data.qualityBadges.length > 0
      ? data.qualityBadges
      : DEFAULT_BADGES;

  const copyrightText =
    data?.copyrightText ||
    "© 2025 Maharaja Bhupinder Singh Punjab Sports University, Patiala. All Rights Reserved.";
  const tagline = data?.tagline || "Designed for Apex Sports Governance";
  const lastUpdated = data?.lastUpdated || "Last Updated: 24 May 2025";

  return (
    <div className="w-full bg-[#001229] text-[#F8F9FF]">
      <div className="box-border w-full min-w-0 px-4 py-5 md:px-8 lg:px-10">
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 py-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1.8fr_1fr_1fr_1.1fr] xl:gap-8">
          {/* Column 1 */}
          <div className="col-span-full min-w-0 pr-0 xl:col-span-1 xl:pr-4">
            <div className="mb-3 flex flex-row items-center gap-3">
              <div className="flex h-15 w-32 shrink-0 items-center justify-center rounded-[4px] border border-[#D4E3FF]/40 bg-[#0F2744CC] text-[10px] font-bold text-[#FFDCC3] sm:w-40 lg:w-50">
                <img
                  src={crestUrl}
                  alt="logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-[16px] font-bold tracking-[-0.08px] text-[#F8F9FF]">
                  {crestTitle}
                </h3>
                <span className="text-[10px] font-bold tracking-[0.5px] text-[#FFDCC3]">
                  {crestTag}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#D4E3FF]">{description}</p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD9C4]" />
                <span className="min-w-0 break-words text-[12px] text-[#B2C8ED]">{address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD9C4]" />
                <span className="min-w-0 break-words text-[12px] text-[#B2C8ED]">
                  Registrar Desk: {registrarPhone} | Anti-Ragging Toll Free:{" "}
                  {antiRaggingTollFree}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="min-w-0 pt-1">
            <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
              STATUTORY BODIES
            </h3>

            <ul className="space-y-2.5">
              {statutoryBodies.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[12px] text-[#B2C8ED] transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    {/* <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#0F2744] border border-[#234173] group-hover:bg-[#F6AE52]/20 group-hover:border-[#F6AE52]/40 transition-all duration-200">
                      <svg
                        className="w-1.5 h-2 text-[#F6AE52] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                        viewBox="0 0 4 8"
                        fill="currentColor"
                      >
                        <path d="M0 0l4 4-4 4z" />
                      </svg>
                    </span> */}
                    <span className="leading-tight">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="min-w-0 pt-1">
            <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
              GOVERNANCE
            </h3>

            <ul className="space-y-2.5">
              {governance.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[12px] text-[#B2C8ED] transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    {/* <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#0F2744] border border-[#234173] group-hover:bg-[#F6AE52]/20 group-hover:border-[#F6AE52]/40 transition-all duration-200">
                      <svg
                        className="w-1.5 h-2 text-[#F6AE52] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                        viewBox="0 0 4 8"
                        fill="currentColor"
                      >
                        <path d="M0 0l4 4-4 4z" />
                      </svg>
                    </span> */}
                    <span className="leading-tight">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="min-w-0 pt-1">
            <h3 className="mb-3 text-[16px] font-semibold uppercase text-[#F8F9FF]">
              COMPLIANCE &amp; QUALITY
            </h3>
            <div className="space-y-3">
              {qualityBadges.map((badge) => (
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
              {copyrightText}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
              {tagline}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
              •
            </span>
            <span className="text-[11px] font-semibold tracking-[0.28px] text-[#D4E3FF]">
              {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
