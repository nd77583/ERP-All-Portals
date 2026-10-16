"use client";

import { useEffect, useState } from "react";
import { getDualCards } from "../api/academic/DualCards"; 
import { getCouncilNotes } from "../api/academic/CouncilCorousel";
import { getCmsSection } from "@/lib/cmsClient";

type SupportCard = {
  _id?: string;
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  highlightText: string;
};

const supportCards: SupportCard[] = [
  {
    icon: "/programmeCard/calander.png",
    alt: "Calendar",
    title: "LMS Offline Modules",
    subtitle: "Asynchronous Learning",
    description:
      "Encrypted course packs accessible on mobile tablets without persistent internet. Video lectures, micro-assignments, and lab manuals synchronized during travel.",
    highlightText: "Pre-loaded offline e-Library access.",
  },
  {
    icon: "/programmeCard/pc.png",
    alt: "Computer",
    title: "LMS Offline Modules",
    subtitle: "Asynchronous Learning",
    description:
      "Encrypted course packs accessible on mobile tablets without persistent internet. Video lectures, micro-assignments, and lab manuals synchronized during travel.",
    highlightText: "Pre-loaded offline e-Library access.",
  },
  {
    icon: "/programmeCard/checklist.png",
    alt: "Attendance checklist",
    title: "Attendance Remission",
    subtitle: "Official Duty (OD) Quota",
    description:
      "Direct institutional conversion of verified SAI/Sports Department duty slips into 100% statutory classroom attendance records on the university ERP ledger.",
    highlightText: "ERP automated sync via Dean Sports.",
  },
  {
    icon: "/programmeCard/brain2.png",
    alt: "Mentorship",
    title: "Dedicated Mentorship",
    subtitle: "1-on-1 Faculty Fellows",
    description:
      "Every elite student-athlete is paired with a designated Academic Counselor who manages their submission windows, tutoring sessions, and credit portability.",
    highlightText: "Weekly video check-in while in camp.",
  },
];

const councilNotes = [
  {
    _id : "1",
    councilTitle: "ACADEMIC COUNCIL MINUTE NOTE",
    referenceNumber: "FR-ACAD-07",
    note:
      "Registered university athletes representing India or Punjab at approved senior/junior circuits are entitled to special examination sessions, asynchronous digital note-sheets, and 100% attendance credit for sanctioned preparatory camps.",
    signedBy: "Signed: Registrar, MBSPSU Patiala",
    hashValue: "SHA-256: 4f8a...9c2e",
  },
  {
    _id: "2",
    councilTitle: "ACADEMIC COUNCIL MINUTE NOTE",
    referenceNumber: "FR-ACAD-08",
    note:
      "Students selected for sanctioned national or international assignments may request flexible submission windows and designated academic counseling throughout their travel period.",
    signedBy: "Signed: Dean, Academic Affairs",
    hashValue: "SHA-256: 7b21...a6d4",
  },
];

