import { useState } from "react";
import { Bot, Clapperboard, LineChart, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Bot,
    title: "1 · AI Research & Production",
    short: "AI engine",
    body: "Market and SERP research, offer positioning, and first-draft scripts, ad copy and visuals generated with tuned prompt systems — 10x the throughput of a manual studio.",
    outputs: ["Content strategy", "500+ script drafts/mo", "Localized ad variants"],
  },
  {
    icon: Clapperboard,
    title: "2 · Human Video Production",
    short: "Human craft",
    body: "Our editors, directors and native EU copywriters refine every asset. Brand voice, legal review and cultural nuance stay human — AI never publishes unsupervised.",
    outputs: ["Studio & remote shoots", "Native FR/DE/NL edit", "Brand QA gate"],
  },
  {
    icon: LineChart,
    title: "3 · Performance & Scaling",
    short: "Performance",
    body: "Assets go live across paid social, YouTube, search and lifecycle. We measure CAC, pipeline and ROAS weekly, then feed winners back into the AI production loop.",
    outputs: ["Weekly ROAS reviews", "CRM pipeline attribution", "Market-by-market scaling"],
  },
];

export function Workflow() {
  const [active, setActive] = useState(0);
  const Step = STEPS[active];
  const Icon = Step.icon;

  return (
    <section className="border-b border-border bg-background py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">How we work</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            One pipeline: AI throughput, human judgement, measurable performance
          </h2>
          <p className="mt-4 text-muted-foreground">
            AI is our efficiency layer, not our creative director. Click a stage to see what happens
            inside it.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid gap-3">
            {STEPS.map((s, i) => {
              const I = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-xl border p-5 text-left transition-all ${
                    active === i
                      ? "border-primary bg-card shadow-soft"
                      : "border-border bg-card/50 hover:border-muted-foreground/40"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${
                      active === i ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <I className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-bold">{s.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">{s.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <Icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold">{Step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{Step.body}</p>
            <ul className="mt-6 space-y-2">
              {Step.outputs.map((o) => (
                <li key={o} className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 shrink-0 text-primary" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
