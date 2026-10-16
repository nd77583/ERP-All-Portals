import { NextResponse } from "next/server";
import { getCmsSection } from "@/lib/cmsClient";

const fallbackCouncilNotes = [
  {
    _id: "1",
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

export async function GET() {
  try {
    const academic = await getCmsSection("academic");
    if (academic?.dualCareer?.councilNotes && academic.dualCareer.councilNotes.length > 0) {
      return NextResponse.json({
        success: true,
        data: academic.dualCareer.councilNotes,
      });
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    data: fallbackCouncilNotes,
  });
}