const Dual = () => {
  const [cardsData, setCardsData] = useState(supportCards);
  const [notesData, setNotesData] = useState(councilNotes);
  const [activeNote, setActiveNote] = useState(0);
  const [policyMeta, setPolicyMeta] = useState({
    tag: "STATUTORY PROTOCOL FR-ACAD-07",
    heading: "Dual-Career Athlete Academic Support Framework",
    description:
      "In strict compliance with the Olympic Charter and Punjab Sports Policy, MBSPSU guarantees that no national or international athlete faces academic penalty due to national coaching camps, Khelo India, or international assignments.",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academic = await getCmsSection("academic");
        if (academic?.dualCareer) {
          if (Array.isArray(academic.dualCareer.supportCards) && academic.dualCareer.supportCards.length > 0) {
            setCardsData(academic.dualCareer.supportCards);
          }
          if (Array.isArray(academic.dualCareer.councilNotes) && academic.dualCareer.councilNotes.length > 0) {
            setNotesData(academic.dualCareer.councilNotes);
          }
          setPolicyMeta({
            tag: academic.dualCareer.tag || "STATUTORY PROTOCOL FR-ACAD-07",
            heading: academic.dualCareer.heading || "Dual-Career Athlete Academic Support Framework",
            description:
              academic.dualCareer.description ||
              "In strict compliance with the Olympic Charter and Punjab Sports Policy, MBSPSU guarantees that no national or international athlete faces academic penalty due to national coaching camps, Khelo India, or international assignments.",
          });
          return;
        }

        const [cardsRes, notesRes] = await Promise.allSettled([
          getDualCards(),
          getCouncilNotes(),
        ]);

        if (cardsRes.status === "fulfilled") {
          const list = cardsRes.value?.data;

          if (Array.isArray(list) && list.length > 0) {
            setCardsData(list);
          }
        }

        if (notesRes.status === "fulfilled") {
          const list = notesRes.value?.data;

          if (Array.isArray(list) && list.length > 0) {
            setNotesData(list);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const currentNote = notesData[activeNote] || notesData[0] || councilNotes[0];

  useEffect(() => {
    if (notesData.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveNote((current) => (current + 1) % notesData.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [notesData.length]);

  return (
    <section className="flex w-full flex-col items-start bg-[#EFF4FF] px-[16px] py-[20px] sm:px-[20px] sm:py-[24px]">
      <div className="m-2 grid w-full grid-cols-1 gap-[12px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.28fr)]">
        {/* container */}
        <div className="flex min-w-0 flex-col items-start gap-[8px] pb-[8px] lg:pb-[42px]">
          <div className="flex w-full flex-col items-start">
            <div className="rounded-[2px] bg-[#001229] px-[4px] py-[2px]">
              <h1 className="font-[Inter] text-[10px] font-bold uppercase leading-[12px] tracking-[0.5px] text-[#FFFFFF]">
                {policyMeta.tag}
              </h1>
            </div>
          </div>
          {/* Heading 2 */}
          <div className="flex w-full flex-col items-start">
            <h2 className="w-full font-[Public_Sans] text-[24px] font-bold leading-[30px] tracking-[-0.48px] text-[#001229] sm:text-[28px] sm:leading-[34px] lg:text-[32px] lg:leading-[40px] lg:tracking-[-0.64px]">
              {policyMeta.heading}
            </h2>
          </div>
          <div className="flex w-full flex-col items-start">
            <p className="w-full font-[Public_Sans] text-[12px] font-normal leading-[18px] text-[#44474D] sm:text-[13px]">
              {policyMeta.description}
            </p>
          </div>
          <div className="flex w-full flex-col items-start pt-[8px]">
            <div className="box-border flex w-full flex-col gap-[4px] rounded-[2px] border-l-[4px] border-[#4EDEA3] bg-white p-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col items-start justify-between gap-[4px] sm:flex-row sm:items-center">
                <span className="flex items-center gap-[4px] font-[Inter] text-[10px] font-bold uppercase tracking-[0.5px] text-[#002D1C]">
                  <img
                    src="/programmeCard/paper.png"
                    alt=""
                    className="inline-block h-[12px] w-[12px]"
                  />
                  {currentNote.councilTitle}
                </span>
                <span className="font-[Inter] text-[12px] font-medium leading-[16px] text-[#44474D]">
                  {currentNote.referenceNumber}
                </span>
              </div>
              <p className="w-full font-[Public_Sans] text-[12px] italic leading-[16px] text-[#0B1C30]">
                &ldquo;{currentNote.note}&rdquo;
              </p>
              <div className="flex w-full flex-col items-start justify-between gap-[4px] font-[Inter] text-[10px] font-bold tracking-[0.5px] text-[#44474D] sm:flex-row sm:items-center">
                <span>{currentNote.signedBy}</span>
                <span className="text-[12px] font-medium tracking-normal">
                  {currentNote.hashValue}
                </span>
              </div>
              <div className="flex w-full items-center justify-between pt-[4px]" aria-label="Academic council note carousel controls">
                <button
                  type="button"
                  onClick={() => setActiveNote((activeNote - 1 + notesData.length) % notesData.length)}
                  className="rounded-[2px] px-[6px] py-[2px] font-[Inter] text-[10px] font-bold text-[#0B1C30] hover:bg-[#E5EEFF]"
                  aria-label="Previous note"
                >
                  Previous
                </button>
                <div className="flex gap-[4px]">
                  {notesData.map((noteItem, index) => (
                    <button
                      key={noteItem.referenceNumber || noteItem._id || index}
                      type="button"
                      onClick={() => setActiveNote(index)}
                      className={`h-[6px] w-[6px] rounded-full ${index === activeNote ? "bg-[#0B1C30]" : "bg-[#B9C5D6]"}`}
                      aria-label={`Show note ${index + 1}`}
                      aria-current={index === activeNote}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNote((activeNote + 1) % notesData.length)}
                  className="rounded-[2px] px-[6px] py-[2px] font-[Inter] text-[10px] font-bold text-[#0B1C30] hover:bg-[#E5EEFF]"
                  aria-label="Next note"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* aqntainer2 */}
        <div className="grid min-w-0 grid-cols-1 gap-[12px] sm:grid-cols-2">
          {cardsData.map((card, index) => (
            <div
              key={card._id || (card.icon ? `${card.icon}-${index}` : index)}
              className="flex h-[170px] min-h-[154px] flex-col items-start justify-between rounded-[2px] bg-white p-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex w-full items-center gap-[8px] pb-[4px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[2px] bg-[#0F2744] text-white">
                  <img src={card.icon} width={24} height={24} alt={card.alt || ""} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-[Public_Sans] text-[16px] font-bold leading-[24px] text-[#001229]">
                    {card.title}
                  </h3>
                  <span className="font-[Inter] text-[10px] font-bold tracking-[0.5px] text-[#904D00]">
                    {card.subtitle}
                  </span>
                </div>
              </div>
              <p className="h-[64px] w-full font-[Public_Sans] text-[12px] leading-[16px] text-[#44474D]">
                {card.description}
              </p>
              <div className="flex w-full items-start pt-[8px]">
                <span className="w-full rounded-[2px] bg-[#E5EEFF] p-[4px] font-[Inter] text-[10px] font-bold tracking-[0.5px] text-[#0B1C30]">
                  {card.highlightText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dual;
