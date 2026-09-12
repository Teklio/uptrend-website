import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uptrendfinacademy.com"),
  title: {
    default: "UPtrend | Premier Financial Market Education Institute",
    template: "%s | UPtrend Financial Academy",
  },
  icons: {
    icon: "/logo.png",
  },
  description:
    "Master Nifty 50 Options, Futures, Swing Trading & Forex with institutional Smart Money Concepts (SMC) and strict risk management. Live mentorship in Malayalam & English by Nikhil Mathew.",
  keywords: [
    "Stock Market Institute Kerala",
    "Swing Trading Master Course",
    "Nifty Options Mentorship",
    "Smart Money Concepts SMC Malayalam",
    "Stock Market Course Perinthalmanna",
    "Nikhil Mathew Trading",
    "Financial Education Institute",
    "Indian Stock Market Coaching",
    "UPtrend Financial Academy",
  ],
  authors: [{ name: "Nikhil Mathew", url: "https://uptrendfinacademy.com" }],
  creator: "UPtrend Financial Academy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://uptrendfinacademy.com",
    title: "UPtrend | Premier Financial Market Education Institute",
    description:
      "Master institutional price action, SMC order flow, and risk control. Live mentorship programs in Malayalam & English.",
    siteName: "UPtrend Financial Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPtrend | Premier Financial Market Education Institute",
    description:
      "Structured trading education, risk frameworks, and live market mentorship across Indian Equities, Options, and Global Forex.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/context/AuthContext";

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
