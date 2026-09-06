"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import EnrollForm from "@/components/EnrollForm";
import { HiOutlineSparkles } from "react-icons/hi2";

function EnrollmentContent() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get("course") || "nifty-options";

  return (
    <div className="min-h-screen pt-12 pb-24 bg-gradient-to-b from-slate-100/90 via-slate-50/70 to-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-brand-gold/15 via-brand-navy/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4"
          >
            Enroll in <span className="text-brand-navy"><span className="text-brand-gold">UP</span>trend</span>
          </motion.h1>
        </div>

        {/* Centered Enrollment Form */}
        <div className="max-w-2xl mx-auto">
          <EnrollForm preselectedCourseId={preselectedCourse} />
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EnrollmentContent />
    </Suspense>
  );
}
