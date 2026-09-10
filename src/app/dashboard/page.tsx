"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { COURSES_DATA } from "@/data/courses";
import LogoutModal from "@/components/LogoutModal";
import CertificateModal, { CertificateData } from "@/components/CertificateModal";
import {
  HiOutlineViewGrid,
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineDownload,
  HiOutlineMenu,
  HiOutlineEye,
  HiX,
} from "react-icons/hi";

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    enrolledCourses,
    logout,
    updateProfile,
    getCourseProgress,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"dashboard" | "certification" | "profile">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  // Profile Form States
  const [profileForm, setProfileForm] = useState({
    name: user.name || "Student",
    email: user.email || "student@uptrend.com",
    phone: user.phone || "+91 98765 43210",
    currentPassword: "",
    newPassword: "",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter enrolled courses
  const enrolledCoursesList = COURSES_DATA.filter((c) =>
    enrolledCourses.includes(c.slug)
  );

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row font-sans">
      {/* ============================================================ */}
      {/* 1. LEFT SIDEBAR */}
      {/* ============================================================ */}
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-screen p-5 hidden md:flex sticky top-0 h-screen">
        <div className="space-y-8">
          {/* Academy Logo */}
          <Link href="/" className="inline-block px-2">
            <div className="relative h-10 w-36">
              <Image
                src="/logo.png"
                alt="UPtrend Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineViewGrid className="text-lg" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("certification")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "certification"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineAcademicCap className="text-lg" />
              <span>Certification</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === "profile"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HiOutlineUser className="text-lg" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* Bottom Logout */}
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
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Slideover */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white h-full p-5 flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative h-8 w-28">
                  <Image src="/logo.png" alt="UPtrend Logo" fill className="object-contain object-left" />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-900"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("dashboard");
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left ${
                    activeTab === "dashboard" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <HiOutlineViewGrid className="text-lg" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("certification");
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left ${
                    activeTab === "certification" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <HiOutlineAcademicCap className="text-lg" />
                  <span>Certification</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left ${
                    activeTab === "profile" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
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

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        userName={user.name}
      />

      {/* Certificate Preview & Download Modal */}
      <CertificateModal
        isOpen={Boolean(selectedCertificate)}
        onClose={() => setSelectedCertificate(null)}
        certificate={selectedCertificate}
      />

      {/* ============================================================ */}
      {/* 2. MAIN WHITE CONTENT AREA */}
      {/* ============================================================ */}
      <main className="flex-1 bg-white p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Top Bar with Back to Home aligned to top right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeTab === "dashboard" && `Welcome, ${user.name || "Student"} 👋`}
                {activeTab === "certification" && "Course Certifications"}
                {activeTab === "profile" && "Profile Management"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {activeTab === "dashboard" && "Access your purchased courses and continue your learning."}
                {activeTab === "certification" && "Official verified certificates featuring your name, course, and batch credentials."}
                {activeTab === "profile" && "Manage your personal account details and credentials."}
              </p>
            </div>

            {/* Back to Home Aligned to Top Right (Only on Dashboard Tab) */}
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

          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD VIEW (Purchased course cards) */}
          {/* ======================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Purchased Courses Cards */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Purchased Courses
                </h2>

                {enrolledCoursesList.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-sm text-slate-500">
                      No courses purchased yet.
                    </p>
                    <Link
                      href="/courses"
                      className="inline-block mt-3 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                    >
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCoursesList.map((course) => {
                      const progress = getCourseProgress(course.slug);

                      return (
                        <div
                          key={course.id}
                          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                          <div>
                            {/* Course Image */}
                            <div className="relative aspect-[16/9] w-full bg-slate-100">
                              <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Course Info */}
                            <div className="p-5 space-y-3">
                              <h3 className="text-base font-bold text-slate-900 leading-snug">
                                {course.title}
                              </h3>

                              <p className="text-xs text-slate-500">
                                Mentor: <span className="font-semibold text-slate-700">{course.instructor}</span>
                              </p>

                              {/* Progress bar */}
                              <div className="space-y-1.5 pt-1">
                                <div className="flex justify-between text-xs text-slate-600 font-medium">
                                  <span>Progress</span>
                                  <span className="font-bold text-slate-900">
                                    {progress.percentage}% Completed
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-slate-900 h-full rounded-full transition-all duration-300"
                                    style={{ width: `${Math.max(5, progress.percentage)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Action */}
                          <div className="p-5 pt-0">
                            <Link
                              href={`/dashboard/courses/${course.slug}`}
                              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors text-center cursor-pointer"
                            >
                              <HiOutlinePlay className="text-base" />
                              <span>Watch Course Videos</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: CERTIFICATION VIEW */}
          {/* ======================================================== */}
          {activeTab === "certification" && (
            <div className="space-y-6">
              <div className="space-y-4">
                {enrolledCoursesList.map((course, idx) => {
                  const progress = getCourseProgress(course.slug);
                  const isCompleted = progress.percentage >= 100;
                  const certBatch = "Batch 2026 - Cohort #08";
                  const certId = `UPT-2026-${(10842 + idx * 37).toString()}`;
                  const certDate = "March 10, 2026";

                  const certData: CertificateData = {
                    studentName: user.name || "Student",
                    courseTitle: course.title,
                    batch: certBatch,
                    certificateId: certId,
                    issueDate: certDate,
                    instructorName: course.instructor || "Nikhil Mathew",
                  };

                  return (
                    <div
                      key={course.id}
                      className="p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-brand-gold-dark text-[10px] font-bold uppercase tracking-wider">
                            {certBatch}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            ID: {certId}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {course.title}
                        </h3>

                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(certData)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors cursor-pointer"
                        >
                          <HiOutlineEye className="text-base" />
                          <span>View & Download Certificate</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: PROFILE MANAGEMENT VIEW */}
          {/* ======================================================== */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Profile Management
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage your personal account details and credentials.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-2">
                  <HiOutlineCheckCircle className="text-base" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
