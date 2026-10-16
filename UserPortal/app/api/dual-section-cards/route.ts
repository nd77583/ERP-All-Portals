import { NextResponse } from "next/server";
import { getCmsSection } from "@/lib/cmsClient";

const fallbackCards = [
  {
    _id: "1",
    icon: "/programmeCard/calander.png",
    alt: "Calendar",
    title: "LMS Offline Modules",
    subtitle: "Asynchronous Learning",
    description:
      "Encrypted course packs accessible on mobile tablets without persistent internet. Video lectures, micro-assignments, and lab manuals synchronized during travel.",
    highlightText: "Pre-loaded offline e-Library access.",
  },
  {
    _id: "2",
    icon: "/programmeCard/pc.png",
    alt: "Computer",
    title: "LMS Offline Modules",
    subtitle: "Asynchronous Learning",
    description:
      "Encrypted course packs accessible on mobile tablets without persistent internet. Video lectures, micro-assignments, and lab manuals synchronized during travel.",
    highlightText: "Pre-loaded offline e-Library access.",
  },
  {
    _id: "3",
    icon: "/programmeCard/checklist.png",
    alt: "Attendance checklist",
    title: "Attendance Remission",
    subtitle: "Official Duty (OD) Quota",
    description:
      "Direct institutional conversion of verified SAI/Sports Department duty slips into 100% statutory classroom attendance records on the university ERP ledger.",
    highlightText: "ERP automated sync via Dean Sports.",
  },
  {
    _id: "4",
    icon: "/programmeCard/brain2.png",
    alt: "Mentorship",
    title: "Dedicated Mentorship",
    subtitle: "1-on-1 Faculty Fellows",
    description:
      "Every elite student-athlete is paired with a designated Academic Counselor who manages their submission windows, tutoring sessions, and credit portability.",
    highlightText: "Weekly video check-in while in camp.",
  },
];

export async function GET() {
  try {
    const academic = await getCmsSection("academic");
    if (academic?.dualCareer?.supportCards && academic.dualCareer.supportCards.length > 0) {
      return NextResponse.json({
        success: true,
        data: academic.dualCareer.supportCards,
      });
    }
  } catch {
    // fallback
  }

  return NextResponse.json({
    success: true,
    data: fallbackCards,
  });
}
