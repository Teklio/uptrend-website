import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Risk Disclosure | UPtrend Fin Academy",
  description:
    "Official Disclaimer and Risk Disclosure of UPtrend Fin Academy. Important information regarding market risks and educational nature of our programs.",
  openGraph: {
    title: "Disclaimer & Risk Disclosure | UPtrend Fin Academy",
    description:
      "Important Risk Disclosure and Disclaimer for UPtrend Fin Academy students and visitors.",
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
