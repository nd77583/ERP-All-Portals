import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import fallbackStore from "@/data/cms-store.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    let store = fallbackStore;
    const sharedPath = path.resolve(process.cwd(), "..", "shared-cms-store.json");
    const localPath = path.resolve(process.cwd(), "data", "cms-store.json");

    if (fs.existsSync(sharedPath)) {
      try {
        store = JSON.parse(fs.readFileSync(sharedPath, "utf-8"));
      } catch {
        // use fallback
      }
    } else if (fs.existsSync(localPath)) {
      try {
        store = JSON.parse(fs.readFileSync(localPath, "utf-8"));
      } catch {
        // use fallback
      }
    }

    if (section && section in store) {
      return NextResponse.json({
        success: true,
        data: (store as Record<string, unknown>)[section],
      });
    }

    return NextResponse.json({
      success: true,
      data: store,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Error reading CMS" },
      { status: 500 }
    );
  }
}
