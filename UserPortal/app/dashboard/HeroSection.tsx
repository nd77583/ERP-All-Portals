"use client";

import {
  Medal,
  UserCheck,
  Microscope,
  CloudDownload,
  PersonStanding,
  Video,
  WalletCards,
  BriefcaseBusiness,
  Headset,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchSectionApi } from "@/lib/useSectionApi";


export type HeroStat = {
  id: number;
  title: string;
  value: string;
  description: string;
  isActive: boolean;
};

export type HeroFeatureCard = {
  imageUrl: string;
  images?: string[];
  zoneName: string;
  category: string;
  title: string;
  description: string;
  policyName: string;
  policyCode: string;
  approvalStatus: string;
};

export type HeroContent = {
  Tagline: string;
  MainHeadName: string;
  subHeadName: string;
};

export type HeroContentResponse = { heroContent: HeroContent };
export type HeroStatsResponse = { stats: HeroStat[] };
export type HeroFeatureCardResponse = { featureCard: HeroFeatureCard };
export type AdmissionsPhoneResponse = { mobileNumber: string };


const MOCK_HERO_CONTENT: HeroContentResponse = {
  heroContent: {
    Tagline: "PUNJAB ACT NO. 11 OF 2019 • NAAC A++ PREPAREDNESS MATRIX",
    MainHeadName: "Nurturing Olympic & National Champions Through Scientific Rigor.",
    subHeadName:
      "Maharaja Bhupinder Singh Punjab Sports University is the apex state institution engineering world-class athletes, biomechanists, and exercise physiologists via sovereign Olympic-tier training tracks and elite research institutes.",
  },
};

const MOCK_HERO_STATS: HeroStatsResponse = {
  stats: [
    {
      id: 1,
      title: "TRACK",
      value: "Class 1",
      description: "IAAF Certified 400m",
      isActive: true,
    },
    {
      id: 2,
      title: "VICON 3D",
      value: "16 Cam",
      description: "High-Speed Motion Lab",
      isActive: true,
    },
    {
      id: 3,
      title: "GRANT",
      value: "₹42.5 Cr",
      description: "Khelo India CoE Grant",
      isActive: true,
    },
    {
      id: 4,
      title: "CADRE",
      value: "100%",
      description: "Govt Sports Quota Track",
      isActive: true,
    },
  ],
};

const MOCK_HERO_FEATURE_CARD: HeroFeatureCardResponse = {
  featureCard: {
    imageUrl: "/hero-section/hero-section-bg.svg",
    images: [
      "/hero-section/hero-section-bg.svg",
      "/sportsInfrastructure/track-field.png",
      "/sportsInfrastructure/aquaticComplex.png",
      "/sportsInfrastructure/high-performance-gym.svg",
      "/sportsInfrastructure/cycling-pavilion.svg",
    ],
    zoneName: "PATIALA HIGH-PERFORMANCE ZONE",
    category: "STATE CENTRE OF EXCELLENCE",
    title: "IAAF Synthetic Track & Biomechanical Tunnel",
    description:
      "Integrated Kistler force-plate sensors and real-time sprint kinematics feedback systems for national and Olympic athletes.",
    policyName: "Dual-Career Athlete Policy",
    policyCode: "NEP-2020 Credit Banking & Camp Flex",
    approvalStatus: "AC-APPROVED",
  },
};

const MOCK_ADMISSIONS_PHONE: AdmissionsPhoneResponse = {
  mobileNumber: "+91 (0175) 2920200",
};


const statIcons: LucideIcon[] = [Medal, Video, WalletCards, BriefcaseBusiness];

type ApiRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is ApiRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const firstValue = (record: ApiRecord, ...keys: string[]): unknown => {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
};

const unwrapApiResponse = (response: unknown, wrapperKeys: string[]): unknown => {
  let value = response;

  for (let depth = 0; depth < 4; depth += 1) {
    if (!isRecord(value)) {
      return value;
    }

    const record = value;
    const wrapperKey = wrapperKeys.find((key) => key in record);
    if (!wrapperKey) {
      return value;
    }

    value = record[wrapperKey];
  }

  return value;
};

