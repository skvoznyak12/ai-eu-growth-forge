import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type CaseItem = {
  client: string;
  industry: "B2B" | "SaaS" | "E-commerce";
  service: "Video" | "Performance" | "Content";
  market: string;
  problem: string;
  solution: string;
  results: string[];
};

const CASES: CaseItem[] = [
  {
    client: "Helvex Industrial",
    industry: "B2B",
    service: "Video",
    market: "Switzerland · Belgium",
    problem:
      "A precision manufacturer relied entirely on trade fairs; the sales team had no digital pipeline outside Q4.",
    solution:
      "Turnkey YouTube channel with AI-scripted technical explainers, human-directed factory shoots, and DE/FR localization.",
    results: ["+150% qualified leads in BE & CH", "1.4M organic views in 9 months", "€38 cost per MQL"],
  },
  {
    client: "Klaris Cloud",
    industry: "SaaS",
    service: "Performance",
    market: "DACH · Benelux",
    problem: "Paid acquisition plateaued at a €410 CAC with creative refreshed only once per quarter.",
    solution:
      "AI creative factory producing 60 ad variants monthly, human-curated, tested across LinkedIn and YouTube with CRM attribution.",
    results: ["−46% CAC in 5 months", "+300% ROAS on LinkedIn", "3.2x pipeline value"],
  },
  {
    client: "Brugo Home",
    industry: "E-commerce",
    service: "Content",
    market: "Belgium · Netherlands · France",
    problem: "Strong local brand with no multilingual content engine to support EU expansion.",
    solution:
      "Native NL/FR/EN content programme, AI-assisted product storytelling and SEO topical clusters with human editorial control.",
    results: ["+212% organic revenue", "Top-3 rankings for 84 EU keywords", "4 markets launched in 12 months"],
  },
  {
    client: "Novatis Legal",
    industry: "B2B",
    service: "Content",
    market: "Brussels · Luxembourg",
    problem: "GDPR-sensitive sector with heavy compliance review slowing publication to two posts per quarter.",
    solution:
      "Compliance-first AI drafting workflow with legal sign-off gates and a partner-led video series.",
    results: ["12x publishing volume", "+96% inbound consultations", "Zero compliance escalations"],
  },
  {
    client: "Eurostack Robotics",
    industry: "SaaS",
    service: "Video",
    market: "Germany · Austria",
    problem: "Complex product demo required 6 weeks per video, blocking launch velocity.",
    solution: "Modular AI-assisted demo system: reusable motion templates plus human product direction.",
    results: ["6 weeks → 5 days per demo", "+68% demo-request rate", "€1.1M influenced pipeline"],
  },
  {
    client: "Lumen B2B",
    industry: "B2B",
    service: "Performance",
    market: "France · Belgium",
    problem: "Marketing spend was unattributed; leadership could not defend budget.",
    solution: "Full-funnel media rebuild with CRM-connected reporting and weekly ROAS governance.",
    results: ["+230% ROI in 2 quarters", "100% pipeline attribution", "−31% wasted spend"],
  },
];

const INDUSTRIES = ["All", "B2B", "SaaS", "E-commerce"] as const;
const SERVICES = ["All", "Video", "Performance", "Content"] as const;

export function Cases() {
  const { t } = useI18n();
  const [ind, setInd] = useState<(typeof INDUSTRIES)[number]>("All");
  const [srv, setSrv] = useState<(typeof SERVICES)[number]>("All");

  const list = CASES.filter(
    (c) => (ind === "All" || c.industry === ind) && (srv === "All" || c.service === srv),
  );

  return (
    <section id="work" className="border-b border-border bg-background py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">Cases & results</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("work.title")}</h2>
          <p className="mt-4 text-muted-foreground">
            Every engagement is reported against pipeline and revenue — filtered by industry and
            service below.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <FilterRow label="Industry" items={INDUSTRIES} value={ind} onChange={setInd} />
          <FilterRow label="Service" items={SERVICES} value={srv} onChange={setSrv} />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <article
              key={c.client}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h3 className="min-w-0 truncate text-lg font-bold">{c.client}</h3>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {c.industry}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-primary">{c.market}</p>

              <Block label="Problem" text={c.problem} />
              <Block label="AI + Human solution" text={c.solution} />

              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {c.results.map((r) => (
                  <li key={r} className="font-display text-sm font-bold">
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No cases match this combination yet — talk to us about your scenario.
          </p>
        )}
      </div>
    </section>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-4">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow text-muted-foreground">{label}</span>
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
            value === i
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:bg-secondary"
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
