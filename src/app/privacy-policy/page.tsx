import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-white text-black font-sans px-4 sm:px-8 md:px-12 lg:px-16 xl:px-36 py-10 sm:py-16">
      <div className="w-full">
        {/* Header */}
        <header className="border-b border-black/20 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
            Privacy Policy
          </h1>
          <p className="text-base text-black/90 leading-relaxed mb-4">
            UPtrend Fin Academy (&ldquo;UPtrend&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you provide when using our website, <span className="font-semibold">uptrendfinacademy.com</span>, and our educational services.
          </p>
          <div className="text-sm text-black/80 flex flex-wrap gap-4">
            <span><strong>Effective Date:</strong> 10 September 2026</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> 10 September 2026</span>
          </div>
        </header>

        {/* Notice */}
        <div className="border border-black/20 p-4 mb-8 text-sm sm:text-base leading-relaxed bg-black/[0.02]">
          <strong>Agreement to Terms:</strong> By accessing or using our website or enrolling in our courses, you agree to the practices described in this Privacy Policy.
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-base leading-relaxed text-black">
          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Name</li>
              <li>Mobile/WhatsApp number</li>
              <li>Email address</li>
              <li>Billing and transaction-related information</li>
              <li>Course or program enrollment details</li>
              <li>Information provided through contact forms, WhatsApp, email, or other communication channels</li>
              <li>Any other information you voluntarily provide while interacting with UPtrend</li>
            </ul>
            <p className="text-sm text-black/80">
              Payment information may be processed by third-party payment service providers. We generally do not store complete card, banking, UPI, or other sensitive payment credentials on our own servers.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We may use the information collected to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Process course registrations and payments</li>
              <li>Provide access to educational programs and services</li>
              <li>Communicate with students regarding courses, classes, schedules, updates, and support</li>
              <li>Respond to enquiries and customer-service requests</li>
              <li>Send important service-related notifications</li>
              <li>Improve our website, courses, and services</li>
              <li>Maintain records for administrative, accounting, legal, and regulatory purposes</li>
              <li>Prevent fraud, misuse, or unauthorized activity</li>
            </ul>
            <p className="text-sm text-black/80">
              Where permitted by applicable law, we may also use your contact information to send information about our educational programs and services. You may request that such promotional communications be stopped at any time.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              3. Payment Information
            </h2>
            <p className="mb-2">
              Payments made through our website may be handled by third-party payment gateways.
            </p>
            <p className="mb-2 font-medium">
              UPtrend Fin Academy does not intend to collect or store your complete debit-card, credit-card, banking-password, or UPI PIN information.
            </p>
            <p className="text-sm text-black/80">
              You should review the privacy practices of the relevant payment provider before completing a transaction.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              4. Cookies and Analytics
            </h2>
            <p className="mb-2">
              Our website may use cookies and similar technologies to improve website functionality, understand visitor behaviour, maintain security, and improve user experience.
            </p>
            <p className="mb-2">
              Third-party services such as analytics, advertising, payment, or communication providers may also use cookies or similar technologies according to their own policies.
            </p>
            <p className="text-sm text-black/80">
              You may control cookies through your browser settings, although disabling certain cookies may affect website functionality.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              5. Sharing of Information
            </h2>
            <p className="font-semibold mb-3">
              We do not sell or rent your personal information to third parties.
            </p>
            <p className="mb-3">
              We may share necessary information with trusted service providers where required to operate our business, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Payment-processing providers</li>
              <li>Website hosting and technology providers</li>
              <li>Communication and messaging services</li>
              <li>Analytics and security providers</li>
              <li>Professional advisers, accountants, or legal advisers where necessary</li>
              <li>Government authorities or law-enforcement agencies where required by applicable law</li>
            </ul>
            <p className="text-sm text-black/80">
              Such information will be shared only as reasonably necessary for the relevant purpose or as required by law.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              6. Data Security
            </h2>
            <p className="mb-2">
              We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
            </p>
            <p className="text-sm text-black/80">
              However, no internet-based transmission or electronic storage system can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including providing services, maintaining business and financial records, resolving disputes, complying with legal obligations, and protecting our legitimate interests.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              8. Third-Party Websites and Services
            </h2>
            <p className="mb-2">
              Our website may contain links to third-party websites, platforms, payment gateways, social-media services, or other external services.
            </p>
            <p className="text-sm text-black/80">
              UPtrend Fin Academy is not responsible for the privacy practices, security, or content of third-party websites. Users should review the privacy policies of those services separately.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not specifically directed toward children. We do not knowingly collect personal information from children for purposes prohibited by applicable law.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              10. Your Rights
            </h2>
            <p>
              Subject to applicable law, you may contact us regarding your personal information and request appropriate access, correction, or other action available under applicable privacy and data-protection laws.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              11. Changes to This Privacy Policy
            </h2>
            <p className="mb-2">
              UPtrend Fin Academy may update this Privacy Policy from time to time.
            </p>
            <p className="text-sm text-black/80">
              Any revised version will be published on our website with an updated effective date. Continued use of our website or services after an update may constitute acceptance of the revised policy to the extent permitted by law.
            </p>
          </section>

          {/* Section 12 */}
          <section id="section-12" className="pt-6 border-t border-black/20">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              12. Contact Us
            </h2>
            <p className="mb-4">
              For privacy-related questions or requests, please contact:
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
                <strong>Phone & WhatsApp:</strong>{" "}
                <a href="tel:+917907171406" className="underline">
                  +91 79071 71406
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:uptrendfinacademy@gmail.com" className="underline">
                  uptrendfinacademy@gmail.com
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
