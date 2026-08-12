import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "fr" | "de";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.insights": "Insights",
  "nav.careers": "Careers",
  "nav.investors": "Investors",
  "nav.contact": "Contact",
  "cta.book": "Book a Consultation",
  "cta.proposal": "Request a Proposal",
  "hero.eyebrow": "AI Marketing & Content Studio — Brussels · Zurich",
  "hero.title1": "Scale Your Marketing Across Europe with",
  "hero.title2": "AI Speed & Human Creativity",
  "hero.sub":
    "We combine AI production systems, professional video and performance marketing to help EU enterprises publish more, spend smarter and win clients in Belgium, Switzerland and beyond.",
  "hero.trusted": "Trusted by growth teams across the EU",
  "services.title": "Services built for European growth teams",
  "work.title": "Cases & measurable EU results",
  "about.title": "AI Efficiency Meets European Quality",
  "insights.title": "Insights",
  "careers.title": "Join Our Hybrid Team",
  "investors.title": "Company Growth & Investors",
  "contact.title": "Let's plan your next EU growth sprint",
};

const fr: Dict = {
  "nav.services": "Services",
  "nav.work": "Réalisations",
  "nav.about": "À propos",
  "nav.insights": "Analyses",
  "nav.careers": "Carrières",
  "nav.investors": "Investisseurs",
  "nav.contact": "Contact",
  "cta.book": "Réserver une consultation",
  "cta.proposal": "Demander une proposition",
  "hero.eyebrow": "Studio IA Marketing & Contenu — Bruxelles · Zurich",
  "hero.title1": "Développez votre marketing en Europe avec",
  "hero.title2": "la vitesse de l'IA et la créativité humaine",
  "hero.sub":
    "Nous combinons production IA, vidéo professionnelle et marketing à la performance pour aider les entreprises européennes à publier plus, dépenser mieux et gagner des clients en Belgique, en Suisse et au-delà.",
  "hero.trusted": "La confiance des équipes growth européennes",
  "services.title": "Des services conçus pour la croissance européenne",
  "work.title": "Cas clients & résultats mesurables",
  "about.title": "L'efficacité de l'IA, la qualité européenne",
  "insights.title": "Analyses",
  "careers.title": "Rejoignez notre équipe hybride",
  "investors.title": "Croissance & investisseurs",
  "contact.title": "Planifions votre prochain sprint de croissance",
};

const de: Dict = {
  "nav.services": "Leistungen",
  "nav.work": "Projekte",
  "nav.about": "Über uns",
  "nav.insights": "Insights",
  "nav.careers": "Karriere",
  "nav.investors": "Investoren",
  "nav.contact": "Kontakt",
  "cta.book": "Beratung buchen",
  "cta.proposal": "Angebot anfordern",
  "hero.eyebrow": "AI Marketing & Content Studio — Brüssel · Zürich",
  "hero.title1": "Skalieren Sie Ihr Marketing in Europa mit",
  "hero.title2": "KI-Tempo und menschlicher Kreativität",
  "hero.sub":
    "Wir verbinden KI-Produktionssysteme, professionelle Videoproduktion und Performance Marketing, damit EU-Unternehmen mehr veröffentlichen, effizienter investieren und Kunden in Belgien, der Schweiz und darüber hinaus gewinnen.",
  "hero.trusted": "Vertrauen von Growth-Teams in ganz Europa",
  "services.title": "Leistungen für europäische Growth-Teams",
  "work.title": "Cases & messbare EU-Ergebnisse",
  "about.title": "KI-Effizienz trifft europäische Qualität",
  "insights.title": "Insights",
  "careers.title": "Werden Sie Teil unseres Hybrid-Teams",
  "investors.title": "Wachstum & Investoren",
  "contact.title": "Planen wir Ihren nächsten EU-Wachstumssprint",
};

const dicts: Record<Lang, Dict> = { en, fr, de };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => en[k] ?? k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (k) => dicts[lang][k] ?? en[k] ?? k }),
    [lang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
