"use client";

import React, { useState, useEffect, useRef } from "react";

interface AddStudentProps {
  onClose: () => void;
}

export default function AddStudent({ onClose }: AddStudentProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [autoSaveTime, setAutoSaveTime] = useState<string>("42s ago");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Checkbox states for Section 4
  const [nadaConsent, setNadaConsent] = useState<boolean>(true);
  const [ethicsPledge, setEthicsPledge] = useState<boolean>(true);

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Demographics & Identity
    fullName: "",
    aadhaarMatchName: "",
    aadhaarUid: "",
    digiLockerToken: "DL-PB-9941",
    apaarId: "",
    dob: "",
    gender: "",
    admissionQuota: "",
    fatherName: "",
    emergencyContact: "",
    permanentAddress: "",

    // Section 2: Athletic Profiling
    primaryDiscipline: "",
    subEvent: "",
    performanceTier: "",
    height: "",
    weight: "",
    bloodGroup: "",
    saiAfiRegNo: "",
    assignedCoach: "",

    // Section 3: Academic Programme & NEP-2020
    degreeProgramme: "",
    intakeCycle: "",
    allocatedRollNo: "",
    nepMinorElective: "",
    meritIndex: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setAutoSaveTime("Just now");
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessToast(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const scrollToSection = (stepId: number) => {
    setActiveStep(stepId);
    const element = document.getElementById(`onboarding-section-${stepId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll Spy to highlight the top option tab corresponding to current visible section
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [1, 2, 3, 4];
      for (const id of sectionIds) {
        const el = document.getElementById(`onboarding-section-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveStep(id);
            break;
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Close side drawer overlay"
      />

      {/* RIGHT SIDE DRAWER CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full max-w-4xl h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 overflow-y-auto text-slate-800 transition-transform duration-300"
      >

        {/* TOP HEADER BAR */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 border border-amber-500/30 text-amber-400 p-2 sm:p-2.5 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Student-Athlete Master Onboarding
                </h1>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase font-mono">
                  SUITE A + FR-SIS-01
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1 mt-0.5">
                Statutory Protocol MBSPSU/SIS/REG-2025-26 · Sovereign State Sports Command Ledger
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
            <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-full border border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Draft Auto-saved {autoSaveTime}</span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close drawer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* SUB-HEADER PROTOCOL STATUS BAR */}
        <div className="bg-slate-100/90 px-4 sm:px-6 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-700 font-semibold font-mono sticky top-[69px] z-20">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500 font-normal">TEMP RECORD:</span>
              <span className="bg-slate-900 text-slate-100 px-2 py-0.5 rounded font-mono font-bold tracking-wide">
                {formData.allocatedRollNo ? formData.allocatedRollNo : "REG-2026-ATH-0842"}
              </span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1 text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300/70">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              DigiLocker API Connected
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300/70">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Biometric Enrolment Ready
            </span>
          </div>
          <div className="text-slate-600 font-medium bg-slate-200/80 px-2 py-0.5 rounded">
            2-Tier Registrar DSC Req.
          </div>
        </div>

        {/* STEP NAVIGATION TABS BAR (AUTO-HOVER / HIGHLIGHTS BASED ON CURRENT SCROLL) */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 overflow-x-auto border-b border-slate-200 bg-slate-50/90 scrollbar-none sticky top-[101px] z-20 backdrop-blur-xs">
          {[
            { id: 1, label: "1 Demographics & Identity" },
            { id: 2, label: "2 Athletic Profiling" },
            { id: 3, label: "3 Academics & CBCS" },
            { id: 4, label: "4 Statutory Undertakings" }
          ].map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => scrollToSection(step.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${isActive
                    ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/20 scale-105 font-bold"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>

        {/* MAIN FORM CONTENT */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8 bg-slate-50/40 flex-1">

          {/* ==================== SECTION 1: Personal Demographics ==================== */}
          <div id="onboarding-section-1" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">

            {/* SECTION HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
                  </svg>
                </span>
                <h2>1. Personal Demographics & Statutory Identity</h2>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-wider self-start sm:self-auto">
                FR-SIS-01 UIDAI COMPLIANT
              </span>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Full Legal Name (As per Matriculation / Passport) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                placeholder="Gurpreet Singh Gill"
                required
              />
              <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Matched with Aadhaar Name: <span className="font-semibold text-slate-700">{formData.fullName ? formData.fullName.toUpperCase() : "GURPREET SINGH"}</span>
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-300/80 rounded-xl p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-2.5 w-full md:w-auto">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">
                      Aadhaar UIDAI Authenticated
                    </span>
                    <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                      E-KYC VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                    UID: **** **** 4912 · DigiLocker Token #DL-PB-9941
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-emerald-200">
                <span className="block text-[9px] font-bold tracking-wider text-slate-500 font-mono uppercase">
                  APAAR / ABC ACADEMIC ID (12-DIGIT)
                </span>
                <input
                  type="text"
                  name="apaarId"
                  value={formData.apaarId}
                  onChange={handleChange}
                  className="text-base font-black font-mono text-slate-900 tracking-widest bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-2xs mt-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 text-center"
                  placeholder="8492-0193-4819"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  required
                />
                <p className="text-[10px] text-slate-500 font-medium">
                  Verified Age: 20 Yrs (Eligible for U-21)
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Gender Identity <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                  required
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male (Men's Athletics Squad)">Male (Men&apos;s Athletics Squad)</option>
                  <option value="Female (Women's Athletics Squad)">Female (Women&apos;s Athletics Squad)</option>
                  <option value="Non-Binary / Athlete Unified">Non-Binary / Athlete Unified</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Statutory Admission Quota <span className="text-red-500">*</span>
                </label>
                <select
                  name="admissionQuota"
                  value={formData.admissionQuota}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                  required
                >
                  <option value="">-- Select Admission Quota --</option>
                  <option value="Punjab State Resident 85% Quota">Punjab State Resident 85% Quota</option>
                  <option value="All India Open Category 15% Quota">All India Open Category 15% Quota</option>
                  <option value="SAI High Performance Direct Entry">SAI High Performance Direct Entry</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Father / Guardian Full Legal Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="S. Sukhwinder Singh Gill"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Registered Contact & Emergency Mobile
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 pr-28 text-xs font-semibold text-slate-900 transition-all outline-none"
                    placeholder="+91 98721 44589"
                  />
                  <span className="absolute right-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    WhatsApp Live
                  </span>
                </div>
              </div>
            </div>

            {/* Permanent Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Permanent Domicile Address (State Revenue Record)
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                placeholder="VPO Chhapar, Tehsil Dakha, District Ludhiana, Punjab -141102"
              />
            </div>

          </div>

          <div id="onboarding-section-2" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h2>2. Athletic Discipline & High-Performance Profiling</h2>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-wider self-start sm:self-auto">
                FR-ATH-01 HIGH PERFORMANCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Primary Olympic / SAI Discipline <span className="text-red-500">*</span>
                </label>
                <select
                  name="primaryDiscipline"
                  value={formData.primaryDiscipline}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                >
                  <option value="">-- Select Primary Discipline --</option>
                  <option value="Athletics - Track & Hurdles">Athletics - Track & Hurdles</option>
                  <option value="Boxing & Combat Sports">Boxing & Combat Sports</option>
                  <option value="Swimming & Aquatics">Swimming & Aquatics</option>
                  <option value="Weightlifting & Power">Weightlifting & Power</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Specific Sub-Event / Event Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subEvent"
                  value={formData.subEvent}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="400m Hurdles & 4x400m Relay"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Performance Tier & Govt Scholarship <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="performanceTier"
                  value={formData.performanceTier}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="Khelo India Youth Games (Gold Medalist)"
                />
              </div>
            </div>

            {/* ATHLETE STATS / METRICS ROW (ARM WINGSPAN AND DOMINANT STANCE REMOVED) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center">
                <span className="block text-[9px] font-bold text-slate-500 tracking-wider">STATURE / HEIGHT</span>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full text-center text-xs font-black text-slate-900 bg-transparent outline-none mt-0.5"
                  placeholder="188.5 cm"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center">
                <span className="block text-[9px] font-bold text-slate-500 tracking-wider">BODY MASS (KG)</span>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full text-center text-xs font-black text-slate-900 bg-transparent outline-none mt-0.5"
                  placeholder="74.2 kg"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center">
                <span className="block text-[9px] font-bold text-slate-500 tracking-wider">BLOOD GROUP</span>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full text-center text-xs font-black text-slate-900 bg-transparent outline-none mt-0.5"
                  placeholder="O+ Positive"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  SAI / Athletics Federation of India (AFI) Reg #
                </label>
                <input
                  type="text"
                  name="saiAfiRegNo"
                  value={formData.saiAfiRegNo}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-bold font-mono text-slate-900 transition-all outline-none"
                  placeholder="AFI-PUN-2024-98214"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Chief High-Performance Coach Assigned
                </label>
                <input
                  type="text"
                  name="assignedCoach"
                  value={formData.assignedCoach}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="Dronacharya Awardee J.S. Bhatia (Sprint Track)"
                />
              </div>
            </div>

          </div>

          <div id="onboarding-section-3" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </span>
                <h2>3. Academic Programme, CBCS & NEP-2020 Allocation</h2>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-wider self-start sm:self-auto">
                FR-ACAD-01 NEP-ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Degree Programme <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degreeProgramme"
                  value={formData.degreeProgramme}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="Bachelor of Physical Education & Sports (B.P.E.S)"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Academic Intake Cycle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="intakeCycle"
                  value={formData.intakeCycle}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="AY 2025-26 • Semester 1 (Autumn)"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Allocated University Roll Number
                </label>
                <input
                  type="text"
                  name="allocatedRollNo"
                  value={formData.allocatedRollNo}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-extrabold font-mono text-slate-900 transition-all outline-none"
                  placeholder="2025-BPES-0418"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
              <div className="md:col-span-7 space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  NEP-2020 Minor / Discipline-Specific Elective
                </label>
                <input
                  type="text"
                  name="nepMinorElective"
                  value={formData.nepMinorElective}
                  onChange={handleChange}
                  className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 text-xs font-semibold text-slate-900 transition-all outline-none"
                  placeholder="DSE-102: Sports Nutrition & Ergogenic Kinanthropometry"
                />
              </div>

              <div className="md:col-span-5 space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Matriculation / 10+2 Merit Index
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="meritIndex"
                    value={formData.meritIndex}
                    onChange={handleChange}
                    className="w-full bg-blue-50/50 border border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-2.5 pr-24 text-xs font-semibold text-slate-900 transition-all outline-none"
                    placeholder="88.40% (PSEB Punjab Board)"
                  />
                  <span className="absolute right-2 bg-slate-900 text-emerald-400 font-mono text-[9px] font-black px-2 py-0.5 rounded tracking-wider">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ==================== SECTION 4: Statutory Legal Undertakings ==================== */}
          <div id="onboarding-section-4" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                <span className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <h2>4. Statutory Legal Undertakings & Anti-Doping Vault</h2>
              </div>
              <span className="text-[10px] font-bold font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 tracking-wider self-start sm:self-auto">
                FR-GRV-04 / UGC / NADA TIER-1
              </span>
            </div>

            {/* ANTI RAGGING BANNER */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">
                    National Anti-Ragging Affidavit (UGC Mandatory Protocol)
                  </h3>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                    Reference Token: AR-2025-UGC-99120 • Digitally Signed via e-Gov OTP
                  </p>
                </div>
              </div>

              <span className="bg-slate-900 text-emerald-400 font-mono text-[9px] font-black px-2.5 py-1 rounded tracking-wider uppercase self-start sm:self-auto shrink-0">
                AFFIDAVIT FILED
              </span>
            </div>

            {/* UNDERTAKING CHECKBOXES */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-all">
                <input
                  type="checkbox"
                  checked={nadaConsent}
                  onChange={(e) => setNadaConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">National Anti-Doping Agency (NADA) Whereabouts & In-Competition Testing Consent:</strong> I hereby declare unconditional compliance with WADA/NADA Code 2021, biological passport monitoring, and immediate notification of all Therapeutic Use Exemptions (TUE).
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-all">
                <input
                  type="checkbox"
                  checked={ethicsPledge}
                  onChange={(e) => setEthicsPledge(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">MBSPSU Elite Dual-Career & Code of Athletic Ethics:</strong> I pledge solemn allegiance to fair play, zero tolerance of spot-fixing, strict anti-hazing discipline, and maintenance of CBCS minimum 75% academic engagement.
                </span>
              </label>
            </div>

          </div>

          {/* ACTION BUTTONS FOOTER BAR */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-30 shadow-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              Discard Registration
            </button>

            <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {isSaving ? "Saving..." : "Save Working Draft"}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Dossier (PDF)
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-slate-950 hover:bg-slate-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Register Athlete & Issue Smart UID</span>
              </button>
            </div>
          </div>

        </form>

        {/* TOAST NOTIFICATION ON SUBMIT */}
        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 z-50 animate-bounce">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold">Student Master Record Created!</p>
              <p className="text-[11px] text-slate-400">
                {formData.fullName ? `${formData.fullName} onboarded successfully.` : "Athlete registered & Smart UID issued successfully."}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
