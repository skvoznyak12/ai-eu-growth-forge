import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

type Prefs = { essential: true; analytics: boolean; marketing: boolean };
const KEY = "nordia-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ essential: true, analytics: false, marketing: false });

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const save = (p: Prefs) => {
    localStorage.setItem(KEY, JSON.stringify({ ...p, ts: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-5">
      <div className="section-shell rounded-2xl border border-ink-border bg-ink p-5 text-ink-foreground shadow-lift">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-display text-sm font-bold">
              <Cookie className="h-4 w-4 shrink-0 text-primary" /> We value your privacy (GDPR)
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              We use essential cookies to run this site and, with your consent, analytics and
              marketing cookies to measure campaigns. You can change your choice at any time. See our{" "}
              <a href="#privacy" className="underline hover:text-ink-foreground">
                Cookie Policy
              </a>
              .
            </p>

            {manage && (
              <div className="mt-4 grid gap-2 rounded-xl border border-ink-border bg-white/5 p-4 sm:grid-cols-3">
                <Toggle label="Strictly necessary" desc="Always active" checked disabled />
                <Toggle
                  label="Analytics"
                  desc="Anonymous usage stats"
                  checked={prefs.analytics}
                  onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                />
                <Toggle
                  label="Marketing"
                  desc="Retargeting & attribution"
                  checked={prefs.marketing}
                  onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <button
              onClick={() => setManage((v) => !v)}
              className="rounded-lg border border-ink-border px-4 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-white/5"
            >
              Manage Preferences
            </button>
            <button
              onClick={() => save({ essential: true, analytics: false, marketing: false })}
              className="rounded-lg border border-ink-border px-4 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-white/5"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() =>
                save(manage ? prefs : { essential: true, analytics: true, marketing: true })
              }
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {manage ? "Save Preferences" : "Accept All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-white/5">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[oklch(0.62_0.2_26)]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-ink-muted">{desc}</span>
      </span>
    </label>
  );
}
