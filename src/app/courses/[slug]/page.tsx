"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { COURSES_DATA } from "@/data/courses";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiStar,
} from "react-icons/hi2";
import { FiCheckCircle, FiChevronRight, FiShield } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const course = COURSES_DATA.find((c) => c.slug === resolvedParams.slug);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState<"order" | "billing">("order");

  if (!course) {
    notFound();
  }

  const handleOpenCheckout = (step: "order" | "billing" = "order") => {
    setDrawerStep(step);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]/60 text-slate-900 pb-28">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-brand-navy transition-colors"
          >
            <HiOutlineArrowLeft className="text-base" />
            <span>Back to All Courses</span>
          </Link>
          <div className="flex items-center gap-2 text-slate-400 font-medium text-xs hidden sm:flex">
            <span>Courses</span>
            <FiChevronRight />
            <span className="text-slate-700 font-semibold truncate max-w-[280px]">
              {course.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* HERO BANNER & MAIN DETAILS (Matching Reference Design) */}
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Course Thumbnail Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl mx-auto aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900"
          >
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight max-w-3xl mx-auto"
          >
            {course.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {course.shortDescription}
          </motion.p>

          {/* Buy Now Button with Amount */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2 pb-1"
          >
            <button
              type="button"
              onClick={() => handleOpenCheckout("order")}
              className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-[#0e5c3e] hover:bg-[#0b4b32] active:scale-[0.98] shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all cursor-pointer tracking-wide"
            >
              Buy now for ₹{course.price.toLocaleString("en-IN")}
            </button>
          </motion.div>

          {/* Instructor & Language Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-blue-700">
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineUser className="text-base text-blue-600" />
              <span>Instructor: {course.instructor}</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineGlobeAlt className="text-base text-blue-600" />
              <span>Language: {course.language}</span>
            </span>
          </div>
        </div>

        {/* SECTION 1: ABOUT THE COURSE */}
        <section className="mt-16 sm:mt-20 pt-10 border-t border-slate-300/80">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              About the course
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
            {course.about.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-xs text-slate-500 font-medium">Cohort Duration</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{course.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-xs text-slate-500 font-medium">Access Type</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{course.access}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-xs text-slate-500 font-medium">Skill Level</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{course.level}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-xs text-slate-500 font-medium">Batch Session</span>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">{course.tag || "Live Mentorship"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: KEY HIGHLIGHTS */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES OF THE COURSE (CURRICULUM) */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Features of the Course
            </h2>
          </div>

          <div className="space-y-4">
            {course.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 border border-blue-200">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: COURSE REVIEWS */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Course Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <HiStar key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{review.name}</span>
                    <span className="text-slate-500">{review.location}</span>
                  </div>
                  <span className="text-slate-400 font-medium">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Callout Banner */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-brand-navy via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
              Limited Cohort Seats
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to master trading with Nikhil Mathew?
            </h3>
            <p className="text-sm text-slate-300">
              Instant access to live classes, daily watchlists, and community mentorship.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleOpenCheckout("order")}
                className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold transition-all shadow-lg hover:shadow-xl cursor-pointer text-sm uppercase tracking-wider"
              >
                Enroll Now • ₹{course.price.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Checkout Drawer */}
      <CheckoutDrawer
        course={course}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialStep={drawerStep}
      />
    </div>
  );
}
