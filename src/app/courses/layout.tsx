import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Courses & Cohorts",
  description:
    "Explore our institutional trading programs: Swing Trading Master Course, Nifty Options & Futures SMC, and Stock Market Basics. Live classes in Malayalam & English.",
  openGraph: {
    title: "Institutional Trading Courses | UPtrend Financial Academy",
    description:
      "Structured curriculum covering Price Action, Smart Money Concepts (SMC), Volume Profile, and mathematical risk management.",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
