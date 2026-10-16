"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ArrowRight,
  Wind,
  BookOpen,
  ShieldCheck,
  BedDouble,
  Activity,
  Snowflake,
  Gauge,
  Utensils,
  PersonStanding,
  Waves,
} from "lucide-react";

type Facility = {
  image: string;
  alt: string;
  badge: string;
  overlay: string;
  code: string;
  tag: string;
  title: string;
  description: string;
  details?: { label: string; value: string }[];
  features?: { text: string }[];
  footerText: string;
  linkText: string;
  href: string;
};

const MOCK_FACILITIES: Facility[] = [
  {
    image: "/sportsInfrastructure/cycling-pavilion.svg",
    alt: "Indoor velodrome",
    badge: "UCI Homologated Category 1",
    overlay: "Banking: 43.5° Turn / 13° Straight",
    code: "Pavilion Code: VELO-IND-03",
    tag: "250-Meter Siberian Pine Track",
    title: "250m Siberian Pine Indoor Velodrome & Cycling Pavilion",
    description:
      "Engineered from imported slow-growth Siberian Pine timber ensuring ultra-low rolling resistance. The track features laser-calibrated transition spirals conforming to Union Cycliste Internationale regulations for sprint, keirin, and team pursuit national trials.",
    details: [
      {
        label: "Infield Facilities",
        value: "Ergometer Wattbike Matrix (24 Units)",
      },
      { label: "Telemetry Interface", value: "ANT+ & BLE Trackside Gateway" },
    ],
    footerText: "Wind Tunnel Access Connected",
    linkText: "View Track Schedule",
    href: "#",
  },
  {
    image: "/sportsInfrastructure/3d-motion.svg",
    alt: "Biomechanics lab",
    badge: "Apex Biomechanics Unit",
    overlay: "16 Vicon Vantage Cameras • 1000 Hz",
    code: "Lab Code: SCI-BIOM-04",
    tag: "ISO 17025 Calibrated",
    title: "3D Motion Capture & Biomechanical Profiling Lab",
    description:
      "Dedicated to granular kinematic profiling and injury prevention diagnostics. Combines sixteen 16-megapixel Vicon Vantage infrared cameras with two embedded Kistler multi-axis piezoelectric force platforms and wireless 16-channel Noraxon surface EMG.",
    details: [
      {
        label: "Force Measurement",
        value: "Dual Kistler 9287CA (0.01 N Resolution)",
      },
      { label: "Muscle Telemetry", value: "Noraxon Ultium EMG (4000 Hz)" },
    ],
    footerText: "Research Publications: 42 (AY 2024-25)",
    linkText: "Explore Lab Protocols",
    href: "#",
  },
  {
    image: "/sportsInfrastructure/martial-arts.svg",
    alt: "Combat sports center",
    badge: "IBA & UWW Regulated",
    overlay: "Mat Area: 1,850 m² Seamless",
    code: "Pavilion Code: ARENA-CMB-05",
    tag: "Boxing, Wrestling, Judo & Taekwondo",
    title: "Combat Sports & Martial Arts Elite Center",
    description:
      "Tailored for Punjab's storied combat tradition. Housing two regulation IBA competition boxing rings, three Olympic UWW 12m wrestling mats, and IJF-certified high-density foam tatami floors equipped with impact telemetry accelerometers.",
    features: [
      {
        text: "Impact Telemetry: Striking force load sensors with real-time punch acceleration scoring.",
      },
      {
        text: "Integrated Cryotherapy: Immediate post-bout liquid nitrogen recovery chambers (-110°C).",
      },
    ],
    footerText: "SAI National Squad Base",
    linkText: "Training Slots",
    href: "#",
  },
  {
    image: "/sportsInfrastructure/high-performance-gym.svg",
    alt: "High performance gym",
    badge: "Eleiko & Keiser Equipped",
    overlay: "Residential: 450 Elite Athlete Suites",
    code: "Pavilion Code: ARENA-SNC-06",
    tag: "High-Performance Gym & Athletes Village",
    title: "High-Performance Gym & Residential Athlete Enclave",
    description:
      "18,000 sq ft conditioning pavilion featuring 12 Eleiko Olympic lifting platforms, Keiser pneumatic variable-resistance machines, and multi-joint isometric dynamometers. Seamlessly linked to residential suites engineered with circadian lighting and sports nutrition dining.",
    features: [
      {
        text: "Velocity Based Training: GymAware optical encoders on every barbell rack.",
      },
      {
        text: "Sports Nutrition Mess: Macro-profiled biometric meal distribution verified by sports dietitians.",
      },
    ],
    footerText: "450 AC En-Suite Rooms",
    linkText: "Hostel Protocols",
    href: "#",
  },
];

