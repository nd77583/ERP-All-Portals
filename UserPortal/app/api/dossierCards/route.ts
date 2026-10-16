import { NextResponse } from "next/server";
import { getCmsSection } from "@/lib/cmsClient";

const fallbackDossierCards = [
  {
    _id: "doss-1",
    title: "Ordinance Vol. II",
    description: "Rules for Award of Degrees (2025)",
    fileUrl: "#",
    icon: "/programmeCard/book.png",
  },
  {
    _id: "doss-2",
    title: "NEP Credit Transfer",
    description: "Academic Bank of Credits (ABC) Guide",
    fileUrl: "#",
    icon: "/programmeCard/shield.png",
  },
  {
    _id: "doss-3",
    title: "Sports Quota Bylaws",
    description: "Gradation & Verification Rules",
    fileUrl: "#",
    icon: "/programmeCard/hand.png",
  },
];

export async function GET() {
  try {
    const academic = await getCmsSection("academic");
    if (academic?.calendar?.dossierCards && academic.calendar.dossierCards.length > 0) {
      return NextResponse.json({
        success: true,
        data: academic.calendar.dossierCards,
      });
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    data: fallbackDossierCards,
  });
}
