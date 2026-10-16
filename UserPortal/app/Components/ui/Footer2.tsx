"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import type { FooterData } from "@/lib/cms-types";

const defaultStatutoryBodies = [
  "University Grants Commission (UGC)",
  "Association of Indian Universities (AIU)",
  "Sports Authority of India (SAI)",
  "Ministry of Youth Affairs & Sports",
  "Khelo India State Centre of Excellence",
];

const defaultGovernanceBodies = [
  "Chancellor & Governor Secretariat",
  "Vice-Chancellor's Secretariat",
  "The Syndicate & Senate Minutes",
  "Statutory Finance Committee",
  "POSH & Internal Complaints Committee",
  "Anti-Ragging Regulatory Cell",
];

const defaultBottomLinks = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Hyperlink Policy", href: "#" },
  { label: "Site Map", href: "#" },
  { label: "Helpdesk", href: "#" },
];

const defaultComplianceBadges = [
  "GIGW 3.0 & WCAG 2.1 AA COMPLIANT",
  "STQC CERTIFIED SAFE",
  "ISO 9001:2015",
];

const Footer2 = () => {
  const [data, setData] = useState<FooterData["variant2"] | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const footerData = await getCmsSection("footer");
        if (footerData?.variant2) {
          setData(footerData.variant2);
        }
      } catch {
        // use static defaults
      }
    }
    loadData();
  }, []);

  const complianceBadges = data?.complianceBadges || defaultComplianceBadges;
  const hostingText =
    data?.hostingText ||
    "Hosted on Punjab State Data Centre (SDC) • National Cloud";
  const statutoryBodies = data?.statutoryBodies || defaultStatutoryBodies;
  const governanceBodies = data?.governanceBodies || defaultGovernanceBodies;
  const bottomLinks = data?.bottomLinks || defaultBottomLinks;

  const campusTitle =
    data?.campusTitle || "Maharaja Bhupinder Singh Punjab Sports University";
  const campusAddress1 =
    data?.campusAddress1 || "Mohindra Kothi Campus, Lower Mall Road";
  const campusAddress2 =
    data?.campusAddress2 || "Patiala, Punjab, PIN - 147001, India";
  const campusEmail = data?.campusEmail || "registrar@mbspsu.ac.in";
  const campusPhone =
    data?.campusPhone || "EPABX: +91-175-2920201 / 2920202";

  const mandateDescription =
    data?.mandateDescription ||
    "Established as a premier statutory sports university by the Punjab State Legislature to foster academic excellence in sports science, physical education, high-performance coaching, and sports management.";
  const eOfficeButtonLabel = data?.eOfficeButtonLabel || "Employee e-Office";
  const eOfficeButtonUrl = data?.eOfficeButtonUrl || "#";

  const copyrightText =
    data?.copyrightText ||
    "© 2025 Maharaja Bhupinder Singh Punjab Sports University (MBSPSU), Patiala. All Rights Reserved.";

  return (
    <footer className="w-full bg-[#001229] flex flex-col font-['Inter',sans-serif]">
      {/* Top Compliance Bar */}
      <div className="w-full bg-[#0F2744] border-b border-[#C4C6CE]/10 px-5 py-2">
        <div className="w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-wrap items-center gap-3">
            {complianceBadges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#002D1C] text-[#6FFBBE] text-[10px] font-bold tracking-[0.5px] uppercase px-1.5 py-0.5 rounded-[2px] leading-3 whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="text-[12px] font-medium text-[#D3E4FE] leading-4">
            {hostingText}
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
              {statutoryBodies.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF] hover:text-white transition-colors"
                  >
                    <svg
                      className="w-1.5 h-2 text-[#DCE9FF] group-hover:translate-x-0.5 transition-transform shrink-0"
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

          {/* Column 2: Governance & Bodies */}
          <div className="flex flex-col gap-2">
            <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
              GOVERNANCE &amp; BODIES
            </h3>
            <ul className="flex flex-col gap-1">
              {governanceBodies.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF] hover:text-white transition-colors"
                  >
                    <svg
                      className="w-1.5 h-2 text-[#DCE9FF] group-hover:translate-x-0.5 transition-transform shrink-0"
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

          {/* Column 3: University Campus */}
          <div className="flex flex-col gap-2">
            <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
              UNIVERSITY CAMPUS
            </h3>
            <div className="flex flex-col gap-1 font-['Public_Sans',sans-serif] text-[12px] leading-4">
              <p className="font-bold text-white">{campusTitle}</p>
              <p className="text-[#DCE9FF]">{campusAddress1}</p>
              <p className="text-[#DCE9FF]">{campusAddress2}</p>
              <div className="flex items-center gap-1.5 pt-1 text-[#DCE9FF]">
                <svg
                  className="w-3.5 h-3 text-[#DCE9FF] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M18 0H2a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V2a2 2 0 00-2-2zm-1.4 3L10 8.2 3.4 3h13.2zM2 14V4.8l7.5 5.9a1 1 0 001.2 0L18 4.8V14H2z" />
                </svg>
                <a
                  href={`mailto:${campusEmail}`}
                  className="hover:underline text-[#DCE9FF]"
                >
                  {campusEmail}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[#DCE9FF]">
                <svg
                  className="w-3 h-3 text-[#DCE9FF] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a.678.678 0 01-.659-.196L6.5 8.92a.678.678 0 01-.196-.659l.547-2.19a.678.678 0 00-.122-.58L4.935 3.184l-1.281-1.856z" />
                </svg>
                <span>{campusPhone}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Institutional Mandate */}
          <div className="flex flex-col gap-2">
            <h3 className="font-['Public_Sans',sans-serif] text-[16px] font-bold leading-6 tracking-[0.8px] uppercase text-[#FFDCC3]">
              INSTITUTIONAL MANDATE
            </h3>
            <p className="font-['Public_Sans',sans-serif] text-[12px] leading-4 text-[#DCE9FF]">
              {mandateDescription}
            </p>
            <div className="pt-1">
              <a
                href={eOfficeButtonUrl}
                className="inline-flex items-center gap-1.5 bg-[#0F2744] hover:bg-[#16365d] border border-[#C4C6CE]/30 rounded-[2px] px-3 py-1.5 text-[11px] font-semibold text-white tracking-[0.275px] transition-colors shadow-xs"
              >
                <svg
                  className="w-3 h-3 text-white shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0a4 4 0 00-4 4v2H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a4 4 0 00-4-4zm2 6V4a2 2 0 10-4 0v2h4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{eOfficeButtonLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="w-full bg-[#00160B] border-t border-[#C4C6CE]/10 px-5 py-3">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-['Public_Sans',sans-serif] text-[12px] text-[#DCE9FF] leading-4">
            {copyrightText}
          </p>
          <ul className="flex flex-wrap items-center gap-4 text-[11px] font-semibold tracking-[0.275px] text-[#DCE9FF]">
            {bottomLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
