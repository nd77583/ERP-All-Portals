"use client";

import {
  ArrowLeft,
  Award,
  Bandage,
  BrainCircuit,
  BrainCog,
  Cloud,
  Construction,
  Droplet,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

type MetricItem = {
  label: string;
  value: string;
  detail: string;
};

type ScienceLabsData = {
  kinematicsMetrics: MetricItem[];
};

const kinematicsMetricsMockData: MetricItem[] = [
  { label: "Optical Sensors", value: "16 Vicon Vero", detail: "Sub-millimeter margin" },
  { label: "Force Platforms", value: "AMTI 6-DOF Dual", detail: "CoP vectors recorded" },
  { label: "Primary Focus", value: "Javelin & Sprints", detail: "Release kinetics" },
];

const isCompleteScienceLabs = (val: ScienceLabsData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.kinematicsMetrics) &&
    val.kinematicsMetrics.length > 0 &&
    val.kinematicsMetrics.every((m) => Boolean(m.label && m.value))
  );
};

const ScienceLaboratories = () => {
  const data = useSectionApi<ScienceLabsData>(
    "researchAndLabs",
    "scienceLaboratories",
    { kinematicsMetrics: kinematicsMetricsMockData },
    isCompleteScienceLabs
  );
  return (
    <section className="w-full min-w-0 bg-[#F4F6F8] px-4 py-6 sm:px-5 md:px-6 lg:px-8">
      <div className="w-full min-w-0">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#00A86B]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">
            CORE INFRASTRUCTURE
          </span>
        </div>

        <h2 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.06em] text-[#001229] md:text-[2.3rem]">
          Apex Sports Science Laboratories
        </h2>

        <p className="mt-2 max-w-[1020px] text-[0.95rem] leading-[1.6] text-[#44474D] md:text-[1.06rem]">
          High-precision multi-department research divisions engineered to
          satisfy IOC, SAI, and UGC Centre with Potential for Excellence in
          Sports (CPE-S) specifications.
        </p>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[12px] border border-[#D9E1EB] xl:col-span-2 bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex rounded-[3px] bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#021C39]">
                CORE FACILITY 01 • KINEMATICS
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#44474D]">
                <ShieldCheck className="h-5 w-5 text-[#002D1C]" />
                Live Synchronized System
              </span>
            </div>

            <h3 className="mt-4 text-[1.1rem] font-bold leading-[1.4] tracking-[-0.04em] text-[#001229] md:text-[1.35rem]">
              3D Vicon Motion Capture &amp; Kinematic Analytics Arena
            </h3>

            <p className="mt-3 text-[0.85rem] leading-[1.7] text-[#44474D] md:text-[0.92rem]">
              Equipped with 16 ultra-high-speed Vicon Vero optical infrared
              cameras delivering 1,000 FPS spatial capture alongside dual AMTI
              tri-axial ground reaction force plates (10,000 Hz) and wireless
              Noraxon 16-channel surface electromyography (sEMG). Analyzes joint
              shear forces, rotational torques, and kinetic chaining in track,
              field throwers, and hockey drags.
            </p>

            <div className="mt-5 grid gap-2 border-t bg-[#EFF4FF] p-4 pt-4 sm:grid-cols-3">{data.kinematicsMetrics.map((metric) => <div key={metric.label}><span className="block text-[9px] font-bold uppercase tracking-[0.5px] text-[#44474D]">{metric.label}</span><span className="mt-1 block text-[1.05rem] font-bold tracking-[-0.04em] text-[#001229]">{metric.value}</span><span className="mt-1 block text-[11px] text-[#44474D]">{metric.detail}</span></div>)}</div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EEF4] pt-3">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#44474D]">
                <UserRound size={16} className="text-[#0F2744]" />
                <span>
                  Director: Prof. (Dr.) Harwinder Singh, Ph.D. Biomechanics
                </span>
              </div>

              <button className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5FF] bg-[#F4F8FF] px-3 py-2 text-[12px] font-bold text-[#001229] transition-colors hover:bg-[#EAF1FF]">
                Book Chamber Slot
                <ArrowLeft size={14} strokeWidth={2.5} className="rotate-180" />
              </button>
            </div>
          </article>

          <article className="rounded-[12px] border border-[#D9E1EB] xl:col-span-1 bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-[3px] bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#021C39]">
                CORE FACILITY 02 • HYPOXIA
              </span>
              <Cloud strokeWidth={2.5} className="h-7 w-7 text-[#904D00]" />
            </div>

            <h3 className="mt-4 text-[1.1rem] font-bold leading-[1.4] tracking-[-0.04em] text-[#001229] md:text-[1.35rem]">
              High-Altitude Hypoxic Simulation &amp; Gas Exchange Lab
            </h3>

            <p className="mt-3 text-[0.85rem] leading-[1.7] text-[#44474D] md:text-[0.92rem]">
              Normobaric altitude induction suite replicating up to 4,500m (FiO₂
              adjustable from 20.9% to 11.2%). Features breath-by-breath Cosmed
              K5 wireless metabolic cart and Jaeger Oxycon Pro for accurate VO₂
              max, VT1/VT2 ventilatory threshold, and fat-max substrate
              oxidation calculation.
            </p>

            <div className="mt-4 rounded-[8px] bg-[#EFF4FF] p-3">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#001229]">
                <span className="font-medium">Simulated Max: 4,500m</span>
                <span className="font-bold text-[#904D00]">FiO₂: 11.2%</span>
              </div>
              <div className="mt-2 text-[11px] leading-[1.5] text-[#44474D]">
                Cosmed K5 wearable telemetry harness available for real-track
                evaluation.
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EEF4] pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
                Lead: Dr. Simrat Dhillon
              </span>
              <span className="rounded-[3px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#002D1C]">
                OPERATIONAL
              </span>
            </div>
          </article>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[12px] border border-[#D9E1EB] bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-[3px] bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#021C39]">
                CORE FACILITY 03 • METABOLISM
              </span>
              <Droplet strokeWidth={2.5} className="w-7 h-7 text-[#904D00]" />
            </div>

            <h3 className="mt-4 text-[1.1rem] font-bold leading-[1.4] tracking-[-0.04em] text-[#001229]">
              Exercise Biochemistry &amp; Lactate Profiling Unit
            </h3>

            <p className="mt-3 text-[0.85rem] leading-[1.7] text-[#44474D]">
              Automated Biosen C-Line analyzer and microplate readers for
              quantitative capillary lactate kinetics, creatine kinase (CK)
              cellular micro-trauma, cortisol/testosterone anabolic-catabolic
              balance, and acute hydration osmolality indices.
            </p>

            <div className="mt-4 rounded-[8px] bg-[#EFF4FF] p-3">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Lactate Curve Sampling:
                </span>
                <span className="font-bold text-[#001229]">
                  30-sec turnaround
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Bio-Marker Profiling:
                </span>
                <span className="font-bold text-[#001229]">
                  ELISA Multi-Plex
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EEF4] pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
                Lead: Dr. Gurpreet K. Sandhu
              </span>
              <span className="rounded-[3px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#002D1C]">
                NABL STANDARD
              </span>
            </div>
          </article>

          <article className="rounded-[12px] border border-[#D9E1EB] bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-[3px] bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#021C39]">
                CORE FACILITY 04 • NEUROMUSCULAR
              </span>
              <Bandage strokeWidth={2.5} className="h-7 w-7 text-[#904D00]" />
            </div>

            <h3 className="mt-4 text-[1.1rem] font-bold leading-[1.4] tracking-[-0.04em] text-[#001229]">
              Isokinetic Dynamometry &amp; ACL Risk Screening Lab
            </h3>

            <p className="mt-3 text-[0.85rem] leading-[1.7] text-[#44474D]">
              Anchored by the Biodex System 4 Pro multi-joint dynamometer.
              Provides automated concentric/eccentric torque ratios,
              hamstring-to-quadriceps (H:Q) bilateral strength asymmetries, and
              Return-to-Play clearance verification post-reconstruction.
            </p>

            <div className="mt-4 rounded-[8px] bg-[#EFF4FF] p-3">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Torque Range:
                </span>
                <span className="font-bold text-[#001229]">0 to 680 Nm</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Protocol Speed:
                </span>
                <span className="font-bold text-[#001229]">
                  Up to 500 deg/s
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EEF4] pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
                Lead: Dr. Rajeshwar Verma, PT
              </span>
              <span className="rounded-[3px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#002D1C]">
                REHAB CERTIFIED
              </span>
            </div>
          </article>

          <article className="rounded-[12px] border border-[#D9E1EB] bg-white p-4 shadow-[0_1px_0_rgba(15,39,68,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-[3px] bg-[#D4E3FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#021C39]">
                CORE FACILITY 05 • COGNITIVE
              </span>
              <BrainCog strokeWidth={2.5} className="h-7 w-7 text-[#904D00]" />
            </div>

            <h3 className="mt-4 text-[1.1rem] font-bold leading-[1.4] tracking-[-0.04em] text-[#001229]">
              Cognitive VR Training &amp; Reaction Time Suite
            </h3>

            <p className="mt-3 text-[0.85rem] leading-[1.7] text-[#44474D]">
              Senaptec Sensory Stations, high-frequency visual strobe goggles,
              Tobii Pro Glasses 3 wearable eye trackers, and Biofeedback HRV
              modules for measuring neuro-ocular saccades, decision velocity
              under acute fatigue, and visual reaction times.
            </p>

            <div className="mt-4 rounded-[8px] bg-[#EFF4FF] p-3">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Eye-Tracking Rate:
                </span>
                <span className="font-bold text-[#001229]">
                  100 Hz Binocular
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
                <span className="font-medium text-[#001229]">
                  Sensory Modalities:
                </span>
                <span className="font-bold text-[#001229]">
                  10 Visual Skills
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EEF4] pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#44474D]">
                Lead: Dr. Monica Bhasin
              </span>
              <span className="rounded-[3px] bg-[#DCE9FF] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#002D1C]">
                ACTIVE SUITE
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
export default ScienceLaboratories;
