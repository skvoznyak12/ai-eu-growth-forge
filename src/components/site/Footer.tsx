import { useBooking } from "./booking";

const COLS = [
  {
    title: "Services",
    links: ["YouTube Channels", "AI Content Generation", "Video Production", "Performance Marketing", "SEO & Content", "Localization"],
  },
  { title: "Company", links: ["About", "Cases", "Insights", "Careers", "Investors", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Cookie Policy", "Terms of Service", "Imprint (Impressum)", "DPA", "Accessibility"] },
];

export function Footer() {
  const { open } = useBooking();
  return (
    <footer id="privacy" className="surface-ink pb-40 pt-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
          <div>
            <span className="font-display text-xl font-bold text-ink-foreground">
              scaleai<span className="text-primary">.</span>tudio
            </span>
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              AI Marketing & Content Studio for European B2B. Brussels · Zurich. Technology,
              creativity and performance — with EU compliance built in.
            </p>
            <button
              onClick={open}
              className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Book a Consultation
            </button>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <p className="eyebrow text-ink-muted">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-3 border-t border-ink-border pt-6 text-xs text-ink-muted lg:grid-cols-[minmax(0,1fr)_auto]">
          <p>© {new Date().getFullYear()} scaleai.tudio BV — VAT BE 0788.123.456. All rights reserved.</p>
          <p>GDPR compliant · EU data residency · hello@studio.com</p>
        </div>
      </div>
    </footer>
  );
}
