import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="w-full min-h-screen bg-white text-black font-sans px-4 sm:px-8 md:px-12 lg:px-16 xl:px-36 py-10 sm:py-16">
      <div className="w-full">
        {/* Header */}
        <header className="border-b border-black/20 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
            Disclaimer
          </h1>
          <div className="text-sm text-black/80 flex flex-wrap gap-4 mb-4">
            <span><strong>Effective Date:</strong> 10 September 2026</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> 10 September 2026</span>
          </div>
          <p className="text-base text-black/90 leading-relaxed">
            The information, educational content, examples, charts, market observations, strategies, and materials provided by UPtrend Fin Academy through its website, courses, classes, webinars, social-media channels, and other educational platforms are provided for educational and informational purposes only.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-8 text-base leading-relaxed text-black">
          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              1. Not Investment Advice
            </h2>
            <p className="mb-3">
              UPtrend Fin Academy is an educational platform. The content provided by us should not be considered personalized investment advice, financial advice, trading advice, portfolio-management advice, or a recommendation to buy, sell, or hold any security or financial instrument.
            </p>
            <p className="text-sm text-black/80 font-medium">
              Nothing presented in our educational programs should be interpreted as a guarantee or assurance of any particular investment or trading outcome.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              2. Market Risk
            </h2>
            <p className="mb-3">
              Trading and investing in financial markets involve substantial risk.
            </p>
            <p className="mb-3">
              The value of stocks, securities, derivatives, commodities, currencies, and other financial instruments can rise or fall. You may lose some or all of the capital you invest or trade.
            </p>
            <p className="text-sm text-black/80">
              Past performance, historical examples, hypothetical results, or examples shown during our educational programs do not guarantee future results.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              3. No Profit Guarantee
            </h2>
            <p className="mb-3">
              UPtrend Fin Academy does not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Profits or returns from trading or investing</li>
              <li>A specific percentage of return</li>
              <li>Successful execution of any strategy</li>
              <li>Recovery of trading losses</li>
              <li>Employment or income from completing a course</li>
              <li>That any particular strategy will work under all market conditions</li>
            </ul>
            <p className="text-sm text-black/80">
              Any examples of profits, returns, or successful trades shown in our educational material are examples only and should not be interpreted as typical or guaranteed results.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              4. Independent Decision-Making
            </h2>
            <p className="mb-3">
              Students and website users are responsible for conducting their own research and making their own financial decisions.
            </p>
            <p className="text-sm text-black/80">
              Before making any investment or trading decision, you should consider your financial situation, risk tolerance, investment objectives, and level of experience and, where appropriate, consult a qualified financial professional.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              5. Accuracy of Information
            </h2>
            <p>
              We make reasonable efforts to provide accurate and up-to-date educational information. However, market information can change rapidly, and we do not guarantee that all information available through our website or educational programs will always be complete, accurate, current, or error-free.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              6. Educational Examples
            </h2>
            <p className="mb-2">
              Charts, technical-analysis examples, hypothetical trades, backtests, case studies, market scenarios, and other examples may be used solely to explain concepts.
            </p>
            <p className="text-sm text-black/80">
              Such examples do not constitute recommendations or predictions of future market performance.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              7. Technology and Third-Party Services
            </h2>
            <p>
              UPtrend Fin Academy is not responsible for losses or damages arising from technical failures, internet interruptions, brokerage-platform issues, data-feed errors, third-party service interruptions, or other circumstances beyond our reasonable control.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              8. Regulatory Status
            </h2>
            <p className="mb-3">
              Unless expressly stated otherwise on our website or in official documentation, enrollment in an UPtrend Fin Academy educational program does not by itself constitute the provision of personalized investment advisory, portfolio-management, or other regulated financial services.
            </p>
            <p className="text-sm text-black/80">
              Users should independently verify the regulatory status and authorization of any person or entity providing financial services before relying on such services.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              9. Acceptance of Disclaimer
            </h2>
            <p>
              By accessing our website, purchasing a course, or participating in any UPtrend Fin Academy educational program, you acknowledge that you have read and understood this Disclaimer and agree that financial-market decisions are made at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="pt-6 border-t border-black/20">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
              10. Contact
            </h2>
            <div className="space-y-2">
              <p><strong>Entity:</strong> UPtrend Fin Academy</p>
              <p>
                <strong>Website:</strong>{" "}
                <Link href="/" className="underline">
                  uptrendfinacademy.com
                </Link>
              </p>
              <p>
                <strong>Phone / WhatsApp:</strong>{" "}
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
