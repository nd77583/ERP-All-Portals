"use client";

import { Bell, CircleCheck, QrCode, Send } from "lucide-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  submitAdmissionLead,
} from "../api/Dashboard/frontDeskApi";
import { fetchSectionApi } from "@/lib/useSectionApi";

type Option = { id: number; name: string };

type Options = {
  programmes: Option[];
  sports: Option[];
  achievementLevels: Option[];
  states: Option[];
  accommodations: Option[];
  academicYears: Option[];
};

type FormValues = {
  candidateName: string;
  mobileNumber: number;
  email: string;
  programmeId: number;
  sportDisciplineId: number;
  highestAchievementLevelId: number;
  domicileStateUT: number;
  campusAccommodationId: number;
  academicYearId: number;
};

type AdmissionContacts = {
  hotlineTitle: string;
  hotlineNumber: string;
  tollFreeNumber: string;
  deskEmailTitle: string;
  email: string;
  deskWing: string;
};

type FrontDeskCopy = {
  complianceBadgeText: string;
  sectionHeading: string;
  sectionDescription: string;
  visitCardTitle: string;
  visitCardSubtitle: string;
  visitComplianceCode: string;
  protocolTitle: string;
  qrDeliveryMessage: string;
  issuePassButtonLabel: string;
  securityCheckItems: string[];
  confirmationMessage: string;
  confirmationSlaText: string;
};
type FrontDeskApiOptions = Omit<Options, "academicYears">;
type FrontDeskContent = { options: FrontDeskApiOptions; contacts: AdmissionContacts; content: FrontDeskCopy };

const MOCK_OPTIONS: Options = {
  programmes: [
    { id: 1, name: "B.P.Ed" },
    { id: 2, name: "M.P.Ed" },
    { id: 3, name: "B.Sc Sports Science" },
  ],
  sports: [
    { id: 1, name: "Archery" },
    { id: 2, name: "Badminton" },
    { id: 3, name: "Basketball" },
    { id: 4, name: "Boxing" },
    { id: 5, name: "Chess" },
    { id: 6, name: "Cricket" },
    { id: 7, name: "Cycling" },
    { id: 8, name: "Football" },
    { id: 9, name: "Gymnastics" },
    { id: 10, name: "Hockey" },
    { id: 11, name: "Kabaddi" },
    { id: 12, name: "Swimming" },
    { id: 13, name: "Table Tennis" },
    { id: 14, name: "Tennis" },
    { id: 15, name: "Volleyball" },
    { id: 16, name: "Wrestling" },
  ],
  achievementLevels: [
    { id: 1, name: "School Level" },
    { id: 2, name: "District Level" },
    { id: 3, name: "State Level" },
    { id: 4, name: "National Level" },
    { id: 5, name: "International Level" },
  ],
  states: [
    { id: 1, name: "Haryana" },
    { id: 2, name: "Punjab" },
    { id: 3, name: "Delhi" },
    { id: 4, name: "Himachal Pradesh" },
    { id: 5, name: "Rajasthan" },
    { id: 6, name: "Uttar Pradesh" },
  ],
  accommodations: [
    { id: 1, name: "Residential Hall Required (Major Dhyan Chand Hall)" },
    { id: 2, name: "Day Scholar" },
  ],
  academicYears: [],
};

const getCurrentAcademicYear = (): Option => {
  const currentYear = new Date().getFullYear();
  const academicYearStart = currentYear - 1;
  return {
    id: academicYearStart,
    name: `${academicYearStart}-${String(currentYear).slice(-2)}`,
  };
};

const MOCK_ADMISSION_CONTACTS: AdmissionContacts = {
  hotlineTitle: "Admissions Hotline",
  hotlineNumber: "+91 (0175) 2920200",
  tollFreeNumber: "Toll-Free: 1800-180-2019",
  deskEmailTitle: "Desk Email",
  email: "admissions@mbspsu.ac.in",
  deskWing: "Front Desk Wing A",
};

