import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | UPtrend Fin Academy",
  description:
    "Review the official Refund & Cancellation Policy of UPtrend Fin Academy for courses, workshops, webinars, and educational services.",
  openGraph: {
    title: "Refund & Cancellation Policy | UPtrend Fin Academy",
    description:
      "Official Refund and Cancellation Policy of UPtrend Fin Academy.",
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
