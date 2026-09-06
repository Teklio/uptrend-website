"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FiTrendingUp, FiTarget, FiLayers, FiCpu } from "react-icons/fi";
import { BsCurrencyBitcoin, BsCurrencyExchange } from "react-icons/bs";
import { TbChartCandle } from "react-icons/tb";

const features = [
    {
        icon: FiTarget,
        value: "1:3+ Min",
        label: "Risk-to-Reward Focus",
        detail: "Strict Capital Preservation",
    },
    {
        icon: FiLayers,
        value: "100%",
        label: "Objective Data",
        detail: "SMC & Order Flow Mechanics",
    },
    {
        icon: FiTrendingUp,
        value: "4 Markets",
        label: "Comprehensive Breadth",
        detail: "Nifty, Futures, Equities & Forex",
    },
    {
        icon: FiCpu,
        value: "1-on-1",
        label: "Live Mentorship",
        detail: "English & Malayalam Sessions",
    },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50/60 to-white">
            {/* Background Image (hero_bg.png) with Exact Top White Fade Match */}
            <div className="absolute inset-0 -z-30 pointer-events-none overflow-hidden">
                <Image
                    src="/hero_bg.png"
                    alt="Uptrend Trading Background"
                    fill
                    priority
                    className="object-cover object-top opacity-35 sm:opacity-45 mix-blend-multiply"
                    sizes="100vw"
                />
                {/* Seamless Multi-Layered White Mask to perfectly match the white theme */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/90" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.9)_0%,transparent_100%)]" />
            </div>

            {/* Ambient Background Concentric Radar Rings & Glowing Trading Orbs (Using Brand Color Codes) */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                {/* Central High-Intensity Soft Glow Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[550px] rounded-full bg-gradient-to-b from-brand-gold/25 via-brand-navy/15 to-transparent blur-[110px]" />

                {/* Concentric Radar / Orbit Rings with Increased Opacity & Brand Colors */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1150px] h-[1150px] rounded-full border-2 border-brand-navy/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[920px] rounded-full border-2 border-brand-gold/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-2 border-brand-navy/25" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[490px] h-[490px] rounded-full border-2 border-brand-gold/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-2 border-brand-navy/35" />

                {/* Grid Overlay Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#002b7f12_1px,transparent_1px),linear-gradient(to_bottom,#002b7f12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_75%,transparent_100%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* 4 Large Glowing Circular Trading Orbs - Positioned & Contained for Large & Small Screens */}
                {/* 1. Top-Left: Bitcoin / Crypto Orb */}
                <motion.div
                    animate={{
                        y: [0, -14, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-0 sm:top-4 left-0 sm:left-2 lg:left-6 z-10 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#001c54]/90 backdrop-blur-xl border-2 border-brand-gold p-1.5 shadow-[0_0_30px_rgba(245,163,0,0.45)]"
                >
                    <div className="w-full h-full rounded-full border border-brand-gold/50 flex items-center justify-center bg-gradient-to-b from-brand-navy via-[#001c54] to-slate-950 text-brand-gold">
                        <BsCurrencyBitcoin className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(245,163,0,0.85)]" />
                    </div>
                </motion.div>

                {/* 2. Top-Right: Currency Exchange Orb */}
                <motion.div
                    animate={{
                        y: [0, 14, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        duration: 6.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6,
                    }}
                    className="absolute top-0 sm:top-4 right-0 sm:right-2 lg:right-6 z-10 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#001c54]/90 backdrop-blur-xl border-2 border-brand-gold p-1.5 shadow-[0_0_30px_rgba(245,163,0,0.45)]"
                >
                    <div className="w-full h-full rounded-full border border-brand-gold/50 flex items-center justify-center bg-gradient-to-b from-brand-navy via-[#001c54] to-slate-950 text-brand-gold">
                        <BsCurrencyExchange className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(245,163,0,0.85)]" />
                    </div>
                </motion.div>

                {/* 3. Mid-Left: Uptrend Chart Orb */}
                <motion.div
                    animate={{
                        y: [0, -12, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2,
                    }}
                    className="absolute top-[40%] sm:top-[38%] -left-2 sm:left-0 lg:left-4 z-10 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#001c54]/90 backdrop-blur-xl border-2 border-brand-gold p-1.5 shadow-[0_0_30px_rgba(245,163,0,0.45)]"
                >
                    <div className="w-full h-full rounded-full border border-brand-gold/50 flex items-center justify-center bg-gradient-to-b from-brand-navy via-[#001c54] to-slate-950 text-brand-gold">
                        <FiTrendingUp className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(245,163,0,0.85)]" />
                    </div>
                </motion.div>

                {/* 4. Mid-Right: Candlestick Pattern Orb */}
                <motion.div
                    animate={{
                        y: [0, 12, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.8,
                    }}
                    className="absolute top-[40%] sm:top-[38%] -right-2 sm:right-0 lg:right-4 z-10 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#001c54]/90 backdrop-blur-xl border-2 border-brand-gold p-1.5 shadow-[0_0_30px_rgba(245,163,0,0.45)]"
                >
                    <div className="w-full h-full rounded-full border border-brand-gold/50 flex items-center justify-center bg-gradient-to-b from-brand-navy via-[#001c54] to-slate-950 text-brand-gold">
                        <TbChartCandle className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(245,163,0,0.85)]" />
                    </div>
                </motion.div>

                <div className="flex flex-col items-center text-center">
                    {/* Full-Width Bold Headline with Sequential Vertical Bounce Wave Animation */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-950 leading-[1.1] max-w-5xl mb-8 uppercase select-none">
                        {/* 1. Word: LEARN */}
                        <motion.span
                            animate={{
                                y: [0, -20, 3, -1, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.2,
                                repeat: Infinity,
                                repeatDelay: 3.3,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="inline-block text-brand-navy will-change-transform"
                        >
                            LEARN
                        </motion.span>

                        {/* Dot 1 */}
                        <motion.span
                            animate={{
                                y: [0, -14, 2, 0],
                            }}
                            transition={{
                                duration: 1.0,
                                delay: 0.35,
                                repeat: Infinity,
                                repeatDelay: 3.5,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="inline-block text-brand-gold mx-2 sm:mx-3 will-change-transform"
                        >
                            .
                        </motion.span>

                        {/* 2. Word: TRADE */}
                        <motion.span
                            animate={{
                                y: [0, -20, 3, -1, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 1.5,
                                repeat: Infinity,
                                repeatDelay: 3.3,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="inline-block bg-gradient-to-r from-brand-gold to-amber-500 bg-clip-text text-transparent will-change-transform"
                        >
                            TRADE
                        </motion.span>

                        {/* Dot 2 */}
                        <motion.span
                            animate={{
                                y: [0, -14, 2, 0],
                            }}
                            transition={{
                                duration: 1.0,
                                delay: 1.65,
                                repeat: Infinity,
                                repeatDelay: 3.5,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="inline-block text-brand-navy mx-2 sm:mx-3 will-change-transform"
                        >
                            .
                        </motion.span>

                        <br />

                        {/* 3. Word: GROW */}
                        <motion.span
                            animate={{
                                y: [0, -20, 3, -1, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 2.8,
                                repeat: Infinity,
                                repeatDelay: 3.3,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="relative inline-block text-brand-navy will-change-transform"
                        >
                            GROW
                        </motion.span>

                        {/* Dot 3 */}
                        <motion.span
                            animate={{
                                y: [0, -14, 2, 0],
                            }}
                            transition={{
                                duration: 1.0,
                                delay: 2.95,
                                repeat: Infinity,
                                repeatDelay: 3.5,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                            className="inline-block text-brand-gold ml-2 sm:ml-3 will-change-transform"
                        >
                            .
                        </motion.span>
                    </h1>

                    {/* Subtitle with structured full-width readability */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-slate-600 font-normal leading-relaxed max-w-4xl mb-10"
                    >
                        We empower aspiring and active traders with structured risk frameworks,
                        <br className="hidden md:inline" /> analytical depth, and systematic execution across{" "}
                        <strong className="font-semibold text-slate-900">
                            Nifty 50 Options, Futures, Indian Equities & Forex
                        </strong>
                        —relying on{" "}
                        <span className="text-brand-navy font-semibold underline decoration-brand-gold decoration-2 underline-offset-4">
                            objective data
                        </span>{" "}
                        rather than intuition.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 w-full sm:w-auto mb-16 sm:mb-20"
                    >
                        {/* Button 1: OUR COURSES (Yellow Background) */}
                        <Link
                            href="/courses"
                            className="group relative w-full max-w-[280px] sm:max-w-none sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4.5 rounded-full text-sm sm:text-lg font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold shadow-[0_4px_24px_rgba(245,163,0,0.4)] hover:shadow-[0_8px_32px_rgba(245,163,0,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
                        >
                            <span>OUR COURSES</span>
                            <HiOutlineArrowRight className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-1.5" />

                            {/* Shimmer reflection */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                        </Link>

                        {/* Button 2: APPLY TODAY (Blue Background) */}
                        <Link
                            href="/enrollment"
                            className="group relative w-full max-w-[280px] sm:max-w-none sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4.5 rounded-full text-sm sm:text-lg font-bold text-white bg-gradient-to-r from-brand-navy via-blue-900 to-brand-navy hover:from-brand-navy-hover hover:to-brand-navy shadow-[0_4px_24px_rgba(0,43,127,0.35)] hover:shadow-[0_8px_32px_rgba(0,43,127,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/15 uppercase tracking-wide"
                        >
                            <span>APPLY TODAY</span>
                            <HiOutlineArrowRight className="text-base sm:text-lg text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                    </motion.div>

                    {/* Wide-Screen Expanded Framework Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="w-full max-w-7xl mx-auto"
                    >
                        <div className="rounded-3xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold border border-amber-300 shadow-[0_16px_50px_rgba(245,163,0,0.3)] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                            {/* Subtle background shimmer pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-brand-navy/20 relative z-10">
                                {features.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 group"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-[#001c54] text-brand-gold flex items-center justify-center text-xl mb-3 shadow-md group-hover:scale-110 transition-transform duration-200">
                                                <Icon />
                                            </div>
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001c54] tracking-tight mb-1">
                                                {item.value}
                                            </div>
                                            <div className="text-sm sm:text-base font-bold text-brand-navy mb-0.5">
                                                {item.label}
                                            </div>
                                            <div className="text-xs sm:text-sm font-semibold text-[#001c54]/80">
                                                {item.detail}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
