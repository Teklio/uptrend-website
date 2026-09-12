"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { listEnrolledCourses } from "@/services/learn.service";
import { listMyPayments } from "@/services/payment.service";
import { listStates } from "@/services/state.service";
import * as authService from "@/services/auth.service";
import { EnrolledCourse } from "@/types/learn.type";
import { Payment } from "@/types/payment.type";
import { StateOption } from "@/types/common.type";
import { ApiError } from "@/lib/api";
import LogoutModal from "@/components/LogoutModal";
import CertificateModal, { CertificateTarget } from "@/components/CertificateModal";
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
  HiX,
} from "react-icons/hi";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"dashboard" | "certification" | "profile">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateTarget | null>(null);

  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);

  const [profileForm, setProfileForm] = useState({ name: "", phone: "", state: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!user) return;
    setProfileForm({ name: user.name ?? "", phone: user.phone ?? "", state: user.state ?? "" });
  }, [user]);

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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    try {
      await authService.updateProfile(profileForm);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : "Could not update profile.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    try {
      await authService.changePassword(passwordForm);
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : "Could not change password.");
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

      <main className="flex-1 bg-white p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
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
                          <div className="relative aspect-[16/9] w-full bg-slate-100">
                            {course.primaryImageUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={course.primaryImageUrl} alt={course.name} className="w-full h-full object-cover" />
                            )}
                          </div>

                          <div className="p-5 space-y-3">
                            <h3 className="text-base font-bold text-slate-900 leading-snug">{course.name}</h3>
                            {course.mentorName && (
                              <p className="text-xs text-slate-500">
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
                                  style={{ width: `${Math.max(5, course.progressPercent)}%` }}
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
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-4 py-3 font-semibold text-slate-800">{payment.course.name}</td>
                            <td className="px-4 py-3 text-slate-700">₹{payment.totalAmount.toLocaleString("en-IN")}</td>
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
                            <td className="px-4 py-3 text-slate-500">{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
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
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-brand-gold-dark text-[10px] font-bold uppercase tracking-wider">
                        {course.progressPercent}% complete
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{course.name}</h3>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate({ courseId: course.id, courseName: course.name, progressPercent: course.progressPercent })
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
            <div className="space-y-10 max-w-lg">
              <div className="space-y-4">
                {saveSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2">
                    <HiOutlineCheckCircle className="text-base" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}
                {profileError && <p className="text-xs font-medium text-red-600">{profileError}</p>}

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">State</label>
                    <select
                      value={profileForm.state}
                      onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select state</option>
                      {states.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Change Password</h2>
                {passwordSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2">
                    <HiOutlineCheckCircle className="text-base" />
                    <span>Password changed successfully!</span>
                  </div>
                )}
                {passwordError && <p className="text-xs font-medium text-red-600">{passwordError}</p>}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
