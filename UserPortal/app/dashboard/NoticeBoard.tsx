"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchSectionApi } from "@/lib/useSectionApi";

const SLIDER_THRESHOLD = 3;

export type Notice = {
  id: number;
  circularNumber: string;
  publishedDate: string;
  title: string;
  description: string;
  issuedBy: string;
  actionLabel: string;
  actionUrl: string;
  isActive: boolean;
  tab?: string;
};

const MOCK_NOTICES: Notice[] = [
  {
    id: 1,
    circularNumber: "CIRCULAR #942/EXAM",
    publishedDate: "2025-05-24",
    title: "End-Semester Examinations Date Sheet for B.P.Ed (Sem-II & IV)",
    description:
      "Theoretical and practical skill evaluation schedule released by the Controller of Examinations as per UGC model regulations.",
    issuedBy: "CONTROLLER OF EXAMS",
    actionLabel: "View Order",
    actionUrl: "#",
    isActive: true,
    tab: "Academic & Statutory",
  },
  {
    id: 2,
    circularNumber: "NOTIFICATION #881/BOS",
    publishedDate: "2025-05-21",
    title:
      "Board of Studies: Integrated Kinesiology & Sports Nutrition Syllabi 2025",
    description:
      "Notification regarding credit transfer matrix under the National Credit Framework (NCrF) for active Olympic and Khelo India athletes.",
    issuedBy: "DEAN ACADEMICS",
    actionLabel: "View Order",
    actionUrl: "#",
    isActive: true,
    tab: "Academic & Statutory",
  },
  {
    id: 3,
    circularNumber: "VIVA #04/PHD",
    publishedDate: "2025-05-19",
    title: "Public Viva-Voce: Ph.D Thesis in Exercise Biomechanics",
    description:
      'Open defence on "Kinematic Optimization of Ground Reaction Forces in Elite High Jumpers using 3D Force Platforms".',
    issuedBy: "RESEARCH BRANCH",
    actionLabel: "Join Session",
    actionUrl: "#",
    isActive: true,
    tab: "Academic & Statutory",
  },
  {
    id: 4,
    circularNumber: "CIRCULAR #955/ADM",
    publishedDate: "2025-05-17",
    title: "Admission Counselling Schedule for M.Sc Sports Science",
    description:
      "Counselling dates, document verification list and seat matrix released by the Admissions Bureau for AY 2025-26.",
    issuedBy: "ADMISSIONS BUREAU",
    actionLabel: "View Order",
    actionUrl: "#",
    isActive: true,
    tab: "Academic & Statutory",
  },
  {
    id: 5,
    circularNumber: "CIRCULAR/ADM",
    publishedDate: "2025-05-17",
    title: "Admission Counselling Schedule for M.Sc Sports Science",
    description:
      "Counselling dates, document verification list and seat matrix released by the Admissions Bureau for AY 2025-26.",
    issuedBy: "ADMISSIONS BUREAU",
    actionLabel: "View Order",
    actionUrl: "#",
    isActive: true,
    tab: "Academic & Statutory",
  },
];

const TABS = [
  "Academic & Statutory",
  "Trials & Fixtures",
  "Tenders & GeM",
  "RTI & Disclosures",
];

const normalizeNotices = (payload: unknown): Notice[] => {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is Notice => !!item && typeof item === "object" && "title" in item);
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    for (const key of ["notices", "data", "results", "items"]) {
      const value = record[key];
      if (Array.isArray(value)) {
        return value.filter((item): item is Notice => !!item && typeof item === "object" && "title" in item);
      }
    }
  }

  return [];
};

