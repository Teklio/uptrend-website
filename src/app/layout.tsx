import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uptrendfinacademy.com";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UPtrend Fin & Trading Academy | Premier Stock Market Institute Perinthalmanna",
    template: "%s | UPtrend Fin & Trading Academy",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "UPtrend Fin & Trading Academy is Kerala's premier stock market and financial education institute located in Perinthalmanna. Master Nifty 50 Options, Futures, Swing Trading & Forex with Smart Money Concepts (SMC) and risk management.",
  keywords: [
    "uptrendfinacademy",
    "uptrend fin academy",
    "uptrend trading academy",
    "UPtrend Fin Academy",
    "UPtrend Trading Academy",
    "UPtrend Fin & Trading Academy",
    "uptrendfinacademy.com",
    "trading academy perinthalmanna",
    "stock market institute perinthalmanna",
    "best trading institute in kerala",
    "smc trading course kerala",
    "smart money concepts malayalam",
    "nifty options mentorship kerala",
    "forex trading institute kerala",
    "UPtrend Financial Academy",
    "UPtrend",
  ],
  authors: [{ name: "asif junais", url: siteUrl }],
  creator: "UPtrend Fin & Trading Academy",
  publisher: "UPtrend Fin & Trading Academy",
  category: "Financial Education & Trading Academy",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "UPtrend Fin & Trading Academy | Premier Stock Market Institute Perinthalmanna",
    description:
      "Master institutional price action, SMC order flow, and risk control at UPtrend Fin & Trading Academy in Perinthalmanna, Kerala.",
    siteName: "UPtrend Fin & Trading Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "UPtrend Fin & Trading Academy Campus & Trading Lab",
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "UPtrend Fin & Trading Academy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPtrend Fin & Trading Academy | Premier Stock Market Institute Perinthalmanna",
    description:
      "Structured stock market education, institutional SMC order flow, and live mentorship at UPtrend Fin & Trading Academy.",
    images: [`${siteUrl}/about-lab.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: googleVerification || undefined,
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: "UPtrend Fin & Trading Academy",
  alternateName: [
    "UPtrend Fin Academy",
    "UPtrend Trading Academy",
    "uptrendfinacademy",
    "UPtrend Fin & Trading Academy",
    "uptrendfinacademy.com",
    "UPtrend Financial Academy",
    "UPtrend Academy",
    "UPtrend",
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/about-lab.jpg`,
  description:
    "Premier financial market education institute based in Perinthalmanna, Kerala. Specializing in Smart Money Concepts (SMC), Nifty Options, Futures, and Forex trading.",
  telephone: "+917907171406",
  email: "uptrendfinacademy@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bypass Road",
    addressLocality: "Perinthalmanna",
    addressRegion: "Kerala",
    postalCode: "679322",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.9759",
    longitude: "76.2255",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Nikhil Mathew",
    jobTitle: "Lead Mentor & Founder",
    url: siteUrl,
  },
  sameAs: [
    "https://wa.me/917907171406",
    "https://uptrendfinacademy.com",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "UPtrend Fin & Trading Academy",
  alternateName: [
    "UPtrend Fin Academy",
    "UPtrend Trading Academy",
    "uptrendfinacademy",
    "UPtrend Financial Academy",
  ],
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/courses?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyContact />
        </AuthProvider>
      </body>
    </html>
  );
}
