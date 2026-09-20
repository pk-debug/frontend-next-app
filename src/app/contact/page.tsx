import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
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
          <div className="mt-6">
            <Button as="link" href="mailto:hello@northstar.example" variant="primary">
              Book a call
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