const TAB_KEYWORDS: Record<string, string[]> = {
  "Academic & Statutory": [
    "academic", "statutory", "exam", "examination", "syllabi", "syllabus",
    "viva", "ph.d", "thesis", "admission", "counselling", "university",
    "education", "student", "course", "research", "ncrf", "ugc",
  ],
  "Trials & Fixtures": [
    "trial", "trials", "fixture", "fixtures", "tournament", "championship",
    "match", "competition", "selection", "athlete", "sports meet",
  ],
  "Tenders & GeM": [
    "tender", "procurement", "gem", "geM", "bid", "quotation", "purchase",
  ],
  "RTI & Disclosures": [
    "rti", "disclosure", "disclosures", "right to information", "transparency",
    "public information", "proactive disclosure",
  ],
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ---------------- Notice Card ---------------- */

function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[12px] border border-[#D9E0E8] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
      <div>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0 break-words rounded-[2px] bg-[#DCE9FF] px-2 py-1 text-[12px] font-bold text-[#001229]">
            {notice.circularNumber}
          </div>

          <div className="shrink-0 text-[12px] font-medium text-[#44474D]">
            {formatDate(notice.publishedDate)}
          </div>
        </div>

        <h3 className="mb-3 text-[16px] font-bold leading-[1.4] tracking-[-0.02em] text-[#001229]">
          {notice.title}
        </h3>

        <p className="text-[12px] leading-[1.6] text-[#44474D]">
          {notice.description}
        </p>
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-[#EDF1F5] pt-4 sm:flex-row sm:items-end">
        <div className="break-words text-[11px] font-bold uppercase tracking-[0.08em] text-[#904D00]">
          {notice.issuedBy}
        </div>

        <a
          href={notice.actionUrl}
          className="inline-flex items-center gap-2 self-end text-[11px] font-bold text-[#001229] sm:self-auto"
        >
          {notice.actionLabel}
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </article>
  );
}


const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [repositoryTag, setRepositoryTag] = useState("DIGITAL GOVERNANCE REPOSITORY");
  const [boardTitle, setBoardTitle] = useState("Official Statutory Notice Board & Gazette");
  const [categories, setCategories] = useState<string[]>(TABS);
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const filteredNotices = notices.filter((notice) => notice.tab === selectedTab);
  const showSlider = filteredNotices.length > SLIDER_THRESHOLD;

  const getSliderMetrics = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const firstCard = slider.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard
      ? firstCard.offsetWidth + 16
      : slider.clientWidth || 1;
    const visibleCards = Math.max(1, Math.round(slider.clientWidth / cardWidth));
    const totalPages = Math.max(
      1,
      Math.ceil(filteredNotices.length / visibleCards),
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
  }, [filteredNotices.length]);

  useEffect(() => {
    async function loadNotices() {
      try {
        const noticeBoard = await fetchSectionApi<import("@/lib/cms-types").HomeData["noticeBoard"]>("home", "noticeBoard");
        setRepositoryTag(noticeBoard.repositoryTag || "DIGITAL GOVERNANCE REPOSITORY");
        setBoardTitle(noticeBoard.title || "Official Statutory Notice Board & Gazette");
        if (noticeBoard.categories?.length) {
          setCategories(noticeBoard.categories);
          setSelectedTab(noticeBoard.categories[0]);
        }
        if (noticeBoard?.notices && noticeBoard.notices.length > 0) {
          const cmsNotices: Notice[] = noticeBoard.notices
            .filter((n) => n.isActive !== false)
            .map((n, idx) => ({
              id: typeof n.id === "number" ? n.id : idx + 1,
              circularNumber: n.circularNumber,
              publishedDate: n.publishedDate,
              title: n.title,
              description: n.description,
              issuedBy: n.issuedBy,
              actionLabel: n.actionLabel || "View Order",
              actionUrl: n.actionUrl || "#",
              isActive: n.isActive,
              tab: n.tab,
            }));
          setNotices(cmsNotices);
          return;
        }

        setNotices(MOCK_NOTICES);
      } catch {
        setNotices(MOCK_NOTICES);
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

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
  }, [selectedTab, showSlider, checkSlider]);

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

  const arrowClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E0E8] bg-white text-[#001229] hover:bg-[#001229] hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section className="w-full bg-white px-4 py-5 sm:px-5 sm:py-6">
      <div className="w-full">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 lg:flex-1">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#904D00]">
              {repositoryTag}
            </div>

            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-[#001229] sm:text-[26px] md:text-[30px] lg:text-[32px]">
              {boardTitle}
            </h2>
          </div>

          <div className="flex w-full flex-nowrap gap-2 overflow-x-auto rounded-[8px] bg-[#DCE9FF] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible lg:w-auto">
            {categories.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
                className={`shrink-0 whitespace-nowrap rounded-[6px] px-3 py-2 text-[11px] font-semibold sm:px-2.5 md:px-3 cursor-pointer ${selectedTab === tab
                  ? "bg-[#001229] text-white"
                  : "text-[#44474D] hover:bg-[#001229] hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[220px] animate-pulse rounded-[12px] border border-[#D9E0E8] bg-[#F5F8FF]"
              />
            ))}
          </div>
        )}

        {!loading && filteredNotices.length === 0 && (
          <p className="rounded-[12px] border border-[#D9E0E8] bg-white p-6 text-center text-[13px] text-[#44474D]">
            No notices found in this category.
          </p>
        )}

        {!loading && filteredNotices.length > 0 && !showSlider && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}

        {!loading && filteredNotices.length > 0 && showSlider && (
          <div>
            <div
              ref={sliderRef}
              onScroll={checkSlider}
              className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="w-full shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.667px)] xl:w-[calc(25%-12px)]"
                >
                  <NoticeCard notice={notice} />
                </div>
              ))}
            </div>

            <div className="mb-3 flex items-center justify-end gap-2">
              <span className="mr-auto text-[11px] font-medium text-[#44474D] sm:mr-0 sm:text-[12px]">
                Page {currentPage + 1} of {pageCount}
              </span>
              <button
                type="button"
                aria-label="Previous notices"
                disabled={!canPrev}
                onClick={() => moveSlider("prev")}
                className={arrowClass}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Next notices"
                disabled={!canNext}
                onClick={() => moveSlider("next")}
                className={arrowClass}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NoticeBoard;
