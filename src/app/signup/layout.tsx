import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Student Account | UPtrend Fin Academy",
  description:
    "Register for a student account to enroll in institutional trading courses and live cohorts at UPtrend Fin Academy.",
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
