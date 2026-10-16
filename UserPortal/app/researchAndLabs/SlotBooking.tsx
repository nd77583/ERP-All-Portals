"use client";

import { Circle, CircleAlert, Lock } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const slotBookingMockData = {
  facilityOptions: [
  "Comprehensive Biomechanical Sprint Profile",
  "Cardiorespiratory VO₂ Max & Ventilatory Threshold",
  "Biodex Multi-Joint Isokinetic Quadriceps/Hamstrings",
  "Normobaric Hypoxic Chamber Conditioning",
  ],
};
const isCompleteSlotBooking = (value: typeof slotBookingMockData) =>
  Boolean(value && Array.isArray(value.facilityOptions) && value.facilityOptions.length > 0);

const initialForm = {
  investigator: "",
  affiliation: "",
  facility: "",
  slotDate: "",
  athleteCount: "",
  email: "",
  protocol: "",
};

const validateForm = (values: typeof initialForm) => {
  const errors: Partial<Record<keyof typeof initialForm, string>> = {};

  Object.entries(values).forEach(([key, value]) => {
    const trimmed = String(value).trim();
    if (!trimmed) {
      errors[key as keyof typeof initialForm] = "This field is required";
    }
  });

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (values.athleteCount && Number(values.athleteCount) <= 0) {
    errors.athleteCount = "Enter a number greater than 0";
  }

  return errors;
};

