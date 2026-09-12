"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCourse, listCourseReviews, postCourseReview } from "@/services/course.service";
import { getEnrolledCourse } from "@/services/learn.service";
import { useAuth } from "@/context/AuthContext";
import { CourseDetail, CourseReview } from "@/types/course.type";
import CheckoutFlow from "@/components/CheckoutFlow";
import { ApiError } from "@/lib/api";
import {
  HiOutlineArrowLeft,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiStar,
} from "react-icons/hi2";
import { FiCheckCircle, FiChevronRight, FiChevronDown, FiPlayCircle } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { slug: courseId } = use(params);
  const { isLoggedIn } = useAuth();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  useEffect(() => {
    setLoading(true);
    getCourse(courseId)
      .then((data) => {
        setCourse(data);
        setExpandedModules(new Set(data.modules.map((m) => m.id)));
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) setNotFoundState(true);
      })
      .finally(() => setLoading(false));

    listCourseReviews(courseId, { limit: 12 })
      .then((res) => setReviews(res.items))
      .catch(() => setReviews([]));
  }, [courseId]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsEnrolled(false);
      return;
    }
    getEnrolledCourse(courseId)
      .then(() => setIsEnrolled(true))
      .catch(() => setIsEnrolled(false));
  }, [isLoggedIn, courseId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    setReviewSubmitting(true);
    try {
      await postCourseReview(courseId, { rating: reviewForm.rating, comment: reviewForm.comment || undefined });
      setReviewSubmitted(true);
      const res = await listCourseReviews(courseId, { limit: 12 });
      setReviews(res.items);
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : "Could not submit your review.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">Loading course...</div>;
  }

  if (notFoundState || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-bold text-slate-900">Course not found</h1>
        <Link href="/courses" className="text-brand-navy font-semibold hover:underline">
          Browse all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]/60 text-slate-900 pb-28 overflow-x-hidden">
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
            <span className="text-slate-700 font-semibold truncate max-w-[280px]">{course.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl mx-auto aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900"
          >
            {course.primaryImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={course.primaryImageUrl} alt={course.name} className="w-full h-full object-cover" />
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight max-w-3xl mx-auto wrap-break-word"
          >
            {course.name}
          </motion.h1>

          {course.description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed wrap-break-word"
            >
              {course.description}
            </motion.p>
          )}

          {(course.avgRating > 0 || course.reviewCount > 0) && (
            <div className="flex items-center justify-center gap-1.5 text-amber-500 text-sm font-semibold">
              <HiStar className="w-4 h-4" />
              <span>{course.avgRating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviewCount} reviews)</span>
            </div>
          )}

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="pt-2 pb-1">
            {isEnrolled ? (
              <Link
                href={`/dashboard/courses/${course.id}`}
                className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-brand-navy hover:bg-slate-900 shadow-lg transition-all"
              >
                Continue Learning
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-[#0e5c3e] hover:bg-[#0b4b32] active:scale-[0.98] shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all cursor-pointer tracking-wide"
              >
                Buy now for ₹{course.price.toLocaleString("en-IN")}
              </button>
            )}
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-blue-700">
            {course.mentorName && (
              <span className="inline-flex items-center gap-1.5 max-w-full min-w-0">
                <HiOutlineUser className="text-base text-blue-600 shrink-0" />
                <span className="wrap-break-word min-w-0">Instructor: {course.mentorName}</span>
              </span>
            )}
            {course.language && (
              <>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5 max-w-full min-w-0">
                  <HiOutlineGlobeAlt className="text-base text-blue-600 shrink-0" />
                  <span className="wrap-break-word min-w-0">Language: {course.language}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* FEATURES */}
        {course.features.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-10 border-t border-slate-300/80">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">What you'll get</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
              <div className={`grid grid-cols-1 gap-4 ${course.features.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug wrap-break-word min-w-0">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CURRICULUM */}
        {course.modules.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="text-center mb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">Curriculum</h2>
            </div>
            <p className="text-center text-sm text-slate-500 mb-8">
              {course.modules.length} {course.modules.length === 1 ? "module" : "modules"} &bull;{" "}
              {course.modules.reduce((sum, m) => sum + m.videos.length, 0)} lessons
            </p>
            <div className="space-y-4">
              {course.modules.map((courseModule, idx) => {
                const isOpen = expandedModules.has(courseModule.id);
                const moduleDuration = courseModule.videos.reduce(
                  (sum, v) => sum + (v.durationSeconds ?? 0),
                  0
                );
                return (
                  <div
                    key={courseModule.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(courseModule.id)}
                      className="w-full flex items-start gap-4 p-5 sm:p-6 text-left hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 border border-blue-200 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 wrap-break-word">{courseModule.title}</h3>
                        {courseModule.description && (
                          <p className="text-sm text-slate-600 leading-relaxed wrap-break-word">{courseModule.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-400">
                          <span>
                            {courseModule.videos.length} {courseModule.videos.length === 1 ? "lesson" : "lessons"}
                          </span>
                          {moduleDuration > 0 && (
                            <>
                              <span>&bull;</span>
                              <span className="font-mono">
                                {Math.floor(moduleDuration / 60)}:{String(moduleDuration % 60).padStart(2, "0")}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <FiChevronDown
                        className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && courseModule.videos.length > 0 && (
                      <div className="border-t border-slate-100 divide-y divide-slate-100">
                        {courseModule.videos.map((video, vIdx) => (
                          <div key={video.id} className="flex items-start gap-3.5 px-5 sm:px-6 py-4 pl-[4.25rem] sm:pl-[4.75rem]">
                            <FiPlayCircle className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <span className="text-sm font-semibold text-slate-800 wrap-break-word min-w-0">
                                  {vIdx + 1}. {video.title}
                                </span>
                                {video.durationSeconds != null && (
                                  <span className="text-xs text-slate-400 font-mono flex-shrink-0">
                                    {Math.floor(video.durationSeconds / 60)}:
                                    {String(video.durationSeconds % 60).padStart(2, "0")}
                                  </span>
                                )}
                              </div>
                              {video.description && (
                                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mt-1 wrap-break-word">
                                  {video.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* REVIEWS */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">Course Reviews</h2>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <HiStar key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {review.comment && <p className="text-sm text-slate-700 italic leading-relaxed mb-4 wrap-break-word">&quot;{review.comment}&quot;</p>}
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-900 truncate min-w-0">{review.user.name || "Student"}</span>
                    <span className="text-slate-400 font-medium shrink-0">{new Date(review.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-500 mb-10">No reviews yet.</p>
          )}

          {isEnrolled && !reviewSubmitted && (
            <form onSubmit={handleSubmitReview} className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Leave a review</h3>
              {reviewError && <p className="text-xs text-red-600">{reviewError}</p>}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className={star <= reviewForm.rating ? "text-amber-400" : "text-slate-300"}
                  >
                    <HiStar className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Share your experience (optional)"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={reviewSubmitting}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-navy hover:bg-slate-900 transition-colors disabled:opacity-60"
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
          {reviewSubmitted && <p className="text-center text-sm text-emerald-700 font-semibold">Thanks for your review!</p>}
        </section>

        {!isEnrolled && (
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-brand-navy via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-white/10 relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                Limited Cohort Seats
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white wrap-break-word">Ready to start {course.name}?</h3>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold transition-all shadow-lg hover:shadow-xl cursor-pointer text-sm uppercase tracking-wider"
                >
                  Enroll Now • ₹{course.price.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutFlow
        course={{ id: course.id, name: course.name, price: course.price, primaryImageUrl: course.primaryImageUrl }}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
