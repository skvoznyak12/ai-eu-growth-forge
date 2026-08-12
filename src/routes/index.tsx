import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { BookingProvider } from "@/components/site/booking";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Workflow } from "@/components/site/Workflow";
import { Services } from "@/components/site/Services";
import { Cases } from "@/components/site/Cases";
import { Trust } from "@/components/site/Trust";
import { About } from "@/components/site/About";
import { Insights } from "@/components/site/Insights";
import { Careers } from "@/components/site/Careers";
import { Investors } from "@/components/site/Investors";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";

const title = "scaleai.studio — AI Marketing & Content Studio for European B2B";
const description =
  "Scale marketing across Europe with AI speed and human creativity. Video, performance marketing and multilingual content for B2B teams in Belgium, Switzerland and the EU.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "scaleai.studio",
          description,
          areaServed: ["BE", "CH", "FR", "DE", "NL"],
          email: "hello@studio.com",
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Rue de la Loi 42",
              addressLocality: "Brussels",
              postalCode: "1040",
              addressCountry: "BE",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Bahnhofstrasse 18",
              addressLocality: "Zurich",
              postalCode: "8001",
              addressCountry: "CH",
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <I18nProvider>
      <BookingProvider>
        <Header />
        <main>
          <Hero />
          <Workflow />
          <Services />
          <Cases />
          <Trust />
          <About />
          <Insights />
          <Careers />
          <Investors />
          <Contact />
        </main>
        <Footer />
        <CookieConsent />
      </BookingProvider>
    </I18nProvider>
  );
}
