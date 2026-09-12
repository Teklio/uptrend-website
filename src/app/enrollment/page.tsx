"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { listCourses } from "@/services/course.service";
import { CourseListItem } from "@/types/course.type";
import CheckoutFlow, { CheckoutCourse } from "@/components/CheckoutFlow";

function EnrollmentContent() {
  const searchParams = useSearchParams();
  const preselectedCourseId = searchParams.get("course");

  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<CheckoutCourse | null>(null);

  useEffect(() => {
    listCourses({ limit: 24 })
      .then((res) => {
        setCourses(res.items);
        if (preselectedCourseId) {
          const match = res.items.find((c) => c.id === preselectedCourseId);
          if (match) {
            setSelected({ id: match.id, name: match.name, price: match.price, primaryImageUrl: match.primaryImageUrl });
          }
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-24 bg-gradient-to-b from-slate-100/90 via-slate-50/70 to-white relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-brand-gold/15 via-brand-navy/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4"
          >
            Enroll in <span className="text-brand-navy"><span className="text-brand-gold">UP</span>trend</span>
          </motion.h1>
          <p className="text-slate-600 text-sm sm:text-base">Choose a program to get started.</p>
        </div>

        {loading ? (
          <div className="text-center text-sm text-slate-500 py-16">Loading programs...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2">{course.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{course.mentorName}</p>
                  <p className="text-lg font-bold text-emerald-700 mb-4">₹{course.price.toLocaleString("en-IN")}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelected({ id: course.id, name: course.name, price: course.price, primaryImageUrl: course.primaryImageUrl })
                  }
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold transition-all"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <CheckoutFlow course={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
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
