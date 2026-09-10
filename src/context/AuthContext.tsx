"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { COURSES_DATA } from "@/data/courses";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  tradingExperience?: string;
  broker?: string;
  city?: string;
  joinedDate?: string;
  studentId?: string;
}

export interface PurchaseInvoice {
  id: string;
  courseSlug: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: "Completed" | "Processing";
  paymentMethod: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile;
  enrolledCourses: string[]; // slugs
  completedLessons: string[]; // lesson ids
  lastWatchedLesson: Record<string, string>; // courseSlug -> lessonId
  invoices: PurchaseInvoice[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  enrollInCourse: (courseSlug: string, amountPaid?: number) => void;
  toggleLessonCompleted: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  setLastWatched: (courseSlug: string, lessonId: string) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  getCourseProgress: (courseSlug: string) => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
}

const DEFAULT_USER: UserProfile = {
  name: "Student",
  email: "student@uptrend.com",
  phone: "+91 98765 43210",
  avatar: "/logo.png",
  bio: "Equity swing trader focusing on price action and Smart Money Concepts.",
  tradingExperience: "Intermediate",
  broker: "Zerodha Kite",
  city: "Kerala, India",
  joinedDate: "September 2026",
  studentId: "UPT-2026-8841",
};

const DEFAULT_ENROLLED_COURSES = [
  "swing-trading-master-course",
  "market-basics-technical-analysis",
];

const DEFAULT_COMPLETED_LESSONS = [
  "sw-intro-1",
  "sw-intro-2",
  "sw-intro-3",
  "sw-w1-1",
];

const DEFAULT_INVOICES: PurchaseInvoice[] = [
  {
    id: "UPT-INV-99201",
    courseSlug: "swing-trading-master-course",
    courseTitle: "Swing trading master course - 2026 September",
    amount: 15317.58,
    date: "15 Aug 2026",
    status: "Completed",
    paymentMethod: "UPI / Razorpay",
  },
  {
    id: "UPT-INV-84192",
    courseSlug: "market-basics-technical-analysis",
    courseTitle: "Master the Stock Market – From Basics to Technical Analysis",
    amount: 1531.85,
    date: "28 Jul 2026",
    status: "Completed",
    paymentMethod: "NetBanking",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default logged in for preview
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(
    DEFAULT_ENROLLED_COURSES
  );
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    DEFAULT_COMPLETED_LESSONS
  );
  const [lastWatchedLesson, setLastWatchedLessonState] = useState<
    Record<string, string>
  >({
    "swing-trading-master-course": "sw-w1-2",
    "market-basics-technical-analysis": "mb-intro-1",
  });
  const [invoices, setInvoices] =
    useState<PurchaseInvoice[]>(DEFAULT_INVOICES);

  // Hydrate from localStorage if available
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("uptrend_auth_state");
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setIsLoggedIn(parsed.isLoggedIn ?? true);
        setUser(parsed.user ?? DEFAULT_USER);
        setEnrolledCourses(parsed.enrolledCourses ?? DEFAULT_ENROLLED_COURSES);
        setCompletedLessons(
          parsed.completedLessons ?? DEFAULT_COMPLETED_LESSONS
        );
        setLastWatchedLessonState(parsed.lastWatchedLesson ?? {});
        setInvoices(parsed.invoices ?? DEFAULT_INVOICES);
      }
    } catch (e) {
      console.error("Failed to load auth state from localStorage", e);
    }
  }, []);

  // Save to localStorage when state changes
  const saveState = (updated: {
    isLoggedIn?: boolean;
    user?: UserProfile;
    enrolledCourses?: string[];
    completedLessons?: string[];
    lastWatchedLesson?: Record<string, string>;
    invoices?: PurchaseInvoice[];
  }) => {
    try {
      const stateToSave = {
        isLoggedIn: updated.isLoggedIn ?? isLoggedIn,
        user: updated.user ?? user,
        enrolledCourses: updated.enrolledCourses ?? enrolledCourses,
        completedLessons: updated.completedLessons ?? completedLessons,
        lastWatchedLesson: updated.lastWatchedLesson ?? lastWatchedLesson,
        invoices: updated.invoices ?? invoices,
      };
      localStorage.setItem("uptrend_auth_state", JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save auth state to localStorage", e);
    }
  };

  const login = (email: string, name?: string) => {
    const updatedUser = {
      ...user,
      email: email || user.email,
      name: name || user.name || "Student",
    };
    setIsLoggedIn(true);
    setUser(updatedUser);
    saveState({ isLoggedIn: true, user: updatedUser });
  };

  const logout = () => {
    setIsLoggedIn(false);
    saveState({ isLoggedIn: false });
  };

  const enrollInCourse = (courseSlug: string, amountPaid?: number) => {
    if (!enrolledCourses.includes(courseSlug)) {
      const newEnrolled = [courseSlug, ...enrolledCourses];
      const matchedCourse = COURSES_DATA.find((c) => c.slug === courseSlug);
      const newInvoice: PurchaseInvoice = {
        id: "UPT-INV-" + Math.floor(10000 + Math.random() * 90000),
        courseSlug,
        courseTitle: matchedCourse ? matchedCourse.title : "UPtrend Course",
        amount: amountPaid || (matchedCourse ? matchedCourse.totalPrice : 14999),
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "Completed",
        paymentMethod: "UPI Instant Transfer",
      };
      const updatedInvoices = [newInvoice, ...invoices];

      setEnrolledCourses(newEnrolled);
      setInvoices(updatedInvoices);
      setIsLoggedIn(true);
      saveState({
        isLoggedIn: true,
        enrolledCourses: newEnrolled,
        invoices: updatedInvoices,
      });
    }
  };

  const toggleLessonCompleted = (lessonId: string) => {
    let updated: string[];
    if (completedLessons.includes(lessonId)) {
      updated = completedLessons.filter((id) => id !== lessonId);
    } else {
      updated = [...completedLessons, lessonId];
    }
    setCompletedLessons(updated);
    saveState({ completedLessons: updated });
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const setLastWatched = (courseSlug: string, lessonId: string) => {
    const updated = {
      ...lastWatchedLesson,
      [courseSlug]: lessonId,
    };
    setLastWatchedLessonState(updated);
    saveState({ lastWatchedLesson: updated });
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    const updated = { ...user, ...data };
    setUser(updated);
    saveState({ user: updated });
  };

  const getCourseProgress = (courseSlug: string) => {
    // Determine lesson count by slug prefix or sample count
    let prefix = "sw-";
    let total = 15;
    if (courseSlug.includes("basics")) {
      prefix = "mb-";
      total = 10;
    } else if (courseSlug.includes("options")) {
      prefix = "opt-";
      total = 6;
    }

    const completed = completedLessons.filter((id) => id.startsWith(prefix)).length;
    const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    return { completedCount: completed, totalCount: total, percentage };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        enrolledCourses,
        completedLessons,
        lastWatchedLesson,
        invoices,
        login,
        logout,
        enrollInCourse,
        toggleLessonCompleted,
        isLessonCompleted,
        setLastWatched,
        updateProfile,
        getCourseProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
