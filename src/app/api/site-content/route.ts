/**
 * Site content collection API.
 *
 * This endpoint lists available section names and exposes the high-level API surface for
 * the page content system. It is useful when the UI needs to discover which content
 * resources are available before fetching them.
 */

import { NextResponse } from "next/server";
import { listSiteContentSections } from "@/server/site-content-store";

export async function GET() {
  const sections = await listSiteContentSections();

  return NextResponse.json({
    ok: true,
    backend: "next",
    sections,
  });
}
