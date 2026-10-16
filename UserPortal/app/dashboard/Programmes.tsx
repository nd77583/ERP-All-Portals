"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchSectionApi } from "@/lib/useSectionApi";
import type { HomeData } from "@/lib/cms-types";

const SLIDER_THRESHOLD = 3;
const PROGRAMME_FILTERS = [
  { label: "NEP 2020 Compliant", query: "NEP 2020" },
  { label: "NCTE Recognized", query: "NCTE" },
] as const;

export type Programme = {
  programmeType: string;
  duration: string;
  courseName: string;
  description: string;
  tags: string[];
  seats: string;
  facilities: string[];
  actionText: string;
  actionUrl: string;
};

const MOCK_PROGRAMMES: Programme[] = [
  {
    programmeType: "UG • NCTE APPROVED",
    duration: "2 Years (4 Sems)",
    courseName: "Bachelor of Physical Education (B.P.Ed)",
    description:
      "Rigorous pedagogical and practical conditioning framework preparing certified physical educators, physical trainers, and sports administrators.",
    tags: ["Athletic Pedagogy", "Gymnastics & Track", "Officiating"],
    seats: "Seats: 100 • 50% Sports Quota",
    facilities: ["Sports Lab", "Gymnasium", "Field Training"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
  {
    programmeType: "PG • HIGH PERFORMANCE",
    duration: "2 Years (4 Sems)",
    courseName: "M.Sc Sports Science & Biomechanics",
    description:
      "Advanced specialization in 3D kinematic analysis, force distribution modeling, sports nutrition, and Olympic-grade exercise physiology.",
    tags: ["3D Gait Kinematics", "VO2 Max Kinetics", "Ergonomics"],
    seats: "Seats: 40 • Vicon Lab Access",
    facilities: ["Biomechanics Lab", "Performance Analysis", "Nutrition Lab"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
  {
    programmeType: "UG • 4-YEAR HONOURS",
    duration: "4 Years (8 Sems)",
    courseName: "B.Sc (Hons) Sports Science",
    description:
      "Undergraduate program blending human anatomy, strength & conditioning, performance analytics, and anti-doping protocols.",
    tags: ["Strength & Conditioning", "WADA Protocols", "Renab"],
    seats: "Seats: 60 • Merit + Trials",
    facilities: ["Strength Lab", "Sports Medicine", "Athlete Monitoring"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
  {
    programmeType: "PG • MASTER'S TRACK",
    duration: "2 Years (4 Sems)",
    courseName: "Master of Physical Education (M.P.Ed)",
    description:
      "Advanced collegiate training in test measurement, sports psychology, institutional governance, and sports journalism.",
    tags: ["Sports Psychology", "Curriculum Design", "Measurement"],
    seats: "Seats: 40 • NCTE Approved",
    facilities: ["Research Center", "Psychology Lab", "Media Studio"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
  {
    programmeType: "DOCTORAL RESEARCH",
    duration: "3-5 Years",
    courseName: "Ph.D in Physical Education & Sports Science",
    description:
      "Fellowship-supported doctoral inquiry into sports genetics, performance engineering, sports biomechanics, and public health policies.",
    tags: ["UGC-JRF / SRF", "State Fellowship", "Lab Fellow"],
    seats: "Entrance Exam + Proposal",
    facilities: ["Research Lab", "Fellowship Support", "State Collaboration"],
    actionText: "Research Guidelines",
    actionUrl: "#",
  },
  {
    programmeType: "DIPLOMA • PROFESSIONAL",
    duration: "1 Year (2 Sems)",
    courseName: "PG Diploma in Sports Management & Analytics",
    description:
      "Targeted program covering league management, sponsorship valuation, player agency contracts, and venue operations for Khelo India / IPL ecosystem.",
    tags: ["League Ops", "Broadcast Media", "Finances"],
    seats: "Seats: 30 • Corporate Tie-ups",
    facilities: ["Event Ops", "Broadcast Lab", "Industry Mentors"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
  {
    programmeType: "DIPLOMA • PROFESSIONAL",
    duration: "1 Year (2 Sems)",
    courseName: "PG Diploma in Sports Management & Analytics",
    description:
      "Targeted program covering league management, sponsorship valuation, player agency contracts, and venue operations for Khelo India / IPL ecosystem.",
    tags: ["League Ops", "Broadcast Media", "Finances"],
    seats: "Seats: 30 • Corporate Tie-ups",
    facilities: ["Event Ops", "Broadcast Lab", "Industry Mentors"],
    actionText: "Curriculum & Apply",
    actionUrl: "#",
  },
];

const ProgrammeCard = ({ programme }: { programme: Programme }) => (
  <div className="flex h-full min-h-[300px] flex-col rounded-[12px] border border-[#dfe7f0] bg-white p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="rounded-[4px] bg-[#E5EEFF] px-2 py-1 text-[#001229]">
        <span className="text-[10px] font-bold uppercase tracking-[0.5px]">
          {programme.programmeType}
        </span>
      </div>
      <div>
        <span className="text-[12px] font-bold text-[#904D00]">
          {programme.duration}
        </span>
      </div>
    </div>

    <div className="mb-3">
      <h3 className="text-[20px] font-bold tracking-[-0.2px] text-[#001229]">
        {programme.courseName}
      </h3>
    </div>

    <div className="mb-3 min-h-[76px]">
      <p className="text-[12px] leading-[1.6] text-[#44474D]">
        {programme.description}
      </p>
    </div>

    <div className="mb-3 flex min-h-[28px] flex-wrap gap-2">
      {programme.tags.map((item) => (
        <div key={item} className="rounded-[4px] bg-[#DCE9FF] px-2 py-1">
          <span className="text-[10px] font-bold text-[#0B1C30]">{item}</span>
        </div>
      ))}
    </div>

    <div className="mb-3">
      <span className="text-[12px] font-medium text-[#44474D]">
        {programme.seats}
      </span>
    </div>

    <div className="mb-4 flex min-h-[20px] flex-wrap gap-1.5">
      {programme.facilities.map((facility) => (
        <span key={facility} className="text-[10px] text-[#44474D]">
          {facility}
        </span>
      ))}
    </div>

    <div className="mt-auto flex items-center justify-end border-t border-[#EDF1F5] pt-3">
      <Link
        href={programme.actionUrl}
        className="inline-flex items-center gap-2 text-[11px] font-bold text-[#001229]"
      >
        <span>{programme.actionText}</span>
        <ArrowRight size={18} strokeWidth={2.5} />
      </Link>
    </div>
  </div>
);

const Programmes = () => {
  const [programmes, setProgrammes] = useState<Programme[]>(MOCK_PROGRAMMES);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSectionApi<HomeData["programmes"]>("home", "programmes")
      .then((content) => {
        if (content.items?.length) {
          setProgrammes(content.items.filter((item) => item.isActive !== false).map((item) => ({
            programmeType: item.programmeType,
            duration: item.duration,
            courseName: item.courseName,
            description: item.description,
            tags: item.tags,
            seats: item.seats,
            facilities: item.facilities,
            actionText: item.actionText,
            actionUrl: item.actionUrl,
          })));
        }
      })
      .catch(() => setProgrammes(MOCK_PROGRAMMES));
  }, []);
  const filteredProgrammes = programmes.filter((programme) => {
    if (!selectedFilter) return true;

    const searchableText = [
      programme.programmeType,
      programme.duration,
      programme.courseName,
      programme.description,
      programme.tags.join(" "),
      programme.seats,
      programme.facilities.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(selectedFilter.toLowerCase());
  });
  const showSlider = filteredProgrammes.length > SLIDER_THRESHOLD;

  const getSliderMetrics = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const firstCard = slider.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard
      ? firstCard.offsetWidth + 14
      : slider.clientWidth || 1;
    const visibleCards = Math.max(1, Math.round(slider.clientWidth / cardWidth));
    const totalPages = Math.max(
      1,
      Math.ceil(filteredProgrammes.length / visibleCards),
    );
    const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    const firstOffset = firstCard?.offsetLeft ?? 0;
    const pageTargets = Array.from({ length: totalPages }, (_, pageIndex) => {
      const targetIndex = Math.min(pageIndex * visibleCards, slider.children.length - 1);
      const targetCard = slider.children.item(targetIndex) as HTMLElement | null;
      const rawTarget = targetCard
        ? targetCard.offsetLeft - firstOffset
        : pageIndex * cardWidth * visibleCards;

      return Math.min(rawTarget, maxScroll);
    });
    const currentIndex = pageTargets.reduce((closestIndex, target, index) => {
      const closestDistance = Math.abs(pageTargets[closestIndex] - slider.scrollLeft);
      const targetDistance = Math.abs(target - slider.scrollLeft);

      return targetDistance < closestDistance ? index : closestIndex;
    }, 0);

    return { slider, pageTargets, currentIndex, totalPages, maxScroll };
  }, [filteredProgrammes.length]);

  const checkSlider = useCallback(() => {
    const metrics = getSliderMetrics();
    if (!metrics) return;

    const { slider, currentIndex, totalPages, maxScroll } = metrics;

    setPageCount(totalPages);
    setCurrentPage(currentIndex);
    setCanPrev(slider.scrollLeft > 1);
    setCanNext(slider.scrollLeft < maxScroll - 1);
  }, [getSliderMetrics]);

  useEffect(() => {
    if (!showSlider) return;

    const frame = requestAnimationFrame(checkSlider);
    window.addEventListener("resize", checkSlider);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", checkSlider);
    };
  }, [showSlider, checkSlider]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      sliderRef.current?.scrollTo({ left: 0 });

      if (showSlider) {
        checkSlider();
        return;
      }

      setCurrentPage(0);
      setPageCount(1);
      setCanPrev(false);
      setCanNext(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedFilter, showSlider, checkSlider]);

  const arrowClass =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D9E0E8] bg-white text-[#001229] transition-colors hover:bg-[#001229] hover:text-white";

  function moveSlider(direction: "prev" | "next") {
    const metrics = getSliderMetrics();
    if (!metrics) return;

    const { slider, pageTargets, currentIndex, totalPages } = metrics;
    const nextPage =
      direction === "next"
        ? Math.min(currentIndex + 1, totalPages - 1)
        : Math.max(currentIndex - 1, 0);

    setCurrentPage(nextPage);
    slider.scrollTo({
      left: pageTargets[nextPage] ?? 0,
      behavior: "smooth",
    });
  }

  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6">
      <div className="w-full">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[850px]">
            <span className="text-[10px] font-bold tracking-[0.5px] text-[#904D00]">
              APEX CURRICULUM ARCHITECTURE
            </span>
            <div className="mt-1">
              <h2 className="text-[22px] sm:text-[24px] font-bold tracking-[-0.3px] text-[#001229]">
                Academic Programmes &amp; Sports Science Tracks
              </h2>
            </div>
            <div className="mt-1">
              <p className="text-[13px] leading-[1.6] text-[#44474D]">
                MBSPSU offers degree and doctoral programs synchronized with
                competitive athletic schedules, providing elite athletes full
                flexibility to compete internationally while earning accredited
                degrees.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
            {PROGRAMME_FILTERS.map((filter) => (
              <button
                key={filter.label}
                type="button"
                aria-pressed={selectedFilter === filter.query}
                onClick={() =>
                  setSelectedFilter((current) =>
                    current === filter.query ? null : filter.query,
                  )
                }
                className={`shrink-0 whitespace-nowrap rounded-[12px] px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.28px] cursor-pointer transition-colors ${selectedFilter === filter.query
                    ? "bg-[#001229] text-white"
                    : "bg-[#DCE9FF] text-[#001229] hover:bg-[#001229] hover:text-[#DCE9FF]"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProgrammes.length === 0 && (
          <p className="rounded-[12px] border border-[#dfe7f0] bg-white p-6 text-center text-[13px] text-[#44474D]">
            No programmes match this filter.
          </p>
        )}

        {filteredProgrammes.length > 0 && !showSlider && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProgrammes.map((programme, index) => (
              <ProgrammeCard key={`${programme.courseName}-${index}`} programme={programme} />
            ))}
          </div>
        )}

        {filteredProgrammes.length > 0 && showSlider && (
          <div
            ref={sliderRef}
            onScroll={checkSlider}
            className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProgrammes.map((programme, index) => (
              <div
                key={`${programme.courseName}-${index}`}
                className="w-full shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-10px)]"
              >
                <ProgrammeCard programme={programme} />
              </div>
            ))}
          </div>
        )}

        {showSlider && pageCount > 1 && (
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="text-[12px] font-medium text-[#44474D]">
              Page {currentPage + 1} of {pageCount}
            </span>
            <button
              type="button"
              aria-label="Previous programmes page"
              disabled={!canPrev}
              onClick={() => moveSlider("prev")}
              className={`${arrowClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next programmes page"
              disabled={!canNext}
              onClick={() => moveSlider("next")}
              className={`${arrowClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Programmes;
