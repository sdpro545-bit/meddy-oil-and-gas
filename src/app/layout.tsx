import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import MotionProvider from "@/components/motion/MotionProvider";
import { TransitionOverlay } from "@/components/motion/PageTransition";
import { COMPANY_FACTS, SERVICES_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: `${COMPANY_FACTS.name} | Engineering the Energy Future`,
  description:
    "Oil and gas services company based in Lekki, Lagos. Well construction, oil field services, integrated coordination, FPSO and vessel support, and power across Nigeria.",
  keywords: [
    "Meddy Oil and Gas",
    "Oil and gas Nigeria",
    "Well Construction Services Nigeria",
    "Oil Field Services Lagos",
    "Wireline Slickline Well Testing",
    "Integrated Services Lekki",
    "FPSO and Vessel Services Nigeria",
    "Power generation support Nigeria",
  ],
  authors: [{ name: COMPANY_FACTS.name }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: `${COMPANY_FACTS.name} | Engineering the Energy Future`,
    description:
      "Oil and gas services company based in Lekki, Lagos. Well construction, oil field services, integrated delivery, FPSO and vessel support, and power.",
    siteName: COMPANY_FACTS.name,
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_FACTS.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    ...(COMPANY_FACTS.email ? { email: COMPANY_FACTS.email } : {}),
    makesOffer: SERVICES_DATA.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.shortSummary,
      },
    })),
  };

  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var d = document.documentElement;
                d.classList.add("js-motion");
                var replay = location.search.indexOf("replay") !== -1 || location.search.indexOf("intro") !== -1;
                var skipQ = location.search.indexOf("skip_intro") !== -1;
                d.dataset.intro = (!skipQ && (replay || !sessionStorage.getItem("meddy_intro_v2"))) ? "play" : "skip";
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`[data-reveal]{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="bg-[#F6F8FB] text-[#0B1E36] antialiased selection:bg-[#F69E28] selection:text-[#0B1E36]">
        <MotionProvider>
          <TransitionOverlay>
            <Preloader />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TransitionOverlay>
        </MotionProvider>
      </body>
    </html>
  );
}
