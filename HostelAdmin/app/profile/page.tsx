"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "credentials" | "rbac" | "sessions"
  >("overview");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Administrative profile state
  const adminData = {
    name: "Prof. (Dr.) Executive VC / Dean",
    designation: "Vice-Chancellor & Dean of Academic Governance",
    authority: "Apex Administrative Authority & First Appellate Authority",
    statutoryRef: "Punjab Act No. 11 of 2019 • Section 2.15.2 PTPP Act",
    tenderRef: "Tender Ref: MBSPSU/PUR/ERP/2026/01",
    employeeId: "MBSPSU-APEX-001",
    avatar: "/profile.jpg",
    email: "vc@mbspsu.ac.in",
    altEmail: "dean.academic@mbspsu.ac.in",
    phone: "+91 175 2920201",
    office: "Vice-Chancellor Secretariat, 1st Floor, Administrative Block",
    campus: "Maharaja Bhupinder Singh Punjab Sports University, 97-Acre Campus, Bhadson Road, Patiala, Punjab – 147006",
    appointedSince: "November 2019",
    securityClearance: "Tier-0 Super Administrator (FR-GEN-01)",
    ssoProvider: "MBSPSU Punjab SWAN Directory (SAML 2.0 / OpenID)",
    digitalSignature: "e-Sign Class-3 DSC Registered (CCA Validated)",
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
      setIsLoggedOut(true);
    }, 1000);
  };

  const handleRelogin = () => {
    setIsLoggedOut(false);
  };

  if (isLoggedOut) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
        <div className="w-full max-w-[480px] rounded-xl border border-[#d9e2ee] bg-white p-6 sm:p-8 text-center shadow-[0_4px_24px_rgba(15,39,68,0.08)]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2] text-[#d62828]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>

          <span className="rounded-full bg-[#fee2e2] px-3 py-1 font-['Inter'] text-[11px] font-bold text-[#b91c1c]">
            Session Terminated
          </span>

          <h2 className="mt-3 font-['Public_Sans'] text-[20px] font-bold text-[#102d4d]">
            Administrative Session Ended
          </h2>

          <p className="mt-2 font-['Inter'] text-[13px] leading-relaxed text-[#596979]">
            Prof. (Dr.) Executive VC / Dean has successfully logged out. Your
            administrative credentials have been securely closed per FR-GEN-08
            tamper-evident audit policy.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleRelogin}
              className="inline-flex h-[38px] items-center justify-center rounded-lg bg-[#102d4d] px-5 font-['Inter'] text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-[#1a4473]"
            >
              Sign In Again
            </button>
            <Link
              href="/hostel"
              className="inline-flex h-[38px] items-center justify-center rounded-lg border border-[#dfe5ed] bg-white px-5 font-['Inter'] text-[12px] font-semibold text-[#102d4d] hover:bg-[#f8faff]"
            >
              Return to Campus Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 p-2 sm:p-4 md:p-5 max-w-[1400px] mx-auto min-w-0">
      {/* ========================================================
          TOP BREADCRUMB
          ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e9ee] pb-2.5">
        <div className="flex items-center gap-2 font-['Inter'] text-[12px] text-[#596979]">
          <Link href="/" className="hover:text-[#102d4d]">
            MBSPSU
          </Link>
          <span>/</span>
          <span className="text-[#102d4d] font-semibold">
            Administrative Governance
          </span>
          <span>/</span>
          <span className="text-[#FE932C] font-bold">Admin Profile</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[11px] font-semibold text-[#15803d]">
            <span className="h-2 w-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            Apex Session Active
          </span>
          <span className="rounded-[4px] bg-[#0F2744] px-2 py-0.5 text-[10.5px] font-bold text-white">
            AY 2025-26
          </span>
        </div>
      </div>

      {/* ========================================================
          ADMINISTRATOR MAIN BANNER / HEADER CARD
          ======================================================== */}
      <div className="relative overflow-hidden rounded-[12px] border border-[#d6a756]/40 bg-gradient-to-r from-[#0F2744] via-[#143459] to-[#0A1B30] p-4 text-white shadow-[0_4px_20px_rgba(15,39,68,0.15)] sm:p-6">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FE932C]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          {/* LEFT: AVATAR & CREDENTIALS */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-[3px] border-[#d6a756] shadow-[0_0_16px_rgba(214,167,86,0.35)] bg-[#d6a756]">
                <Image
                  src={adminData.avatar}
                  alt={adminData.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <span
                className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-[#0F2744] bg-[#22c55e]"
                title="Online & Verified Administrator"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[#FE932C] px-2 py-0.5 font-['Inter'] text-[10px] font-extrabold uppercase tracking-wide text-[#0F2744]">
                  Apex Administrative Authority
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-['Inter'] text-[10px] font-semibold text-white/90">
                  {adminData.employeeId}
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-['Inter'] text-[10px] font-semibold text-[#8fd3fe]">
                  Tier-0 Clearance
                </span>
              </div>

              <h1 className="mt-1.5 font-['Public_Sans'] text-[20px] sm:text-[23px] font-bold tracking-tight text-white">
                {adminData.name}
              </h1>

              <p className="font-['Public_Sans'] text-[13px] font-semibold text-[#FE932C]">
                {adminData.designation}
              </p>

              <p className="mt-1 font-['Inter'] text-[11px] text-[#cbd5e1] flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Maharaja Bhupinder Singh Punjab Sports University</span>
                <span>•</span>
                <span>{adminData.statutoryRef}</span>
              </p>
            </div>
          </div>

          {/* RIGHT: LOG OUT ACTION & QUICK STATUS */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-start lg:self-center">
            {/* LOG OUT BUTTON (PRIMARY USER REQUIREMENT) */}
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#b91c1c] px-4 font-['Inter'] text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#dc2626] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-95"
              id="admin-logout-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log Out</span>
            </button>

            <Link
              href="/hostel"
              className="inline-flex h-[38px] items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 font-['Inter'] text-[12px] font-semibold text-white transition-all hover:bg-white/20"
            >
              <span>Back to Portal</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          EXECUTIVE KPI STATS ROW (FR-GEN-04)
          ======================================================== */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#0F2744] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#596979]">
              GOVERNANCE SUITES
            </span>
            <span className="rounded bg-[#e0f2fe] px-1.5 py-0.5 text-[10px] font-extrabold text-[#0284c7]">
              Suites A–G
            </span>
          </div>
          <div className="mt-2 font-['Public_Sans'] text-[22px] font-extrabold text-[#102d4d]">
            7 / 7 Online
          </div>
          <div className="mt-1 font-['Inter'] text-[11px] text-[#15803d] font-semibold">
            ✓ Full Executive Oversight
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#FE932C] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#596979]">
              STATUTORY APPROVALS
            </span>
            <span className="rounded bg-[#fef3c7] px-1.5 py-0.5 text-[10px] font-extrabold text-[#d97706]">
              Pending
            </span>
          </div>
          <div className="mt-2 font-['Public_Sans'] text-[22px] font-extrabold text-[#d97706]">
            3 Files
          </div>
          <div className="mt-1 font-['Inter'] text-[11px] text-[#596979]">
            Hostel Matrix, Fleet, NAAC Audit
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#16a34a] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#596979]">
              AUDIT TRAIL (FR-GEN-08)
            </span>
            <span className="rounded bg-[#dcfce7] px-1.5 py-0.5 text-[10px] font-extrabold text-[#15803d]">
              Live
            </span>
          </div>
          <div className="mt-2 font-['Public_Sans'] text-[22px] font-extrabold text-[#15803d]">
            SHA-256
          </div>
          <div className="mt-1 font-['Inter'] text-[11px] text-[#596979]">
            Tamper-evident logs active
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#6366f1] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-wider text-[#596979]">
              AUTHENTICATION (FR-GEN-02)
            </span>
            <span className="rounded bg-[#e0e7ff] px-1.5 py-0.5 text-[10px] font-extrabold text-[#4f46e5]">
              SAML 2.0
            </span>
          </div>
          <div className="mt-2 font-['Public_Sans'] text-[22px] font-extrabold text-[#4f46e5]">
            SSO Active
          </div>
          <div className="mt-1 font-['Inter'] text-[11px] text-[#596979]">
            Punjab SWAN Federated
          </div>
        </div>
      </div>

      {/* ========================================================
          NAVIGATION TABS
          ======================================================== */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#dfe5ed] bg-white px-3 py-2 rounded-t-[8px]">
        {[
          { id: "overview", label: "Executive Overview & Portfolios" },
          { id: "credentials", label: "Statutory Details & Office" },
          { id: "rbac", label: "RBAC Privileges & Access (FR-GEN-01)" },
          { id: "sessions", label: "Security & Active Sessions" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-md px-3.5 py-1.5 font-['Inter'] text-[12px] font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-[#0F2744] text-white shadow-sm"
                : "bg-transparent text-[#596979] hover:bg-[#f1f5f9] hover:text-[#102d4d]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================
          TAB CONTENT PANELS
          ======================================================== */}
      <div className="rounded-b-[8px] border border-t-0 border-[#dfe5ed] bg-white p-4 sm:p-5 shadow-sm min-h-[380px]">
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="font-['Public_Sans'] text-[15px] font-bold text-[#102d4d]">
                Apex Governance &amp; Statutory Powers
              </h3>
              <p className="mt-1 font-['Inter'] text-[12px] text-[#596979] leading-relaxed">
                As the Vice-Chancellor and Executive Dean of MBSPSU Patiala
                under Punjab Act No. 11 of 2019, this account possesses supreme
                administrative authority over academic ordinances, athlete
                residential hostels, research repositories, logistics, and
                statutory e-tenders (Tender Ref: MBSPSU/PUR/ERP/2026/01).
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <h4 className="font-['Public_Sans'] text-[13px] font-bold text-[#0F2744]">
                  Statutory Jurisdiction
                </h4>
                <ul className="mt-2.5 space-y-2 font-['Inter'] text-[11.5px] text-[#334155]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FE932C] font-bold">▶</span>
                    <span>
                      <strong>First Appellate Authority:</strong> Handles
                      administrative appeals and procurement queries under
                      Section 49 of the PTPP Act 2019.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FE932C] font-bold">▶</span>
                    <span>
                      <strong>Academic Council Chairperson:</strong> Final
                      approver for CBCS courses, sports curriculum, and degree
                      lodgements with DigiLocker/NAD.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FE932C] font-bold">▶</span>
                    <span>
                      <strong>Campus Life Authority:</strong> Apex supervision
                      of residential hostels, athlete nutrition mess rebates,
                      and GPS fleet dispatch.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <h4 className="font-['Public_Sans'] text-[13px] font-bold text-[#0F2744]">
                  Quick Governance Actions
                </h4>
                <div className="mt-2.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between rounded-md border border-[#e2e8f0] bg-white p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#FE932C]"></span>
                      <span className="font-['Inter'] text-[12px] font-semibold text-[#102d4d]">
                        Hostel Allotment Matrix Review
                      </span>
                    </div>
                    <Link
                      href="/hostel"
                      className="rounded bg-[#0F2744] px-2.5 py-1 font-['Inter'] text-[10.5px] font-semibold text-white hover:bg-[#1b4372]"
                    >
                      Open Module
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-md border border-[#e2e8f0] bg-white p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]"></span>
                      <span className="font-['Inter'] text-[12px] font-semibold text-[#102d4d]">
                        Fleet &amp; GPS Transport Logistics
                      </span>
                    </div>
                    <Link
                      href="/transport"
                      className="rounded bg-[#0F2744] px-2.5 py-1 font-['Inter'] text-[10.5px] font-semibold text-white hover:bg-[#1b4372]"
                    >
                      Open Module
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-md border border-[#e2e8f0] bg-white p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0284c7]"></span>
                      <span className="font-['Inter'] text-[12px] font-semibold text-[#102d4d]">
                        Central RFID Library &amp; MARC21 Ledger
                      </span>
                    </div>
                    <Link
                      href="/library"
                      className="rounded bg-[#0F2744] px-2.5 py-1 font-['Inter'] text-[10.5px] font-semibold text-white hover:bg-[#1b4372]"
                    >
                      Open Module
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STATUTORY CREDENTIALS */}
        {activeTab === "credentials" && (
          <div className="flex flex-col gap-4">
            <h3 className="font-['Public_Sans'] text-[15px] font-bold text-[#102d4d]">
              Official Administrative Directory &amp; Office Credentials
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg border border-[#e2e8f0] p-3.5">
                <span className="font-['Inter'] text-[10.5px] font-bold uppercase text-[#64748b]">
                  Full Legal Title
                </span>
                <p className="mt-1 font-['Public_Sans'] text-[13px] font-bold text-[#102d4d]">
                  {adminData.name}
                </p>
                <p className="font-['Inter'] text-[11px] text-[#596979]">
                  {adminData.designation}
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e8f0] p-3.5">
                <span className="font-['Inter'] text-[10.5px] font-bold uppercase text-[#64748b]">
                  Official Email
                </span>
                <p className="mt-1 font-['Public_Sans'] text-[13px] font-bold text-[#0F2744]">
                  {adminData.email}
                </p>
                <p className="font-['Inter'] text-[11px] text-[#596979]">
                  Secondary: {adminData.altEmail}
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e8f0] p-3.5">
                <span className="font-['Inter'] text-[10.5px] font-bold uppercase text-[#64748b]">
                  Secretariat Hotline
                </span>
                <p className="mt-1 font-['Public_Sans'] text-[13px] font-bold text-[#102d4d]">
                  {adminData.phone}
                </p>
                <p className="font-['Inter'] text-[11px] text-[#596979]">
                  PBX Ext: 101 / 102
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e8f0] p-3.5 sm:col-span-2">
                <span className="font-['Inter'] text-[10.5px] font-bold uppercase text-[#64748b]">
                  Office Location
                </span>
                <p className="mt-1 font-['Public_Sans'] text-[13px] font-bold text-[#102d4d]">
                  {adminData.office}
                </p>
                <p className="font-['Inter'] text-[11px] text-[#596979]">
                  {adminData.campus}
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e8f0] p-3.5">
                <span className="font-['Inter'] text-[10.5px] font-bold uppercase text-[#64748b]">
                  Digital Certificate
                </span>
                <p className="mt-1 font-['Public_Sans'] text-[12.5px] font-bold text-[#15803d]">
                  {adminData.digitalSignature}
                </p>
                <p className="font-['Inter'] text-[11px] text-[#596979]">
                  Token ID: DSC-PB-2026-APEX
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RBAC MATRIX */}
        {activeTab === "rbac" && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-['Public_Sans'] text-[15px] font-bold text-[#102d4d]">
                Unified Role-Based Access Control (RBAC) – FR-GEN-01
              </h3>
              <p className="mt-1 font-['Inter'] text-[12px] text-[#596979]">
                Hierarchical privilege matrix mapped directly to the University
                ERP tender specifications:
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-[6px] border border-[#e2e8f0]">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#f1f5f9] font-['Inter'] text-[10.5px] font-bold uppercase text-[#475569]">
                    <th className="px-3 py-2.5">Module / Suite</th>
                    <th className="px-3 py-2.5">Access Level</th>
                    <th className="px-3 py-2.5">Override Rights</th>
                    <th className="px-3 py-2.5">Maker-Checker Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] font-['Inter'] text-[12px]">
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[#102d4d]">
                      Suite A: Pre-Admission &amp; SIS
                    </td>
                    <td className="px-3 py-2.5 text-[#15803d] font-semibold">
                      Full Read / Write / Assent
                    </td>
                    <td className="px-3 py-2.5">Apex Quota Sanction</td>
                    <td className="px-3 py-2.5">Final Approver</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[#102d4d]">
                      Suite B: Academics &amp; Exams
                    </td>
                    <td className="px-3 py-2.5 text-[#15803d] font-semibold">
                      Full Administrative Access
                    </td>
                    <td className="px-3 py-2.5">Degree Lodgement Sign-Off</td>
                    <td className="px-3 py-2.5">Council Chairperson</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[#102d4d]">
                      Suite C: Sports &amp; Athletes
                    </td>
                    <td className="px-3 py-2.5 text-[#15803d] font-semibold">
                      Apex Oversight
                    </td>
                    <td className="px-3 py-2.5">Elite Athlete Grants</td>
                    <td className="px-3 py-2.5">Patron / Authority</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-bold text-[#102d4d]">
                      Suite F: Residential &amp; Transport
                    </td>
                    <td className="px-3 py-2.5 text-[#15803d] font-semibold">
                      Super Administrator
                    </td>
                    <td className="px-3 py-2.5">Emergency Fleet Dispatch</td>
                    <td className="px-3 py-2.5">Chief Warden / VC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SESSIONS & SECURITY */}
        {activeTab === "sessions" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-['Public_Sans'] text-[15px] font-bold text-[#102d4d]">
                  Active Administrative Sessions &amp; Device Governance
                </h3>
                <p className="mt-0.5 font-['Inter'] text-[11.5px] text-[#596979]">
                  Per FR-GEN-08, every session is tracked and audited with source
                  IP and cryptographic tokens.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="inline-flex h-[34px] items-center gap-1.5 self-start rounded-lg bg-[#b91c1c] px-3.5 font-['Inter'] text-[11.5px] font-bold text-white shadow-sm hover:bg-[#dc2626]"
              >
                Terminate Current Session
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex flex-col justify-between gap-3 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-3.5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#16a34a] text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Public_Sans'] text-[13px] font-bold text-[#102d4d]">
                        Current Device (Local Network / Wi-Fi)
                      </span>
                      <span className="rounded bg-[#16a34a] px-1.5 py-0.2 text-[9.5px] font-extrabold text-white">
                        THIS SESSION
                      </span>
                    </div>
                    <p className="font-['Inter'] text-[11px] text-[#475569] mt-0.5">
                      IP: 192.168.1.20 (Port 3000) • Authenticated via Local
                      Network Gateway
                    </p>
                  </div>
                </div>

                <span className="font-['Inter'] text-[11px] font-bold text-[#15803d]">
                  ● Active Now
                </span>
              </div>

              <div className="flex flex-col justify-between gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3.5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F2744] text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-['Public_Sans'] text-[13px] font-bold text-[#102d4d]">
                      VC Secretariat Desktop (Patiala Admin Block)
                    </span>
                    <p className="font-['Inter'] text-[11px] text-[#475569] mt-0.5">
                      IP: 10.4.12.8 • Punjab SWAN Intranet Fibre Node
                    </p>
                  </div>
                </div>

                <span className="font-['Inter'] text-[11px] font-medium text-[#64748b]">
                  Last active: 2 hours ago
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          LOG OUT CONFIRMATION MODAL
          ======================================================== */}
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-[420px] rounded-xl border border-[#d9e2ee] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-['Public_Sans'] text-[16px] font-bold text-[#102d4d]">
                  Terminate Administrative Session?
                </h3>
                <p className="mt-1 font-['Inter'] text-[12px] leading-relaxed text-[#596979]">
                  Are you sure you want to log out of the <strong>Executive VC / Dean</strong> apex authority account? All unsaved approvals will be securely persisted in the draft register.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 border-t border-[#e5e9ee] pt-3.5">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="h-[34px] rounded-lg border border-[#cbd5e1] bg-white px-4 font-['Inter'] text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex h-[34px] items-center gap-1.5 rounded-lg bg-[#b91c1c] px-4 font-['Inter'] text-[12px] font-bold text-white shadow-sm hover:bg-[#dc2626] transition-all disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing Out...</span>
                  </>
                ) : (
                  <span>Yes, Log Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
