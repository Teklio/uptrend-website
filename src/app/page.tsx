import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "UPtrend Fin & Trading Academy | Premier Stock Market Institute Perinthalmanna",
  description:
    "UPtrend Fin & Trading Academy is Kerala's premier stock market and financial education institute located in Perinthalmanna. Master Nifty 50 Options, Futures, Swing Trading & Forex with Smart Money Concepts (SMC) and risk management.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "UPtrend Fin & Trading Academy | Premier Stock Market Institute Perinthalmanna",
    description:
      "Master institutional price action, SMC order flow, and risk control at UPtrend Fin & Trading Academy in Perinthalmanna, Kerala.",
    url: siteUrl,
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LiveMarketTicker />
      <About />
      <Testimonials />
    </div>
  );
}

