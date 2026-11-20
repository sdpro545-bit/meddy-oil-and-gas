import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import MotionProvider from "@/components/motion/MotionProvider";
import { TransitionOverlay } from "@/components/motion/PageTransition";
import { COMPANY_FACTS } from "@/lib/data";

export const metadata: Metadata = {
  title: `${COMPANY_FACTS.name} | Engineering the Energy Future`,
  description:
    "Integrated oil and gas services company based in Lekki, Lagos. Supporting exploration, drilling, well construction, and asset maintenance across Nigeria.",
  keywords: [
    "Meddy Oil and Gas",
    "Oil and gas Nigeria",
    "Drilling support Lagos",
    "Well construction Nigeria",
    "Wireline intervention",
    "Upstream oilfield services Lekki",
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
    title: `${COMPANY_FACTS.name} | Upstream Energy Solutions`,
    description:
      "Integrated oil and gas services company based in Lekki, Lagos. Drilling support, well completions, wireline, and operational maintenance.",
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
  return (
    <html lang="en-NG">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem("meddy_intro_v2")) {
                  document.documentElement.dataset.intro = "skip";
                } else {
                  document.documentElement.dataset.intro = "play";
                }
              } catch(e) {}
            `,
          }}
        />
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
