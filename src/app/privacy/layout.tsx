import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UPtrend Fin Academy",
  description:
    "Review the official Privacy Policy of UPtrend Fin Academy. Understand how we collect, handle, and protect your personal information and transaction details.",
  openGraph: {
    title: "Privacy Policy | UPtrend Fin Academy",
    description:
      "Official Privacy Policy of UPtrend Fin Academy. Clear and transparent information on student data, privacy practices, and protection.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
