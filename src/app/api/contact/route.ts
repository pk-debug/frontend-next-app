/**
 * Next.js contact API route.
 *
 * For a 15-year-old:
 * This file is the "mailbox" for the contact form. When the form is submitted, this
 * file receives the message and sends it to the chosen backend.
 *
 * Senior engineer note:
 * This is a server-side API endpoint created with the Next.js App Router. It validates
 * the incoming payload, reads the selected transport mode, and delegates the write
 * operation to the backend adapter.
 *
 * Staff engineer note:
 * The route intentionally acts as a thin orchestration boundary. It keeps transport
 * concerns out of the client and makes provider-specific logic easier to evolve without
 * forcing page-level changes.
 */
import { NextResponse } from "next/server";
import {
  CONTACT_BACKEND_MODES,
  persistContactSubmission,
  type ContactBackendMode,
} from "@/lib/contact-backend";

export async function GET() {
  return NextResponse.json({
    ok: true,
    modes: Object.values(CONTACT_BACKEND_MODES),
    defaultMode: CONTACT_BACKEND_MODES.NEXT,
  });
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => ({}));
    const url = new URL(request.url);
    const requestedBackend =
      url.searchParams.get("backend") ??
      process.env.NEXT_PUBLIC_CONTACT_BACKEND ??
      CONTACT_BACKEND_MODES.NEXT;

    const mode: ContactBackendMode =
      requestedBackend === CONTACT_BACKEND_MODES.SUPABASE ||
      requestedBackend === CONTACT_BACKEND_MODES.EXPRESS ||
      requestedBackend === CONTACT_BACKEND_MODES.NEXT
        ? requestedBackend
        : CONTACT_BACKEND_MODES.NEXT;

    const result = await persistContactSubmission(rawBody, mode);

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          backend: result.backend,
          message: result.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      backend: result.backend,
      message: result.message,
      count: result.count,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The contact backend failed unexpectedly.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}
