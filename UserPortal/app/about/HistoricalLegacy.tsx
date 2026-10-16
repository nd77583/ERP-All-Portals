"use client";

import { Medal } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSectionApi } from "@/lib/useSectionApi";

const historicalLegacyMockData = {
  milestones: [
    {
      year: "1911",
      description: "Captaincy of India's inaugural historic tour of England.",
    },
    {
      year: "1934",
      description:
        "Founding institutional donor of the Ranji Trophy tournament.",
    },
    {
      year: "2019",
      description: "Enactment of MBSPSU Punjab Act No. 11 by State Assembly.",
    },
  ],
  stories: [
    "Maharaja Bhupinder Singh was not merely a royal enthusiast; he transformed sports into institutional diplomacy. Under his patronage, the historic Patiala Polo Team dominated international circuits, and world-champion wrestler The Great Gama (Ghulam Mohammad Baksh) was trained and supported in the royal courts.",
    "His donation of the celebrated Ranji Trophy in 1934 immortalized the royal house's contribution to cricket. In 2019, the Government of Punjab formally sanctified this lineage by establishing MBSPSU at the historic Mohindra Kothi campus, converting royal sporting ethos into modern sovereign science.",
  ],
};

const isCompleteLegacy = (val: typeof historicalLegacyMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.milestones) && val.milestones.length > 0 &&
    Array.isArray(val.stories) && val.stories.length > 0
  );
};

const HistoricalLegacy = () => {
  const data = useSectionApi<typeof historicalLegacyMockData>(
    "about",
    "historicalLegacy",
    historicalLegacyMockData,
    isCompleteLegacy
  );
  return (
    <section className="w-full bg-[#F8F9FF] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#904D00]">
            A LIVING HERITAGE
          </span>
          <h2 className="mt-3 text-[24px] font-bold leading-[1.15] text-[#001229] sm:text-[30px] md:text-[36px] lg:text-[42px]">
            The Patiala Sporting Tradition &amp; Maharaja Bhupinder Singh
          </h2>
          <p className="mt-4 max-w-[1200px] text-[13px] leading-[1.8] text-[#44474D] md:text-[15px]">
            Patiala&apos;s legacy as the sporting capital of India is enshrined
            in the visionary patronage of Maharaja Bhupinder Singh (1891–1938),
            captain of the 1911 All-India cricket team, pioneer of the
            world-record Chail Cricket Ground, and founding benefactor of
            India&apos;s Olympic movement.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
          <div className="min-w-0 w-full lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <Medal
                size={20}
                strokeWidth={2.2}
                className="h-5 w-5 shrink-0 text-[#904D00]"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#904D00] md:text-[11px]">
                ARCHIVAL LINEAGE • 1911 TO 2025
              </span>
            </div>

            <div className="space-y-4 text-[13px] font-medium leading-[1.8] text-[#0B1C30] sm:space-y-5 md:text-[14px]">
              {data.stories.map((story) => (
                <p key={story}>{story}</p>
              ))}
            </div>

            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
              {data.milestones.map(
                ({ year, description }) => (
                  <article
                    key={year}
                    className="min-w-0 rounded-[2px] bg-[#EFF4FF] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
                  >
                    <span className="block text-[12px] font-bold text-[#904D00]">
                      {year}
                    </span>
                    <span className="mt-2 block text-[12px] leading-[1.5] text-[#44474D]">
                      {description}
                    </span>
                  </article>
                ),
              )}
            </div>
          </div>

          <div className="min-w-0 w-full lg:col-span-5">
            <div className="w-full overflow-hidden rounded-[4px] border border-[#D7DDE6] bg-[#F3E8D5] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
              <div className="relative">
                <Image
                  src="/about/history_image.png"
                  alt="History"
                  width={560}
                  height={420}
                  className="h-[240px] w-full object-cover sm:h-[300px] md:h-[340px]"
                />
                <span className="absolute right-3 top-3 rounded-[2px] bg-[#001229E5] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#FFFFFF] sm:px-3 sm:py-2">
                  MBSPSU ARCHIVES • PATIALA
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-[2px] bg-[#F5F6F8] p-3 sm:p-4">
              <span className="block text-[15px] font-bold leading-[1.4] text-[#001229] sm:text-[16px]">
                Mohindra Kothi: From Princely Seat to Apex University
              </span>
              <span className="mt-2 block text-[12px] leading-[1.7] text-[#44474D]">
                The grand Indo-Saracenic columns of Mohindra Kothi now house the
                apex statutory councils, research boards, and biomechanics data
                cores of the university.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricalLegacy;
