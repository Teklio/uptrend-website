"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { FiTrendingUp, FiTarget, FiActivity, FiBriefcase } from "react-icons/fi";

const pillars = [
  {
    icon: FiBriefcase,
    title: "Disciplined Business Mindset",
    description:
      "Transition from intuitive gambling to treating the financial market as a sustainable, structured business.",
  },
  {
    icon: FiTarget,
    title: "Institutional Risk Frameworks",
    description:
      "Protect your capital with defined risk-to-reward parameters (1:3+ RR) and strict position sizing rules.",
  },
  {
    icon: FiActivity,
    title: "Profound Market Mechanics",
    description:
      "Master price action dynamics across Nifty 50 options, futures, Indian equities, and Forex markets.",
  },
  {
    icon: FiTrendingUp,
    title: "Objective Data-Driven Execution",
    description:
      "Rely on systematic execution, volume profile, and empirical market data rather than emotion or intuition.",
  },
];

export default function About() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // Auto-cycle through cards on mobile every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % pillars.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activePillar = pillars[activePillarIndex];
  const ActiveIcon = activePillar.icon;

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-36 bg-slate-50/60 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
              ABOUT UPTREND • PERINTHALMANNA, KERALA
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-4xl"
          >
            Elevating The Standard Of{" "}
            <span className="text-brand-navy">Trading Proficiency.</span>
          </motion.h2>
        </div>

        {/* 2-Column Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Visual Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl p-3 bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,43,127,0.08)] overflow-hidden">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src="/about-lab.jpg"
                  alt="UPtrend Financial Market Education Analytics Lab"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-white/10 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 flex items-center justify-between text-white">
                  <div>
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                      UPtrend Mentorship Hub
                    </div>
                    <div className="text-sm font-medium text-slate-200">
                      Perinthalmanna, Kerala
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-gold text-slate-950">
                    Live Analytics
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm uppercase tracking-wider mb-3">
              <HiOutlineLightBulb className="text-lg" />
              <span>Our Foundation & Mission</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight mb-6">
              Founded in Perinthalmanna, Kerala to Transform How You Trade.
            </h3>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-6">
              Founded in Perinthalmanna, Kerala, <strong className="font-semibold text-slate-950">UPtrend</strong> is a premier financial market education institute dedicated to elevating the standard of trading proficiency. We provide aspiring and active traders with the structured education, risk frameworks, and analytical depth required to treat the stock market as a disciplined, sustainable business.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8">
              At UPtrend, we believe that consistent market performance is driven by systematic execution and a profound understanding of market mechanics. Our objective is to empower our students to navigate <strong className="font-semibold text-slate-950">Nifty 50 options, futures, Indian equities, and the Forex market</strong> with absolute clarity, relying on objective data rather than intuition.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold-hover shadow-lg shadow-brand-gold/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Read more</span>
              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>

        {/* 4 Pillars Grid Cards (Desktop / Tablet) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-navy/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy-subtle border border-brand-navy/15 flex items-center justify-center text-brand-navy text-2xl mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 group-hover:text-brand-navy transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  <HiOutlineCheckCircle className="text-emerald-500 text-base" />
                  <span>UPtrend Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Automatic Rotating Card (No Buttons Required) */}
        <div className="block md:hidden">
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillarIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center text-2xl mb-4 shadow-md">
                    <ActiveIcon />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 mb-2">
                    {activePillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-wider">
                  <HiOutlineCheckCircle className="text-emerald-500 text-base" />
                  <span>UPtrend Standard</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator Dots for Mobile */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {pillars.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${activePillarIndex === idx
                    ? "w-6 bg-brand-navy"
                    : "w-1.5 bg-slate-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
