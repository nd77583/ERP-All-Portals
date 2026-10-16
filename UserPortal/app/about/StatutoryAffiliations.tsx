"use client";

import { useSectionApi } from "@/lib/useSectionApi";

const statutoryAffiliationsMockData = {
  affiliations: [
    {
      acronym: "UGC",
      status: "VERIFIED",
      title: "UGC Section 2(f)",
      description:
        "Fully notified by University Grants Commission to confer degrees under Section 22 of the UGC Act, 1956.",
      reference: "Gazette Ref: F.9-18/2019(CPP-I/PU)",
    },
    {
      acronym: "AIU",
      status: "MEMBER",
      title: "Assoc. of Indian Universities",
      description:
        "Full regular membership entitling participation and hosting rights for all Inter-University All-India sports championships.",
      reference: "Member ID: AIU-ST-PB-119",
    },
    {
      acronym: "SAI",
      status: "ACTIVE MOU",
      title: "Sports Authority of India",
      description:
        "Bilateral technical pact with Netaji Subhas National Institute of Sports (NSNIS) Patiala for shared biomechanical facilities.",
      reference: "Pact Term: 2021–2031 (10-Yr)",
    },
    {
      acronym: "NCOE",
      status: "ACCREDITED",
      title: "Khelo India State NCOE",
      description:
        "Recognized National Centre of Excellence in Athletics, Fencing, Cycling, and Weightlifting with central sports scholarships.",
      reference: "Status: Tier-1 Hub",
    },
  ],
  roadmap: {
    title: "NAAC Accreditation Preparedness Roadmap",
    subtitle:
      "Internal Quality Assurance Cell (IQAC) Continuous Monitoring Matrix",
    submission: "Cycle 1 Submission: Q3 2025",
    readinessLabel: "Overall Statutory Institutional Benchmark Readiness",
    readiness: 82,
  },
  criteria: [
    { name: "CRITERION I: CURRICULAR", result: "95% (Aligned NEP)" },
    { name: "CRITERION II: TEACHING", result: "88% (Student Ratio 1:12)" },
    { name: "CRITERION III: RESEARCH", result: "78% (CapEx Deployed)" },
    { name: "CRITERION IV: INFRA", result: "90% (Olympic Class)" },
  ],
};

const isCompleteAffiliations = (val: typeof statutoryAffiliationsMockData): boolean => {
  return Boolean(
    val &&
    Array.isArray(val.affiliations) && val.affiliations.length > 0 &&
    val.roadmap && typeof val.roadmap.readiness === "number" &&
    Array.isArray(val.criteria) && val.criteria.length > 0
  );
};

export default function StatutoryAffiliations() {
  const data = useSectionApi<typeof statutoryAffiliationsMockData>(
    "about",
    "statutoryAffiliations",
    statutoryAffiliationsMockData,
    isCompleteAffiliations
  );
  return (
    <section className="w-full bg-[#EFF4FF] px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#904D00]">
            REGULATORY STANDING
          </span>
          <h2 className="mt-2 text-[24px] font-bold leading-[1.12] text-[#001229] sm:text-[30px] md:text-[34px] lg:text-[42px]">
            Accreditations, MoUs &amp; Statutory Affiliations
          </h2>
          <p className="mt-3 max-w-[1200px] text-[13px] leading-[1.7] text-[#44474D] md:text-[15px]">
            Complete statutory alignment with apex national and international
            collegiate bodies.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.affiliations.map((item) => (
            <article
              key={item.acronym}
              className="flex flex-col justify-between min-w-0 w-full rounded-[4px] border border-[#DDE5F0] bg-white p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"
            >
              <div>
                <div className="mb-3.5 flex items-center justify-between gap-2.5">
                  <span className="rounded-[2px] bg-[#E5EEFF] px-2.5 py-1 text-[13px] font-bold uppercase tracking-[0.02em] text-[#001229]">
                    {item.acronym}
                  </span>
                  <span
                    className={`rounded-[2px] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.04em] ${item.status === "ACTIVE MOU" ? "bg-[#904D00] text-white" : "bg-[#002D1C] text-[#6FFBBE]"}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold leading-[1.4] text-[#001229]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[12px] leading-[1.7] text-[#44474D]">
                  {item.description}
                </p>
              </div>
              <span className="mt-3 block text-[11px] font-medium text-[#44474D]">
                {item.reference}
              </span>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-[4px] border border-[#DDE5F0] bg-white p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[15px] font-bold leading-[1.3] text-[#001229] sm:text-[16px]">
                {data.roadmap.title}
              </h3>
              <span className="mt-0.5 block text-[12px] text-[#44474D]">
                {data.roadmap.subtitle}
              </span>
            </div>
            <div className="self-start rounded-[2px] bg-[#E5EEFF] px-3 py-1.5 text-[12px] font-bold text-[#001229] md:self-auto">
              {data.roadmap.submission}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0B1C30]">
                {data.roadmap.readinessLabel}
              </span>
              <span className="text-[10px] font-bold uppercase text-[#904D00]">
                {data.roadmap.readiness}% Completed
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-[2px] bg-[#E5EEFF]">
              <div
                className="absolute left-0 top-0 h-full rounded-[2px] bg-linear-to-r from-[#001229] via-[#904D00] to-[#FE932C]"
                style={{ width: `${data.roadmap.readiness}%` }}
              />
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {data.criteria.map((criterion) => (
              <div
                key={criterion.name}
                className="rounded-[2px] bg-[#EFF4FF] p-3"
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-[#44474D]">
                  {criterion.name}
                </span>
                <span className="mt-1 block text-[12px] font-bold text-[#001229]">
                  {criterion.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
