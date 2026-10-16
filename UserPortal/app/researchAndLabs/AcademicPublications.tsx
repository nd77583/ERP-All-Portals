"use client";

import { FileType2 } from "lucide-react";
import { useSectionApi } from "@/lib/useSectionApi";

const academicPublicationsMockData = [
  { title: "Angular Velocity of Pelvic-Lumbar Axis in Elite Compound Archery", doi: "10.1016/j.jbiomech.2024.112089", faculty: "Dr. H. Singh, Er. Manjit Rai", orcid: "0000-0002-8812-9923", journal: "Journal of Biomechanics", quartile: "Q1 Index", impact: "3.42", citations: "99" },
  { title: "Electromyographic Asymmetry During Deep Squat Cleans in Junior Weightlifters", doi: "10.1080/02640414.2024.2384910", faculty: "Dr. R. Verma, Navjot Kaur", orcid: "0000-0003-1244-0199", journal: "Journal of Sports Sciences", quartile: "Q1 Index", impact: "3.89", citations: "99" },
  { title: "Thermal Stress & Electrolyte Depletion Kinetics in Kabbadi Athletes Under High Humidity", doi: "10.1007/s00421-024-05541-x", faculty: "Dr. S. Dhillon, Dr. Gurpreet K.", orcid: "0000-0003-5552-7721", journal: "European Journal of Applied Physiology", quartile: "Q2 Index", impact: "2.98", citations: "99" },
];

const isCompleteAcademicPublications = (value: typeof academicPublicationsMockData) =>
  Array.isArray(value) && value.length > 0 && value.every((item) => Boolean(item.title && item.doi));

export default function AcademicPublications() {
  const publications = useSectionApi(
    "researchAndLabs",
    "academicPublications",
    academicPublicationsMockData,
    isCompleteAcademicPublications,
  );

  return <section className="w-full min-w-0 bg-[#F5F7FA] px-4 py-6 sm:px-5 md:px-6 lg:px-8"><div className="w-full min-w-0"><div className="mb-5 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div className="min-w-0"><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904D00]">ACADEMIC PUBLICATIONS</span><h3 className="mt-3 break-words text-[1.65rem] font-bold leading-[1.1] tracking-[-0.06em] text-[#001229] sm:text-[2rem] md:text-[2.2rem]">Peer-Reviewed Sports Science Repository</h3><p className="mt-2 max-w-[860px] text-[0.95rem] leading-[1.6] text-[#44474D]">Scopus and PubMed indexed scholarly output authored by university faculty, doctoral fellows, and visiting sports scientists.</p></div><div className="flex w-full min-w-0 items-center gap-2 lg:max-w-[360px]"><input type="text" placeholder="Search by DOI, Keyword, or Author..." className="h-10 min-w-0 flex-1 rounded-[4px] border border-[#D5DDE7] bg-white px-3 text-[0.82rem] text-[#001229] outline-none placeholder:text-[#707B8C]"/><button className="h-10 shrink-0 rounded-[4px] bg-[#001229] px-4 text-[0.78rem] font-bold uppercase tracking-[0.5px] text-white">Search</button></div></div>
    <div className="overflow-x-auto rounded-[10px] border border-[#D9E1EB] bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)]"><table className="w-full min-w-[980px] border-separate border-spacing-0"><thead><tr className="bg-[#F8FAFC]">{["Title & DOI", "Lead Faculty", "Journal & Quartile", "Impact Factor", "Actions"].map((heading) => <th key={heading} className="border-b border-[#E4EAF1] px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.55px] text-[#001229]">{heading}</th>)}</tr></thead><tbody>{publications.map((publication) => <tr key={publication.doi} className="align-top"><td className="border-b border-[#EEF2F6] px-4 py-4 text-[0.9rem] font-bold leading-[1.4] text-[#001229]">{publication.title}<span className="mt-1 block text-[11px] font-normal text-[#44474D]">doi:{publication.doi}</span></td><td className="border-b border-[#EEF2F6] px-4 py-4 text-[0.9rem] text-[#0B1C30]">{publication.faculty}<span className="mt-1 block text-[11px] text-[#904D00]">ORCID: {publication.orcid}</span></td><td className="border-b border-[#EEF2F6] px-4 py-4 text-[0.9rem] text-[#0B1C30]">{publication.journal}<span className="ml-2 inline-flex rounded-[3px] bg-[#002D1C] px-2 py-0.75 text-[10px] font-bold uppercase text-[#6FFBBE]">{publication.quartile}</span></td><td className="border-b border-[#EEF2F6] px-4 py-4 text-[0.95rem] font-bold text-[#001229]">{publication.impact}</td><td className="border-b border-[#EEF2F6] px-4 py-4"><div className="flex items-center gap-2"><button aria-label={`Open ${publication.title}`} className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#E5EEFF] text-[#001229]"><FileType2 size={15}/></button><button className="flex h-8 min-w-8 items-center justify-center rounded-[4px] bg-[#E5EEFF] px-2 text-[0.8rem] font-bold text-[#001229]">{publication.citations}</button></div></td></tr>)}</tbody></table></div>
  </div></section>;
}
