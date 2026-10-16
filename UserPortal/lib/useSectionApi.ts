"use client";

import { useEffect, useState } from "react";

export type PortalPageApi = "home" | "about" | "sportsInfrastructure" | "researchAndLabs";
const hasApiData = <T,>(value: T) => value != null;

export async function fetchSectionApi<T>(page: PortalPageApi, section: string): Promise<T> {
  const pageRouteMap: Record<PortalPageApi, string> = {
    home: "Dashboard",
    about: "About",
    sportsInfrastructure: "SportsInfrastructure",
    researchAndLabs: "researchandlabs",
  };
  const routeBase = pageRouteMap[page] || page;
  const directEndpoint = `/api/${routeBase}/${section}`;

  let response: Response;
  try {
    response = await fetch(directEndpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Direct endpoint ${directEndpoint} returned status ${response.status}`);
    }
  } catch {
    // Fallback to page-sections query route
    const fallbackEndpoint = `/api/page-sections?page=${encodeURIComponent(page)}&section=${encodeURIComponent(section)}`;
    response = await fetch(fallbackEndpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`Section API failed (${response.status})`);
  }

  const result: { success?: boolean; data?: T } = await response.json();
  if (!result.success || result.data == null) throw new Error("Section API returned no data");
  return result.data;
}

/** Fetch one section endpoint and keep the component's local mock as the fallback. */
export function useSectionApi<T>(
  page: PortalPageApi,
  section: string,
  mock: T,
  isComplete: (value: T) => boolean = hasApiData,
): T {
  const [content, setContent] = useState<T>(mock);

  useEffect(() => {
    let active = true;
    fetchSectionApi<T>(page, section)
      .then((data) => {
        if (active && isComplete(data)) {
          setContent(data);
        }
      })
      .catch(() => {
        // Keeps the initial mock data if the API fails or is incomplete
      });

    return () => {
      active = false;
    };
  }, [page, section, isComplete]);

  return content;
}
