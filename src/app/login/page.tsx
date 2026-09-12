"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { resendVerification } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNeedsVerification(false);

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.message.toLowerCase().includes("verify")) setNeedsVerification(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendState("sending");
    try {
      await resendVerification(formData.email);
      setResendState("sent");
    } catch {
      setResendState("idle");
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-navy/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-7 sm:p-9">
          {/* Logo & Header */}
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
             Uptrend Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Access your structured trading curriculum, live webinars, and risk frameworks.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {error}
              {needsVerification && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState !== "idle"}
                  className="block mt-2 font-bold text-brand-navy hover:underline disabled:opacity-60"
                >
                  {resendState === "sent"
                    ? "Verification email sent — check your inbox."
                    : resendState === "sending"
                      ? "Sending..."
                      : "Resend verification email"}
                </button>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="rounded border-slate-300 text-brand-navy focus:ring-brand-navy/20 h-4 w-4"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-semibold text-brand-navy hover:text-brand-gold-dark transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold shadow-md shadow-brand-gold/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer overflow-hidden mt-2"
            >
              <span className="text-sm md:text-lg">{loading ? "Signing in..." : "Login"}</span>
              <HiOutlineArrowRight className="text-sm md:text-lg transition-transform duration-200 group-hover:translate-x-1" />

              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600">
            <span>New to UPtrend? </span>
            <Link
              href="/signup"
              className="font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
            >
              Create an Account / Enroll
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6">
          <HiOutlineShieldCheck className="text-emerald-500 text-base" />
          <span>Encrypted Institutional Student Authentication</span>
        </div>
      </motion.div>
    </div>
  );
}
