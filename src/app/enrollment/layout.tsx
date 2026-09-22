import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "Course Enrollment & Admissions | UPtrend Trading Academy",
  description:
    "Enroll in UPtrend Trading Academy programs. Secure your cohort seat for institutional Smart Money Concepts (SMC), Nifty Options, and Swing Trading mentorship in Perinthalmanna, Kerala.",
  keywords: [
    "uptrend enrollment",
    "trading course registration",
    "trading academy perinthalmanna",
    "Uptrend Trading academy perinthalmanna",
    "Uptrendfinacademy enrollment",
    "uptrendacademy admission",
    "stock market course admission kerala",
  ],
  alternates: {
    canonical: `${siteUrl}/enrollment`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/enrollment`,
    title: "Enroll Now | UPtrend Trading Academy Perinthalmanna",
    description:
      "Join the upcoming cohort at UPtrend Trading Academy. Structured institutional education and live mentorship in Malayalam & English.",
    siteName: "UPtrend Financial Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "Enroll at UPtrend Trading Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Course Enrollment | UPtrend Trading Academy",
    description: "Reserve your seat for live trading mentorship at UPtrend Perinthalmanna.",
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
