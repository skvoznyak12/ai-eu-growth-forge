import { useMemo, useState } from "react";
import { PlayCircle, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "They replaced three agencies. The AI production speed is real, but what convinced our board was the reporting discipline.",
    name: "Marieke Vandenberghe",
    role: "CMO, Brugo Home — Belgium",
  },
  {
    quote:
      "We went from two videos a quarter to twelve a month without losing our Swiss brand standards.",
    name: "Daniel Roth",
    role: "Head of Marketing, Helvex — Switzerland",
  },
  {
    quote: "CAC down 46% in five months. That is the whole review.",
    name: "Julien Perret",
    role: "VP Growth, Klaris Cloud — France",
  },
];

export function Trust() {
  const [spend, setSpend] = useState(25000);
  const [cac, setCac] = useState(400);
  const [value, setValue] = useState(9000);
  const [active, setActive] = useState(0);

  const calc = useMemo(() => {
    const leadsNow = Math.round(spend / cac);
    const improvedCac = cac * 0.62;
    const leadsAfter = Math.round(spend / improvedCac);
    const revenueNow = leadsNow * 0.22 * value;
    const revenueAfter = leadsAfter * 0.28 * value;
    const roi = revenueNow > 0 ? Math.round(((revenueAfter - revenueNow) / revenueNow) * 100) : 0;
    return { leadsNow, leadsAfter, improvedCac: Math.round(improvedCac), revenueAfter, roi };
  }, [spend, cac, value]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <section className="border-b border-border bg-secondary/40 py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Trust</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What clients say</h2>

          <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
            <Quote className="h-7 w-7 text-primary" />
            <p className="mt-4 text-lg leading-relaxed">{TESTIMONIALS[active].quote}</p>
            <p className="mt-5 font-display font-bold">{TESTIMONIALS[active].name}</p>
            <p className="text-sm text-muted-foreground">{TESTIMONIALS[active].role}</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={tm.name}
                onClick={() => setActive(i)}
                className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                  active === i ? "border-primary bg-card" : "border-border bg-card/50 hover:bg-card"
                }`}
              >
                <PlayCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="min-w-0 truncate text-xs font-semibold">{tm.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <p className="eyebrow text-primary">Interactive</p>
          <h3 className="mt-2 text-2xl font-bold">ROI calculator</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on the median improvement across our EU engagements (−38% CAC, +6pt lead-to-deal
            rate). Indicative only.
          </p>

          <div className="mt-6 space-y-6">
            <Slider label="Monthly marketing spend" value={spend} min={5000} max={150000} step={2500} onChange={setSpend} format={fmt} />
            <Slider label="Current cost per lead" value={cac} min={50} max={2000} step={25} onChange={setCac} format={fmt} />
            <Slider label="Average deal value" value={value} min={1000} max={100000} step={1000} onChange={setValue} format={fmt} />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            <Stat label="Leads today" value={String(calc.leadsNow)} />
            <Stat label="Leads with us" value={String(calc.leadsAfter)} />
            <Stat label="Projected CPL" value={fmt(calc.improvedCac)} />
            <Stat label="Projected revenue / mo" value={fmt(calc.revenueAfter)} />
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-primary">
            +{Math.max(calc.roi, 0)}% projected ROI uplift
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-5 py-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-xl font-bold">{value}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (n: number) => string;
}) {
  return (
    <label className="block">
      <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <span className="min-w-0 truncate text-sm font-medium">{label}</span>
        <span className="shrink-0 font-display text-sm font-bold">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[oklch(0.62_0.2_26)]"
      />
    </label>
  );
}