const describeResponseShape = (response: unknown): string => {
  let value = response;
  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(value)) {
      value = value[0];
      break;
    }
    if (!isRecord(value)) {
      break;
    }
    const nested = firstValue(value, "data", "result", "payload");
    if (nested === undefined) {
      break;
    }
    value = nested;
  }
  if (Array.isArray(value)) {
    value = value[0];
  }
  if (isRecord(value)) {
    return `fields: ${Object.keys(value).join(", ") || "(none)"}`;
  }
  return Array.isArray(response) ? "empty array" : typeof response;
};

const selectLatestRecord = (value: unknown): unknown => {
  if (!Array.isArray(value)) {
    return value;
  }

  const records = value.filter(isRecord);
  return records.reduce<ApiRecord | undefined>((latest, candidate) => {
    if (!latest) {
      return candidate;
    }

    const latestCreatedAt = typeof latest.createdAt === "string"
      ? Date.parse(latest.createdAt)
      : Number.NEGATIVE_INFINITY;
    const candidateCreatedAt = typeof candidate.createdAt === "string"
      ? Date.parse(candidate.createdAt)
      : Number.NEGATIVE_INFINITY;

    return candidateCreatedAt >= latestCreatedAt ? candidate : latest;
  }, undefined);
};

const toHeroContent = (response: unknown): HeroContent | null => {
  const value = unwrapApiResponse(response, [
    "heroContent",
    "main_head",
    "mainHead",
    "data",
    "result",
    "payload",
  ]);
  const record = selectLatestRecord(value);

  if (!isRecord(record)) {
    return null;
  }

  const Tagline = firstValue(record, "Tagline", "tagline");
  const MainHeadName = firstValue(record, "MainHeadName", "mainHeadName", "main_head_name");
  const subHeadName = firstValue(record, "subHeadName", "sub_head_name");

  return (Tagline === undefined || typeof Tagline === "string") &&
    typeof MainHeadName === "string" &&
    typeof subHeadName === "string"
    ? { Tagline: typeof Tagline === "string" ? Tagline : "", MainHeadName, subHeadName }
    : null;
};

const toFeatureCard = (response: unknown): HeroFeatureCard | null => {
  const value = unwrapApiResponse(response, [
    "featureCard",
    "feature_Card",
    "feature_card",
    "data",
    "result",
    "payload",
  ]);
  const record = selectLatestRecord(value);

  if (!isRecord(record)) {
    return null;
  }

  const imageUrl = firstValue(record, "imageUrl", "image_url");
  const rawImages = firstValue(record, "images", "imageUrls", "image_urls");
  let images: string[] | undefined = undefined;
  if (Array.isArray(rawImages)) {
    images = rawImages.filter((x): x is string => typeof x === "string" && x.length > 0);
  } else if (typeof rawImages === "string" && rawImages.length > 0) {
    images = rawImages.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
  }
  const zoneName = firstValue(record, "zoneName", "zone_name");
  const category = firstValue(record, "category");
  const title = firstValue(record, "title");
  const description = firstValue(record, "description");
  const policyName = firstValue(record, "policyName", "policy_name");
  const policyCode = firstValue(record, "policyCode", "policy_code");
  const approvalStatus = firstValue(record, "approvalStatus", "approval_status");

  if (
    typeof zoneName !== "string" ||
    typeof category !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof policyName !== "string" ||
    typeof policyCode !== "string" ||
    typeof approvalStatus !== "string"
  ) {
    return null;
  }

  return {
    imageUrl: typeof imageUrl === "string" && imageUrl.length > 0
      ? imageUrl
      : "/hero-section/hero-section-bg.svg",
    images,
    zoneName,
    category,
    title,
    description,
    policyName,
    policyCode,
    approvalStatus,
  };
};

