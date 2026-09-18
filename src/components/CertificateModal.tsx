"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineDownload, HiX, HiOutlineLockClosed } from "react-icons/hi";
import { FaAward } from "react-icons/fa";
import { getCertificate } from "@/services/learn.service";
import { ApiError } from "@/lib/api";

export interface CertificateTarget {
  courseId: string;
  courseName: string;
  progressPercent: number;
  // Server gates the actual certificate on an exact `completed === total`
  // video count, not the rounded percentage — a course with enough videos
  // can round to 100% while still missing one, so this must come from the
  // server's own exact check rather than being derived from progressPercent.
  isCourseComplete: boolean;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateTarget | null;
}

export default function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clears the error the moment the modal opens — compared during render
  // (React's documented pattern for resetting state when a prop changes)
  // rather than in an effect, since the modal itself never unmounts between
  // opens.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setError("");
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const isComplete = certificate.isCourseComplete;

  const handleDownload = async () => {
    // Opened synchronously, inside the click's user-gesture window, so
    // browsers won't block it — then navigated once the URL is ready.
    // Opening a new tab *after* the `await` below would happen outside that
    // window and get silently blocked as a popup in most browsers.
    // Deliberately no "noopener"/"noreferrer" here — either one makes
    // window.open() always return null (even though the tab still opens),
    // which broke the whole point of capturing a reference: the code fell
    // through to navigating the *current* tab instead, leaving this new one
    // stuck on about:blank forever while the site itself got replaced.
    const certWindow = window.open("", "_blank");

    setLoading(true);
    setError("");
    try {
      const { certificateUrl } = await getCertificate(certificate.courseId);
      if (certWindow) {
        certWindow.location.assign(certificateUrl);
      } else {
        window.location.assign(certificateUrl);
      }
    } catch (err) {
      certWindow?.close();
      setError(err instanceof ApiError ? err.message : "Could not generate your certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center text-lg font-bold">
              <FaAward />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Certificate</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 text-center space-y-4">
          <h3 className="text-base font-bold text-slate-900 wrap-break-word">{certificate.courseName}</h3>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          {isComplete ? (
            <>
              <p className="text-sm text-slate-600">
                Course completed! Your official certificate is ready to download.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-linear-to-r from-brand-gold to-amber-400 hover:from-amber-400 hover:to-brand-gold shadow-sm transition-all duration-200 disabled:opacity-60"
              >
                <HiOutlineDownload className="text-base" />
                <span>{loading ? "Generating..." : "Download Certificate"}</span>
              </button>
            </>
          ) : (
            <>
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl">
                <HiOutlineLockClosed />
              </div>
              <p className="text-sm text-slate-600">
                Complete all lessons to unlock your certificate. You&apos;re at {certificate.progressPercent}%.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