const MOCK_FRONT_DESK_COPY: FrontDeskCopy = {
  complianceBadgeText: "FR-FD-01 TO FR-FD-07 COMPLIANT",
  sectionHeading: "Central Front Desk, Admissions CRM & Visitor Desk",
  sectionDescription: "Submit prospective student enquiries or pre-register for university campus visits. Submissions directly feed the university's central CRM queue with automated SMS and WhatsApp tracking acknowledgment.",
  visitCardTitle: "Pre-Register Campus Visit",
  visitCardSubtitle: "Instant Gate-Pass for Mohindra Kothi & NIS Campus",
  visitComplianceCode: "FR-FD-03",
  protocolTitle: "Security Gate Desk Protocol",
  qrDeliveryMessage: "Instant SMS QR Delivery on Submission",
  issuePassButtonLabel: "Issue Pass",
  securityCheckItems: ["SMS Gate Notification", "WhatsApp ERP Bot", "Biometric Tagging"],
  confirmationMessage: "Instant confirmation dispatched via NIC SMS Gateway & Official WhatsApp CRM API.",
  confirmationSlaText: "SLA: < 30s",
};

const labelClass =
  "block text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]";
const inputClass =
  "w-full rounded-[8px] border border-[#D5DDEB] bg-[#F5F8FF] px-3 py-2.5 text-[12px] text-[#001229] outline-none placeholder:text-[#7B8498]";
const errorClass = "text-[11px] text-red-600";

const validate = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.candidateName.trim()) errors.candidateName = "Name is required";
  if (!/^[6-9]\d{9}$/.test(String(values.mobileNumber)))
    errors.mobileNumber = "Enter a valid 10-digit mobile number";
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email address";
  if (!values.programmeId) errors.programmeId = "Select a programme";
  if (!values.sportDisciplineId) errors.sportDisciplineId = "Select a sport";
  if (!values.highestAchievementLevelId)
    errors.highestAchievementLevelId = "Select highest level";
  if (!values.domicileStateUT) errors.domicileStateUT = "Select a state / UT";
  return errors;
};

