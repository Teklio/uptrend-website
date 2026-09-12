"use client";

import { useState, useEffect, BaseSyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCheckCircle, HiOutlinePlay, HiOutlineArrowRight, HiOutlineExclamationCircle } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { checkout, checkoutGuest, verifyPayment } from "@/services/payment.service";
import { listStates } from "@/services/state.service";
import { loadRazorpayScript, RazorpayOptions } from "@/lib/razorpay";
import { ApiError } from "@/lib/api";
import { applyServerFieldErrors } from "@/lib/formErrors";
import { StateOption } from "@/types/common.type";
import { buildCheckoutFormSchema, CheckoutFormSchemaType } from "@/schemas/checkout.schema";
import Input from "@/components/Input";

export interface CheckoutCourse {
  id: string;
  name: string;
  price: number;
  extraFee: number;
  primaryImageUrl: string | null;
}

interface CheckoutFlowProps {
  course: CheckoutCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "details" | "processing" | "success" | "error";

export default function CheckoutFlow({ course, isOpen, onClose }: CheckoutFlowProps) {
  const router = useRouter();
  const { isLoggedIn, user, refreshUser } = useAuth();

  const [step, setStep] = useState<Step>("details");
  const [states, setStates] = useState<StateOption[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(buildCheckoutFormSchema(!isLoggedIn)),
    defaultValues: { name: "", email: "", phone: "", password: "", state: "" },
  });

  // Resets to the first step and clears any stale error the moment the
  // drawer opens — compared during render (React's documented pattern for
  // resetting state when a prop changes) rather than in an effect, since
  // this component never unmounts between opens.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setStep("details");
      setErrorMessage("");
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    form.reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      state: user?.state ?? "",
      password: "",
    });
    listStates()
      .then(setStates)
      .catch(() => setStates([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  // Auto-redirects to the dashboard a couple seconds after a successful
  // payment, matching verify-email's pattern — cleared on unmount/step
  // change so it never fires after the user has already navigated away
  // manually (e.g. by clicking "Start Learning").
  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => {
      onClose();
      router.push("/dashboard");
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!course) return null;

  // Course fields arrive over the wire as Prisma Decimals, which serialize
  // as JSON strings — Number(...) here guards against "200" + "36" silently
  // concatenating into "20036" instead of adding to 236.
  const coursePrice = Number(course.price);
  const handlingFee = Number(course.extraFee) || 0;
  const totalPayable = coursePrice + handlingFee;

  const onSubmit = async (values: CheckoutFormSchemaType) => {
    setErrorMessage("");
    setStep("processing");

    try {
      const order = isLoggedIn
        ? await checkout({ courseId: course.id, name: values.name, phone: values.phone, state: values.state })
        : await checkoutGuest({
            courseId: course.id,
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
        prefill: { name: values.name, email: values.email || user?.email, contact: values.phone },
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
          ondismiss: () => setStep("details"),
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      if (applyServerFieldErrors(form, err)) {
        setStep("details");
      } else {
        setErrorMessage(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
        setStep("error");
      }
    }
  };

  // Wrapped so form.handleSubmit(onSubmit) is only ever called at
  // submit-time (inside this closure), not evaluated eagerly during render.
  const submitCheckout = (e?: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e);

  const goToLearning = () => {
    onClose();
    router.push(`/dashboard/courses/${course.id}`);
  };

  const goToDashboard = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={step === "processing" ? undefined : onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {step === "success" ? "Enrollment Confirmed" : "Checkout"}
              </h2>
              {step !== "processing" && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <HiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {step !== "success" && (
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    {course.primaryImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={course.primaryImageUrl} alt={course.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight wrap-break-word">{course.name}</h3>
                    <p className="text-sm font-bold text-blue-600 mt-0.5">₹{coursePrice.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              )}

              {step === "details" && (
                <FormProvider {...form}>
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={submitCheckout}
                    className="space-y-4"
                  >
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                        {errorMessage}
                      </div>
                    )}

                    <Input name="name" label="Name" type="text" required />

                    {!isLoggedIn && <Input name="email" label="Email" type="email" required />}

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
                            <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-300 text-xs font-semibold text-slate-800 select-none">
                              <span className="text-base">🇮🇳</span>
                              <span>+91</span>
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

                    {!isLoggedIn && (
                      <Input
                        name="password"
                        label="Create a password"
                        type="password"
                        required
                        hint="This creates your UPtrend account so you can access your course after payment."
                      />
                    )}

                    {/* Price Breakdown */}
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Course price</span>
                        <span className="font-semibold text-slate-800">
                          ₹{coursePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Internet handling fees</span>
                        <span className="font-semibold text-slate-800">
                          ₹{handlingFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="pt-2 mt-1 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">You pay</span>
                        <span className="text-base font-extrabold text-slate-950">
                          ₹{totalPayable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </motion.form>
                </FormProvider>
              )}

              {step === "processing" && (
                <div className="py-10 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-slate-600">Redirecting to secure payment...</p>
                </div>
              )}

              {step === "error" && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl border border-red-100">
                    <HiOutlineExclamationCircle />
                  </div>
                  <p className="text-sm text-slate-700">{errorMessage}</p>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-navy hover:bg-brand-navy-hover transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {step === "success" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <HiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Enrollment Successful!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto wrap-break-word">
                    Your seat for <span className="font-bold text-slate-900">{course.name}</span> has been confirmed.
                  </p>
                  <p className="text-[11px] text-slate-400">Taking you to your dashboard...</p>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Paid:</span>
                      <span className="font-bold text-emerald-700">
                        ₹{Number(paidAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={goToLearning}
                      className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-brand-gold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <HiOutlinePlay className="text-lg" />
                      <span>Start Learning</span>
                      <HiOutlineArrowRight className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={goToDashboard}
                      className="w-full py-3 rounded-xl bg-brand-navy hover:bg-slate-900 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                    >
                      Go to Student Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {step === "details" && (
              <div className="border-t border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={submitCheckout}
                  disabled={form.formState.isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-colors text-center cursor-pointer disabled:opacity-60"
                >
                  Pay ₹{totalPayable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
