import fallbackStore from "../data/cms-store.json";
import { CmsStore } from "./cms-types";

// Keep one in-flight/completed CMS request per section in the browser. Page
// sections mount independently, but they should share the page's single read.
const sectionRequests = new Map<keyof CmsStore, Promise<unknown>>();

function getBrowserSection<K extends keyof CmsStore>(section: K): Promise<CmsStore[K]> {
  let request = sectionRequests.get(section);
  if (!request) {
    request = fetch(`/api/cms?section=${encodeURIComponent(String(section))}`, {
      cache: "no-store",
    }).then(async (res) => {
      if (!res.ok) throw new Error(`CMS request failed (${res.status})`);
      const json = await res.json();
      if (!json.success || json.data == null) throw new Error("CMS response has no data");
      return json.data as CmsStore[K];
    });
    sectionRequests.set(section, request);
    request.catch(() => sectionRequests.delete(section));
  }
  return request as Promise<CmsStore[K]>;
}

export async function getCmsStore(): Promise<CmsStore> {
  // If in browser, try fetching from API endpoint or use fallback
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data as CmsStore;
        }
      }
    } catch {
      // Fallback to static bundled store
    }
  }

  // On server side or fallback
  try {
    if (typeof window === "undefined") {
      const fs = await import("fs");
      const path = await import("path");
      const sharedPath = path.resolve(process.cwd(), "..", "shared-cms-store.json");
      if (fs.existsSync(sharedPath)) {
        const content = fs.readFileSync(sharedPath, "utf-8");
        return JSON.parse(content) as CmsStore;
      }
    }
  } catch {
    // ignore
  }

  return fallbackStore as unknown as CmsStore;
}

export async function getCmsSection<K extends keyof CmsStore>(
  section: K
): Promise<CmsStore[K]> {
  if (typeof window !== "undefined") {
    try {
      return await getBrowserSection(section);
    } catch {
      // Use the bundled mock data when the API is unavailable.
      return (fallbackStore as unknown as CmsStore)[section];
    }
  }
  const store = await getCmsStore();
  return store[section];
}
