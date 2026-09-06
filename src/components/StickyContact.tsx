"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineX, HiChatAlt2 } from "react-icons/hi";

const PHONE_NUMBER = "7907171406";
const DISPLAY_PHONE = "790 7171 406";

export default function StickyContact() {
  const [isOpen, setIsOpen] = useState(true);

  const whatsappUrl = `https://wa.me/91${PHONE_NUMBER}?text=Hi%20UPtrend,%20I%20would%20like%20to%20know%20more%20about%20your%20trading%20courses.`;
  const callUrl = `tel:+91${PHONE_NUMBER}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2.5 items-end"
          >
            {/* WhatsApp Quick Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="text-lg sm:text-xl shrink-0" />
              <span>WhatsApp: {DISPLAY_PHONE}</span>
            </a>

            {/* Direct Call Link */}
            <a
              href={callUrl}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,43,127,0.35)] hover:shadow-[0_6px_24px_rgba(0,43,127,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
            >
              <FaPhoneAlt className="text-sm sm:text-base text-brand-gold shrink-0" />
              <span>Call: {DISPLAY_PHONE}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-brand-gold text-slate-950 shadow-lg shadow-brand-gold/30 hover:bg-brand-gold-hover transition-colors focus:outline-none"
        aria-label="Toggle contact options"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>

        {isOpen ? (
          <HiOutlineX className="text-xl sm:text-2xl font-bold" />
        ) : (
          <HiChatAlt2 className="text-xl sm:text-2xl font-bold" />
        )}
      </motion.button>
    </div>
  );
}
