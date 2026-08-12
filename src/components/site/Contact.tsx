import { useEffect, useState } from "react";
import { CalendarDays, Check, Loader2, Mail, MapPin } from "lucide-react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { useBooking } from "./booking";

const MARKETS = ["Belgium", "Switzerland", "France", "Germany", "Netherlands", "Other EU"];
const BUDGETS = ["< €5k / month", "€5k – €15k / month", "€15k – €50k / month", "€50k+ / month"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid corporate email").max(255),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  budget: z.string().min(1, "Select a budget range"),
  markets: z.array(z.string()).min(1, "Select at least one target market"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "GDPR consent is required" }) }),
});

const STAGES = [
  "Submission received",
  "GDPR consent validated",
  "Routed to CRM (HubSpot)",
  "Assigned to Account Director — brussels@studio.com",
];

export function Contact() {
  const { t } = useI18n();
  const { open } = useBooking();
  const [markets, setMarkets] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length) return;
    const id = setTimeout(() => setStage((s) => s + 1), 900);
    return () => clearTimeout(id);
  }, [stage]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      budget: fd.get("budget"),
      markets,
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStage(0);
  };

  return (
    <section id="contact" className="border-b border-border bg-background py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="eyebrow text-primary">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("contact.title")}</h2>
          <p className="mt-4 text-muted-foreground">
            Send a brief and we route it to the right Account Director within one business day.
          </p>

          {stage >= 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-soft">
              <h3 className="text-lg font-bold">Lead routing in progress</h3>
              <ol className="mt-5 space-y-4">
                {STAGES.map((s, i) => (
                  <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        i < stage
                          ? "border-primary bg-primary text-primary-foreground"
                          : i === stage
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {i < stage ? (
                        <Check className="h-4 w-4" />
                      ) : i === stage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="text-xs">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={`min-w-0 text-sm ${i <= stage ? "font-semibold" : "text-muted-foreground"}`}
                    >
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
              {stage >= STAGES.length && (
                <div className="mt-6 rounded-xl bg-secondary/60 p-5 text-sm">
                  <p className="font-semibold">
                    A confirmation has been sent to contact@agency.com and your inbox.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Data processed under GDPR Art. 6(1)(b) & (f), stored in the EU, retained 24
                    months. Request deletion anytime at privacy@studio.com.
                  </p>
                  <button
                    onClick={() => setStage(-1)}
                    className="mt-4 rounded-lg border border-border px-4 py-2 font-semibold hover:bg-secondary"
                  >
                    Send another brief
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" error={errors["name"]} />
                <Field label="Corporate email" name="email" type="email" error={errors["email"]} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" name="company" error={errors["company"]} />
                <label className="block">
                  <span className="text-sm font-medium">Monthly budget</span>
                  <select
                    name="budget"
                    defaultValue=""
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <Err msg={errors["budget"]} />
                </label>
              </div>

              <div>
                <span className="text-sm font-medium">Target markets</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MARKETS.map((m) => {
                    const on = markets.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        onClick={() =>
                          setMarkets((p) => (on ? p.filter((x) => x !== m) : [...p, m]))
                        }
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          on
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
                <Err msg={errors["markets"]} />
              </div>

              <label className="block">
                <span className="text-sm font-medium">Your brief</span>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={1000}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Goals, current channels, timelines…"
                />
                <Err msg={errors["message"]} />
              </label>

              <label className="flex gap-3 text-xs text-muted-foreground">
                <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[oklch(0.62_0.2_26)]" />
                <span>
                  I consent to scaleAI.studio processing my data to respond to this enquiry, in line
                  with the Privacy Policy. No data is shared outside the EU.
                </span>
              </label>
              <Err msg={errors["consent"]} />

              <button className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto">
                {t("cta.proposal")}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow text-muted-foreground">Offices</p>
            <div className="mt-4 space-y-4 text-sm">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="block">Brussels</strong>
                  Rue de la Loi 42, 1040 Brussels, Belgium
                  <br />
                  brussels@studio.com
                </span>
              </p>
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="block">Zurich</strong>
                  Bahnhofstrasse 18, 8001 Zurich, Switzerland
                  <br />
                  zurich@studio.com
                </span>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="block">General</strong>
                  hello@studio.com · +32 2 588 41 20
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-secondary/50 p-6 text-center">
            <CalendarDays className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-3 font-display font-bold">Calendar booking widget</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Live availability, Brussels & Zurich time (CET).
            </p>
            <button
              onClick={open}
              className="mt-4 w-full rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-90"
            >
              {t("cta.book")}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <Err msg={error} />
    </label>
  );
}

function Err({ msg }: { msg?: string | undefined }) {
  if (!msg) return null;
  return <span className="mt-1 block text-xs text-destructive">{msg}</span>;
}
