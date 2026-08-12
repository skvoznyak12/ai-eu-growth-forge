import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const POSTS = [
  {
    tag: "AI Video",
    date: "12 Aug 2026",
    title: "Scaling B2B video to 12 assets a month without losing brand control",
    excerpt:
      "The production model we use to combine AI scripting with human direction — and the QA gates that keep legal comfortable.",
    read: "7 min",
  },
  {
    tag: "GDPR",
    date: "29 Jul 2026",
    title: "GDPR-compliant performance marketing after consent mode v2",
    excerpt:
      "What actually changed for EU advertisers, how to keep attribution honest, and the consent architecture we deploy for clients.",
    read: "9 min",
  },
  {
    tag: "EU Markets",
    date: "14 Jul 2026",
    title: "Belgium and Switzerland: two markets that punish generic localization",
    excerpt:
      "Language is the easy part. Proof points, pricing narrative and channel behaviour differ far more than most GTM plans assume.",
    read: "6 min",
  },
  {
    tag: "Benchmarks",
    date: "02 Jul 2026",
    title: "2026 EU B2B benchmarks: CPL, ROAS and content velocity",
    excerpt: "Aggregated anonymised data from 40+ EU campaigns across SaaS, industrial and services.",
    read: "11 min",
  },
];

export function Insights() {
  const { t } = useI18n();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section id="insights" className="border-b border-border bg-background py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">Blog</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("insights.title")}</h2>
          <p className="mt-4 text-muted-foreground">
            Practical notes on EU marketing trends, AI video scaling and compliant growth.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-foreground">
                  {p.tag}
                </span>
                <span>{p.date}</span>
              </div>
              <h3 className="mt-4 text-base font-bold leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read · {p.read}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/60 p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <h3 className="text-xl font-bold">The EU Growth Brief — monthly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One email a month: benchmarks, AI production tactics and EU compliance updates. No
                sales sequences.
              </p>
            </div>
            {subscribed ? (
              <p className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-3 text-sm font-semibold">
                <Check className="h-4 w-4 text-primary" /> Confirm the double opt-in email we just sent.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="grid gap-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    maxLength={255}
                    placeholder="name@company.eu"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:w-72"
                  />
                  <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    Subscribe
                  </button>
                </div>
                <label className="flex max-w-md gap-2 text-xs text-muted-foreground">
                  <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[oklch(0.62_0.2_26)]" />
                  <span>
                    I consent to receiving the newsletter and to my email being processed for this
                    purpose (GDPR Art. 6(1)(a)). Unsubscribe anytime.
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
