import { NextResponse } from "next/server";
import { getCmsSection } from "@/lib/cmsClient";

const fallbackPillars = [
  {
    _id: "1",
    cardNumber: "01",
    creditRange: "48-64 Cr",
    title: "Discipline Specific Core (DSC)",
    description:
      "Fundamental pillars of Sports Sciences: Functional Anatomy, Sports Physiology, Advanced Kinesiology, Motor Learning, and Conditioning Practicums.",
    highlightText: "Mandatory Non-negotiable credits across all semesters.",
  },
  {
    _id: "2",
    cardNumber: "02",
    creditRange: "24-32 Cr",
    title: "Discipline Specific Elective (DSE)",
    description:
      "Targeted specializations: Talent Identification Protocols, Advanced Sports Nutrition, Para-Athletic Conditioning, or Advanced Match Analysis.",
    highlightText:
      "Selected from departmental elective pool in Semesters V to VIII.",
  },
  {
    _id: "3",
    cardNumber: "03",
    creditRange: "16-20 Cr",
    title: "Generic Open Electives (GE)",
    description:
      "Cross-disciplinary exposure open to university-wide learners: Sports Journalism, Sports Marketing, Ergonomics, and Community Wellness.",
    highlightText: "Inter-faculty mobility across MBSPU departments.",
  },
  {
    _id: "4",
    cardNumber: "04",
    creditRange: "20-24 Cr",
    title: "Practicum & Officiating Badges",
    description:
      "Direct technical certification: National Officiating Licenses, First Responder CPR/AED, Strength Training Apprenticeship, and Field Practicums.",
    highlightText:
      "Integrated partnership with National Sports Federations (NSFs).",
  },
];

export async function GET() {
  try {
    const academic = await getCmsSection("academic");
    if (academic?.choice?.pillars && academic.choice.pillars.length > 0) {
      return NextResponse.json({
        success: true,
        data: academic.choice.pillars,
      });
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    data: fallbackPillars,
  });
}
