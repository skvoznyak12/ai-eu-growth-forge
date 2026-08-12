import { useState } from "react";
import { Download, LineChart, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ROADMAP = [
  { year: "2024", title: "Foundation", body: "Brussels studio launched; first 12 EU B2B clients; video-first offer validated." },
  { year: "2025", title: "AI production layer", body: "Proprietary prompt & QA systems deployed; output per FTE up 4.2x." },
  { year: "2026", title: "Zurich expansion", body: "Second hub opened for DACH & Swiss enterprise; multilingual delivery at scale." },
  { year: "2027", title: "Productised platform", body: "Client-facing content operations portal and retainer productisation across 8 EU markets." },
];

const KPIS = [
  { v: "€6.4M", l: "ARR run-rate" },
  { v: "94%", l: "Net revenue retention" },
  { v: "48", l: "Enterprise clients" },
  { v: "31%", l: "EBITDA margin" },
];

export function Investors() {
  const { t } = useI18n();
  const [requested, setRequested] = useState(false);

  return (
    <section id="investors" className="border-b border-ink-border surface-ink py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-primary">Investors</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-foreground sm:text-4xl">
              {t("investors.title")}
            </h2>
            <p className="mt-5 text-ink-muted">
              We are building the operating system for AI-assisted marketing production in Europe:
              agency-quality output at software-like margins, with compliance built in.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border">
              {KPIS.map((k) => (
                <div key={k.l} className="bg-ink px-5 py-5">
                  <dt className="font-display text-2xl font-bold text-ink-foreground">{k.v}</dt>
                  <dd className="mt-1 text-xs text-ink-muted">{k.l}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#investors"
                onClick={() => setRequested(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Download className="h-4 w-4" /> Investor One-Pager (PDF)
              </a>
              <a
                href="mailto:ir@studio.com"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-border px-5 py-3 text-sm font-semibold text-ink-foreground hover:bg-white/5"
              >
                <Mail className="h-4 w-4" /> Contact IR — ir@studio.com
              </a>
            </div>
            {requested && (
              <p className="mt-4 text-sm text-primary">
                Thanks — the one-pager download link has been sent to your registered IR contact.
              </p>
            )}
          </div>

          <div>
            <p className="eyebrow flex items-center gap-2 text-ink-muted">
              <LineChart className="h-4 w-4 text-primary" /> Strategic roadmap
            </p>
            <ol className="mt-5 space-y-3">
              {ROADMAP.map((r) => (
                <li
                  key={r.year}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-xl border border-ink-border bg-white/5 p-5"
                >
                  <span className="shrink-0 font-display text-lg font-bold text-primary">{r.year}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink-foreground">{r.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{r.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
