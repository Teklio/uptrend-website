import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uptrendfinacademy.com";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Review UPtrend Financial Academy's terms on course enrollments, cohort seat reservations, and refund policies.",
  alternates: {
    canonical: `${siteUrl}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-white text-black font-sans px-4 sm:px-8 md:px-12 lg:px-16 xl:px-36 py-10 sm:py-16">
      <div className="w-full">
        {/* Header */}
        <header className="border-b border-black/20 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-base text-black/90 leading-relaxed mb-4">
            Thank you for choosing UPtrend Fin Academy.
          </p>
          <div className="text-sm text-black/80 flex flex-wrap gap-4">
            <span><strong>Effective Date:</strong> 10 September 2026</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> 10 September 2026</span>
          </div>
        </header>

        {/* Notice */}
        <div className="border border-black/20 p-4 mb-8 text-sm sm:text-base leading-relaxed bg-black/2">
          Please read this Refund &amp; Cancellation Policy carefully before purchasing or enrolling in any course, program, workshop, webinar, or educational service offered by UPtrend Fin Academy.
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-base leading-relaxed text-black">
          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              1. No Refund Policy
            </h2>
            <p className="mb-3">
              All course, program, workshop, webinar, and educational-service fees paid to UPtrend Fin Academy are non-refundable.
            </p>
            <p className="mb-3">
              Once a payment has been successfully completed and enrollment or access has been confirmed, the amount paid will not ordinarily be refunded, cancelled, or reversed.
            </p>
            <p className="text-sm text-black/80 font-medium">
              By completing a purchase, you acknowledge and accept this no-refund policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              2. Course Access
            </h2>
            <p className="mb-3">
              Course access, learning materials, classes, recordings, resources, or other benefits will be provided according to the particular program purchased.
            </p>
            <p className="text-sm text-black/80">
              Failure to attend a class, webinar, session, or program does not ordinarily make the student eligible for a refund.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              3. Change of Schedule
            </h2>
            <p className="mb-3">
              UPtrend Fin Academy may, where reasonably necessary, change the date, time, instructor, delivery method, or schedule of a class or program.
            </p>
            <p className="mb-3">
              Where appropriate, students may be provided with an alternative session, revised schedule, recording, or other reasonable arrangement.
            </p>
            <p className="text-sm text-black/80">
              Such changes do not automatically create a right to a refund.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              4. Cancellation by UPtrend
            </h2>
            <p className="mb-3">
              In exceptional circumstances, UPtrend Fin Academy may cancel or discontinue a particular program.
            </p>
            <p className="text-sm text-black/80">
              If this occurs, UPtrend may, at its discretion and subject to applicable law, provide an alternative arrangement or other appropriate remedy to affected students.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              5. Duplicate or Incorrect Payments
            </h2>
            <p className="mb-3">
              If you believe that you have accidentally made a duplicate payment or that a payment was processed incorrectly, please contact us as soon as possible with the relevant transaction details.
            </p>
            <p className="text-sm text-black/80">
              Any correction or refund in such circumstances will be reviewed individually and processed where appropriate and legally required.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              6. Payment Gateway Issues
            </h2>
            <p className="mb-3">
              If an amount has been debited from your bank account but the enrollment/payment status on our system has not been successfully completed, please contact us with the transaction details.
            </p>
            <p className="text-sm text-black/80">
              We will investigate the transaction and, where applicable, coordinate with the relevant payment service provider.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              7. Unauthorized Transactions
            </h2>
            <p className="text-sm sm:text-base">
              If you believe that a transaction was made without your authorization, contact your bank/payment provider immediately and notify UPtrend Fin Academy with the relevant transaction information.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="pt-6 border-t border-black/20">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              8. Contact Us
            </h2>
            <p className="mb-4">
              For payment or enrollment-related queries, contact:
            </p>
            <div className="space-y-2">
              <p><strong>Entity:</strong> UPtrend Fin Academy</p>
              <p>
                <strong>Website:</strong>{" "}
                <Link href="/" className="underline">
                  uptrendfinacademy.com
                </Link>
              </p>
              <p>
                <strong>Phone &amp; WhatsApp:</strong>{" "}
                <a href="tel:+917907171406" className="underline">
                  +91 79071 71406
                </a>
              </p>
              <p><strong>Location:</strong> Perinthalmanna, Kerala</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
