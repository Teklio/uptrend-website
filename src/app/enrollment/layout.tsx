import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "Course Enrollment & Admissions | UPtrend Fin & Trading Academy",
  description:
    "Enroll in UPtrend Fin & Trading Academy programs. Secure your cohort seat for Smart Money Concepts (SMC), Nifty Options, and Swing Trading mentorship in Perinthalmanna, Kerala.",
  keywords: [
    "uptrend enrollment",
    "uptrendfinacademy enrollment",
    "uptrend fin academy",
    "uptrend trading academy",
    "UPtrend Fin & Trading Academy",
    "UPtrend Fin Academy",
    "UPtrend Trading Academy",
    "trading course registration",
    "trading academy perinthalmanna",
    "stock market course admission kerala",
  ],
  alternates: {
    canonical: `${siteUrl}/enrollment`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/enrollment`,
    title: "Enroll Now | UPtrend Fin & Trading Academy Perinthalmanna",
    description:
      "Join the upcoming cohort at UPtrend Fin & Trading Academy. Structured education and live mentorship in Malayalam & English.",
    siteName: "UPtrend Fin & Trading Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "Enroll at UPtrend Fin & Trading Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Course Enrollment | UPtrend Fin & Trading Academy",
    description: "Reserve your seat for live trading mentorship at UPtrend Fin & Trading Academy Perinthalmanna.",
    images: [`${siteUrl}/about-lab.jpg`],
  },
};

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
