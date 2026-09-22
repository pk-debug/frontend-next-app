/**
 * Contact message repository.
 *
 * For a 15-year-old:
 * This is the place where messages are actually saved. It knows how to write to the
 * chosen database or backend system without the screen worrying about it.
 *
 * Senior engineer note:
 * This is the data-access layer. It encapsulates persistence for different backends and
 * exposes a small interface used by the application service.
 *
 * Staff engineer note:
 * Repository methods are intentionally backend-aware and provider-specific. The application
 * service remains backend-agnostic and sees only the domain model.
 */

import type { ContactMessageCreateInput, ContactMessageRecord } from "@/server/models/contact-message.model";

const inMemoryMessages: ContactMessageRecord[] = [];

export async function createContactMessage(record: ContactMessageCreateInput): Promise<ContactMessageRecord> {
  const finalRecord: ContactMessageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    ...record,
    company: record.company ?? "",
    createdAt: new Date().toISOString(),
  };

  inMemoryMessages.push(finalRecord);
  return finalRecord;
}

export async function listContactMessages(): Promise<ContactMessageRecord[]> {
  return [...inMemoryMessages];
}

export async function createSupabaseContactMessage(record: ContactMessageCreateInput): Promise<ContactMessageRecord> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase connection is not configured.");
  }

  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(url, key);

  const { data, error } = await client.from("contact_messages").insert([
    {
      name: record.name,
      email: record.email,
      company: record.company ?? "",
      message: record.message,
      source: record.source,
      created_at: new Date().toISOString(),
    },
  ]).select();

  if (error) {
    throw new Error(error.message);
  }

  const saved = data?.[0];
  return {
    id: saved?.id ?? `supabase_${Date.now()}`,
    name: saved?.name ?? record.name,
    email: saved?.email ?? record.email,
    company: saved?.company ?? record.company ?? "",
    message: saved?.message ?? record.message,
    createdAt: saved?.created_at ?? new Date().toISOString(),
    source: record.source,
  };
}

export async function createFirebaseContactMessage(record: ContactMessageCreateInput): Promise<ContactMessageRecord> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const collectionName = process.env.NEXT_PUBLIC_FIREBASE_COLLECTION ?? "contact_messages";

  if (!projectId) {
    throw new Error("Firebase project ID is not configured.");
  }

  const { initializeApp } = await import("firebase/app");
  const firebaseFirestore = await import("firebase/firestore");
  const { getFirestore, addDoc, collection: firestoreCollection } = firebaseFirestore;

  const app = initializeApp({ projectId });
  const db = getFirestore(app);
  const saved = await addDoc(firestoreCollection(db, collectionName), {
    ...record,
    company: record.company ?? "",
    createdAt: new Date().toISOString(),
  });

  return {
    id: saved.id,
    name: record.name,
    email: record.email,
    company: record.company ?? "",
    message: record.message,
    createdAt: new Date().toISOString(),
    source: record.source,
  };
}

export async function createExpressContactMessage(record: ContactMessageCreateInput): Promise<ContactMessageRecord> {
  const expressUrl = process.env.NEXT_PUBLIC_EXPRESS_CONTACT_URL ?? "http://localhost:4000/api/contact";
  const response = await fetch(expressUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message ?? "Express backend rejected the contact message.");
  }

  return {
    id: payload.id ?? `express_${Date.now()}`,
    name: record.name,
    email: record.email,
    company: record.company ?? "",
    message: record.message,
    createdAt: new Date().toISOString(),
    source: record.source,
  };
}
