"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchSectionApi } from "@/lib/useSectionApi";
import type { HomeData } from "@/lib/cms-types";

const TOP_CARDS = 2;

export type InfrastructureFacility = {
  id: number;
  image: { url: string };
  badge: string;
  tagStyle: "amber" | "blue";
  title: string;
  description: string;
  isFeatured?: boolean;
};

const MOCK_FACILITIES: InfrastructureFacility[] = [
  {
    id: 1,
    image: { url: "/infrastructure/image1.svg" },
    badge: "Research Flagship",
    tagStyle: "amber",
    title: "3D Vicon Motion Capture & Kinematic Analysis Facility",
    description:
      "Equipped with 16 Vicon Vantage cameras, dual Kistler multi-axis force platforms, and Noraxon wireless electromyography for millisecond neuromuscular profiling.",
    isFeatured: true,
  },
  {
    id: 2,
    image: { url: "/infrastructure/image2.svg" },
    badge: "Aquatics",
    tagStyle: "blue",
    title: "50m 10-Lane Olympic Pool",
    description:
      "Sub-aquatic high-speed strobe cameras for hydrodynamic drag reduction and stroke efficiency.",
  },
  {
    id: 3,
    image: { url: "/infrastructure/image3.svg" },
    badge: "Cycling",
    tagStyle: "blue",
    title: "250m Siberian Pine Velodrome",
    description:
      "International Cycling Union (UCI) homologated steep banking for sprint and endurance squads.",
  },
  {
    id: 4,
    image: { url: "/infrastructure/image4.svg" },
    badge: "Sports Medicine",
    tagStyle: "blue",
    title: "Cryo & Hydrotherapy Unit",
    description:
      "Sub-zero whole body cryotherapy and contrast therapy baths to expedite recovery and reduce inflammation.",
  },
  {
    id: 5,
    image: { url: "/infrastructure/image5.svg" },
    badge: "Residences",
    tagStyle: "blue",
    title: "Major Dhyan Chand Hall",
    description:
      "Nutrient-calculated sports dining halls, recovery dormitories, and study wings.",
  },
  {
    id: 6,
    image: { url: "/infrastructure/image3.svg" },
    badge: "Training Center",
    tagStyle: "blue",
    title: "Advanced Performance Training Hub",
    description:
      "Nutrient-calculated sports dining halls, recovery dormitories, and study wings.",
  },
];

const tagStyles = {
  amber: "bg-[#F6AE52] text-[#563100]",
  blue: "bg-[#DCE9FF] text-[#001229]",
};


