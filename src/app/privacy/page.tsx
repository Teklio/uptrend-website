"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineEye,
  HiOutlineDatabase,
  HiOutlineExternalLink,
  HiOutlineScale,
  HiOutlineRefresh,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineGlobeAlt,
  HiOutlineInformationCircle,
  HiOutlineArrowNarrowRight,
  HiOutlineCheck,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const sections = [
  { id: "section-1", number: "01", title: "Information We Collect", icon: HiOutlineDatabase },
  { id: "section-2", number: "02", title: "How We Use Your Information", icon: HiOutlineDocumentText },
  { id: "section-3", number: "03", title: "Payment Information", icon: HiOutlineCreditCard },
  { id: "section-4", number: "04", title: "Cookies and Analytics", icon: HiOutlineEye },
  { id: "section-5", number: "05", title: "Sharing of Information", icon: HiOutlineUserGroup },
  { id: "section-6", number: "06", title: "Data Security", icon: HiOutlineLockClosed },
  { id: "section-7", number: "07", title: "Data Retention", icon: HiOutlineDatabase },
  { id: "section-8", number: "08", title: "Third-Party Websites and Services", icon: HiOutlineExternalLink },
  { id: "section-9", number: "09", title: "Children's Privacy", icon: HiOutlineShieldCheck },
  { id: "section-10", number: "10", title: "Your Rights", icon: HiOutlineScale },
  { id: "section-11", number: "11", title: "Changes to This Privacy Policy", icon: HiOutlineRefresh },
  { id: "section-12", number: "12", title: "Contact Us", icon: HiOutlinePhone },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-slate-50/60 min-h-screen text-slate-900 font-sans pb-24">
      {/* 1. FULL-WIDTH HEADER / HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-14 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-800 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-navy/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
                <HiOutlineShieldCheck className="text-brand-gold text-base" />
                <span>Legal & Data Transparency</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Privacy <span className="text-brand-gold">Policy</span>
              </h1>
              <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                UPtrend Fin Academy (“UPtrend”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide when using our website, <span className="text-white font-medium">uptrendfinacademy.com</span>, and our educational services.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 lg:p-5 backdrop-blur-md shrink-0">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Effective Date</span>
                <span className="text-sm sm:text-base font-bold text-brand-gold">10 September 2026</span>
              </div>
              <div className="h-8 w-px bg-slate-700 hidden sm:block mx-2" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Last Updated</span>
                <span className="text-sm sm:text-base font-bold text-white">10 September 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONSENT NOTICE BANNER */}
      <div className="w-full bg-blue-50 border-b border-blue-100">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4">
          <div className="flex items-start sm:items-center gap-3 text-slate-800 text-sm sm:text-base leading-relaxed">
            <HiOutlineInformationCircle className="text-brand-navy text-xl shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong>Agreement to Terms:</strong> By accessing or using our website or enrolling in our courses, you agree to the practices described in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* 3. FULL-WIDTH TWO-COLUMN INTERACTIVE CONTENT LAYOUT */}
      <main className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* SIDEBAR NAVIGATION (STICKY ON LARGE SCREENS) */}
          <aside className="lg:col-span-4 xl:col-span-3 sticky top-24 hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">
                Table of Contents
              </h2>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-brand-navy text-white shadow-sm font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`text-xs ${isActive ? "text-brand-gold font-bold" : "text-slate-400"}`}>
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <Icon className={`text-base shrink-0 ml-1.5 ${isActive ? "text-brand-gold" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-slate-900 to-brand-navy text-white rounded-2xl p-6 border border-slate-800 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Have Questions?</span>
              <h3 className="text-base font-bold text-white mt-1 mb-2">Need Privacy Support?</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Contact our support desk for any data access, rectification, or inquiries.
              </p>
              <div className="space-y-2 text-xs">
                <a
                  href="https://wa.me/917907171406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
                >
                  <FaWhatsapp className="text-sm text-emerald-400" />
                  <span>WhatsApp: +91 79071 71406</span>
                </a>
                <a
                  href="tel:+917907171406"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
                >
                  <HiOutlinePhone className="text-sm text-brand-gold" />
                  <span>Call: +91 79071 71406</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN FULL-WIDTH EXPANSIVE CONTENT AREA */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            
            {/* SECTION 1 */}
            <section id="section-1" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  1. Information We Collect
                </h2>
              </div>
              
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                We may collect information that you voluntarily provide to us, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  "Name",
                  "Mobile/WhatsApp number",
                  "Email address",
                  "Billing and transaction-related information",
                  "Course or program enrollment details",
                  "Information provided through contact forms, WhatsApp, email, or other communication channels",
                  "Any other information you voluntarily provide while interacting with UPtrend",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <HiOutlineCheck className="text-brand-navy text-lg shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-sm sm:text-base leading-relaxed flex items-start gap-3">
                <HiOutlineInformationCircle className="text-amber-700 text-xl shrink-0 mt-0.5" />
                <p>
                  Payment information may be processed by third-party payment service providers. We generally do not store complete card, banking, UPI, or other sensitive payment credentials on our own servers.
                </p>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="section-2" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  2. How We Use Your Information
                </h2>
              </div>

              <p className="text-slate-700 text-base leading-relaxed mb-4">
                We may use the information collected to:
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "Process course registrations and payments",
                  "Provide access to educational programs and services",
                  "Communicate with students regarding courses, classes, schedules, updates, and support",
                  "Respond to enquiries and customer-service requests",
                  "Send important service-related notifications",
                  "Improve our website, courses, and services",
                  "Maintain records for administrative, accounting, legal, and regulatory purposes",
                  "Prevent fraud, misuse, or unauthorized activity",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-800 text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-brand-navy mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed">
                Where permitted by applicable law, we may also use your contact information to send information about our educational programs and services. You may request that such promotional communications be stopped at any time.
              </div>
            </section>

            {/* SECTION 3 */}
            <section id="section-3" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  3. Payment Information
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Payments made through our website may be handled by third-party payment gateways.
                </p>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 font-medium flex items-start gap-3">
                  <HiOutlineLockClosed className="text-brand-navy text-xl shrink-0 mt-0.5" />
                  <p>
                    UPtrend Fin Academy does not intend to collect or store your complete debit-card, credit-card, banking-password, or UPI PIN information.
                  </p>
                </div>
                <p>
                  You should review the privacy practices of the relevant payment provider before completing a transaction.
                </p>
              </div>
            </section>

            {/* SECTION 4 */}
            <section id="section-4" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  04
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  4. Cookies and Analytics
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Our website may use cookies and similar technologies to improve website functionality, understand visitor behaviour, maintain security, and improve user experience.
                </p>
                <p>
                  Third-party services such as analytics, advertising, payment, or communication providers may also use cookies or similar technologies according to their own policies.
                </p>
                <p>
                  You may control cookies through your browser settings, although disabling certain cookies may affect website functionality.
                </p>
              </div>
            </section>

            {/* SECTION 5 */}
            <section id="section-5" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  05
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  5. Sharing of Information
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold mb-6 flex items-center gap-3 text-sm sm:text-base">
                <HiOutlineShieldCheck className="text-emerald-600 text-xl shrink-0" />
                <span>We do not sell or rent your personal information to third parties.</span>
              </div>

              <p className="text-slate-700 text-base leading-relaxed mb-4">
                We may share necessary information with trusted service providers where required to operate our business, including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Payment-processing providers",
                  "Website hosting and technology providers",
                  "Communication and messaging services",
                  "Analytics and security providers",
                  "Professional advisers, accountants, or legal advisers where necessary",
                  "Government authorities or law-enforcement agencies where required by applicable law",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm sm:text-base text-slate-800">
                    <HiOutlineArrowNarrowRight className="text-brand-navy shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-600 italic">
                Such information will be shared only as reasonably necessary for the relevant purpose or as required by law.
              </p>
            </section>

            {/* SECTION 6 */}
            <section id="section-6" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  06
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  6. Data Security
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
                </p>
                <p className="text-slate-600">
                  However, no internet-based transmission or electronic storage system can be guaranteed to be completely secure.
                </p>
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="section-7" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  07
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  7. Data Retention
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including providing services, maintaining business and financial records, resolving disputes, complying with legal obligations, and protecting our legitimate interests.
              </p>
            </section>

            {/* SECTION 8 */}
            <section id="section-8" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  08
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  8. Third-Party Websites and Services
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Our website may contain links to third-party websites, platforms, payment gateways, social-media services, or other external services.
                </p>
                <p>
                  UPtrend Fin Academy is not responsible for the privacy practices, security, or content of third-party websites. Users should review the privacy policies of those services separately.
                </p>
              </div>
            </section>

            {/* SECTION 9 */}
            <section id="section-9" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  09
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  9. Children&apos;s Privacy
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our services are not specifically directed toward children. We do not knowingly collect personal information from children for purposes prohibited by applicable law.
              </p>
            </section>

            {/* SECTION 10 */}
            <section id="section-10" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  10
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  10. Your Rights
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Subject to applicable law, you may contact us regarding your personal information and request appropriate access, correction, or other action available under applicable privacy and data-protection laws.
              </p>
            </section>

            {/* SECTION 11 */}
            <section id="section-11" className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle text-brand-navy flex items-center justify-center font-bold text-sm shrink-0">
                  11
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  11. Changes to This Privacy Policy
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  UPtrend Fin Academy may update this Privacy Policy from time to time.
                </p>
                <p>
                  Any revised version will be published on our website with an updated effective date. Continued use of our website or services after an update may constitute acceptance of the revised policy to the extent permitted by law.
                </p>
              </div>
            </section>

            {/* SECTION 12: CONTACT US */}
            <section id="section-12" className="bg-gradient-to-br from-slate-900 via-brand-navy-dark to-slate-950 text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
                  12
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  12. Contact Us
                </h2>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                For privacy-related questions or requests, please contact:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Entity</span>
                  <h4 className="text-lg font-bold text-white mt-1">UPtrend Fin Academy</h4>
                  <div className="mt-4 flex items-center gap-2 text-slate-300">
                    <HiOutlineGlobeAlt className="text-brand-gold text-base" />
                    <Link href="/" className="hover:text-brand-gold transition-colors underline underline-offset-4">
                      uptrendfinacademy.com
                    </Link>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm space-y-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Direct Communication</span>
                  <div className="flex items-center gap-3">
                    <HiOutlinePhone className="text-brand-gold text-lg shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">Phone & WhatsApp</span>
                      <a href="tel:+917907171406" className="text-sm font-semibold text-white hover:text-brand-gold transition-colors">
                        +91 79071 71406
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <HiOutlineMail className="text-brand-gold text-lg shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block">Official Support Email</span>
                      <a href="mailto:uptrendfinacademy@gmail.com" className="text-sm font-semibold text-white hover:text-brand-gold transition-colors">
                        uptrendfinacademy@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <span>Last Updated: 10 September 2026</span>
                <span>UPtrend Fin Academy • Perinthalmanna, Kerala</span>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
