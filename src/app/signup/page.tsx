"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";
import Input from "@/components/Input";
import { register } from "@/services/auth.service";
import { ApiError } from "@/lib/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await register({ email: formData.email, password: formData.password });
      setRegistered(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-8 text-center"
        >
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-3">Check your email</h1>
          <p className="text-sm text-slate-600 mb-6">
            We&apos;ve sent a verification link to <strong>{formData.email}</strong>. Click it to activate your
            account and sign in.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-navy/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-7 sm:p-9">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-40 mx-auto">
                <Image
                  src="/logo.png"
                  alt="UPtrend Logo"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="160px"
                />
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Create Trader Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Join UPtrend to start your structured trading journey with institutional mentorship.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              leftIcon={<HiOutlineUser />}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              leftIcon={<HiOutlineMail />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                leftIcon={<HiOutlineLockClosed />}
              />

              <Input
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                leftIcon={<HiOutlineLockClosed />}
              />
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 leading-relaxed">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="rounded border-slate-300 text-brand-navy focus:ring-brand-navy/20 h-4 w-4 mt-0.5 shrink-0"
                />
                <span>
                  I agree to UPtrend's{" "}
                  <Link href="/terms" className="font-semibold text-brand-navy hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the{" "}
                  <Link href="/disclaimer" className="font-semibold text-brand-navy hover:underline">
                    Risk Disclosure
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-navy via-blue-900 to-brand-navy hover:from-brand-navy-hover hover:to-brand-navy shadow-md shadow-brand-navy/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer overflow-hidden mt-3"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <HiOutlineArrowRight className="text-sm text-brand-gold transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6">
          <HiOutlineShieldCheck className="text-emerald-500 text-base" />
          <span>Secure Student Registration • Perinthalmanna, Kerala</span>
        </div>
      </motion.div>
    </div>
  );
}
