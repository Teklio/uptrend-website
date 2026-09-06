"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineTranslate,
} from "react-icons/hi";
import {
  FiLayers,
  FiCpu,
  FiBarChart2,
  FiShield,
  FiAward,
} from "react-icons/fi";
import MarqueeBanner from "@/components/MarqueeBanner";

const methodologyPillars = [
  {
    number: "01",
    icon: FiLayers,
    badge: "Smart Money Concepts (SMC)",
    title: "Advanced Market Mechanics",
    description:
      "We provide comprehensive training in Smart Money Concepts (SMC). Students learn to map market structure with precision, utilizing concepts such as Order Blocks, Fair Value Gaps (FVG), and liquidity pool sweeps to identify high-probability zones.",
    tags: ["Order Blocks", "Fair Value Gaps", "Liquidity Sweeps"],
  },
  {
    number: "02",
    icon: FiBarChart2,
    badge: "Order Flow & VWAP",
    title: "Data-Driven Execution",
    description:
      "Moving beyond basic charting, we integrate advanced analytical tools into our daily processes. We train our students to interpret Order Flow, track Cumulative Delta, and utilize dynamic tools like VWAP to validate their trade executions.",
    tags: ["Order Flow", "Cumulative Delta", "VWAP Validation"],
  },
  {
    number: "03",
    icon: FiCpu,
    badge: "Pine Script & Chartink",
    title: "Technological Integration",
    description:
      "We believe a modern trader must be highly systematic. UPtrend incorporates technological efficiency into our training, teaching students how to utilize custom Pine Script indicators and build robust Chartink screeners to filter momentum setups and automate their analytical workflow.",
    tags: ["Pine Script", "Chartink Screeners", "Workflow Automation"],
  },
];

const missionValues = [
  {
    title: "Strict Drawdown Control",
    desc: "Capital preservation protocols designed to protect your account during market shifts.",
  },
  {
    title: "Precise Position Sizing",
    desc: "Mathematical risk management tailored to market volatility and account parameters.",
  },
  {
    title: "Institutional-Grade Logic",
    desc: "Aligning trade setups with major liquidity pools and order flow footprints.",
  },
  {
    title: "Bilingual Mentorship",
    desc: "Structured online modules and live interactive sessions available in English and Malayalam.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-slate-900 font-sans">
      {/* 1. MINIMAL HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6"
          >
            About <span className="text-brand-navy"><span className="text-brand-gold">UP</span>trend</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Elevating the standard of trading proficiency through structured education, risk frameworks, and empirical market mechanics.
          </motion.p>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <MarqueeBanner />

      {/* 2. OUR STORY & FOUNDATION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Visual Image */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
                <Image
                  src="/about-lab.jpg"
                  alt="UPtrend Mentorship Lab"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Story Text */}
            <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Founded in Perinthalmanna, Kerala, <strong className="font-bold text-slate-950">UPtrend</strong> is a premier financial market education institute dedicated to elevating the standard of trading proficiency. We provide aspiring and active traders with the structured education, risk frameworks, and analytical depth required to treat the stock market as a disciplined, sustainable business.
              </p>
              <p className="text-slate-600">
                At UPtrend, we believe that consistent market performance is driven by systematic execution and a profound understanding of market mechanics. Our objective is to empower our students to navigate <strong className="font-semibold text-slate-900">Nifty 50 options, futures, Indian equities, and the Forex market</strong> with absolute clarity, relying on objective data rather than intuition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              Our Core Philosophy
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              True market mastery requires looking beyond surface-level price action to understand the underlying forces of supply and demand. Our approach is rooted in analyzing institutional market behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-navy-subtle flex items-center justify-center text-brand-navy text-xl">
                <FiShield />
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Institutional Market Footprint
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By focusing on the mechanics of liquidity, structural market shifts, and order flow, we train our students to align their strategies with the actual footprint of major market participants.
              </p>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
              <Image
                src="/about-methodology.jpg"
                alt="Institutional Market Behavior Analytics"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE UPTREND METHODOLOGY */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              The UPtrend Methodology
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Our curriculum bridges the gap between theoretical knowledge and practical, real-world application through a three-pillar technical framework.
            </p>
          </div>

          <div className="space-y-6">
            {methodologyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col md:flex-row gap-6 items-start hover:bg-white hover:border-slate-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex items-center justify-center text-xl shrink-0 font-bold">
                    <Icon />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950">
                      {pillar.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-3 flex flex-wrap gap-2">
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MENTORSHIP & MISSION */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Mentorship */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Practical Application
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              Practical, Real-World Mentorship
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              Education at UPtrend is led by active market practitioners. We emphasize the realities of live market execution, the importance of rigorous strategy backtesting, and the necessity of maintaining a detailed trade journal. Whether delivered through our structured online modules or interactive sessions—available in both <strong className="font-semibold text-slate-950">English and Malayalam</strong>—our training is designed to translate screen time into actionable skill.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-brand-navy text-white shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Mission Statement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Our Mission
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
              Our mission is to cultivate a community of independent, self-reliant traders who operate with professional discipline. By instilling strict drawdown control, precise position sizing, and institutional-grade logic, UPtrend is committed to providing the education necessary for traders to achieve long-term, sustainable growth in the financial markets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {missionValues.map((v, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-sm font-bold text-brand-gold">{v.title}</div>
                  <div className="text-xs text-slate-300">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            {/* Button 1: OUR COURSES (Yellow) */}
            <Link
              href="/courses"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
            >
              <span>OUR COURSES</span>
              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            {/* Button 2: APPLY TODAY (Blue) */}
            <Link
              href="/enrollment"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white bg-brand-navy hover:bg-brand-navy-hover shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
            >
              <span>APPLY TODAY</span>
              <HiOutlineArrowRight className="text-lg text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
