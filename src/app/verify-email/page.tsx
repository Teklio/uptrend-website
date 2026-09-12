"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineMail } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { verifyEmail, resendVerification } from "@/services/auth.service";
import { resendVerificationSchema, ResendVerificationSchemaType } from "@/schemas/auth.schema";
import Input from "@/components/Input";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { setUser } = useAuth();

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const form = useForm<ResendVerificationSchemaType>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (!token) {
      Promise.resolve().then(() => setStatus("error"));
      return;
    }
    verifyEmail(token)
      .then(({ user }) => {
        setUser(user);
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 1500);
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleResend = async (values: ResendVerificationSchemaType) => {
    setResendState("sending");
    try {
      await resendVerification(values.email);
      setResendState("sent");
    } catch {
      setResendState("idle");
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50/90 via-white to-slate-50/70">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-8 text-center"
      >
        <Link href="/" className="inline-block mb-6">
          <div className="relative h-10 w-40 mx-auto">
            <Image src="/logo.png" alt="UPtrend Logo" fill priority className="object-contain object-center" sizes="160px" />
          </div>
        </Link>

        {status === "verifying" && <p className="text-sm text-slate-500 py-6">Verifying your email...</p>}

        {status === "success" && (
          <div className="space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl border border-emerald-100">
              <HiOutlineCheckCircle />
            </div>
            <h1 className="text-xl font-extrabold text-slate-950">Email Verified!</h1>
            <p className="text-sm text-slate-600">Taking you to your dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl border border-red-100">
              <HiOutlineExclamationCircle />
            </div>
            <h1 className="text-xl font-extrabold text-slate-950">Link Invalid or Expired</h1>
            <p className="text-sm text-slate-600">
              This verification link is no longer valid. Enter your email below to get a new one, or head back to
              login.
            </p>

            <FormProvider {...form}>
              <form onSubmit={(e) => void form.handleSubmit(handleResend)(e)} className="space-y-4 text-left">
                <Input name="email" type="email" placeholder="you@example.com" leftIcon={<HiOutlineMail />} />

                <button
                  type="submit"
                  disabled={resendState !== "idle"}
                  className="w-full px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-brand-gold hover:bg-brand-gold-hover transition-colors disabled:opacity-60"
                >
                  {resendState === "sent" ? "Sent — check your inbox" : resendState === "sending" ? "Sending..." : "Resend Verification Email"}
                </button>
              </form>
            </FormProvider>

            <Link href="/login" className="block text-xs font-bold text-brand-navy hover:underline">
              Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-sm text-slate-500">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
