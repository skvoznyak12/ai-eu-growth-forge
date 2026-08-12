import { useState } from "react";
import { Check, MapPin, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Job = {
  title: string;
  team: "AI" | "Performance" | "Video";
  location: string;
  type: "Full-time" | "Contract";
  desc: string;
};

const JOBS: Job[] = [
  { title: "AI Prompt Engineer", team: "AI", location: "Brussels / Hybrid", type: "Full-time", desc: "Design and maintain brand-tuned prompt systems and evaluation harnesses for client content pipelines." },
  { title: "Senior Performance Marketer", team: "Performance", location: "Zurich / Hybrid", type: "Full-time", desc: "Own multi-market paid budgets across LinkedIn, Google and YouTube with pipeline accountability." },
  { title: "EU Video Editor (FR/NL)", team: "Video", location: "Remote · EU", type: "Contract", desc: "Edit and localize B2B video for Benelux and DACH audiences, working with our directors." },
  { title: "AI Motion Designer", team: "Video", location: "Brussels / Hybrid", type: "Full-time", desc: "Build reusable motion systems combining generative assets with brand-safe templates." },
  { title: "Growth Analyst (CRM & Attribution)", team: "Performance", location: "Remote · EU", type: "Full-time", desc: "Connect ad platforms to CRM data and make weekly ROAS reporting airtight." },
];

const TEAMS = ["All", "AI", "Performance", "Video"] as const;

export function Careers() {
  const { t } = useI18n();
  const [team, setTeam] = useState<(typeof TEAMS)[number]>("All");
  const [apply, setApply] = useState<Job | null>(null);
  const [sent, setSent] = useState(false);

  const list = JOBS.filter((j) => team === "All" || j.team === team);

  return (
    <section id="careers" className="border-b border-border bg-secondary/40 py-24">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Careers</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("careers.title")}</h2>
            <p className="mt-4 text-muted-foreground">
              Hybrid between Brussels and Zurich, remote-friendly across the EU. Senior people,
              short feedback loops, real budgets.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TEAMS.map((c) => (
              <button
                key={c}
                onClick={() => setTeam(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  team === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3">
          {list.map((j) => (
            <article
              key={j.title}
              className="grid gap-4 rounded-xl border border-border bg-card p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
            >
              <div className="min-w-0">
                <h3 className="text-lg font-bold">{j.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{j.desc}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {j.location}
                  </span>
                  <span>{j.type}</span>
                  <span>Team: {j.team}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  setApply(j);
                  setSent(false);
                }}
                className="justify-self-start rounded-lg border border-foreground px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background lg:justify-self-end"
              >
                Apply now
              </button>
            </article>
          ))}
        </div>
      </div>

      {apply && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card p-6 shadow-lift sm:rounded-2xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="eyebrow text-primary">Application</p>
                <h3 className="mt-1 text-xl font-bold">{apply.title}</h3>
              </div>
              <button
                aria-label="Close application form"
                onClick={() => setApply(null)}
                className="shrink-0 rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sent ? (
              <div className="mt-6 rounded-xl border border-border bg-secondary/60 p-6 text-center">
                <Check className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 font-semibold">Application received</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Routed to careers@studio.com. We reply to every candidate within 7 working days.
                  Your data is kept for 6 months, then deleted.
                </p>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Input label="Full name" />
                <Input label="Email" type="email" />
                <Input label="Portfolio / LinkedIn URL" type="url" />
                <label className="block">
                  <span className="text-sm font-medium">Why this role?</span>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </label>
                <label className="flex gap-3 text-xs text-muted-foreground">
                  <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[oklch(0.62_0.2_26)]" />
                  <span>
                    I consent to my application data being processed for recruitment purposes for up
                    to 6 months (GDPR).
                  </span>
                </label>
                <button className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Submit application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        required
        type={type}
        maxLength={200}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
