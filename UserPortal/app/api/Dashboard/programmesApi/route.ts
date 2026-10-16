import { getPageSectionResponse } from "@/lib/api/pageSectionResponse";
export async function GET() { return getPageSectionResponse("home", "programmes"); }
