"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiXMark,
} from "react-icons/hi2";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Enrollment", href: "/enrollment", badge: "Open" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 sm:py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(0,43,127,0.06)]"
            : "py-4 sm:py-5.5 bg-white/75 backdrop-blur-md border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center group shrink-0 focus:outline-none"
            >
              <div className="relative h-11 w-36 sm:h-12 sm:w-44 lg:h-13 lg:w-48 transition-transform duration-300 ease-out group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="UPtrend Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 210px"
                />
              </div>
            </Link>

            {/* Desktop Navigation with Animated Floating Pill */}
            <nav
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50/90 border border-slate-200/70 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const isHovered = hoveredIndex === index;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`relative px-5 py-2.5 text-[15px] xl:text-base font-semibold transition-colors duration-200 rounded-full flex items-center gap-2 ${
                      isActive
                        ? "text-brand-navy font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {/* Hover pill animation */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/90"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active pill if not hovered */}
                    {isActive && !isHovered && (
                      <motion.div
                        layoutId="navActivePill"
                        className="absolute inset-0 bg-brand-navy/8 rounded-full border border-brand-navy/20"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>

                    {item.badge && (
                      <span className="relative z-10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-brand-gold/20 text-brand-gold-dark border border-brand-gold/40">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3.5">
              {/* Login Button */}
              <Link
                href="/login"
                className="group relative flex items-center gap-2 px-5 py-2.5 text-[15px] font-semibold text-slate-700 hover:text-brand-navy transition-all duration-200 rounded-full hover:bg-slate-100/80"
              >
                <HiOutlineUser className="text-lg text-slate-400 group-hover:text-brand-navy transition-colors" />
                <span>Login</span>
              </Link>

              {/* Minimal Premium CTA Button */}
              <Link
                href="/enrollment"
                className="relative group overflow-hidden inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[15px] font-bold text-slate-950 bg-gradient-to-r from-brand-gold to-amber-400 hover:from-amber-400 hover:to-brand-gold shadow-[0_2px_16px_rgba(245,163,0,0.3)] hover:shadow-[0_4px_24px_rgba(245,163,0,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wide">
                  <span>Enroll Now</span>
                  <HiOutlineArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"
                  initial={false}
                />
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                href="/login"
                aria-label="Login"
                className="p-2.5 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors sm:hidden"
              >
                <HiOutlineUser className="w-6 h-6" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-full text-slate-800 hover:text-brand-navy hover:bg-slate-100/80 transition-all focus:outline-none cursor-pointer"
                aria-label="Open menu"
              >
                <div className="w-6 h-4.5 flex flex-col justify-between items-end">
                  <span className="h-0.5 w-6 bg-slate-900 rounded-full" />
                  <span className="h-0.5 w-4 bg-slate-900 rounded-full" />
                  <span className="h-0.5 w-6 bg-slate-900 rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20 sm:h-24 lg:h-26" />

      {/* Mobile Right-Side Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-over Panel from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="relative h-9 w-28">
                  <Image
                    src="/logo.png"
                    alt="UPtrend Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <div>
                  {/* Nav links */}
                  <nav className="flex flex-col space-y-1.5">
                    {navItems.map((item, idx) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 + 0.05 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl text-2xl font-semibold transition-all ${
                              isActive
                                ? "bg-brand-navy text-white font-bold shadow-md shadow-brand-navy/20"
                                : "text-slate-800 hover:bg-slate-100"
                            }`}
                          >
                            <span>{item.name}</span>
                            {item.badge && (
                              <span
                                className={`px-2 py-0.5 text-xs font-bold uppercase rounded-full ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-brand-gold/20 text-brand-gold-dark"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <HiOutlineUser className="text-base text-brand-navy" />
                    <span>Student Login</span>
                  </Link>

                  <Link
                    href="/enrollment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Enroll Now</span>
                    <HiOutlineArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
