import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal Login | UPtrend Trading Academy",
  description:
    "Sign in to access your enrolled courses, live cohorts, and trading education materials at UPtrend Trading Academy.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