const SlotBooking = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { facilityOptions } = useSectionApi(
    "researchAndLabs",
    "slotBooking",
    slotBookingMockData,
    isCompleteSlotBooking,
  );

  return (
    <section className="w-full min-w-0 bg-[#E5EEFF] px-4 py-6 sm:px-5 md:px-6 lg:px-8">
      <div className="grid w-full min-w-0 gap-6 lg:grid-cols-[1.15fr_1fr] xl:gap-8">
        <div className="min-w-0 rounded-[10px] bg-[#F3F7FF] p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
              <Circle size={10} className="fill-[#00A86B] text-[#00A86B]" />
              CENTRAL RESEARCH FACILITY (CRF)
            </span>
            <h3 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.06em] text-[#001229] md:text-[2.2rem]">
              Equipment Slot Booking &amp; Testing Tariffs
            </h3>
            <p className="max-w-[760px] text-[0.92rem] leading-[1.6] text-[#44474D]">
              MBSPSU&apos;s laboratory instrumentation is accessible to national sports
              federations, state Olympic associations, SAI academies, and external
              doctoral scholars under the Punjab State Open Science Directives.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            {[
              {
                title: "Comprehensive Biomechanical Sprint Profile",
                subtitle: "16 Vicon 3D + 2 Force Plates + 16-ch EMG",
                price: "₹7,500",
                unit: "per athlete / session",
              },
              {
                title: "Cardiorespiratory VO₂ Max & Ventilatory Threshold",
                subtitle: "Cosmed K5 metabolic cart + Capillary Lactate curve",
                price: "₹4,200",
                unit: "per athlete / session",
              },
              {
                title: "Biodex Multi-Joint Isokinetic Quadriceps/Hamstrings",
                subtitle: "ACL return-to-play profile + Bilateral asymmetry report",
                price: "₹3,800",
                unit: "per joint evaluation",
              },
              {
                title: "Normobaric Hypoxic Chamber Conditioning",
                subtitle: "Simulated altitude training (up to 4,500m)",
                price: "₹12,000",
                unit: "10-session team block",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start justify-between gap-2 rounded-[8px] border border-[#D6E0F2] bg-white px-3 py-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <span className="block text-[0.9rem] font-bold leading-[1.4] tracking-[-0.02em] text-[#001229]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.75rem] leading-[1.45] text-[#44474D]">
                    {item.subtitle}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block text-[1.05rem] font-bold leading-[1.2] tracking-[-0.04em] text-[#001229]">
                    {item.price}
                  </span>
                  <span className="block text-[0.62rem] font-bold uppercase tracking-[0.4px] text-[#44474D]">
                    {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

        <div className="mt-5 flex min-w-0 items-start gap-2 rounded-[8px] border border-[#E4DBB5] bg-[#FDF7DF] px-3 py-2">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#904D00]" />
            <span className="text-[0.7rem] leading-[1.5] text-[#44474D]">
              Subsidized academic tariffs (50% fee concession) apply to registered
              MBSPSU and Punjab State University Ph.D. scholars upon submitting
              Dean&apos;s endorsement.
            </span>
          </div>
        </div>

        <div className="min-w-0 rounded-[12px] border border-[#D9E1EB] bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5">
          <Formik
            initialValues={initialForm}
            validate={validateForm}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              localStorage.setItem(
                "slot-booking-request",
                JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
              );
              setSuccessMessage(
                "Slot requisition submitted successfully. CRF review has been queued.",
              );
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5" noValidate>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
                    AUTOMATED REQUISITION
                  </span>
                  <h3 className="text-[1.7rem] font-bold leading-[1.15] tracking-[-0.06em] text-[#001229]">
                    Schedule Equipment Slot
                  </h3>
                  <p className="text-[0.76rem] leading-[1.5] text-[#44474D]">
                    Fill details for institutional CRF nodal officer clearance.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="investigator"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Investigator / Coach Name
                    </label>
                    <Field
                      id="investigator"
                      name="investigator"
                      type="text"
                      placeholder="e.g., Satnam Singh"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none placeholder:text-[#8A93A5]"
                    />
                    <ErrorMessage
                      name="investigator"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="affiliation"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Affiliated Institution / Federation
                    </label>
                    <Field
                      id="affiliation"
                      name="affiliation"
                      type="text"
                      placeholder="e.g., Athletics Federation of India"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none placeholder:text-[#8A93A5]"
                    />
                    <ErrorMessage
                      name="affiliation"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="facility"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Laboratory Facility
                    </label>
                    <Field
                      as="select"
                      id="facility"
                      name="facility"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none"
                    >
                      <option value="">Select Facility...</option>
                      {facilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="facility"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="slotDate"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Intended Slot Date
                    </label>
                    <Field
                      id="slotDate"
                      name="slotDate"
                      type="date"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none"
                    />
                    <ErrorMessage
                      name="slotDate"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="athleteCount"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Cohort Athlete Count
                    </label>
                    <Field
                      id="athleteCount"
                      name="athleteCount"
                      type="number"
                      min="1"
                      placeholder="1-25 Athletes"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none placeholder:text-[#8A93A5]"
                    />
                    <ErrorMessage
                      name="athleteCount"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                    >
                      Official Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="coach@sportsfed.org"
                      className="w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none placeholder:text-[#8A93A5]"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[10px] text-[#C73E3E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="protocol"
                    className="block text-[10px] font-bold uppercase tracking-[0.4px] text-[#0B1C30]"
                  >
                    Testing Protocol Synopsis &amp; Primary Variables
                  </label>
                  <Field
                    as="textarea"
                    id="protocol"
                    name="protocol"
                    placeholder="Briefly describe trial methodology, sport discipline, and measurement goals..."
                    className="min-h-[90px] w-full rounded-[4px] border border-[#D7E4FB] bg-[#EEF4FF] px-3 py-2 text-[0.8rem] text-[#001229] outline-none placeholder:text-[#8A93A5]"
                  />
                  <ErrorMessage
                    name="protocol"
                    component="span"
                    className="text-[10px] text-[#C73E3E]"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-[#E7EDF6] pt-4 sm:flex-row sm:items-center">
                  <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-[#44474D]">
                    <Lock size={16} strokeWidth={2.2} className="text-[#0F2744]" />
                    Protected SSL Requisition
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-[4px] bg-[#904D00] px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.3px] text-white shadow-[0_8px_18px_rgba(144,77,0,0.18)] transition hover:bg-[#7B3F00] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Slot Requisition"}
                  </button>
                </div>

                {successMessage && (
                  <div className="rounded-[4px] border border-[#BEE6C9] bg-[#ECFDF5] px-3 py-2 text-[0.72rem] font-medium text-[#0F5132]">
                    {successMessage}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SlotBooking;
