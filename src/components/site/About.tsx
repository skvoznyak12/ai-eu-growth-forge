import { Building2, Cpu, HeartHandshake, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const TEAM = [
  { name: "Elise Dumont", role: "Founder & Managing Director", city: "Brussels", initials: "ED" },
  { name: "Lukas Brenner", role: "Partner, Performance", city: "Zurich", initials: "LB" },
  { name: "Sofia Marchetti", role: "Creative Director, Video", city: "Brussels", initials: "SM" },
  { name: "Jonas Keller", role: "Head of AI Systems", city: "Zurich", initials: "JK" },
];

const STACK = [
  "Google Ads & YouTube",
  "LinkedIn Ads",
  "Meta Business",
  "HubSpot & Salesforce",
  "GA4 & Server-side tagging",
  "Adobe Premiere & After Effects",
  "OpenAI / Anthropic / ElevenLabs",
  "Semrush & Ahrefs",
];

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="border-b border-ink-border surface-ink py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow text-primary">About us</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-foreground sm:text-4xl">
              {t("about.title")}
            </h2>
            <p className="mt-5 text-ink-muted">
              We are a European B2B studio built for a simple thesis: AI removes the production
              bottleneck, but European buyers still judge you on craft, clarity and compliance. So we
              automate volume and keep humans on judgement — strategy, direction, localization and
              legal review.
            </p>
            <p className="mt-4 text-ink-muted">
              Two hubs, one team. Brussels covers Benelux, France and EU institutions; Zurich covers
              Switzerland and DACH. Every client gets a named Account Director in their timezone and
              language.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Cpu, t: "AI as infrastructure", d: "Proprietary prompt and QA systems, versioned per client brand." },
                { icon: HeartHandshake, t: "Senior-only delivery", d: "No junior handover after the pitch. The team you meet runs the work." },
                { icon: ShieldCheck, t: "GDPR by design", d: "EU data residency, DPAs, and documented AI usage policies." },
                { icon: Building2, t: "Dual-office presence", d: "Brussels (BE) and Zurich (CH), with remote crews EU-wide." },
              ].map((v) => (
                <div key={v.t} className="rounded-xl border border-ink-border bg-white/5 p-5">
                  <v.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-display font-bold text-ink-foreground">{v.t}</p>
                  <p className="mt-1 text-sm text-ink-muted">{v.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-ink-muted">Leadership</p>
            <div className="mt-4 grid gap-3">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-ink-border bg-white/5 p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {m.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink-foreground">{m.name}</span>
                    <span className="block truncate text-sm text-ink-muted">{m.role}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-muted">{m.city}</span>
                </div>
              ))}
            </div>

            <p className="eyebrow mt-8 text-ink-muted">Core stack & partners</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink-border px-3 py-1.5 text-xs text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
