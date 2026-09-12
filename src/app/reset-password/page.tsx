"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import Input from "@/components/Input";
import { validateResetToken, resetPassword } from "@/services/auth.service";
import { ApiError } from "@/lib/api";
import { resetPasswordFormSchema, ResetPasswordFormSchemaType } from "@/schemas/auth.schema";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [tokenState, setTokenState] = useState<"checking" | "valid" | "invalid">("checking");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!token) {
      Promise.resolve().then(() => setTokenState("invalid"));
      return;
    }
    validateResetToken(token)
      .then(() => setTokenState("valid"))
      .catch(() => setTokenState("invalid"));
  }, [token]);

  const onSubmit = async (values: ResetPasswordFormSchemaType) => {
    setError("");
    try {
      await resetPassword({ token, newPassword: values.password });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-112.5 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-navy/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-7 sm:p-9">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-40 mx-auto">
                <Image src="/logo.png" alt="UPtrend Logo" fill priority className="object-contain object-center" sizes="160px" />
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Create New Password</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Set a new, secure password for your UPtrend account.
            </p>
          </div>

          {tokenState === "checking" && (
            <div className="text-center py-8 text-sm text-slate-500">Verifying your reset link...</div>
          )}

          {tokenState === "invalid" && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl border border-red-100">
                <HiOutlineExclamationCircle />
              </div>
              <h2 className="text-lg font-bold text-slate-950">Link Invalid or Expired</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This password reset link is no longer valid. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold-hover transition-colors shadow-sm"
              >
                <span>Request New Link</span>
                <HiOutlineArrowRight />
              </Link>
            </div>
          )}

          {tokenState === "valid" &&
            (submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl border border-emerald-100">
                  <HiOutlineCheckCircle />
                </div>

                <h2 className="text-lg font-bold text-slate-950">Password Successfully Reset!</h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your password has been updated. You can now login using your new credentials.
                </p>

                <div className="pt-4">
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold-hover transition-colors shadow-sm"
                  >
                    <span>Proceed to Login</span>
                    <HiOutlineArrowRight />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <FormProvider {...form}>
                <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                      {error}
                    </div>
                  )}

                  <Input name="password" label="New Password" type="password" required leftIcon={<HiOutlineLockClosed />} />

                  <Input
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    required
                    leftIcon={<HiOutlineLockClosed />}
                  />

                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-brand-navy via-blue-900 to-brand-navy hover:from-brand-navy-hover hover:to-brand-navy shadow-md shadow-brand-navy/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer overflow-hidden mt-3"
                  >
                    <span>{form.formState.isSubmitting ? "Updating Password..." : "Update Password"}</span>
                    <HiOutlineArrowRight className="text-sm text-brand-gold transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>
              </FormProvider>
            ))}

          {!submitted && (
            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm">
              <Link href="/login" className="font-bold text-brand-navy hover:text-brand-gold-dark transition-colors">
                Back to Login
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6">
          <HiOutlineShieldCheck className="text-emerald-500 text-base" />
          <span>Institutional Account Security Protected</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-sm text-slate-500">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
