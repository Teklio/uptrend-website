import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uptrend Account",
  description:
    "Register for a student account at UPtrend Financial Academy to access institutional trading curricula, trade journals, and community discussions.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
