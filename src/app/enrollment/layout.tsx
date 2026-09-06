import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollment & Admission",
  description:
    "Apply for upcoming mentorship cohorts at UPtrend Financial Academy. Instant fee calculation and secure seat registration.",
  openGraph: {
    title: "Course Enrollment | UPtrend Financial Academy",
    description:
      "Register your seat in our live trading cohorts across Equities, Options, and Forex.",
  },
};

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
