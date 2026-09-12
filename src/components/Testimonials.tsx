"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";
import { HiCheckBadge, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  avatarBg: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Rahul Krishnan",
    location: "Kochi, Kerala",
    rating: 5,
    review:
      "Transformed my trading from emotional gambling to systematic 1:3 RR execution. The Smart Money Concepts (SMC) and liquidity depth are phenomenal! I now enter with precise stop losses.",
    avatar: "RK",
    avatarBg: "from-blue-600 to-indigo-700",
  },
  {
    name: "Anas Parakkal",
    location: "Malappuram, Kerala",
    rating: 5,
    review:
      "The 1-on-1 Malayalam mentorship made institutional order flow crystal clear. Strict capital preservation rules saved my trading career. Can't thank the mentors enough.",
    avatar: "AP",
    avatarBg: "from-amber-500 to-amber-700",
  },
  {
    name: "Deepak Menon",
    location: "Calicut, Kerala",
    rating: 5,
    review:
      "Objective data-driven market screeners replaced intuition and hearsay. Best price action training academy in Kerala by far! The daily live market analysis is pure gold.",
    avatar: "DM",
    avatarBg: "from-emerald-600 to-teal-800",
  },
  {
    name: "Sneha Varma",
    location: "Trivandrum, Kerala",
    rating: 5,
    review:
      "Learning how institutional algorithms trap retail traders was a total game-changer. The community trade breakdowns and live mentorship give unmatched confidence.",
    avatar: "SV",
    avatarBg: "from-purple-600 to-pink-700",
  },
  {
    name: "Mohammed Fasil",
    location: "Perinthalmanna, Kerala",
    rating: 5,
    review:
      "Attending offline classes at Perinthalmanna gave me direct access to professional charting desks. The order flow and volume profile mechanics are world-class.",
    avatar: "MF",
    avatarBg: "from-rose-600 to-red-700",
  },
  {
    name: "Vishnu Raj",
    location: "Thrissur, Kerala",
    rating: 5,
    review:
      "Risk management is not just a chapter here—it is the core philosophy. I went from blowing accounts to steady weekly growth with strict position sizing.",
    avatar: "VR",
    avatarBg: "from-cyan-600 to-blue-800",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = totalPages - 1;
        if (nextIndex >= totalPages) nextIndex = 0;
        return nextIndex;
      });
    },
    [totalPages]
  );

  // Auto-play every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [paginate]);

  // Determine which cards to display on current slide
  const startIndex = currentIndex * itemsPerPage;
  const currentTestimonials = testimonialsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="relative py-20 sm:py-28 bg-linear-to-b from-white via-slate-50/80 to-slate-100/90 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sm:mb-14">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4">
              Real Stories From <span className="text-brand-navy">Kerala&apos;s Active</span>{" "}
              <span className="bg-linear-to-r from-brand-gold to-amber-500 bg-clip-text text-transparent">
                Traders
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Discover how aspiring beginners and experienced traders transitioned to disciplined,
              data-driven profitability through our institutional frameworks.
            </p>
          </div>

          {/* Carousel Arrows (Desktop / Top) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg text-slate-700 hover:text-brand-navy hover:border-brand-navy/30 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg text-slate-700 hover:text-brand-navy hover:border-brand-navy/30 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Next Slide"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative min-h-[320px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 80 : -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -80 : 80,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {currentTestimonials.map((item, idx) => (
                <div
                  key={item.name + idx}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,43,127,0.05)] hover:shadow-[0_16px_50px_rgba(0,43,127,0.1)] hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Top Accent Stripe */}
                  <div className="absolute top-0 inset-x-8 h-1 bg-linear-to-r from-brand-gold via-amber-400 to-brand-navy rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Card Header: 5 Stars Rating */}
                    <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <HiStar key={i} />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed mb-6 italic">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Student Info */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full bg-linear-to-br ${item.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-md shrink-0`}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-950 flex items-center gap-1">
                        <span>{item.name}</span>
                        <HiCheckBadge className="text-emerald-500 text-base shrink-0" />
                      </div>
                      <div className="text-xs text-slate-500">{item.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                setDirection(dotIdx > currentIndex ? 1 : -1);
                setCurrentIndex(dotIdx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx
                  ? "w-8 bg-brand-navy"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
