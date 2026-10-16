import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import fallbackStore from "@/data/cms-store.json";

export type PageKey = "home" | "about" | "sportsInfrastructure" | "researchAndLabs";

const sectionAliases: Record<PageKey, Record<string, string>> = {
  home: {
    erpdispatch: "erpDispatch",
    erpdispatchapi: "erpDispatch",
    herosection: "heroSection",
    herosectionapi: "heroSection",
    noticeboard: "noticeBoard",
    noticeboardapi: "noticeBoard",
    programmes: "programmes",
    programmesapi: "programmes",
    frontdesk: "frontDesk",
    frontdeskapi: "frontDesk",
    infrastructure: "infrastructure",
    infrastructureapi: "infrastructure",
    accessibilitybanner: "accessibilityBanner",
    banner: "accessibilityBanner",
    bannerapi: "accessibilityBanner",
  },
  about: {
    herobanner: "heroBanner",
    herobannerapi: "heroBanner",
    fastfacts: "fastFacts",
    fastfactsapi: "fastFacts",
    vicechancellormessage: "viceChancellorMessage",
    vicechancellormessageapi: "viceChancellorMessage",
    historicallegacy: "historicalLegacy",
    historicallegacyapi: "historicalLegacy",
    governancebodies: "governanceBodies",
    governancebodiesapi: "governanceBodies",
    corestrategies: "coreStrategies",
    corestrategiesapi: "coreStrategies",
    campusmasterplan: "campusMasterplan",
    campusmasterplanapi: "campusMasterplan",
    statutoryaffiliations: "statutoryAffiliations",
    statutoryaffiliationsapi: "statutoryAffiliations",
    calltoaction: "callToAction",
    calltoactionapi: "callToAction",
  },
  sportsInfrastructure: {
    heroheader: "heroHeader",
    heroheaderapi: "heroHeader",
    hero: "heroHeader",
    facilityselector: "facilitySelector",
    facilityselectorapi: "facilitySelector",
    trackandfield: "trackAndField",
    trackandfieldapi: "trackAndField",
    aquaticscomplex: "aquaticsComplex",
    aquaticscomplexapi: "aquaticsComplex",
    sportsfacilities: "sportsFacilities",
    sportsfacilitiesapi: "sportsFacilities",
    facilities: "sportsFacilities",
    arenaallocation: "arenaAllocation",
    arenaallocationapi: "arenaAllocation",
    tariffrules: "arenaAllocation",
    campusinspection: "campusInspection",
    campusinspectionapi: "campusInspection",
  },
  researchAndLabs: {
    herosection: "heroSection",
    herosectionapi: "heroSection",
    hero: "heroSection",
    sportsstats: "sportsStats",
    sportsstatsapi: "sportsStats",
    metrics: "sportsStats",
    sciencelaboratories: "scienceLaboratories",
    sciencelaboratoriesapi: "scienceLaboratories",
    laboratories: "scienceLaboratories",
    nationalresearchgrants: "nationalResearchGrants",
    nationalresearchgrantsapi: "nationalResearchGrants",
    grants: "nationalResearchGrants",
    academicpublications: "academicPublications",
    academicpublicationsapi: "academicPublications",
    slotbooking: "slotBooking",
    slotbookingapi: "slotBooking",
    statutorycompliance: "statutoryCompliance",
    statutorycomplianceapi: "statutoryCompliance",
  },
};

function readStore(): Record<string, unknown> {
  const sharedPath = path.resolve(process.cwd(), "..", "shared-cms-store.json");
  const localPath = path.resolve(process.cwd(), "data", "cms-store.json");
  for (const filePath of [sharedPath, localPath]) {
    try {
      if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
    } catch {
      // Try next or fallback
    }
  }
  return fallbackStore as unknown as Record<string, unknown>;
}

export function getPageSectionResponse(page: PageKey, section: string) {
  const cleanKey = section.toLowerCase().replace(/[-_]/g, "");
  const canonicalSection = sectionAliases[page]?.[cleanKey] || section;

  const pageData = readStore()[page] as Record<string, unknown> | undefined;
  if (!pageData || typeof pageData !== "object") {
    return NextResponse.json({ success: false, error: `No backend data configured for page ${page}`, data: null }, { status: 404 });
  }

  // Look up by canonical name, raw section name, or alias
  let data = pageData[canonicalSection];
  if (data === undefined) {
    data = pageData[section];
  }
  if (data === undefined) {
    return NextResponse.json({ success: false, error: `No backend data configured for ${page}.${section}`, data: null }, { status: 404 });
  }

  return NextResponse.json({ success: true, data });
}
