import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { LangProvider } from "@/lib/lang";
import SmoothScroll from "@/components/smooth-scroll";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miha Builds · Automatizacija poslovnih procesa",
  description:
    "Sistemi koji sami preuzimaju ponavljajući rad: unos računa, podsetnike, zakazivanja i izveštaje. n8n + AI, za firme koje žele nazad sate, novac i mir.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Miha Builds · Automatizacija poslovnih procesa",
    description: "Vaš tim radi posao koji mašina može. Ja ga vraćam u sate, novac i mir.",
    type: "website",
    locale: "sr_RS",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${serif.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <LangProvider>
          <SmoothScroll />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
