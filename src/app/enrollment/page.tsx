"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineChevronDown,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { listCourses } from "@/services/course.service";
import { listStates } from "@/services/state.service";
import { checkoutGuest, verifyPayment } from "@/services/payment.service";
import { loadRazorpayScript, RazorpayOptions } from "@/lib/razorpay";
import { ApiError } from "@/lib/api";
import { applyServerFieldErrors } from "@/lib/formErrors";
import { CourseListItem } from "@/types/course.type";
import { StateOption } from "@/types/common.type";
import { enrollmentSchema, EnrollmentSchemaType } from "@/schemas/checkout.schema";
import Input from "@/components/Input";

type Step = "form" | "processing" | "success" | "error";

function EnrollmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading: authLoading, refreshUser } = useAuth();

  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [states, setStates] = useState<StateOption[]>([]);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  const [step, setStep] = useState<Step>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<EnrollmentSchemaType>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { email: "", password: "", name: "", phone: "", state: "", courseId: "" },
  });

  const courseId = useWatch({ control: form.control, name: "courseId" });
  const selectedCourse = courses.find((c) => c.id === courseId) ?? null;
  // Course fields arrive over the wire as Prisma Decimals, which serialize
  // as JSON strings — Number(...) here guards against "200" + "36" silently
  // concatenating into "20036" instead of adding to 236.
  const coursePrice = selectedCourse ? Number(selectedCourse.price) : 0;
  const handlingFee = Number(selectedCourse?.extraFee ?? 0);
  const totalPayable = selectedCourse ? coursePrice + handlingFee : 0;

  useEffect(() => {
    const requestedCourse = searchParams.get("course");
    listCourses({ limit: 100 })
      .then((res) => {
        setCourses(res.items);
        const initial =
          requestedCourse && res.items.some((c) => c.id === requestedCourse)
            ? requestedCourse
            : (res.items[0]?.id ?? "");
        form.setValue("courseId", initial);
      })
      .finally(() => setLoadingCourses(false));
    listStates()
      .then(setStates)
      .catch(() => setStates([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCourseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-redirects to the dashboard a couple seconds after a successful
  // payment, matching verify-email's pattern — cleared on unmount/step
  // change so it never fires after the user has already navigated away
  // manually (e.g. by clicking "Start Learning").
  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (authLoading || isLoggedIn) {
    return <div className="min-h-[85vh] flex items-center justify-center text-sm text-slate-500">Redirecting...</div>;
  }

  const onSubmit = async (values: EnrollmentSchemaType) => {
    setErrorMessage("");
    const course = courses.find((c) => c.id === values.courseId);
    if (!course) {
      setErrorMessage("Please select a course to continue.");
      return;
    }

    setStep("processing");

    try {
      const order = await checkoutGuest({
        courseId: values.courseId,
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        state: values.state,
      });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setErrorMessage("Could not load the payment gateway. Please check your connection and try again.");
        setStep("error");
        return;
      }

      const options: RazorpayOptions = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "UPtrend Financial Academy",
        description: order.course.name,
        order_id: order.razorpayOrderId,
        prefill: { name: values.name, email: values.email, contact: values.phone },
        theme: { color: "#002b7f" },
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              paymentId: order.paymentId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result.status === "SUCCESS") {
              setPaidAmount(Number(order.course.totalAmount));
              await refreshUser();
              setStep("success");
            } else {
              setErrorMessage("Payment could not be confirmed. If any amount was deducted, it will be refunded.");
              setStep("error");
            }
          } catch (err) {
            setErrorMessage(err instanceof ApiError ? err.message : "Could not verify payment.");
            setStep("error");
          }
        },
        modal: {
          ondismiss: () => setStep("form"),
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      if (applyServerFieldErrors(form, err)) {
        setStep("form");
      } else {
        setErrorMessage(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
        setStep("error");
      }
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-112.5 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-navy/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,43,127,0.08)] p-7 sm:p-9">
          {/* Header */}
          <div className="text-center mb-7">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-40 mx-auto">
                <Image src="/logo.png" alt="UPtrend Logo" fill priority className="object-contain object-center" sizes="160px" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Enroll in UPtrend</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Please enter your basic details to proceed.</p>
          </div>

          {step === "form" && (
            <FormProvider {...form}>
              <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                    {errorMessage}
                  </div>
                )}

                <Input name="name" label="Name" type="text" required />

                <Input name="email" label="Email" type="email" required leftIcon={<HiOutlineMail />} />

                <Input
                  name="password"
                  label="Create Password"
                  type="password"
                  required
                  leftIcon={<HiOutlineLockClosed />}
                  hint="This creates your UPtrend account so you can access your course after payment."
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Phone number</label>
                      <div
                        className={`flex rounded-lg border overflow-hidden shadow-sm focus-within:ring-2 ${
                          fieldState.error
                            ? "border-red-400 focus-within:ring-red-100 focus-within:border-red-500"
                            : "border-slate-300 focus-within:ring-blue-500 focus-within:border-blue-500"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-700 select-none">
                          <span>IN</span>
                          <span className="text-slate-400 font-semibold">+91</span>
                        </div>
                        <input
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          className="flex-1 min-w-0 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="text-xs font-medium text-red-500 mt-1.5">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Select Course — custom dropdown showing thumbnail + title + price */}
                <Controller
                  name="courseId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Select Course</label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          disabled={loadingCourses || courses.length === 0}
                          onClick={() => setCourseDropdownOpen((o) => !o)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border bg-white text-left shadow-sm focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
                            fieldState.error
                              ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                              : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        >
                          {selectedCourse ? (
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span className="relative w-9 h-9 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200 block">
                                {selectedCourse.primaryImageUrl && (
                                  // eslint-disable-next-line @next/next/no-img-element -- signed S3 URL, host/query vary per environment
                                  <img src={selectedCourse.primaryImageUrl} alt="" className="w-full h-full object-cover" />
                                )}
                              </span>
                              <span className="text-sm font-bold text-slate-900 truncate">
                                {selectedCourse.name} — ₹{coursePrice.toLocaleString("en-IN")}
                              </span>
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">
                              {loadingCourses ? "Loading courses..." : "No courses available"}
                            </span>
                          )}
                          <HiOutlineChevronDown
                            className={`text-slate-400 shrink-0 transition-transform duration-200 ${courseDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {courseDropdownOpen && courses.length > 0 && (
                          <div className="absolute z-20 mt-1.5 w-full max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg py-1.5">
                            {courses.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  field.onChange(c.id);
                                  setCourseDropdownOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                                  c.id === field.value ? "bg-blue-50/70" : ""
                                }`}
                              >
                                <span className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200 block">
                                  {c.primaryImageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element -- signed S3 URL, host/query vary per environment
                                    <img src={c.primaryImageUrl} alt="" className="w-full h-full object-cover" />
                                  )}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-bold text-slate-900 truncate wrap-break-word">{c.name}</span>
                                  <span className="block text-xs text-emerald-700 font-semibold">₹{Number(c.price).toLocaleString("en-IN")}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {fieldState.error && (
                        <p className="text-xs font-medium text-red-500 mt-1.5">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">State</label>
                      <select
                        {...field}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 shadow-sm ${
                          fieldState.error
                            ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                            : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      >
                        <option value="">Select state</option>
                        {states.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      {fieldState.error && (
                        <p className="text-xs font-medium text-red-500 mt-1.5">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Price Breakdown */}
                {selectedCourse && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Course price</span>
                      <span className="font-semibold text-slate-800">₹{coursePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Internet handling fees</span>
                      <span className="font-semibold text-slate-800">₹{handlingFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-2 mt-1 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">You pay</span>
                      <span className="text-base font-extrabold text-slate-950">₹{totalPayable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedCourse || form.formState.isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-brand-navy hover:bg-brand-navy-hover shadow-md shadow-brand-navy/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  <span>Buy now</span>
                  <HiOutlineArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </FormProvider>
          )}

          {step === "processing" && (
            <div className="py-10 text-center space-y-3">
              <div className="w-10 h-10 mx-auto border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-600">Redirecting to secure payment...</p>
            </div>
          )}

          {step === "success" && selectedCourse && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-4 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <HiOutlineCheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Enrollment Successful!</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto wrap-break-word">
                Your seat for <span className="font-bold text-slate-900">{selectedCourse.name}</span> has been confirmed.
              </p>
              <p className="text-xs text-slate-400">Taking you to your dashboard...</p>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{Number(paidAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => router.push(`/dashboard/courses/${selectedCourse.id}`)}
                  className="w-full px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-navy hover:bg-brand-navy-hover transition-colors cursor-pointer"
                >
                  Start Learning
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full px-6 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {step === "error" && (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl border border-red-100">
                <HiOutlineExclamationCircle />
              </div>
              <p className="text-sm text-slate-700 wrap-break-word">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-navy hover:bg-brand-navy-hover transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {step === "form" && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6">
            <HiOutlineShieldCheck className="text-emerald-500 text-base" />
            <span>Secure Checkout • Encrypted Payment Processing</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-sm text-slate-500">Loading...</div>}>
      <EnrollmentForm />
    </Suspense>
  );
}
