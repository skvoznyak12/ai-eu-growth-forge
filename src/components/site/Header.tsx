import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useBooking } from "./booking";

const LINKS = [
  { id: "services", key: "nav.services" },
  { id: "work", key: "nav.work" },
  { id: "about", key: "nav.about" },
  { id: "insights", key: "nav.insights" },
  { id: "careers", key: "nav.careers" },
  { id: "investors", key: "nav.investors" },
  { id: "contact", key: "nav.contact" },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "surface-ink/95 bg-ink/95 shadow-lift backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="section-shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
            N
          </span>
          <span className="truncate font-display text-lg font-bold text-ink-foreground">
            scaleai<span className="text-primary">.</span>studio
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-6 xl:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink-foreground"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="ml-2 hidden items-center rounded-lg border border-ink-border p-0.5 sm:flex">
            {(["en", "fr", "de"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-ink-muted hover:text-ink-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={open}
            className="hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
          >
            {t("cta.book")}
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenu((v) => !v)}
            className="rounded-lg border border-ink-border p-2 text-ink-foreground xl:hidden"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-ink-border bg-ink px-5 pb-6 pt-2 xl:hidden">
          <nav className="grid gap-1">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenu(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-white/5 hover:text-ink-foreground"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2">
            {(["en", "fr", "de"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md border border-ink-border px-3 py-1.5 text-xs font-semibold uppercase ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-ink-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setMenu(false);
              open();
            }}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t("cta.book")}
          </button>
        </div>
      )}
    </header>
  );
}
