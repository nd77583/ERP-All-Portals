"use client";

import React, { useEffect, useState } from "react";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsBentoCard } from "@/lib/cms-types";

const defaultBentoCards: AdmissionsBentoCard[] = [
  {
    id: "bento-1",
    badge: "INTAKE CAPACITY",
    value: "480 Seats",
    subtitle: "6 UG & PG Disciplines across Sports Sciences",
    highlightText: "6 UG & PG Disciplines",
    icon: "/admissions/i1.png",
    progressPercent: 78,
    barColor: "#FE932C",
  },
  {
    id: "bento-2",
    badge: "DIRECT MEDALLIST QUOTA",
    value: "100% Waiver",
    subtitle: "International / Sr. National Podium",
    icon: "/admissions/i2.png",
    progressPercent: 100,
    barColor: "#4EDEA3",
  },
  {
    id: "bento-3",
    badge: "SCORING WEIGHTAGE",
    value: "60 : 40 Ratio",
    subtitle: "60% Physical Trials + 40% Academic Merit",
    highlightText: "60% Physical Trials",
    icon: "/admissions/i3.png",
    progressPercent: 60,
    secondaryPercent: 40,
    barColor: "#904D00",
    secondaryColor: "#0F2744",
  },
  {
    id: "bento-4",
    badge: "PHYSICAL TRIALS SLA",
    value: "AAHPER Standard",
    subtitle: "Biometric CCTV Track · Patiala Campus",
    icon: "/admissions/i4.png",
    progressPercent: 65,
    barColor: "#BA1A1A",
  },
];

const Bento = () => {
  const [cards, setCards] = useState<AdmissionsBentoCard[]>(defaultBentoCards);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.bento?.cards && admissions.bento.cards.length > 0) {
          setCards(admissions.bento.cards);
        }
      } catch {
        // Fallback gracefully to default
      }
    }
    loadData();
  }, []);

  return (
    <section className="box-border w-full px-5 pt-4 max-[560px]:px-3 max-[560px]:pt-3">
      <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-2.5">
        {cards.map((card) => {
          const isRed = card.barColor === "#BA1A1A" || card.value === "AAHPER Standard";
          return (
            <article
              key={card.id}
              className="box-border flex min-w-0 min-h-28 flex-col justify-between rounded bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,.05)] max-[560px]:min-h-[104px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover:border-[#D9E7FF]"
            >
              <header className="flex items-center justify-between">
                <span className="font-[Inter,sans-serif] text-[11px] font-bold leading-[14px] tracking-[.55px] text-[#44474D]">
                  {card.badge}
                </span>
                <img
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-[21px] w-[21px] object-contain"
                />
              </header>

              <div className="pt-2">
                <div
                  className={`whitespace-nowrap font-[Public_Sans,sans-serif] text-2xl font-bold leading-8 tracking-[-.36px] max-[560px]:text-[clamp(18px,6vw,24px)] ${
                    isRed ? "text-[#BA1A1A]" : "text-[#001229]"
                  }`}
                >
                  {card.value}
                </div>
                <div className="whitespace-nowrap font-[Public_Sans,sans-serif] text-xs leading-4 text-[#44474D] max-[560px]:whitespace-normal">
                  {card.highlightText ? (
                    <>
                      <strong className="text-[#002D1C]">{card.highlightText}</strong>{" "}
                      {card.subtitle.replace(card.highlightText, "").trim()}
                    </>
                  ) : (
                    card.subtitle
                  )}
                </div>
              </div>

              <div className="mt-2 flex h-1.5 overflow-hidden rounded-xl bg-[#EFF4FF]">
                <span
                  style={{
                    width: `${card.progressPercent}%`,
                    backgroundColor: card.barColor || "#FE932C",
                  }}
                  className="h-full"
                />
                {card.secondaryPercent && (
                  <span
                    style={{
                      width: `${card.secondaryPercent}%`,
                      backgroundColor: card.secondaryColor || "#0F2744",
                    }}
                    className="h-full"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Bento;