import { getPageSectionResponse } from "@/lib/api/pageSectionResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> | { section: string } }
) {
  const resolved = await params;
  return getPageSectionResponse("sportsInfrastructure", resolved.section);
}
