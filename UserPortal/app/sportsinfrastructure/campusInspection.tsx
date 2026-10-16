"use client";

import {
  Scan,
  Compass,
  Plane,
  TrainFront,
  Hospital,
  Building2,
} from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

const campusImage = "/sportsInfrastructure/campus-360.svg";

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27549.35692887135!2d76.35293037431639!3d30.33191400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028e8dffff675%3A0xaf089160dcfa275!2sMohindra%20Kothi%20Museum!5e0!3m2!1sen!2sin!4v1791134289152!5m2!1sen!2sin";

const campusInspectionMockData = {
  nodes: [
    { id: 1, label: "Node A: Rekortan Finish Line" },
    { id: 2, label: "Node B: 50m Pool Deep Basin" },
    { id: 3, label: "Node C: Velodrome Bank 43°" },
    { id: 4, label: "Node D: Biomechanics Vicon Lab" },
    { id: 5, label: "Node E: Combat Arena" },
  ],
  corridors: [
    {
      id: 1,
      text: "Chandigarh International Airport (IXC): 58 km (via NH 7)",
    },
    {
      id: 2,
      text: "Patiala Junction Railway Station: 3.4 km",
    },
    {
      id: 3,
      text: "Govt. Medical College & Rajindra Hospital (Level 1 Trauma): 2.1 km",
    },
  ],
  sustainabilityStats: [
    { id: 1, label: "Clean Energy Share", value: "88.4% Net Power" },
    { id: 2, label: "Water Recycled", value: "4.2 Lakh L / Day" },
  ],
  mapEmbedUrl,
};
const corridorIcons = [Plane, TrainFront, Hospital];

const isCompleteInspection = (val: typeof campusInspectionMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.nodes) && val.nodes.length > 0 &&
    Array.isArray(val.corridors) && val.corridors.length > 0 &&
    Array.isArray(val.sustainabilityStats) && val.sustainabilityStats.length > 0
  );
};

export default function CampusInspection() {
  const data = useSectionApi<typeof campusInspectionMockData>(
    "sportsInfrastructure",
    "campusInspection",
    campusInspectionMockData,
    isCompleteInspection
  );
  return (
    <section className="w-full min-w-0 bg-[#F8F9FF] px-4 py-6 sm:px-5 sm:py-8 md:px-6 lg:px-8 lg:py-10">
      <div className="grid w-full min-w-0 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 rounded-lg bg-white p-3 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5">
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex min-w-0 items-start gap-2">
              <Scan size={24} className="mt-0.5 text-[#904D00]" />
              <div>
                <h2 className="break-words text-lg font-extrabold text-[#001229] sm:text-xl">
                  360° Virtual Campus &amp; Arena Tele-Inspection
                </h2>
                <p className="text-xs text-[#44474D]">
                  Full HDR Photogrammetry • Patiala Main Campus
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-sm bg-[#002D1C] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#6FFBBE]">
              Live Stitch
            </span>
          </div>

          <div className="relative mt-4 h-64 overflow-hidden rounded sm:h-80">
            <img
              src={campusImage}
              alt="MBSPSU campus 360 view"
              className="h-full w-full object-cover"
            />
            <button className="absolute left-1/2 top-1/2 flex w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-lg bg-[#001229]/90 px-3 py-2 text-center text-xs font-bold text-white hover:bg-[#001229] cursor-pointer sm:px-4 sm:text-sm">
              <Compass size={16} className="text-[#904D00]" />
              Enter 360° Interactive Walkthrough
            </button>
            <span className="absolute bottom-3 left-3 right-3 rounded bg-[#001229]/85 px-2 py-1 text-[10px] font-semibold text-white sm:right-auto sm:text-xs">
              Nodes: 38 Spheres • VR Headset Ready
            </span>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {data.nodes.map((node) => (
              <span
                key={node.id}
                className="shrink-0 rounded bg-[#E5EEFF] px-3 py-1.5 text-[11px] font-bold text-[#0B1C30]"
              >
                {node.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="min-w-0 rounded-lg bg-white p-3 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#904D00]">
                Campus Spatial Grid
              </p>
              <p className="text-xs font-medium text-[#44474D]">
                Zone 1-4 Enclave
              </p>
            </div>
            <h3 className="mt-3 text-base font-extrabold text-slate-900">
              Physical Location &amp; Ingress Corridors
            </h3>

            <div className="relative mt-3 h-45 overflow-hidden rounded border border-gray-100 bg-[#FFFFFF]">
              {data.mapEmbedUrl && (
                <iframe
                  src={data.mapEmbedUrl}
                  title="Campus map"
                  loading="lazy"
                  className="h-full w-full border-0"
                />
              )}
              <span className="absolute bottom-2 left-2 right-2 rounded-sm bg-[#0F2744E5] px-2 py-1 text-[10px] font-bold text-white sm:right-auto sm:text-[11px]">
                Mohindra Kothi Main Entrance: Lower Mall Road, Patiala, Punjab -
                147001
              </span>
            </div>

            <ul className="mt-3 space-y-1.5">
              {data.corridors.map((item, index) => {
                const Icon = corridorIcons[index % corridorIcons.length];
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 text-xs text-[#44474D]"
                  >
                    <Icon size={14} className="shrink-0 text-[#904D00]" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 rounded-lg bg-[#001229] p-3 text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] sm:p-5">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFDCC3]">
                <Building2 size={14} className="text-[#FFDCC3]" />
                Sustainable Stadium Benchmark
              </p>
              <span className="rounded-sm bg-[#002D1C] px-2 py-0.5 text-[10px] font-bold uppercase text-[#6FFBBE]">
                GRIHA 5-Star Rated
              </span>
            </div>
            <h3 className="mt-3 text-base font-extrabold">
              1.8 MW Rooftop Photovoltaic Grid &amp; Rainwater Harvesting
            </h3>
            <p className="mt-2 text-sm text-[#DCE9FF]">
              All 6 major arena roofs are lined with monocrystalline PERC solar
              arrays generating 2.4 GWh annually, making MBSPSU a net-negative
              carbon sporting facility. Infield aquifers recharge 100% of
              athletic stormwater into Patiala groundwater reserves.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {data.sustainabilityStats.map((stat) => (
                <div key={stat.id} className="rounded bg-[#0F2744] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase text-[#DCE9FF]">
                    {stat.label}
                  </p>
                  <p className="text-sm font-extrabold text-[#6FFBBE]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
