"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi";

export interface CourseOption {
  id: string;
  name: string;
  level: string;
  duration: string;
  baseFee: number;
  handlingFeeRate: number;
  tag?: string;
}

export const COURSE_CATALOG: CourseOption[] = [
  {
    id: "swing-trading",
    name: "Swing trading master course - 2026 September",
    level: "Intermediate to Pro",
    duration: "6 Weeks Live Cohort",
    baseFee: 14999,
    handlingFeeRate: 0.02124, // 318.58 fee
    tag: "September 2026 Batch",
  },
  {
    id: "market-basics-technical",
    name: "Master the Stock Market – From Basics to Technical Analysis",
    level: "Beginner Friendly",
    duration: "4 Weeks Live",
    baseFee: 1500,
    handlingFeeRate: 0.02123, // 31.85 fee
    tag: "Bestseller",
  },
  {
    id: "nifty-options",
    name: "Nifty 50 Options & Futures SMC Masterclass",
    level: "Intermediate to Pro",
    duration: "8 Weeks Live",
    baseFee: 16999,
    handlingFeeRate: 0.02121, // 360.50 fee
    tag: "High Demand",
  },
  {
    id: "complete-mentorship",
    name: "Complete 1-on-1 Financial Markets Mentorship",
    level: "All Levels (A to Z)",
    duration: "12 Weeks + 6M Support",
    baseFee: 29999,
    handlingFeeRate: 0.02,
    tag: "Complete Mentorship",
  },
  {
    id: "forex-mechanics",
    name: "Forex Market Mechanics & Global Price Action",
    level: "Intermediate",
    duration: "4 Weeks Live",
    baseFee: 12999,
    handlingFeeRate: 0.02,
    tag: "Global Markets",
  },
];

export const INDIAN_STATES = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Delhi",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Uttar Pradesh",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Bihar",
  "Odisha",
  "Goa",
  "Assam",
  "Other / Outside India",
];

interface EnrollFormProps {
  preselectedCourseId?: string;
  onSuccess?: (data: Record<string, unknown>) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function EnrollForm({
  preselectedCourseId = "swing-trading",
  onSuccess,
  title,
  subtitle,
  className = "",
}: EnrollFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Tamil Nadu",
    courseId: preselectedCourseId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Selected Course calculation
  const selectedCourse =
    COURSE_CATALOG.find((c) => c.id === formData.courseId) || COURSE_CATALOG[0];
  const coursePrice = selectedCourse.baseFee;
  const handlingFee = Math.round(coursePrice * selectedCourse.handlingFeeRate * 100) / 100;
  const totalAmount = coursePrice + handlingFee;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.state) {
      newErrors.state = "Please select your state";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = "UPT-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess({
          ...formData,
          orderId: generatedId,
          courseName: selectedCourse.name,
          coursePrice,
          handlingFee,
          totalAmount,
          date: new Date().toISOString(),
        });
      }
    }, 1200);
  };

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 ${className}`}
    >
      {/* Header if provided */}
      {(title || subtitle) && (
        <div className="border-b border-slate-100 pb-4">
          {title && (
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* Success Screen */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-6 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-inner">
              <HiOutlineCheckCircle className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-slate-900">
              Enrollment Confirmed!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your seat for{" "}
              <strong className="text-slate-900">{selectedCourse.name}</strong> has been confirmed.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full rounded-xl bg-slate-50 border border-slate-200 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course price:</span>
                <span className="font-semibold text-slate-900">₹{coursePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Internet handling fees:</span>
                <span className="font-semibold text-slate-900">
                  ₹{handlingFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold">
                <span className="text-slate-900">Total Paid:</span>
                <span className="text-emerald-700 font-black">
                  ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-[11px]">
                <span className="text-slate-500">Access:</span>
                <span className="font-medium text-slate-800">Dashboard + Telegram Community</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              A confirmation email and WhatsApp invite link have been sent to{" "}
              <span className="font-medium text-slate-700">{formData.email}</span>.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  state: "Tamil Nadu",
                  courseId: preselectedCourseId,
                });
              }}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-md cursor-pointer"
            >
              Enroll in Another Program
            </button>
          </motion.div>
        ) : (
          /* Billing & Enrollment Form */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <p className="text-xs text-slate-600 font-medium">
              Please enter your basic details to proceed
            </p>

            {/* Field 1: Course Selection */}
  
            {/* Field 2: Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-800 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm ${
                  errors.name ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.name}</p>
              )}
            </div>

            {/* Field 3: Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm ${
                  errors.email ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.email}</p>
              )}
            </div>

            {/* Field 4: Phone Number with Country Code */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-800 mb-1.5">
                Phone number
              </label>
              <div
                className={`flex rounded-lg border overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-300 text-xs font-semibold text-slate-800 select-none">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="flex-1 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.phone}</p>
              )}
            </div>

                    <div>
              <label htmlFor="courseId" className="block text-xs font-bold text-slate-800 mb-1.5">
                Select Course
              </label>
              <div className="relative">
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer shadow-sm"
                >
                  {COURSE_CATALOG.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} — ₹{course.baseFee.toLocaleString("en-IN")}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 5: State */}
            <div>
              <label htmlFor="state" className="block text-xs font-bold text-slate-800 mb-1.5">
                State
              </label>
              <div className="relative">
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer shadow-sm"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown Card */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Course price</span>
                <span className="text-slate-900 font-bold">
                  ₹{coursePrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Internet handling fees</span>
                <span className="text-slate-900 font-bold">
                  ₹{handlingFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm">
                <span className="text-slate-900 font-bold">You pay</span>
                <span className="text-slate-950 font-black text-base">
                  ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            {/* Buy now / Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-base rounded-lg transition-colors text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Buy now</span>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