// Decorative icons and color tokens are presentation constants, not mock/API content.
const facilityPresentation: Record<string, { badgeClass: string; footerClass: string; footerIcon: React.ElementType; featureIcon: React.ElementType }> = {
  "Arena Code: ATH-TRK-01": { badgeClass: "bg-[#001229] text-white", footerClass: "text-[#904D00]", footerIcon: PersonStanding, featureIcon: ShieldCheck },
  "Arena Code: AQUA-OLY-02": { badgeClass: "bg-[#DCE9FF] text-[#001229]", footerClass: "text-[#001229]", footerIcon: Waves, featureIcon: ShieldCheck },
  "Pavilion Code: VELO-IND-03": { badgeClass: "bg-[#001229] text-white", footerClass: "text-[#904D00]", footerIcon: Wind, featureIcon: ShieldCheck },
  "Lab Code: SCI-BIOM-04": { badgeClass: "bg-[#002D1C] text-[#6FFBBE]", footerClass: "text-[#001229]", footerIcon: BookOpen, featureIcon: ShieldCheck },
  "Pavilion Code: ARENA-CMB-05": { badgeClass: "bg-[#904D00] text-white", footerClass: "text-[#001229]", footerIcon: ShieldCheck, featureIcon: Activity },
  "Pavilion Code: ARENA-SNC-06": { badgeClass: "bg-[#001229] text-white", footerClass: "text-[#904D00]", footerIcon: BedDouble, featureIcon: Gauge },
};

const DEFAULT_FACILITY_PRESENTATION = {
  badgeClass: "bg-[#001229] text-white",
  footerClass: "text-[#001229]",
  footerIcon: ShieldCheck,
  featureIcon: Activity,
};

import { useSectionApi } from "@/lib/useSectionApi";

const isCompleteFacilities = (val: Facility[]): boolean => {
  return Array.isArray(val) && val.length > 0 && val.every((f) => Boolean(f.title && f.code));
};

const SportsFacilities = () => {
  const facilities = useSectionApi<Facility[]>(
    "sportsInfrastructure",
    "sportsFacilities",
    MOCK_FACILITIES,
    isCompleteFacilities
  );

  return (
    <section className="w-full min-w-0 bg-[#F8F9FF] px-4 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {facilities.map((f, index) => {
          const {
            badgeClass,
            footerClass,
            footerIcon: FooterIcon,
            featureIcon: FeatureIcon,
          } = facilityPresentation[f.code] ?? DEFAULT_FACILITY_PRESENTATION;
          return (
            <div
              key={f.code}
              className="flex min-w-0 w-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
            >
              <div className="relative h-52 w-full sm:h-60 lg:h-64">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover"
                />
                <span
                  className={`absolute left-3 top-3 rounded-[2px] px-2 py-1 text-[10px] font-bold uppercase ${badgeClass}`}
                >
                  {f.badge}
                </span>
                <span className="absolute bottom-3 right-3 rounded-[2px] bg-[#001229] px-2 py-1 text-[10px] font-medium text-white">
                  {f.overlay}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <span className="min-w-0 break-words text-[10px] font-bold uppercase text-[#904D00]">
                    {f.code}
                  </span>
                  <span className="min-w-0 break-words text-[10px] font-semibold text-[#44474D] sm:text-right">
                    {f.tag}
                  </span>
                </div>

                <h3 className="break-words text-[16px] font-bold leading-tight text-[#001229]">
                  {f.title}
                </h3>

                <p className="break-words text-[12px] text-[#44474D]">{f.description}</p>

                {f.details && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {f.details.map((d) => (
                      <div
                        key={d.label}
                        className="rounded-[2px] bg-[#EFF4FF] p-2"
                      >
                        <span className="block text-[9px] font-bold uppercase text-[#44474D]">
                          {d.label}
                        </span>
                        <span className="block text-[11px] font-semibold text-[#001229]">
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {f.features && (
                  <ul className="flex flex-col gap-1.5">
                    {f.features.map(({ text }) => (
                      <li
                        key={text}
                        className="flex items-start gap-2 text-[12px] font-semibold text-[#001229]"
                      >
                        <FeatureIcon
                          size={14}
                          className="mt-0.5 shrink-0 text-[#904D00]"
                        />
                        {text}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-col items-start gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${footerClass}`}
                  >
                    <FooterIcon size={14} />
                    {f.footerText}
                  </span>
                  <Link
                    href={f.href}
                    className="flex items-center gap-1 text-[10px] font-bold text-[#001229]"
                  >
                    {f.linkText}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SportsFacilities;