const FacilityCard = ({
  facility,
  className = "",
}: {
  facility: InfrastructureFacility;
  className?: string;
}) => {
  const imageUrl = facility.image?.url || "/infrastructure/default.svg";

  return (
    <div
      className={`relative min-h-[300px] overflow-hidden rounded-[16px] bg-[#C5D8F5] bg-cover bg-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
    <div className="absolute inset-0 bg-gradient-to-t from-[#001229] via-[#001229]/50 to-[#001229]/10" />

    <div
      className={`absolute left-4 top-4 inline-block rounded-[3px] px-1.5 py-1 text-[10px] font-bold uppercase tracking-[0.5px] ${tagStyles[facility.tagStyle] ?? tagStyles.blue
        }`}
    >
      {facility.badge}
    </div>

      <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
        <h3 className="mb-2 text-[18px] font-bold leading-[1.18] tracking-[-0.02em] text-white">
          {facility.title}
        </h3>
        <p className="text-[12px] leading-[1.5] text-[#D4E1F9]">
          {facility.description}
        </p>
      </div>
    </div>
  );
};


const Infrastructure = () => {
  const [facilities, setFacilities] = useState<InfrastructureFacility[]>(MOCK_FACILITIES);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSectionApi<HomeData["infrastructure"]>("home", "infrastructure")
      .then((content) => {
        if (content.facilities?.length) {
          setFacilities(content.facilities.map((facility, index) => ({
            id: Number(facility.id) || index + 1,
            image: { url: facility.imageUrl || "/infrastructure/image1.svg" },
            badge: facility.status,
            tagStyle: index === 0 ? "amber" : "blue",
            title: facility.name,
            description: `${facility.location} · ${facility.specs} · ${facility.capacity}`,
            isFeatured: index === 0,
          })));
        }
      })
      .catch(() => setFacilities(MOCK_FACILITIES))
      .finally(() => setLoading(false));
  }, []);

  const topFacilities = facilities.slice(0, TOP_CARDS);
  const sliderFacilities = facilities.slice(TOP_CARDS);
  const useSlider = sliderFacilities.length > 0;
  const pageCount = Math.max(1, Math.ceil(sliderFacilities.length / cardsPerView));
  const sliderPages = Array.from({ length: pageCount }, (_, pageIndex) =>
    sliderFacilities.slice(
      pageIndex * cardsPerView,
      (pageIndex + 1) * cardsPerView,
    ),
  );
  const activePage = Math.min(currentPage, pageCount - 1);

  const getSliderMetrics = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    const firstPage = slider.firstElementChild as HTMLElement | null;
    const firstOffset = firstPage?.offsetLeft ?? 0;
    const pageTargets = Array.from({ length: pageCount }, (_, pageIndex) => {
      const page = slider.children.item(pageIndex) as HTMLElement | null;
      const rawTarget = page ? page.offsetLeft - firstOffset : pageIndex * slider.clientWidth;

      return Math.min(rawTarget, maxScroll);
    });
    const currentIndex = pageTargets.reduce((closestIndex, target, index) => {
      const closestDistance = Math.abs(pageTargets[closestIndex] - slider.scrollLeft);
      const targetDistance = Math.abs(target - slider.scrollLeft);

      return targetDistance < closestDistance ? index : closestIndex;
    }, 0);

    return { slider, pageTargets, currentIndex, maxScroll };
  }, [pageCount]);

  const checkSlider = useCallback(() => {
    const metrics = getSliderMetrics();
    if (!metrics) return;

    const { slider, currentIndex, maxScroll } = metrics;

    setCurrentPage(currentIndex);
    setCanPrev(slider.scrollLeft > 1);
    setCanNext(slider.scrollLeft < maxScroll - 1);
  }, [getSliderMetrics]);

  useEffect(() => {
    const updateCardsPerView = () => {
      const availableWidth = sliderRef.current?.clientWidth ?? window.innerWidth;
      if (window.innerWidth <= 640) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth > 640 && window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setCardsPerView(2);
        return;
      }

      const nextCardsPerView = Math.min(
        3,
        Math.max(1, Math.floor((availableWidth + 16) / 180)),
      );

      setCardsPerView(nextCardsPerView);
    };

    const frame = requestAnimationFrame(updateCardsPerView);
    window.addEventListener("resize", updateCardsPerView);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, [sliderFacilities.length]);

  useEffect(() => {
    if (!useSlider) return;

    const frame = requestAnimationFrame(checkSlider);
    window.addEventListener("resize", checkSlider);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", checkSlider);
    };
  }, [useSlider, checkSlider]);

  const slide = (direction: "prev" | "next") => {
    const metrics = getSliderMetrics();
    if (!metrics || sliderFacilities.length === 0) return;

    const { slider, pageTargets, currentIndex } = metrics;
    const nextPage =
      direction === "next"
        ? Math.min(currentIndex + 1, pageCount - 1)
        : Math.max(currentIndex - 1, 0);

    setCurrentPage(nextPage);
    slider.scrollTo({
      left: pageTargets[nextPage] ?? 0,
      behavior: "smooth",
    });
  };

  const arrowClass =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#B8CBEA] bg-white text-[#001229] transition-colors hover:bg-[#001229] hover:text-white";

  return (
    <section className="w-full bg-[#DCE9FF] px-4 py-5 sm:px-5 sm:py-6">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[760px]">
          <span className="text-[10px] font-bold tracking-[0.5px] text-[#904D00]">
            OLYMPIC INFRASTRUCTURE SHOWCASE
          </span>
          <div className="mt-2">
            <h2 className="text-[24px] font-bold tracking-[-0.3px] text-[#001229]">
              Patiala High-Performance Facilities &amp; Labs
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#44474D]">
            <span>Khel Ratna Standard</span>
            <span className="text-base leading-none text-[#44474D]">•</span>
            <span>SAI Accredited Hub</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="min-h-[300px] animate-pulse rounded-[16px] bg-[#C5D8F5]"
            />
          ))}
        </div>
      )}

      {!loading && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {topFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.id ?? `facility-${index}`}
                facility={facility}
                className={index === 0 ? "md:col-span-2" : ""}
              />
            ))}
          </div>

        </>
      )}

      {!loading && useSlider && (
        <div className="mt-4">
          <div
            ref={sliderRef}
            onScroll={checkSlider}
            className="flex snap-x snap-mandatory overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sliderPages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="box-border grid w-full min-w-0 shrink-0 snap-start gap-4"
                style={{ gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))` }}
              >
                {page.map((facility, index) => (
                  <FacilityCard key={facility.id ?? `facility-page-${pageIndex}-${index}`} facility={facility} />
                ))}
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className=" flex items-center justify-end gap-2">
              <span className="text-[12px] font-medium text-[#44474D]">
                Page {activePage + 1} of {pageCount}
              </span>
              <button
                type="button"
                aria-label="Previous facilities"
                disabled={!canPrev}
                onClick={() => slide("prev")}
                className={`${arrowClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next facilities"
                disabled={!canNext}
                onClick={() => slide("next")}
                className={`${arrowClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Infrastructure;
