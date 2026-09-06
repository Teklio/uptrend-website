import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Trading Desk",
  description:
    "Get in touch with UPtrend Financial Academy in Perinthalmanna, Kerala. Connect via phone, WhatsApp, email, or visit our physical trading lab.",
  openGraph: {
    title: "Contact UPtrend Financial Academy | Support & Inquiries",
    description:
      "Reach out to our mentor support team and campus desk for batch details, admissions, and consultations.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
