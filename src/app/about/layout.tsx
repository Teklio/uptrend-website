import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "About Us | UPtrend Fin & Trading Academy Perinthalmanna",
  description:
    "Founded in Perinthalmanna, Kerala, UPtrend Fin & Trading Academy elevates trading proficiency through structured education, Smart Money Concepts (SMC), Order Flow, and strict risk frameworks. Mentorship led by Nikhil Mathew.",
  keywords: [
    "about uptrend",
    "uptrendfinacademy",
    "uptrend fin academy",
    "uptrend trading academy",
    "UPtrend Fin & Trading Academy",
    "UPtrend Fin Academy",
    "UPtrend Trading Academy",
    "trading academy perinthalmanna",
    "stock market institute perinthalmanna",
    "nikhil mathew trading",
    "nikhil mathew uptrend",
    "smart money concepts malayalam",
    "institutional trading academy kerala",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/about`,
    title: "About UPtrend Fin & Trading Academy | Perinthalmanna, Kerala",
    description:
      "Learn how UPtrend Fin & Trading Academy bridges theoretical knowledge and practical execution with institutional SMC, Pine Script screeners, and drawdown control.",
    siteName: "UPtrend Fin & Trading Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "UPtrend Fin & Trading Academy Perinthalmanna Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About UPtrend Fin & Trading Academy | Perinthalmanna",
    description:
      "Empowering traders with objective data, SMC order flow, and capital preservation protocols.",
    images: [`${siteUrl}/about-lab.jpg`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