const toHeroStats = (response: unknown): HeroStat[] | null => {
  const value = unwrapApiResponse(response, [
    "stats",
    "dashboard_metrics",
    "dashboardMetrics",
    "data",
    "result",
    "payload",
  ]);

  if (!Array.isArray(value)) {
    return null;
  }

  return value.flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const title = firstValue(item, "title");
    const statValue = firstValue(item, "value");
    const description = firstValue(item, "description");
    if (
      typeof title !== "string" ||
      (typeof statValue !== "string" && typeof statValue !== "number") ||
      typeof description !== "string"
    ) {
      return [];
    }

    const id = firstValue(item, "id");
    return [{
      id: typeof id === "number" ? id : index,
      title,
      value: String(statValue),
      description,
      isActive: item.isActive === true || item.is_active === true,
    }];
  });
};

const toAdmissionsPhone = (response: unknown): string | null => {
  const value = unwrapApiResponse(response, [
    "mobileNumber",
    "mobile_number",
    "admission_contacts",
    "admissionContacts",
    "data",
    "result",
    "payload",
  ]);
  const record = selectLatestRecord(value);

  if (typeof record === "string") {
    return record;
  }
  if (!isRecord(record)) {
    return null;
  }

  const phone = firstValue(
    record,
    "hotline",
    "mobileNumber",
    "mobile_number",
    "phone",
    "contactNumber",
  );
  return typeof phone === "string" || typeof phone === "number" ? String(phone) : null;
};

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [featureCard, setFeatureCard] = useState<HeroFeatureCard | null>(null);
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [admissionsPhone, setAdmissionsPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");

  const DEFAULT_FEATURE_SLIDES = [
    "/hero-section/hero-section-bg.svg",
    "/sportsInfrastructure/track-field.png",
    "/sportsInfrastructure/aquaticComplex.png",
    "/sportsInfrastructure/high-performance-gym.svg",
    "/sportsInfrastructure/cycling-pavilion.svg",
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isSlidePaused, setIsSlidePaused] = useState<boolean>(false);

  const featureSlideImages = featureCard
    ? Array.from(
        new Set(
          [
            featureCard.imageUrl,
            ...(featureCard.images || []),
            ...DEFAULT_FEATURE_SLIDES,
          ].filter(Boolean)
        )
      )
    : DEFAULT_FEATURE_SLIDES;

  useEffect(() => {
    if (isSlidePaused || featureSlideImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % featureSlideImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSlidePaused, featureSlideImages.length]);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const hs = await fetchSectionApi<import("@/lib/cms-types").HomeData["heroSection"]>("home", "heroSection");
        if (hs) {
          setHeroContent({
            Tagline: hs.tagline || "",
            MainHeadName: hs.mainHeadName || "",
            subHeadName: hs.subHeadName || "",
          });
          if (hs.featureCard) {
            setFeatureCard({
              imageUrl: hs.featureCard.imageUrl || "/featureCard/feature.svg",
              zoneName: hs.featureCard.zoneName || "",
              category: hs.featureCard.category || "",
              title: hs.featureCard.title || "",
              description: hs.featureCard.description || "",
              policyName: hs.featureCard.policyName || "",
              policyCode: hs.featureCard.policyCode || "",
              approvalStatus: hs.featureCard.approvalStatus || "",
            });
          }
          if (hs.stats && hs.stats.length > 0) {
            setStats(
              hs.stats.map((s, idx) => ({
                id: idx + 1,
                title: s.title,
                value: s.value,
                description: s.description,
                isActive: s.isActive !== false,
              }))
            );
          }
          if (hs.admissionsPhone) {
            setAdmissionsPhone(hs.admissionsPhone);
          }
          setLoading(false);
          return;
        }
      } catch {
        // Fall back to existing responses
      }

      const responses = [
          Promise.resolve(MOCK_HERO_CONTENT),
          Promise.resolve(MOCK_HERO_FEATURE_CARD),
          Promise.resolve(MOCK_HERO_STATS),
          Promise.resolve(MOCK_ADMISSIONS_PHONE),
        ] as const;
      const [contentResult, cardResult, statsResult, phoneResult] =
        await Promise.allSettled(responses);
      let hasLoadError = false;

      const reportFailure = (endpoint: string, reason?: unknown, response?: unknown) => {
        hasLoadError = true;
        console.warn(
          `Failed to load ${endpoint}:`,
          reason instanceof Error
            ? reason.message
            : reason ?? `Unexpected response shape (${describeResponseShape(response)})`,
        );
      };

      if (contentResult.status === "fulfilled") {
        const content = toHeroContent(contentResult.value);
        if (content) {
          setHeroContent(content);
        } else {
          reportFailure("/main_head", undefined, contentResult.value);
        }
      } else {
        reportFailure("/main_head", contentResult.reason);
      }

      if (cardResult.status === "fulfilled") {
        const card = toFeatureCard(cardResult.value);
        if (card) {
          setFeatureCard(card);
        } else {
          reportFailure("/feature_Card", undefined, cardResult.value);
        }
      } else {
        reportFailure("/feature_Card", cardResult.reason);
      }

      if (statsResult.status === "fulfilled") {
        const heroStats = toHeroStats(statsResult.value);
        if (heroStats) {
          setStats(heroStats);
        } else {
          reportFailure("/dashboard_metrics", undefined, statsResult.value);
        }
      } else {
        reportFailure("/dashboard_metrics", statsResult.reason);
      }

      if (phoneResult.status === "fulfilled") {
        const phone = toAdmissionsPhone(phoneResult.value);
        if (phone) {
          setAdmissionsPhone(phone);
        } else {
          reportFailure("/admission_contacts", undefined, phoneResult.value);
        }
      } else {
        reportFailure("/admission_contacts", phoneResult.reason);
      }

      if (hasLoadError) {
        setLoadError("Could not load some content. Check the browser console for details.");
      }
      setLoading(false);
    };

    loadHeroData();
  }, []);

  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="w-full min-w-0 lg:col-span-7 xl:col-span-8">
            {!loading && heroContent && (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-3 md:mb-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4d9ae] text-[#8a4d00]">
                    <Medal size={20} strokeWidth={2.2} />
                  </div>
                  <div className="rounded-[12px] bg-[#D3E4FE] px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28px] text-[#001229]">
                    {heroContent.Tagline}
                  </div>
                </div>

                <h1 className="font-public_sans text-[28px] font-bold leading-[1.05] tracking-[-0.8px] text-[#001229] sm:text-[36px] md:text-[46px] lg:text-[48px] xl:text-[50px] break-words">
                  {heroContent.MainHeadName}
                </h1>

                <p className="mt-4 max-w-[850px] text-[14px] text-[#44474D] sm:mt-4 sm:text-[16px] md:text-[17px] leading-relaxed">
                  {heroContent.subHeadName}
                </p>
              </>
            )}

            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#001229] px-3.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.5px] text-white hover:bg-[#0F2744] sm:px-4 sm:py-3 sm:text-[13px] md:text-[14px]"
              >
                <UserCheck size={18} strokeWidth={2.2} />
                APPLY AY 2025-26
              </Link>

              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#bfd0f4] bg-[#D3E4FE] px-3.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.5px] text-[#001229] hover:bg-[#b2d0fe] sm:px-4 sm:py-3 sm:text-[13px] md:text-[14px]"
              >
                <Microscope size={18} strokeWidth={2.2} />
                EXPLORE HIGH-PERFORMANCE LABS
              </Link>

              <Link
                href="#"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-[#f7a347] px-3.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.5px] text-[#4a2b00] hover:bg-[#e89134] sm:px-4 sm:py-3 sm:text-[13px] md:text-[14px]"
              >
                <CloudDownload size={18} strokeWidth={2.2} />
                INFORMATION BROCHURE
              </Link>
            </div>

            {loadError && (
              <p className="mt-4 text-[11px] text-red-600">{loadError}</p>
            )}

            <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {loading &&
                [1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="h-[130px] animate-pulse rounded-xl border border-[#e7eaf0] bg-white"
                  />
                ))}

              {!loading &&
                stats.map((stat, index) => {
                  const Icon = statIcons[index] ?? PersonStanding;
                  return (
                    <div
                      key={stat.id}
                      className="flex min-h-[130px] min-w-0 flex-col rounded-xl border border-[#e7eaf0] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Icon className="shrink-0 text-[#a65a00]" size={24} strokeWidth={2.2} />
                        <div className="truncate text-right text-[14px] font-bold uppercase tracking-[0.08em] text-[#4d5058]">
                          {stat.title}
                        </div>
                      </div>
                      <div className="mt-2 truncate text-[36px] font-bold leading-none tracking-[-0.04em] text-[#001229] lg:text-[30px]">
                        {stat.value}
                      </div>
                      <div className="mt-1 truncate text-[18px] leading-6 text-[#4d5058] lg:text-[15px]">
                        {stat.description}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-full min-w-0 pt-4 lg:pt-0 lg:col-span-5 xl:col-span-4">
            {loading && (
              <div className="h-[460px] animate-pulse rounded-xl bg-[#0F2744]/80" />
            )}

            {!loading && featureCard && (
              <div
                className="overflow-hidden rounded-xl bg-[#0F2744] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
              >
                <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden">
                  {/* Sliding / Cross-fading background images */}
                  {featureSlideImages.map((imgUrl, idx) => (
                    <div
                      key={imgUrl + idx}
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                        idx === activeSlideIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                      }`}
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                  ))}

                  {/* Dark contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F2744]/25 via-transparent to-[#0F2744]/85" />

                  {/* Top Bar: Zone Name Badge + Slide Indicators */}
                  <div className="absolute left-3.5 right-3.5 top-3.5 z-10 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#091d33]/85 backdrop-blur-xs px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white shadow-xs">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff9a2f] animate-pulse" />
                      {featureCard.zoneName}
                    </div>

                    {featureSlideImages.length > 1 && (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#091d33]/85 backdrop-blur-xs px-2.5 py-1.5 shadow-xs">
                        {featureSlideImages.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setActiveSlideIndex(dotIdx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              dotIdx === activeSlideIndex
                                ? "w-4 bg-[#ff9a2f]"
                                : "w-1.5 bg-white/40 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0F2744] via-[#0F2744]/85 to-transparent px-3.5 pb-4 pt-24">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#FFDCC3]">
                      {featureCard.category}
                    </div>
                    <h2 className="mt-1 text-[18px] sm:text-[20px] font-bold tracking-[-0.2px] text-[#F8F9FF]">
                      {featureCard.title}
                    </h2>
                    <p className="mt-2 text-[12px] leading-5 sm:leading-6 text-[#B2C8ED]">
                      {featureCard.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-3.5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#904D00]">
                      <span className="material-symbols-outlined text-[24px] leading-none text-white">
                        sports_martial_arts
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.28px] text-[#F8F9FF]">
                        {featureCard.policyName}
                      </div>
                      <div className="text-[12px] text-[#798FB1]">
                        {featureCard.policyCode}
                      </div>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold uppercase text-[#FFDCC3]">
                    {featureCard.approvalStatus}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#d4e2ff] bg-[#FFFFFF] px-3.5 py-3.5 sm:py-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#DCE9FF] text-[#0f3a73]">
                  <Headset
                    className="h-6 w-6 sm:h-7 sm:w-7 text-[#001229]"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] sm:text-[15px] xl:text-[16px] font-bold uppercase tracking-[-0.08px] text-[#001229] truncate">
                    Admissions &amp; Visitor Desk
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-[#44474D] truncate">
                    NIS Patiala Campus Gate 2 • 09:00-17:30 IST
                  </div>
                </div>
              </div>

              {loading && (
                <div className="shrink-0 self-start sm:self-auto whitespace-nowrap rounded-[4px] bg-[#DCE9FF] px-3 py-1.5 sm:px-4 sm:py-2 text-right text-[11px] font-bold text-[#001229]">
                  {admissionsPhone || "Loading phone..."}
                </div>
              )}

              {!loading && admissionsPhone && (
                <div className="shrink-0 self-start sm:self-auto whitespace-nowrap rounded-[4px] bg-[#DCE9FF] px-3 py-1.5 sm:px-4 sm:py-2 text-right text-[11px] font-bold text-[#001229]">
                  {admissionsPhone}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
