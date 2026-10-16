import { getPageSectionResponse, type PageKey } from "@/lib/api/pageSectionResponse";

const validPages: PageKey[] = ["home", "about", "sportsInfrastructure", "researchAndLabs"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") as PageKey | null;
  const section = searchParams.get("section");
  if (!page || !section || !validPages.includes(page)) {
    return Response.json({ success: false, error: "Unknown page section", data: null }, { status: 404 });
  }
  return getPageSectionResponse(page, section);
}
