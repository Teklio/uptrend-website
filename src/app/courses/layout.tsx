import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "Trading Courses & Mentorship Programs | UPtrend Trading Academy",
  description:
    "Explore institutional trading programs by UPtrend Trading Academy in Perinthalmanna: Swing Trading Master Course, Nifty Options & Futures SMC, Price Action, and Order Flow. Live classes in Malayalam & English.",
  keywords: [
    "uptrend trading academy courses",
    "trading academy perinthalmanna",
    "Uptrend Trading academy perinthalmanna",
    "Uptrendfinacademy courses",
    "uptrendacademy",
    "stock market course perinthalmanna",
    "smc trading course kerala",
    "nifty options course malayalam",
    "swing trading mentorship kerala",
    "nikhil mathew course",
  ],
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/courses`,
    title: "Institutional Trading Courses | UPtrend Trading Academy Perinthalmanna",
    description:
      "Structured curriculum covering Price Action, Smart Money Concepts (SMC), Volume Profile, and mathematical risk management.",
    siteName: "UPtrend Financial Academy",
    images: [
      {
        url: `${siteUrl}/course-swing-trading.jpg`,
        width: 1200,
        height: 630,
        alt: "UPtrend Trading Courses & Cohorts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Courses & Cohorts | UPtrend Trading Academy",
    description:
      "Master institutional trading with live market mentorship in Malayalam & English.",
    images: [`${siteUrl}/course-swing-trading.jpg`],
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
