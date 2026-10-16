"use client";

import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useSectionApi } from "@/lib/useSectionApi";

const viceChancellorMessageMockData = {
  profile: {
    image: "/about/VC.png",
    imageAlt: "Vice-Chancellor",
    office: "EXECUTIVE OFFICE",
    name: "Prof. (Dr.) Lt. Gen. J.S. Cheema",
    role: "Vice-Chancellor, MBSPSU Patiala",
    credentials: "AVSM, VSM (Retd.) • Ph.D. Sports Pedagogy",
  },
  communication: {
    badge: "EXECUTIVE COMMUNIQUÉ",
    reference: "Ref: MBSPSU/VC-COMM/2025/08",
    title:
      "Bridging Laboratory Biomechanics with International Podium Dominance",
    paragraphs: [
      "The establishment of MBSPSU marks a paradigm shift in how India cultivates sporting excellence. For decades, sporting prowess in Punjab relied on innate raw valor and rural vitality. Today, modern competitive sport demands high-resolution telemetry, data-driven kinesiology, and academic rehabilitation sciences.",
      "In strict compliance with National Education Policy (NEP-2020), MBSPSU has engineered sovereign credit frameworks that grant elite national athletes dual-career continuity. Our sports men and women will never again sacrifice their formal academic degree to wave the national tricolor in Olympic arenas.",
    ],
  },
  signature: {
    title: "Digital Signature Certified (DSC)",
    hash: "SHA-256: 8f40b2a98e1e7c9920b7a48d... • Punjab e-Office Gateway",
    authenticated: "Authenticated: 12-FEB-2025 09:30:15 IST",
  },
};

const isCompleteVcMessage = (val: typeof viceChancellorMessageMockData): boolean => {
  return Boolean(
    val &&
    val.profile &&
    typeof val.profile.name === "string" && val.profile.name.trim().length > 0 &&
    typeof val.profile.role === "string" &&
    val.communication &&
    typeof val.communication.title === "string" &&
    Array.isArray(val.communication.paragraphs) && val.communication.paragraphs.length > 0 &&
    val.signature &&
    typeof val.signature.title === "string"
  );
};

export default function ViceChancellorMessage() {
  const data = useSectionApi<typeof viceChancellorMessageMockData>(
    "about",
    "viceChancellorMessage",
    viceChancellorMessageMockData,
    isCompleteVcMessage
  );
  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="flex w-full min-w-0 flex-col items-center gap-6 rounded-[4px] bg-white p-4 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-6 md:flex-row md:items-start md:gap-8 md:p-7 lg:gap-[40px] lg:p-8">
        <div className="w-full max-w-[300px] md:w-[280px] lg:w-[320px] shrink-0 pt-[2px]">
          <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[4px] border border-[#D7DDE6] bg-[#F3E8D5] shadow-sm">
            <Image
              src={data.profile.image}
              alt={data.profile.imageAlt}
              width={300}
              height={360}
              className="h-[300px] w-full object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-[#001229E5] px-[10px] py-[8px] text-center text-[10px] font-bold uppercase tracking-[0.04em] text-white">
              {data.profile.office}
            </span>
          </div>
          <div className="mt-[16px] text-center">
            <span className="block text-[18px] sm:text-[20px] font-bold leading-[1.2] text-[#001229]">
              {data.profile.name}
            </span>
            <span className="mt-[8px] block text-[12px] font-semibold text-[#904D00]">
              {data.profile.role}
            </span>
            <span className="mt-[2px] block text-[12px] sm:text-[13px] font-medium text-[#44474D]">
              {data.profile.credentials}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-[4px]">
          <div className="flex flex-wrap items-center gap-[8px] sm:gap-[12px] text-[12px] font-medium text-[#001229]">
            <span className="rounded-[2px] bg-[#904D00] px-[8px] py-[5px] text-[10px] font-bold uppercase tracking-[0.04em] text-white">
              {data.communication.badge}
            </span>
            <span className="text-[12px] text-[#7A7F88] hidden sm:inline">
              |
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#44474D]">
              {data.communication.reference}
            </span>
          </div>
          <h2 className="mt-[14px] sm:mt-[16px] max-w-[830px] text-[22px] sm:text-[26px] md:text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-[#001229] break-words">
            “{data.communication.title}”
          </h2>
          <div className="mt-[16px] sm:mt-[18px] max-w-[860px] space-y-[14px] sm:space-y-[16px] text-[14px] sm:text-[15px] leading-[1.75] text-[#0B1C30]">
            {data.communication.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-[18px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-[4px] border border-[#DDE5F0] bg-[#EFF4FF] p-3 sm:px-[14px] sm:py-[12px]">
            <div className="flex items-center gap-[12px] min-w-0">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[4px] bg-[#0B3C2E]">
                <ShieldCheck className="h-[20px] w-[20px] text-[#6FFBBE] stroke-[3]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#001229]">
                  {data.signature.title}
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#44474D] truncate">
                  {data.signature.hash}
                </div>
              </div>
            </div>
            <div className="shrink-0 text-[10px] sm:text-[11px] font-medium text-[#44474D]">
              {data.signature.authenticated}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
