"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import Input from "@/components/Input";
import MarqueeBanner from "@/components/MarqueeBanner";

const PHONE_NUMBER = "7907171406";
const DISPLAY_PHONE = "790 7171 406";
const LOCATION_ADDRESS = "Bypass Road, Perinthalmanna,  kerala - 679 322";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate inquiry submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const whatsappUrl = `https://wa.me/91${PHONE_NUMBER}?text=Hi%20UPtrend,%20I%20would%20like%20to%20inquire%20about%20your%20trading%20courses.`;
  const callUrl = `tel:+91${PHONE_NUMBER}`;

  return (
    <div className="w-full bg-white text-slate-900 font-sans">
      {/* 1. HERO HEADER */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-gradient-to-b from-slate-100/90 via-slate-50/70 to-white overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-b from-brand-gold/15 via-brand-navy/10 to-transparent blur-[130px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f018_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f018_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-bold text-slate-800 uppercase tracking-wider mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
            <span>GET IN TOUCH</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6"
          >
            Contact <span className="text-brand-navy"><span className="text-brand-gold">UP</span>trend</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Have questions about our structured trading curriculum, cohort schedules, or risk management modules? Speak with our admissions counselors today.
          </motion.p>
        </div>
      </section>

      {/* MARQUEE RUNNER */}
      <MarqueeBanner />

      {/* 2. CONTACT DETAILS & FORM SECTION */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Info & Perinthalmanna Details */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
                  Direct Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                  We are here to elevate your trading journey.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Reach out directly via phone, WhatsApp, or email, or drop by our Perinthalmanna institute for a face-to-face consultation.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5">
                {/* WhatsApp Action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white text-slate-900 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center text-xl shadow-md">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-[#128C7E] group-hover:text-white transition-colors">
                        Instant WhatsApp Chat
                      </div>
                      <div className="text-base font-extrabold">
                        +91 {DISPLAY_PHONE}
                      </div>
                    </div>
                  </div>
                  <HiOutlineArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </a>

                {/* Direct Phone Call */}
                <a
                  href={callUrl}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-brand-navy-subtle border border-brand-navy/20 hover:bg-brand-navy hover:text-white text-slate-900 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center text-lg shadow-md group-hover:bg-white/10 transition-colors">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-brand-navy group-hover:text-brand-gold transition-colors">
                        Direct Phone Call
                      </div>
                      <div className="text-base font-extrabold">
                        +91 {DISPLAY_PHONE}
                      </div>
                    </div>
                  </div>
                  <HiOutlineArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Physical Location & Hours Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-brand-navy flex items-center justify-center text-lg shrink-0 mt-0.5">
                    <HiOutlineLocationMarker className="text-xl text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Institute Location
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-950 mt-0.5 leading-snug">
                      Bypass Road, Perinthalmanna,
                      <br className="hidden lg:inline" /> Kerala - 679 322
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-brand-navy flex items-center justify-center text-lg shrink-0">
                    <HiOutlineMail className="text-xl text-brand-navy" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Email Address
                    </div>
                    <a
                      href="mailto:uptrendfinacademy@gmail.com"
                      className="text-sm sm:text-base font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
                    >
                      uptrendfinacademy@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200/70">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-brand-navy flex items-center justify-center text-lg shrink-0">
                    <HiOutlineClock className="text-xl text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Office Hours
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      Monday – Saturday: 9:00 AM – 6:00 PM IST
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.06)] p-7 sm:p-10">
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    Send Us A Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    Fill out the form below and our lead mentor team will get back to you within 24 hours.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 py-8"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl border border-emerald-100">
                      <HiOutlineCheckCircle />
                    </div>

                    <h4 className="text-xl font-bold text-slate-950">
                      Thank You, {formData.name}!
                    </h4>

                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your inquiry has been successfully received. A representative from UPtrend Perinthalmanna will connect with you on <strong className="text-slate-900 font-semibold">{formData.phone}</strong> shortly.
                    </p>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", message: "" });
                        }}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold-hover transition-colors shadow-sm"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                        {error}
                      </div>
                    )}

                    <Input
                      label="Full Name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      leftIcon={<HiOutlineUser />}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Email Address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        leftIcon={<HiOutlineMail />}
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        leftIcon={<HiOutlinePhone />}
                      />
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label
                        htmlFor="message"
                        className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between"
                      >
                        <span>Your Message / Query</span>
                        <span className="text-red-500 font-normal text-xs">*</span>
                      </label>

                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 transition-all duration-200 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 hover:border-slate-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold shadow-md shadow-brand-gold/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer overflow-hidden mt-3"
                    >
                      <span>{loading ? "Sending Message..." : "Submit Message"}</span>
                      <HiOutlineArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />

                      {/* Shimmer */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <HiOutlineShieldCheck className="text-emerald-500 text-base" />
                  <span>Your information is strictly confidential and never shared.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
