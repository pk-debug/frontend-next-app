/**
 * Site content API route.
 *
 * This route exposes screen content as data, so the frontend can fetch from the backend
 * instead of relying entirely on static imports. It supports create, read, update, and
 * delete operations for each content section, which makes the pattern match a real API.
 */

import { NextResponse } from "next/server";
import { normalizeSiteContentBackendMode } from "@/features/site-content/site-content-backend-modes";
import {
  getSectionContentByMode,
  saveSectionContentByMode,
  updateSectionContentByMode,
  deleteSectionContentByMode,
} from "@/server/site-content-backend";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  const backendMode = normalizeSiteContentBackendMode(new URL(request.url).searchParams.get("backend"));
  const response = await getSectionContentByMode(section, backendMode);

  return NextResponse.json(response);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  const body = await request.json().catch(() => ({}));
  const backendMode = normalizeSiteContentBackendMode(new URL(request.url).searchParams.get("backend"));

  const response = await saveSectionContentByMode(section, body, backendMode);

  return NextResponse.json(response, { status: 201 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  const body = await request.json().catch(() => ({}));
  const backendMode = normalizeSiteContentBackendMode(new URL(request.url).searchParams.get("backend"));

  const response = await updateSectionContentByMode(section, body, backendMode);

  return NextResponse.json(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  const backendMode = normalizeSiteContentBackendMode(new URL(request.url).searchParams.get("backend"));

  const response = await deleteSectionContentByMode(section, backendMode);

  return NextResponse.json(response);
}
