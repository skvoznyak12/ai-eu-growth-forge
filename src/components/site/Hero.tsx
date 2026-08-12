import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useBooking } from "./booking";

const METRICS = [
  { v: "+300%", l: "Average ROI uplift" },
  { v: "5+", l: "EU markets served" },
  { v: "1,200+", l: "Video assets / year" },
  { v: "72h", l: "Campaign go-live" },
];

export function Hero() {
  const { t } = useI18n();
  const { open } = useBooking();

  return (
    <section id="top" className="relative overflow-hidden surface-ink pt-32 pb-0">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
      />
      <div className="section-shell relative pb-16 pt-10">
        <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink-border px-3 py-1.5 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t("hero.eyebrow")}
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.05] text-ink-foreground sm:text-6xl lg:text-7xl">
          {t("hero.title1")} <span className="text-gradient-accent">{t("hero.title2")}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-ink-muted sm:text-lg">{t("hero.sub")}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={open}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("cta.book")} <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-border px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-white/5"
          >
            <Play className="h-4 w-4" /> See our EU case results
          </a>
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          GDPR-compliant processes · EU data residency · DPA available on request
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.l} className="bg-ink px-6 py-7">
              <dt className="font-display text-3xl font-bold text-ink-foreground sm:text-4xl">
                {m.v}
              </dt>
              <dd className="mt-1 text-sm text-ink-muted">{m.l}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <p className="eyebrow text-ink-muted">{t("hero.trusted")}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-70">
            {["NOVATIS", "HELVEX", "BRUGO", "LUMEN B2B", "KLARIS", "EUROSTACK"].map((c) => (
              <span key={c} className="font-display text-lg font-bold text-ink-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
