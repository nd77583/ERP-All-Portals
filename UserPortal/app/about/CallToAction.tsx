"use client";

import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { useSectionApi } from "@/lib/useSectionApi";

const callToActionMockData = {
  eyebrow: "ADMISSIONS & ACADEMIC INQUIRIES",
  title: "Begin Your Journey at India’s Apex Sports Citadel",
  description:
    "Applications are open for B.P.Ed, B.Sc Sports Science, M.P.Ed, and Ph.D. Sports Pedagogy programs for Academic Year 2025–26.",
  actions: [
    { label: "ADMISSIONS 2025-26", href: "#", type: "primary" },
    {
      label: "Toll Free: 1800-180-2019",
      href: "tel:18001802019",
      type: "phone",
    },
  ],
};

const isCompleteCta = (val: typeof callToActionMockData): boolean => {
  return Boolean(
    val &&
    typeof val.title === "string" &&
    typeof val.description === "string" &&
    Array.isArray(val.actions) && val.actions.length > 0
  );
};

export default function CallToAction() {
  const { eyebrow, title, description, actions } = useSectionApi<typeof callToActionMockData>(
    "about",
    "callToAction",
    callToActionMockData,
    isCompleteCta
  );
  return (
    <section className="w-full px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="flex w-full min-w-0 flex-col justify-between gap-5 rounded-[2px] bg-[#001229] p-4 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] lg:flex-row lg:items-center">
        <div className="flex min-w-0 max-w-[800px] flex-1 flex-col">
          <span className="text-[10px] font-bold uppercase text-[#FFDCC3]">
            {eyebrow}
          </span>
          <h3 className="mt-1 text-[20px] font-bold text-white sm:text-[24px]">
            {title}
          </h3>
          <span className="mt-1.5 text-[13px] text-[#D3E4FE]">
            {description}
          </span>
        </div>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-3 lg:w-auto lg:shrink-0">
          {actions.map((action) => (
            <Link
              key={action.type}
              href={action.href}
              className={
                action.type === "primary"
                  ? "max-w-full rounded-[2px] bg-[#904D00] px-4 py-2 text-center text-[12px] font-bold uppercase text-white hover:bg-[#b96401] sm:text-[13px]"
                  : "flex max-w-full items-center gap-2 rounded-[2px] bg-[#4A5F7F33] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#7999c841] sm:text-[13px]"
              }
            >
              {action.type === "phone" && (
                <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              )}
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
