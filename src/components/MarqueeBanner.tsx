"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  { text: "LEARN", highlight: true },
  { text: "TRADE", highlight: false },
  { text: "DEVELOP", highlight: true },
  { text: "NIFTY 50 OPTIONS", highlight: false },
  { text: "RISK DISCIPLINE", highlight: true },
  { text: "FOREX MASTERY", highlight: false },
  { text: "SYSTEMATIC EXECUTION", highlight: true },
  { text: "1:3 RISK-REWARD", highlight: false },
  { text: "OBJECTIVE DATA", highlight: true },
  { text: "MARKET PSYCHOLOGY", highlight: false },
];

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-brand-navy py-5 sm:py-6 lg:py-7 border-y border-brand-navy-dark shadow-[inset_0_2px_12px_rgba(0,0,0,0.25)]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-32 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left and Right Edge Vignette Gradient Fades */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 lg:w-40 bg-linear-to-r from-brand-navy via-brand-navy/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 lg:w-40 bg-linear-to-l from-brand-navy via-brand-navy/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Scrolling Track */}
      <div className="flex w-fit whitespace-nowrap">
        {/* Track 1 */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 24,
          }}
          className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10"
        >
          {items.concat(items).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 sm:gap-10 select-none"
            >
              <span
                className={`text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-wider transition-all duration-300 ${
                  item.highlight
                    ? "text-brand-gold drop-shadow-[0_0_12px_rgba(245,163,0,0.35)]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.text}
              </span>

              {/* Glowing Separator Diamond */}
              <span className="text-brand-gold/70 text-sm sm:text-base lg:text-lg animate-pulse">
                ✦
              </span>
            </div>
          ))}
        </motion.div>

        {/* Track 2 for seamless loop */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 24,
          }}
          aria-hidden="true"
          className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10"
        >
          {items.concat(items).map((item, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex items-center gap-6 sm:gap-10 select-none"
            >
              <span
                className={`text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-wider transition-all duration-300 ${
                  item.highlight
                    ? "text-brand-gold drop-shadow-[0_0_12px_rgba(245,163,0,0.35)]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.text}
              </span>

              {/* Glowing Separator Diamond */}
              <span className="text-brand-gold/70 text-sm sm:text-base lg:text-lg animate-pulse">
                ✦
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
