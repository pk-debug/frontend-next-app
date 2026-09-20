/**
 * Root application layout.
 *
 * This file defines the shared shell used by all pages in the app. It loads the
 * app-wide fonts, applies the global stylesheet, and injects the common header and
 * footer so every route keeps a consistent visual system.
 *
 * For senior engineers: the layout is the highest-level composition boundary in the
 * App Router. It is the right place for common metadata, theme wrappers, and shared
 * navigation patterns.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackendModeBanner } from "@/components/backend-mode-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Northstar | Growth-focused Product Marketing",
  description:
    "Modern product marketing and growth platform built with Next.js, React, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-50">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.2),_transparent_25%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />
        <SiteHeader />
        <BackendModeBanner />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
