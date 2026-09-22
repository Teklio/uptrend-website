import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | UPtrend Trading Academy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
