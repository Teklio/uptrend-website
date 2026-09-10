"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CourseDetail } from "@/data/courses";
import { HiOutlineArrowLeft, HiX, HiCheckCircle, HiOutlinePlay, HiOutlineArrowRight } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

interface CheckoutDrawerProps {
  course: CourseDetail | null;
  isOpen: boolean;
  onClose: () => void;
  initialStep?: "order" | "billing";
}

const INDIAN_STATES = [
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

export default function CheckoutDrawer({
  course,
  isOpen,
  onClose,
  initialStep = "order",
}: CheckoutDrawerProps) {
  const router = useRouter();
  const { enrollInCourse, updateProfile } = useAuth();
  const [step, setStep] = useState<"order" | "billing" | "success">(initialStep);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Kerala");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setIsSubmitting(false);
    }
  }, [isOpen, initialStep]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!course) return null;

  const handleProceed = () => {
    setStep("billing");
  };

  const handleBackToOrder = () => {
    setStep("order");
  };

  const handleBuyNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = "UPT-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      enrollInCourse(course.slug, course.totalPrice);
      updateProfile({ name, email, phone, city: state });
      setStep("success");
    }, 1200);
  };

  const handleGoToCourseVideos = () => {
    onClose();
    router.push(`/dashboard/courses/${course.slug}`);
  };

  const handleGoToDashboard = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                {step === "billing" && (
                  <button
                    type="button"
                    onClick={handleBackToOrder}
                    className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Back to Order Details"
                  >
                    <HiOutlineArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {step === "order"
                    ? "Order details"
                    : step === "billing"
                    ? "Billing details"
                    : "Enrollment Confirmed"}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close drawer"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {step !== "success" && (
                /* Course Mini Summary Row */
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-sm font-bold text-blue-600 mt-0.5">
                      ₹
                      {step === "billing"
                        ? course.totalPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : course.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 1: ORDER DETAILS */}
              {step === "order" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-700 font-medium">Course price</span>
                      <span className="text-slate-900 font-bold">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-700 font-medium">Internet handling fees</span>
                      <span className="text-slate-900 font-bold">
                        ₹
                        {course.internetHandlingFee.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-base">
                      <span className="text-slate-900 font-bold">You pay</span>
                      <span className="text-slate-950 font-black text-lg">
                        ₹
                        {course.totalPrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: BILLING DETAILS */}
              {step === "billing" && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleBuyNow}
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-600 font-medium">
                    Please enter your basic details to proceed
                  </p>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>

                  {/* Phone number with Country code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Phone number
                    </label>
                    <div className="flex rounded-lg border border-slate-300 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-300 text-xs font-semibold text-slate-800 select-none">
                        <span className="text-base">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      State
                    </label>
                    <div className="relative">
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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

                  <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
                    We are always available at{" "}
                    <a
                      href="mailto:nikhilmathew851@gmail.com"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      nikhilmathew851@gmail.com
                    </a>
                    .
                  </p>
                </motion.form>
              )}

              {/* STEP 3: SUCCESS STATE */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <HiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Enrollment Successful!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                    Thank you, <span className="font-bold text-slate-900">{name}</span>. Your seat for{" "}
                    <span className="font-bold text-slate-900">{course.title}</span> has been confirmed.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Order ID:</span>
                      <span className="font-mono font-bold text-slate-900">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Paid:</span>
                      <span className="font-bold text-emerald-700">
                        ₹
                        {course.totalPrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Access:</span>
                      <span className="font-semibold text-slate-800">Dashboard + Telegram Community</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    A confirmation email and WhatsApp invite link have been sent to{" "}
                    <span className="font-medium text-slate-700">{email}</span>.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleGoToCourseVideos}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-brand-gold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <HiOutlinePlay className="text-lg" />
                      <span>Start Learning Course Videos</span>
                      <HiOutlineArrowRight className="text-sm" />
                    </button>

                    <button
                      type="button"
                      onClick={handleGoToDashboard}
                      className="w-full py-3 rounded-xl bg-brand-navy hover:bg-slate-900 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                    >
                      Go to Student Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                    >
                      Close & Return to Page
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Sticky Action Buttons */}
            {step === "order" && (
              <div className="p-0 border-t border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-colors text-center cursor-pointer"
                >
                  Proceed
                </button>
              </div>
            )}

            {step === "billing" && (
              <div className="p-0 border-t border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-base transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
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
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
