"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { COURSES_DATA } from "@/data/courses";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-10 pb-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-brand-gold/15 via-brand-navy/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4"
          >
            Explore Our <span className="text-brand-navy">Trading</span>{" "}
            <span className="bg-gradient-to-r from-brand-gold to-amber-500 bg-clip-text text-transparent">
              Programs
            </span>
          </motion.h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Select a program below to review detailed syllabus, live cohort schedules, and enroll.
          </p>
        </div>

        {/* Courses Cards Grid - Exactly matching reference Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-20">
          {COURSES_DATA.map((course, idx) => {
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="group block bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h2 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-3">
                        {course.title}
                      </h2>
                    </div>

                    <div className="pt-2">
                      {/* Instructor */}
                      <p className="text-xs text-slate-500 font-medium mb-1">
                        {course.instructor}
                      </p>

                      {/* Pricing Row (Crossed out original price + green current price) */}
                      <div className="flex items-center gap-2">
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{course.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-sm sm:text-base font-bold text-emerald-700">
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
