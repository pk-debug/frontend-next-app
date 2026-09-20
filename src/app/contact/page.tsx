"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData(initialForm);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          Contact
        </p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Let’s build the next growth loop together.
        </h1>
      </div>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Card title="Tell us about your project" description="Share your goals, audience, and the type of experience you want to launch.">
          <div className="space-y-4 text-sm text-slate-300">
            <p>Email: hello@northstar.example</p>
            <p>Response time: Usually within 1 business day</p>
            <p>Based in: Remote-first, working globally</p>
          </div>
        </Card>

        <Card title="Start the conversation" description="Book a short intro call and we’ll map the next step for your product or brand.">
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-slate-200">
                Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="mb-1 block text-sm text-slate-200">
                Company
              </label>
              <input
                id="company"
                value={formData.company}
                onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="Your company"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-slate-200">
                Project details
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                placeholder="Tell us what you are building..."
              />
            </div>

            <Button type="submit" variant="primary">
              Send inquiry
            </Button>

            {status === "success" ? (
              <p aria-live="polite" className="text-sm text-emerald-300">
                Thanks! Your request has been received and we will reach out soon.
              </p>
            ) : null}

            {status === "error" ? (
              <p aria-live="polite" className="text-sm text-rose-300">
                Please complete the name, email, and project details before submitting.
              </p>
            ) : null}
          </form>
        </Card>
      </section>
    </main>
  );
}
