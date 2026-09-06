"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import {
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Enrollment", href: "/enrollment" },
  { name: "Contact Us", href: "/contact" },
  { name: "Student Login", href: "/login" },
];

const courseLinks = [
  { name: "Nifty 50 Options & Futures", href: "/courses#nifty" },
  { name: "Smart Money Concepts (SMC)", href: "/courses#smc" },
  { name: "Order Flow & VWAP Masterclass", href: "/courses#orderflow" },
  { name: "Forex Market Mechanics", href: "/courses#forex" },
  { name: "Indian Equities & Screeners", href: "/courses#equities" },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { name: "Telegram", href: "https://telegram.org", icon: FaTelegram },
  { name: "WhatsApp", href: "https://whatsapp.com", icon: FaWhatsapp },
  { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 font-sans relative pt-16 sm:pt-20 pb-10 overflow-hidden border-t border-slate-800">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-navy/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          {/* Column 1: Brand Info & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-11 w-44">
                <Image
                  src="/logo.png"
                  alt="UPtrend Logo"
                  fill
                  priority
                  className="object-contain object-left invert"
                  sizes="180px"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Founded in Perinthalmanna, Kerala, UPtrend is a premier financial market education institute dedicated to elevating the standard of trading proficiency through structured risk frameworks and objective data.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 hover:bg-slate-800 transition-all"
                  >
                    <Icon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Online Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {courseLinks.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-slate-400 hover:text-brand-gold transition-colors inline-flex items-center gap-1"
                  >
                    <span>{course.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Perinthalmanna Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Perinthalmanna Hub
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-brand-gold text-lg shrink-0 mt-0.5" />
                <span>UPtrend Institute, Bypass Road, Perinthalmanna, Kerala - 679 322</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-brand-gold text-base shrink-0" />
                <a href="tel:+917907171406" className="hover:text-white transition-colors font-medium">
                  +91 79071 71406
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-brand-gold text-base shrink-0" />
                <a href="mailto:uptrendfinacademy@gmail.com" className="hover:text-white transition-colors">
                  uptrendfinacademy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineClock className="text-brand-gold text-base shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300 font-semibold">UPtrend</strong>. All rights reserved. Built for traders in Kerala & UAE.
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/privacy" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-brand-gold transition-colors">
              Risk Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
