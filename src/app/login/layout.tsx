import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uptrend Login",
  description:
    "Log in to your UPtrend Financial Academy student portal to access cohort dashboard, live streams, recordings, and Telegram community.",
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
