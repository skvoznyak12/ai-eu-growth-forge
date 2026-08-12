import { useState } from "react";
import {
  Youtube,
  Bot,
  Clapperboard,
  Target,
  Search,
  Languages,
  Globe2,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const CATS = ["All", "Content", "Video", "Performance", "EU Expansion"] as const;

const SERVICES = [
  {
    icon: Youtube,
    cats: ["Video", "Content"],
    title: "Turnkey YouTube Channels & Video Content",
    body: "Strategy, scripting, filming, editing, thumbnails and publishing cadence — a fully managed channel that compounds organic B2B demand.",
    points: ["8–20 videos / month", "Channel SEO & packaging", "Repurposed shorts engine"],
  },
  {
    icon: Bot,
    cats: ["Content"],
    title: "AI-Driven Text, Image & Video Generation",
    body: "Custom prompt systems and brand-trained models producing on-message copy, visuals and video variants at enterprise volume — always human-reviewed.",
    points: ["Brand voice tuning", "Ad creative at scale", "Human QA gate"],
  },
  {
    icon: Clapperboard,
    cats: ["Video"],
    title: "Professional Video Production & Editing",
    body: "Brand films, product demos, customer stories and event coverage shot by our crews in Brussels and Zurich, or remotely across the EU.",
    points: ["Full crew & direction", "Motion design", "Multi-format delivery"],
  },
  {
    icon: Target,
    cats: ["Performance"],
    title: "Digital Advertising & Performance Marketing",
    body: "LinkedIn, Meta, Google and YouTube campaigns run against pipeline, not impressions — with weekly CAC and ROAS accountability.",
    points: ["Full-funnel media plans", "CRM attribution", "Creative testing sprints"],
  },
  {
    icon: Search,
    cats: ["Content", "Performance"],
    title: "SEO & Content Marketing",
    body: "Technical SEO, topical authority programmes and demand-led editorial that ranks in competitive EU B2B categories.",
    points: ["Entity & topic mapping", "Programmatic pages", "Digital PR & links"],
  },
  {
    icon: Languages,
    cats: ["EU Expansion", "Content"],
    title: "Multilingual Content & Localization",
    body: "Native FR, DE, NL, IT and EN adaptation — not translation. Local proof points, compliance wording and regional tone of voice.",
    points: ["Native reviewers", "Locale-specific creative", "Regulatory copy checks"],
  },
  {
    icon: Globe2,
    cats: ["EU Expansion", "Performance"],
    title: "EU Market Brand Scaling",
    body: "Market entry playbooks for Belgium, Switzerland, DACH and Benelux: positioning, pricing narrative, channel mix and launch calendar.",
    points: ["Market sizing", "Launch GTM sprint", "Local partner sourcing"],
  },
];

export function Services() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = SERVICES.filter((s) => cat === "All" || s.cats.includes(cat));

  return (
    <section id="services" className="border-b border-border bg-secondary/40 py-24">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Services</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("services.title")}</h2>
            <p className="mt-4 text-muted-foreground">
              Engage us as a full growth partner or plug a single capability into your in-house team.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => {
            const I = s.icon;
            return (
              <article
                key={s.title}
                className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                    <I className="h-5 w-5" />
                  </span>
                  <h3 className="min-w-0 text-lg font-bold leading-snug">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 space-y-1.5 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Discuss this service
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
