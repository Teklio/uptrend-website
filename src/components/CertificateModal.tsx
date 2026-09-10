"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  HiOutlineDownload,
  HiOutlinePrinter,
  HiX,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
} from "react-icons/hi";
import { FaAward } from "react-icons/fa";

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  batch: string;
  certificateId: string;
  issueDate: string;
  instructorName?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData | null;
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  // High-Resolution Canvas Download
  const handleDownloadImage = () => {
    setDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1920x1080 Landscape Resolution
      canvas.width = 1920;
      canvas.height = 1080;

      // 1. Background Fill
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle warm gradient overlay
      const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1080);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.5, "#fafaf9");
      bgGrad.addColorStop(1, "#fffdf5");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Dual Ornamental Borders
      // Outer Navy Border
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#002b7f";
      ctx.strokeRect(40, 40, 1840, 1000);

      // Inner Gold Border
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#f5a300";
      ctx.strokeRect(58, 58, 1804, 964);

      // Thin Accent Border
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#002b7f33";
      ctx.strokeRect(70, 70, 1780, 940);

      // 3. Corner Ornaments (Gold Triangles / Accents)
      const drawCorner = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = "#f5a300";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(35, 0);
        ctx.lineTo(0, 35);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };
      drawCorner(70, 70, 0);
      drawCorner(1850, 70, Math.PI / 2);
      drawCorner(1850, 1010, Math.PI);
      drawCorner(70, 1010, -Math.PI / 2);

      // 4. Academy Title / Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#002b7f";
      ctx.font = "bold 32px sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillText("UPTREND FINANCIAL ACADEMY", 960, 150);

      ctx.fillStyle = "#f5a300";
      ctx.font = "600 16px sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("CENTER FOR INSTITUTIONAL TRADING EXCELLENCE", 960, 180);

      // Decorative divider
      ctx.strokeStyle = "#f5a300";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(800, 205);
      ctx.lineTo(1120, 205);
      ctx.stroke();

      // 5. Main Certificate Title
      ctx.fillStyle = "#001c54";
      ctx.font = "900 48px serif";
      ctx.letterSpacing = "3px";
      ctx.fillText("CERTIFICATE OF COMPLETION", 960, 280);

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 22px serif";
      ctx.letterSpacing = "1px";
      ctx.fillText("This is proudly presented to", 960, 340);

      // 6. Student Name
      ctx.fillStyle = "#002b7f";
      ctx.font = "bold 64px serif";
      ctx.letterSpacing = "2px";
      ctx.fillText(certificate.studentName, 960, 430);

      // Underline student name
      const nameWidth = ctx.measureText(certificate.studentName).width;
      ctx.strokeStyle = "#f5a300";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(960 - nameWidth / 2 - 20, 455);
      ctx.lineTo(960 + nameWidth / 2 + 20, 455);
      ctx.stroke();

      // 7. Statement & Course Title
      ctx.fillStyle = "#475569";
      ctx.font = "normal 22px sans-serif";
      ctx.letterSpacing = "0.5px";
      ctx.fillText(
        "for successfully completing the comprehensive professional syllabus and risk management framework of",
        960,
        520
      );

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 40px sans-serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(certificate.courseTitle, 960, 585);

      // 8. Batch & Verification Metadata
      ctx.fillStyle = "#64748b";
      ctx.font = "600 20px sans-serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(`Batch / Cohort: ${certificate.batch}`, 960, 645);

      // 9. Golden Seal / Badge (Center-Bottom)
      ctx.save();
      ctx.translate(960, 780);
      // Gold circle
      ctx.beginPath();
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.fillStyle = "#f5a300";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#002b7f";
      ctx.stroke();

      // Inner dashed circle
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#002b7f";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("OFFICIAL", 0, -6);
      ctx.fillText("CERTIFIED", 0, 12);
      ctx.restore();

      // 10. Left Signature Block (Lead Mentor)
      ctx.textAlign = "center";
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(320, 850);
      ctx.lineTo(580, 850);
      ctx.stroke();

      ctx.font = "italic 26px serif";
      ctx.fillStyle = "#002b7f";
      ctx.fillText(certificate.instructorName || "Nikhil Mathew", 450, 835);

      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Lead Market Mentor", 450, 880);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("UPtrend Financial Academy", 450, 905);

      // 11. Right Signature Block (Academic Director & Date)
      ctx.beginPath();
      ctx.moveTo(1340, 850);
      ctx.lineTo(1600, 850);
      ctx.stroke();

      ctx.font = "italic 26px serif";
      ctx.fillStyle = "#002b7f";
      ctx.fillText("Academic Board", 1470, 835);

      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Director of Education", 1470, 880);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Issued: ${certificate.issueDate}`, 1470, 905);

      // 12. Bottom Certificate ID & Verification Code
      ctx.textAlign = "center";
      ctx.font = "mono 13px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.letterSpacing = "2px";
      ctx.fillText(
        `CERTIFICATE ID: ${certificate.certificateId}  •  VERIFY: uptrend.financial/verify/${certificate.certificateId}`,
        960,
        990
      );

      // Trigger Download
      const link = document.createElement("a");
      const cleanFileName = `uptrend-certificate-${certificate.studentName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}.png`;
      link.download = cleanFileName;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (err) {
      console.error("Certificate download error:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-md">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center text-lg font-bold">
              <FaAward />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Verified Academy Certificate
              </h2>
              <p className="text-xs text-slate-500">
                Official Credential • ID: {certificate.certificateId}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <HiOutlinePrinter className="text-base text-slate-600" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-gold to-amber-400 hover:from-amber-400 hover:to-brand-gold shadow-sm transition-all duration-200 cursor-pointer"
            >
              <HiOutlineDownload className="text-base" />
              <span>{downloading ? "Generating..." : "Download HD Image"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors ml-1"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CERTIFICATE DISPLAY TEMPLATE */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-8 bg-slate-100 overflow-x-auto flex justify-center">
          <div
            ref={certRef}
            id="printable-certificate"
            className="w-full max-w-[880px] aspect-[1.414/1] bg-white rounded-xl shadow-xl relative p-6 sm:p-10 border-[10px] sm:border-[14px] border-brand-navy flex flex-col justify-between select-none overflow-hidden"
          >
            {/* Inner Gold Foil Border */}
            <div className="absolute inset-2 sm:inset-3 border-2 border-brand-gold pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-brand-navy/20 pointer-events-none" />

            {/* Corner Badges */}
            <div className="absolute top-3 left-3 w-4 h-4 bg-brand-gold transform rotate-45 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 bg-brand-gold transform rotate-45 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 bg-brand-gold transform rotate-45 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-brand-gold transform rotate-45 pointer-events-none" />

            {/* Subtle Security Guilloche Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#002b7f08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* ================= HEADER ================= */}
            <div className="text-center relative z-10 space-y-1 sm:space-y-1.5 pt-1">
              {/* UPtrend Logo */}
              <div className="relative h-9 sm:h-12 w-40 sm:w-48 mx-auto mb-1">
                <Image
                  src="/logo.png"
                  alt="UPtrend Logo"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>

              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold-dark">
                Center for Institutional Trading Excellence
              </div>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-1" />
            </div>

            {/* ================= BODY / AWARD ================= */}
            <div className="text-center relative z-10 my-auto py-2 sm:py-3 space-y-2 sm:space-y-3">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#001c54] tracking-tight font-serif uppercase">
                Certificate of Completion
              </h1>

              <p className="text-xs sm:text-sm italic font-serif text-slate-500">
                This is proudly presented to
              </p>

              {/* Student Name */}
              <div className="py-1">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-serif tracking-wide">
                  {certificate.studentName}
                </div>
                <div className="w-48 sm:w-72 h-0.5 bg-brand-gold mx-auto mt-1.5" />
              </div>

              {/* Course & Fulfillment Statement */}
              <p className="text-[11px] sm:text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                for successfully completing the comprehensive professional syllabus and risk management framework of
              </p>

              <div className="text-base sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                {certificate.courseTitle}
              </div>

              {/* Batch & Program Details */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] sm:text-xs font-bold text-slate-700">
                <span>Batch: {certificate.batch}</span>
                <span className="text-slate-300">•</span>
              </div>
            </div>

            <div className="relative z-10 pt-2 border-t border-slate-200/80">
              <div className="flex items-center justify-center text-center">
                {/* Center: Official Academy Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-gold via-amber-400 to-brand-gold p-1 shadow-md border-2 border-brand-navy flex items-center justify-center text-center text-brand-navy select-none">
                    <div className="w-full h-full rounded-full border border-dashed border-white/80 flex flex-col items-center justify-center p-0.5">
                      <FaAward className="text-sm sm:text-base text-brand-navy mb-0.5" />
                      <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider leading-none">
                        Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Certificate Verification Code */}
              <div className="mt-3 text-center text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider">
                CERTIFICATE ID: {certificate.certificateId} • VERIFY AT UPTREND.FINANCIAL/VERIFY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
