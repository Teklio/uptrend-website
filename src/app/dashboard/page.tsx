"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { listEnrolledCourses } from "@/services/learn.service";
import { listMyPayments, getPaymentReceipt } from "@/services/payment.service";
import { listStates } from "@/services/state.service";
import * as authService from "@/services/auth.service";
import { EnrolledCourse } from "@/types/learn.type";
import { Payment } from "@/types/payment.type";
import { StateOption } from "@/types/common.type";
import { ApiError } from "@/lib/api";
import { applyServerFieldErrors } from "@/lib/formErrors";
import LogoutModal from "@/components/LogoutModal";
import CertificateModal, { CertificateTarget } from "@/components/CertificateModal";
import Input from "@/components/Input";
import { profileUpdateSchema, ProfileUpdateSchemaType } from "@/schemas/profile.schema";
import { changePasswordFormSchema, ChangePasswordFormSchemaType } from "@/schemas/auth.schema";
import {
  HiOutlineViewGrid,
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineMenu,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineLockClosed,
  HiOutlineChevronDown,
  HiOutlineDownload,
  HiX,
} from "react-icons/hi";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"dashboard" | "certification" | "profile">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateTarget | null>(null);

  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);
  const [downloadingReceiptId, setDownloadingReceiptId] = useState<string | null>(null);
  const [receiptError, setReceiptError] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);

  const profileForm = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: { name: "", phone: "", state: "" },
  });

  const passwordForm = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(message);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3500);
  };
  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  useEffect(() => {
    listEnrolledCourses({ limit: 50 })
      .then((res) => setCourses(res.items))
      .finally(() => setCoursesLoading(false));
    listMyPayments({ limit: 20 })
      .then((res) => setPayments(res.items))
      .catch(() => setPayments([]));
    listStates()
      .then(setStates)
      .catch(() => setStates([]));
  }, []);

  if (!user) return null;

  const handleProfileSubmit = async (values: ProfileUpdateSchemaType) => {
    setProfileError("");
    try {
      const result = await authService.updateProfile(values);
      setUser(result.user);
      setIsEditingProfile(false);
      showToast("Profile updated successfully!");
    } catch (err) {
      if (!applyServerFieldErrors(profileForm, err)) {
        setProfileError(err instanceof ApiError ? err.message : "Could not update profile.");
      }
    }
  };

  const handleStartEditProfile = () => {
    profileForm.reset({ name: user.name ?? "", phone: user.phone ?? "", state: user.state ?? "" });
    setProfileError("");
    setIsEditingProfile(true);
  };

  const handleCancelProfileEdit = () => {
    setProfileError("");
    setIsEditingProfile(false);
  };

  const handlePasswordSubmit = async (values: ChangePasswordFormSchemaType) => {
    setPasswordError("");
    try {
      await authService.changePassword(values);
      passwordForm.reset({ currentPassword: "", newPassword: "" });
      setIsPasswordSectionOpen(false);
      showToast("Password changed successfully!");
    } catch (err) {
      if (!applyServerFieldErrors(passwordForm, err)) {
        setPasswordError(err instanceof ApiError ? err.message : "Could not change password.");
      }
    }
  };

  const handleDownloadReceipt = async (paymentId: string) => {
    // Opened synchronously, inside the click's user-gesture window, so
    // browsers won't block it — then navigated once the URL is ready.
    // Opening a new tab *after* the `await` below would happen outside that
    // window and get silently blocked as a popup in most browsers.
    const receiptWindow = window.open("", "_blank", "noopener,noreferrer");

    setDownloadingReceiptId(paymentId);
    setReceiptError("");
    try {
      const { receiptUrl } = await getPaymentReceipt(paymentId);
      if (receiptWindow) {
        receiptWindow.location.assign(receiptUrl);
      } else {
        window.location.assign(receiptUrl);
      }
    } catch (err) {
      receiptWindow?.close();
      setReceiptError(err instanceof ApiError ? err.message : "Could not generate your receipt. Please try again.");
    } finally {
      setDownloadingReceiptId(null);
    }
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-screen p-5 hidden md:flex sticky top-0 h-screen">
        <div className="space-y-8">
          <Link href="/" className="inline-block px-2">
            <div className="relative h-10 w-36">
              <Image src="/logo.png" alt="UPtrend Logo" fill priority className="object-contain object-left" />
            </div>
          </Link>

          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "dashboard" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineViewGrid className="text-lg" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("certification")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "certification" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineAcademicCap className="text-lg" />
              <span>Certification</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "profile" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineUser className="text-lg" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
          >
            <HiOutlineLogout className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-30">
        <Link href="/" className="relative h-8 w-28">
          <Image src="/logo.png" alt="UPtrend Logo" fill className="object-contain object-left" />
        </Link>
        <button type="button" onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-lg text-slate-700 hover:bg-slate-100">
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Slideover */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative w-64 bg-white h-full p-5 flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative h-8 w-28">
                  <Image src="/logo.png" alt="UPtrend Logo" fill className="object-contain object-left" />
                </div>
                <button type="button" onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-500 hover:text-slate-900">
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {(["dashboard", "certification", "profile"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left capitalize ${
                      activeTab === tab ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{tab}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 text-left"
              >
                <HiOutlineLogout className="text-base" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} userName={user.name ?? undefined} />

      <CertificateModal isOpen={Boolean(selectedCertificate)} onClose={() => setSelectedCertificate(null)} certificate={selectedCertificate} />

      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-5 sm:max-w-sm z-100 flex items-center gap-2.5 px-4 py-3.5 rounded-xl shadow-lg bg-emerald-600 text-white text-sm font-bold"
          style={{ animation: "toastIn 0.25s ease-out" }}
        >
          <HiOutlineCheckCircle className="text-lg shrink-0" />
          <span className="flex-1">{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-white/70 hover:text-white shrink-0 cursor-pointer"
            aria-label="Dismiss"
          >
            <HiX className="text-base" />
          </button>
        </div>
      )}

      <main className="flex-1 bg-white p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight wrap-break-word">
                {activeTab === "dashboard" && `Welcome, ${user.name || "Student"} 👋`}
                {activeTab === "certification" && "Course Certifications"}
                {activeTab === "profile" && "Profile Management"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeTab === "dashboard" && "Access your purchased courses and continue your learning."}
                {activeTab === "certification" && "Official certificates featuring your name, course, and batch credentials."}
                {activeTab === "profile" && "Manage your personal account details and credentials."}
              </p>
            </div>

            {activeTab === "dashboard" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 transition-colors shrink-0 shadow-sm self-start sm:self-auto cursor-pointer"
              >
                <HiOutlineArrowLeft className="text-base" />
                <span>Back to Home</span>
              </Link>
            )}
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Purchased Courses</h2>

                {coursesLoading ? (
                  <div className="text-sm text-slate-500 py-6">Loading your courses...</div>
                ) : courses.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-sm text-slate-500">No courses purchased yet.</p>
                    <Link href="/courses" className="inline-block mt-3 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl">
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-video w-full bg-slate-100">
                            {course.primaryImageUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={course.primaryImageUrl} alt={course.name} className="w-full h-full object-cover" />
                            )}
                          </div>

                          <div className="p-5 space-y-3">
                            <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 wrap-break-word">{course.name}</h3>
                            {course.mentorName && (
                              <p className="text-xs text-slate-500 truncate">
                                Mentor: <span className="font-semibold text-slate-700">{course.mentorName}</span>
                              </p>
                            )}

                            <div className="space-y-1.5 pt-1">
                              <div className="flex justify-between text-xs text-slate-600 font-medium">
                                <span>Progress</span>
                                <span className="font-bold text-slate-900">{course.progressPercent}% Completed</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-slate-900 h-full rounded-full transition-all duration-300"
                                  style={{ width: `${course.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <Link
                            href={`/dashboard/courses/${course.id}`}
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors text-center cursor-pointer"
                          >
                            <HiOutlinePlay className="text-base" />
                            <span>Watch Course Videos</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">My Purchases</h2>
                {receiptError && <p className="text-xs font-medium text-red-600">{receiptError}</p>}
                {payments.length === 0 ? (
                  <p className="text-sm text-slate-500">No purchases yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                        <tr>
                          <th className="text-left px-4 py-3">Course</th>
                          <th className="text-left px-4 py-3">Amount</th>
                          <th className="text-left px-4 py-3">Status</th>
                          <th className="text-left px-4 py-3">Date</th>
                          <th className="text-left px-4 py-3">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-4 py-3 font-semibold text-slate-800 max-w-56 wrap-break-word">{payment.course.name}</td>
                            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">₹{Number(payment.totalAmount).toLocaleString("en-IN")}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  payment.status === "SUCCESS"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : payment.status === "PENDING"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-red-50 text-red-700"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
                            <td className="px-4 py-3">
                              {payment.status === "SUCCESS" ? (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadReceipt(payment.id)}
                                  disabled={downloadingReceiptId === payment.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                  <HiOutlineDownload className="text-sm" />
                                  <span>{downloadingReceiptId === payment.id ? "Preparing..." : "Download"}</span>
                                </button>
                              ) : (
                                <span className="text-xs text-slate-400">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATION */}
          {activeTab === "certification" && (
            <div className="space-y-4">
              {courses.length === 0 ? (
                <p className="text-sm text-slate-500">Enroll in a course to earn a certificate.</p>
              ) : (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2 min-w-0">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-brand-gold-dark text-[10px] font-bold uppercase tracking-wider">
                        {course.progressPercent}% complete
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 wrap-break-word">{course.name}</h3>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate({
                            courseId: course.id,
                            courseName: course.name,
                            progressPercent: course.progressPercent,
                            isCourseComplete: course.isCourseComplete,
                          })
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors cursor-pointer"
                      >
                        <HiOutlineEye className="text-base" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-5 max-w-lg">
              {/* PERSONAL DETAILS — read-only by default, minimal edit affordance */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900">Personal Details</h2>
                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={handleStartEditProfile}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <HiOutlinePencilAlt className="text-sm" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                <div className="p-5">
                  {profileError && <p className="mb-4 text-xs font-medium text-red-600">{profileError}</p>}

                  {!isEditingProfile ? (
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-xs font-semibold text-slate-500">Full Name</dt>
                        <dd className="text-sm font-semibold text-slate-900 text-right truncate">{user.name || "—"}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-xs font-semibold text-slate-500">Email Address</dt>
                        <dd className="text-sm font-semibold text-slate-900 text-right truncate">{user.email}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-xs font-semibold text-slate-500">Phone Number</dt>
                        <dd className="text-sm font-semibold text-slate-900 text-right truncate">{user.phone || "—"}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-xs font-semibold text-slate-500">State</dt>
                        <dd className="text-sm font-semibold text-slate-900 text-right truncate">{user.state || "—"}</dd>
                      </div>
                    </dl>
                  ) : (
                    <FormProvider {...profileForm}>
                      <form onSubmit={(e) => void profileForm.handleSubmit(handleProfileSubmit)(e)} className="space-y-4">
                        <Input name="name" label="Full Name" type="text" required />

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                          <input
                            type="email"
                            disabled
                            value={user.email}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50"
                          />
                        </div>

                        <Input name="phone" label="Phone Number" type="tel" required />

                        <Controller
                          name="state"
                          control={profileForm.control}
                          render={({ field, fieldState }) => (
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">State</label>
                              <select
                                {...field}
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 ${
                                  fieldState.error ? "border-red-400 focus:ring-red-100" : "border-slate-300 focus:ring-slate-900"
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

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="submit"
                            disabled={profileForm.formState.isSubmitting}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelProfileEdit}
                            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </FormProvider>
                  )}
                </div>
              </div>

              {/* CHANGE PASSWORD — collapsible */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsPasswordSectionOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <HiOutlineLockClosed className="text-sm" />
                    </div>
                    <h2 className="text-sm font-bold text-slate-900">Change Password</h2>
                  </div>
                  <HiOutlineChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ease-in-out ${
                      isPasswordSectionOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isPasswordSectionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                      {passwordError && <p className="mt-4 text-xs font-medium text-red-600">{passwordError}</p>}

                      <FormProvider {...passwordForm}>
                        <form onSubmit={(e) => void passwordForm.handleSubmit(handlePasswordSubmit)(e)} className="space-y-4 mt-4">
                          <Input name="currentPassword" label="Current Password" type="password" required />
                          <Input name="newPassword" label="New Password" type="password" required />
                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={passwordForm.formState.isSubmitting}
                              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60"
                            >
                              Update Password
                            </button>
                          </div>
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
