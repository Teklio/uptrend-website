"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi";
import Input from "@/components/Input";
import { forgotPassword } from "@/services/auth.service";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordSchemaType) => {
    try {
      // Always shows success, matching the backend's intentionally silent
      // behavior (never reveals whether the account exists).
      await forgotPassword(values.email);
    } finally {
      setSubmittedEmail(values.email);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-112.5 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-navy/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
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
              Reset Your Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Enter your registered email and we will send you a verification link.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-4"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl border border-emerald-100">
                <HiOutlineCheckCircle />
              </div>

              <h2 className="text-lg font-bold text-slate-950">
                Reset Link Sent!
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed wrap-break-word">
                We have dispatched password reset instructions to{" "}
                <strong className="text-slate-900 font-semibold">{submittedEmail}</strong>. Please check your inbox and spam folder.
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Did not receive email? Try another address
                </button>
              </div>
            </motion.div>
          ) : (
            <FormProvider {...form}>
              <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="space-y-4">
                <Input
                  name="email"
                  label="Registered Email Address"
                  type="email"
                  required
                  leftIcon={<HiOutlineMail />}
                  hint="We will send a secure password reset link to this email."
                />

                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-linear-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold shadow-md shadow-brand-gold/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer overflow-hidden mt-2"
                >
                  <span>{form.formState.isSubmitting ? "Sending Link..." : "Send Reset Link"}</span>
                  <HiOutlineArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />

                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>
              </form>
            </FormProvider>
          )}

          {/* Return to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-gold-dark transition-colors"
            >
              <HiOutlineArrowLeft />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
