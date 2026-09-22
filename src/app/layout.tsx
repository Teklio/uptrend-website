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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrendfinacademy.com";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UPtrend Trading Academy | Premier Stock Market Institute Perinthalmanna",
    template: "%s | UPtrend Financial Academy",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "UPtrend Trading Academy is Kerala's premier financial market education institute located in Perinthalmanna. Master Nifty 50 Options, Futures, Swing Trading & Forex with institutional Smart Money Concepts (SMC), Order Flow, and strict risk management. Mentorship in Malayalam & English by Nikhil Mathew.",
  keywords: [
    "uptrend trading academy",
    "trading academy perinthalmanna",
    "Uptrend Trading academy perinthalmanna",
    "Uptrendfinacademy",
    "uptrendacademy",
    "uptrend academy perinthalmanna",
    "stock market institute perinthalmanna",
    "trading academy in perinthalmanna",
    "share market classes perinthalmanna",
    "best trading institute in kerala",
    "smc trading course kerala",
    "smart money concepts malayalam",
    "nifty options mentorship kerala",
    "swing trading course malayalam",
    "nikhil mathew trading",
    "nikhil mathew uptrend",
    "forex trading institute kerala",
    "price action trading course kerala",
    "share market coaching malappuram",
    "institutional trading institute kerala",
    "UPtrend Financial Academy",
    "UPtrend",
  ],
  authors: [{ name: "Nikhil Mathew", url: siteUrl }],
  creator: "UPtrend Financial Academy",
  publisher: "UPtrend Financial Academy",
  category: "Financial Education & Trading Academy",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "UPtrend Trading Academy | Premier Financial Market Education Institute Perinthalmanna",
    description:
      "Master institutional price action, SMC order flow, and risk control. Leading stock market academy in Perinthalmanna, Kerala. Live mentorship in Malayalam & English.",
    siteName: "UPtrend Financial Academy",
    images: [
      {
        url: `${siteUrl}/about-lab.jpg`,
        width: 1200,
        height: 630,
        alt: "UPtrend Trading Academy Perinthalmanna Campus & Trading Lab",
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "UPtrend Financial Academy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPtrend Trading Academy | Premier Stock Market Institute Perinthalmanna",
    description:
      "Structured stock market education, institutional SMC order flow, and live market mentorship across Indian Equities, Options, and Global Forex.",
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
  name: "UPtrend Financial Academy",
  alternateName: [
    "UPtrend Trading Academy",
    "UPtrend Trading academy perinthalmanna",
    "Uptrendfinacademy",
    "uptrendacademy",
    "UPtrend Academy",
    "UPtrend",
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/about-lab.jpg`,
  description:
    "Premier financial market education institute based in Perinthalmanna, Kerala. Specializing in institutional Smart Money Concepts (SMC), Nifty Options, Futures, and Forex trading with live mentorship in Malayalam and English.",
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
  name: "UPtrend Financial Academy",
  alternateName: "UPtrend Trading Academy Perinthalmanna",
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
