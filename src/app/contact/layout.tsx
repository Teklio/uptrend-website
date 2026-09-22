import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "Contact Us | UPtrend Trading Academy Perinthalmanna",
  description:
    "Connect with UPtrend Trading Academy in Perinthalmanna, Kerala. Visit our training institute on Bypass Road, or reach out via WhatsApp / Phone at +91 79071 71406 for course counseling.",
  keywords: [
    "contact uptrend",
    "trading academy perinthalmanna",
    "Uptrend Trading academy perinthalmanna",
    "Uptrendfinacademy contact",
    "uptrendacademy phone number",
    "stock market classes perinthalmanna address",
    "trading institute contact malappuram",
    "nikhil mathew trading contact",
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/contact`,
    title: "Contact UPtrend Trading Academy | Perinthalmanna, Kerala",
    description:
      "Speak directly with our admissions and mentor team at UPtrend Perinthalmanna. Phone: +91 79071 71406.",
    siteName: "UPtrend Financial Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact UPtrend Trading Academy Perinthalmanna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact UPtrend Trading Academy | Perinthalmanna",
    description: "Visit our campus at Bypass Road, Perinthalmanna or chat on WhatsApp +91 79071 71406.",
    images: [`${siteUrl}/about-lab.jpg`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
