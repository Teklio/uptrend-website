"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { listCourses } from "@/services/course.service";
import { CourseListItem } from "@/types/course.type";
import { ApiError } from "@/lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      listCourses({ limit: 24, search: search || undefined })
        .then((res) => setCourses(res.items))
        .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load courses."))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-h-screen pt-10 pb-24 bg-surface-muted relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-linear-to-b from-brand-gold/15 via-brand-navy/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

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
            <span className="bg-linear-to-r from-brand-gold to-amber-500 bg-clip-text text-transparent">
              Programs
            </span>
          </motion.h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
            Select a program below to review detailed syllabus, live cohort schedules, and enroll.
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs..."
            className="w-full max-w-sm mx-auto px-4 py-2.5 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
          />
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 mb-10">{error}</p>
        )}

        {loading ? (
          <div className="text-center text-sm text-slate-500 py-16">Loading programs...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-sm text-slate-500 py-16">No programs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-20">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link
                  href={`/courses/${course.id}`}
                  className="group block bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                    {course.primaryImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- signed S3 URL, host/query vary per environment
                      <img
                        src={course.primaryImageUrl}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        No preview
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-3 wrap-break-word">
                        {course.name}
                      </h2>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-slate-500 font-medium mb-1 truncate">{course.mentorName}</p>

                      <div className="flex items-center gap-2">
                        {Number(course.actualPrice) > Number(course.price) && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{Number(course.actualPrice).toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-sm sm:text-base font-bold text-emerald-700">
                          ₹{Number(course.price).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