const FrontDesk = () => {
  const [options, setOptions] = useState<Options>(MOCK_OPTIONS);
  const [loadError, setLoadError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contacts, setContacts] = useState<AdmissionContacts>(MOCK_ADMISSION_CONTACTS);
  const [copy, setCopy] = useState<FrontDeskCopy>(MOCK_FRONT_DESK_COPY);

  const formik = useFormik<FormValues>({
    initialValues: {
      candidateName: "",
      mobileNumber: 0,
      email: "",
      programmeId: 0,
      sportDisciplineId: 0,
      highestAchievementLevelId: 0,
      domicileStateUT: 0,
      campusAccommodationId: 0,
      academicYearId: 0,
    },
    validate,
    onSubmit: () => {
      setSubmitMessage("");
      setShowConfirm(true);
    },
  });

  const handleNumberChange =
    (name: keyof FormValues, maxLength?: number) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let raw = e.target.value;
        if (maxLength) raw = raw.replace(/\D/g, "").slice(0, maxLength);
        formik.setFieldValue(name, raw === "" ? 0 : Number(raw));
      };

  useEffect(() => {
    const loadOptions = async () => {
      try {
        let data: FrontDeskContent = { options: MOCK_OPTIONS, contacts: MOCK_ADMISSION_CONTACTS, content: MOCK_FRONT_DESK_COPY };
        try {
          const response = await fetchSectionApi<Partial<FrontDeskContent>>("home", "frontDesk");
          const completeOptions = response.options;
          const completeContacts = response.contacts;
          if (completeOptions?.programmes?.length && completeOptions.sports?.length && completeOptions.achievementLevels?.length && completeOptions.states?.length && completeOptions.accommodations?.length && completeContacts?.hotlineTitle && completeContacts.hotlineNumber && completeContacts.tollFreeNumber && completeContacts.deskEmailTitle && completeContacts.email && completeContacts.deskWing && response.content && Object.keys(MOCK_FRONT_DESK_COPY).every((key) => {
            const value = response.content?.[key as keyof FrontDeskCopy];
            return Array.isArray(value) ? value.length > 0 : typeof value === "string" && value.trim().length > 0;
          })) {
            data = { options: completeOptions, contacts: completeContacts, content: response.content };
          }
        } catch {
          // The section's complete in-file mock stays active until a full API payload is available.
        }
        const academicYear = getCurrentAcademicYear();
        setOptions({ ...data.options, academicYears: [academicYear] });
        setContacts(data.contacts);
        setCopy(data.content);
        formik.setFieldValue("academicYearId", academicYear.id);
      } catch (err) {
        console.warn("Failed to load options:", err instanceof Error ? err.message : err);
        setLoadError("Could not load form options. Please refresh the page.");
      }
    };
    loadOptions();
  }, []);

  const handleConfirmSubmit = async () => {
    const values = formik.values;
    setSubmitting(true);
    try {
      await submitAdmissionLead(values);
      // clear the form but keep the academic year, then show success popup

      formik.resetForm({
        values: {
          ...formik.initialValues,
          academicYearId: values.academicYearId,
        },
      });
      setShowSuccess(true);
    } catch (err) {
      console.warn("Submit failed:", err instanceof Error ? err.message : err);

      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  const academicYearName =
    options.academicYears.find(
      (y) => Number(y.id) === Number(formik.values.academicYearId),
    )?.name ?? "";

  // finds the display name of the selected dropdown option
  const getName = (list: Option[], id: number) =>
    list.find((item) => Number(item.id) === Number(id))?.name || "Not selected";

  // every field shown in the confirmation popup
  const summary = [
    { label: "Candidate Name", value: formik.values.candidateName },
    { label: "Mobile Number", value: formik.values.mobileNumber },
    { label: "Email Address", value: formik.values.email },
    {
      label: "Programme of Interest",
      value: getName(options.programmes, formik.values.programmeId),
    },
    {
      label: "Primary Sport / Discipline",
      value: getName(options.sports, formik.values.sportDisciplineId),
    },
    {
      label: "Highest Achievement Level",
      value: getName(
        options.achievementLevels,
        formik.values.highestAchievementLevelId,
      ),
    },
    {
      label: "Domicile State / UT",
      value: getName(options.states, formik.values.domicileStateUT),
    },
    {
      label: "Campus Accommodation",
      value: getName(
        options.accommodations,
        formik.values.campusAccommodationId,
      ),
    },
    { label: "Academic Year", value: academicYearName || "Not selected" },
  ];

  // shows the error only after the field has been touched
  const showError = (name: keyof FormValues) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className={errorClass}>{formik.errors[name]}</p>
    ) : null;

  return (
    <section className="w-full bg-[#F8F9FF] px-4 py-5 sm:px-5 sm:py-6">
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-12">
        <div className="min-w-0 w-full rounded-[12px] border border-[#D9E3F3] bg-white p-4 sm:p-5 lg:p-6 lg:col-span-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="mb-4">
            <span className="text-[10px] font-bold tracking-[0.5px] text-[#2F1500] bg-[#FFDCC3] px-3 py-2 rounded-[2px]">
              {copy.complianceBadgeText}
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.34px] text-[#001229] sm:text-[24px] xl:text-[27px] 2xl:text-[30px]">
              {copy.sectionHeading}
            </h2>
          </div>

          <div className="mb-5">
            <p className="text-[13px] leading-[1.6] text-[#44474D]">
              {copy.sectionDescription}
            </p>
          </div>

          <div className="mb-5 overflow-hidden rounded-[12px] bg-[#001229]">
            <div className="flex flex-col items-start justify-between gap-3 px-3 py-3 sm:flex-row sm:items-center sm:px-4">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#0E2340]">
                  <QrCode className="h-5 w-5 text-[#FFDCC3]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-[-0.08px] text-[#F8F9FF] sm:text-[16px]">
                    {copy.visitCardTitle}
                  </h3>
                  <p className="text-[12px] text-[#B2C8ED]">
                    {copy.visitCardSubtitle}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-[4px] bg-[#0F2744] px-3 py-1">
                <span className="text-[12px] font-medium text-[#FFDCC3]">
                  {copy.visitComplianceCode}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-3 bg-[#0F2744] px-4 py-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#D4E3FF]">
                  {copy.protocolTitle}
                </span>
                <div className="mt-1 text-[13px] font-semibold text-[#F8F9FF]">
                  {copy.qrDeliveryMessage}
                </div>
              </div>
              <button
                type="button"
                className="rounded-[4px] bg-[#F6AE52] px-2 py-1 cursor-pointer hover:bg-[#ffb95d]"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.28px] text-[#001229]">
                  {copy.issuePassButtonLabel}
                </span>
              </button>
            </div>

            <div className="m-2 flex flex-col items-start gap-3 px-2 pb-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-[#4EDEA3]" />
                <span className="text-[10px] font-bold tracking-[0.5px] text-[#B2C8ED]">
                  {copy.securityCheckItems[0]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-[#4EDEA3]" />
                <span className="text-[10px] font-bold tracking-[0.5px] text-[#B2C8ED]">
                  {copy.securityCheckItems[1]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-[#4EDEA3]" />
                <span className="text-[10px] font-bold tracking-[0.5px] text-[#B2C8ED]">
                  {copy.securityCheckItems[2]}
                </span>
              </div>
            </div>
          </div>

          {contacts && (
            <div className="grid gap-3 border-t border-[#EDF1F5] p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
              <div className="min-w-0 bg-[#EFF4FF] p-4 rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#44474D]">
                  {contacts.hotlineTitle}
                </span>
                <div className="mt-1">
                  <span className="text-[12px] font-bold text-[#001229]">
                    {contacts.hotlineNumber}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[12px] text-[#44474D]">
                    {contacts.tollFreeNumber}
                  </span>
                </div>
              </div>

              <div className="min-w-0 bg-[#EFF4FF] p-4 rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#44474D]">
                  {contacts.deskEmailTitle}
                </span>
                <div className="mt-1 min-w-0">
                  <span className="block break-all text-[12px] font-bold text-[#001229]">
                    {contacts.email}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[12px] text-[#44474D]">
                    {contacts.deskWing}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 w-full rounded-[12px] border border-[#D9E3F3] bg-white p-4 sm:p-5 lg:p-6 lg:col-span-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <h3 className="text-[18px] font-bold tracking-[-0.2px] text-[#001229] sm:text-[20px] xl:text-[22px]">
                Online Admission &amp; Trials Lead Capture
              </h3>
              <p className="mt-2 text-[12px] text-[#44474D]">
                Fill details for instant counseling dossier and trial call-letters.
              </p>
            </div>

            <div className="shrink-0 rounded-[6px] bg-[#E9F0FF] px-2 py-1">
              <span className="text-[12px] font-bold text-[#001229]">
                {academicYearName ? `AY ${academicYearName}` : "AY"}
              </span>
            </div>
          </div>

          {loadError && <p className={`mb-3 ${errorClass}`}>{loadError}</p>}

          <form className="space-y-4 sm:space-y-5" onSubmit={formik.handleSubmit}>
            <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className={labelClass}>
                  Candidate / Athlete Full Name *
                </label>
                <input
                  type="text"
                  name="candidateName"
                  placeholder="e.g. Manpreet Singh"
                  value={formik.values.candidateName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />
                {showError("candidateName")}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>
                  Mobile Number (Whatsapp Enabled) *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="mobileNumber"
                  placeholder="e.g. 9876543210"
                  value={formik.values.mobileNumber || ""}
                  onChange={handleNumberChange("mobileNumber", 10)}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />
                {showError("mobileNumber")}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. athlete@domain.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />
                {showError("email")}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Programme of Interest *</label>
                <select
                  name="programmeId"
                  value={formik.values.programmeId || ""}
                  onChange={handleNumberChange("programmeId")}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select Degree / Course</option>
                  {options.programmes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {showError("programmeId")}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>
                  Primary Sport / Discipline *
                </label>
                <select
                  name="sportDisciplineId"
                  value={formik.values.sportDisciplineId || ""}
                  onChange={handleNumberChange("sportDisciplineId")}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select Primary Discipline</option>
                  {options.sports.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {showError("sportDisciplineId")}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>
                  Highest Achievement Level *
                </label>
                <select
                  name="highestAchievementLevelId"
                  value={formik.values.highestAchievementLevelId || ""}
                  onChange={handleNumberChange("highestAchievementLevelId")}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select Highest Level</option>
                  {options.achievementLevels.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {showError("highestAchievementLevelId")}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className={labelClass}>Domicile State / UT *</label>
                <select
                  name="domicileStateUT"
                  value={formik.values.domicileStateUT || ""}
                  onChange={handleNumberChange("domicileStateUT")}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select State / UT</option>
                  {options.states.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {showError("domicileStateUT")}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className={labelClass}>Campus Accommodation</label>
                <select
                  name="campusAccommodationId"
                  value={formik.values.campusAccommodationId || ""}
                  onChange={handleNumberChange("campusAccommodationId")}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select Accommodation</option>
                  {options.accommodations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-start justify-between gap-2 rounded-[10px] border border-[#E5EAF5] bg-[#F6F9FF] px-3 py-3 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex min-w-0 items-start gap-2 text-[#001229] sm:items-center">
                <Bell className="h-4 w-4 text-[#A56600]" />
                <span className="text-[11px] text-[#2A3A52]">
                  {copy.confirmationMessage}
                </span>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <span className="text-[11px] font-bold text-[#001229]">
                  {copy.confirmationSlaText}
                </span>
              </div>
            </div>

            {submitMessage && (
              <p className="text-[12px] text-red-600">{submitMessage}</p>
            )}

            <div className="mt-5">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#001229] px-3 py-3 text-white cursor-pointer hover:bg-[#011e43] disabled:opacity-60 disabled:cursor-not-allowed sm:gap-3 sm:px-4"
              >
                <Send className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                  {submitting
                    ? "Submitting..."
                    : `Submit Lead To Admissions Bureau${academicYearName ? ` (AY ${academicYearName})` : ""}`}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4">
          <div className="max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-[12px] bg-white p-4 sm:p-5">
            <div className="flex items-center gap-2 rounded-[8px] border border-[#F6AE52] bg-[#FFF4E0] px-3 py-3">
              <Bell className="h-5 w-5 shrink-0 text-[#A56600]" />
              <h3 className="text-[16px] font-bold text-[#2F1500]">
                Warning: check all details before submitting
              </h3>
            </div>

            <p className="mt-3 text-[13px] leading-[1.6] text-[#44474D]">
              Once submitted, your confirmation and gate-pass will be sent to the mobile number and email below. Please verify every field.
            </p>

            <div className="mt-4 divide-y divide-[#E5EAF5] rounded-[8px] border border-[#F6AE52] bg-[#FFFBF3]">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col justify-between gap-1 px-3 py-2 text-[12px] sm:flex-row sm:gap-4"
                >
                  <span className="font-bold uppercase tracking-[0.5px] text-[#44474D]">
                    {item.label}
                  </span>
                  <span className="text-right font-semibold text-[#001229]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="rounded-[8px] border border-[#D5DDEB] px-4 py-2 text-[12px] font-bold text-[#001229] cursor-pointer hover:bg-[#F5F8FF]"
              >
                Go Back &amp; Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={submitting}
                className="rounded-[8px] bg-[#001229] px-4 py-2 text-[12px] font-bold text-white cursor-pointer hover:bg-[#011e43] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4">
          <div className="w-full max-w-[380px] rounded-[12px] bg-white p-5 text-center sm:p-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E6FAF2]">
              <CircleCheck className="h-7 w-7 text-[#4EDEA3]" />
            </div>
            <h3 className="mt-3 text-[18px] font-bold text-[#001229]">
              Form submitted successfully
            </h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#44474D]">
              Your details have been sent to the Admissions Bureau. A confirmation will reach you shortly via SMS and WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-5 w-full rounded-[8px] bg-[#001229] px-4 py-2 text-[12px] font-bold text-white cursor-pointer hover:bg-[#011e43]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FrontDesk;
