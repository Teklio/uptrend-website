import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Vision & Mentorship",
  description:
    "Learn about UPtrend Financial Academy, our institutional methodology led by Nikhil Mathew, and our mission to create disciplined, data-driven traders across India.",
  openGraph: {
    title: "About UPtrend Financial Academy | Mentorship & Philosophy",
    description:
      "Bridging the gap between retail speculation and institutional market execution with rule-based trading systems.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
