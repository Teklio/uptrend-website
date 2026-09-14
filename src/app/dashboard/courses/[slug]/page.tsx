"use client";

import { useState, use, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineArrowLeft,
  HiOutlinePlay,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineX,
} from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { getEnrolledCourse, getVideoPlayback, updateVideoProgress } from "@/services/learn.service";
import { EnrolledCourseDetail, EnrolledModule, EnrolledVideo, VideoPlayback } from "@/types/learn.type";
import { ApiError } from "@/lib/api";
import { loadPlayerJsScript, PlayerJsInstance } from "@/lib/playerjs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatDuration = (seconds: number | null) => {
  if (seconds == null) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

function NowPlayingBars() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-0.5 bg-white rounded-full animate-[nowplaying_1s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.15}s`, height: "100%" }}
        />
      ))}
    </div>
  );
}

function PlaylistRow({
  video,
  index,
  isSelected,
  onSelect,
}: {
  video: EnrolledVideo;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
        isSelected ? "bg-slate-900" : "hover:bg-slate-50"
      }`}
    >
      <div className="relative w-18 aspect-video sm:w-20 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-slate-200/60">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-900" />
        )}
        <div className={`absolute inset-0 flex items-center justify-center ${isSelected ? "bg-slate-950/50" : "bg-slate-950/25"}`}>
          {isSelected ? (
            <NowPlayingBars />
          ) : video.isCompleted ? (
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <FiCheck className="w-3 h-3 stroke-3" />
            </div>
          ) : (
            <HiOutlinePlay className="text-white text-lg drop-shadow" />
          )}
        </div>
        <span className="absolute bottom-0.5 right-0.5 text-[9px] font-mono font-semibold text-white bg-black/70 px-1 rounded leading-tight">
          {formatDuration(video.durationSeconds)}
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className={`text-xs font-semibold leading-snug line-clamp-2 wrap-break-word ${isSelected ? "text-white" : "text-slate-800"}`}>
          {index}. {video.title}
        </p>
        {video.description && (
          <p className={`text-[11px] leading-snug line-clamp-2 wrap-break-word mt-1 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
            {video.description}
          </p>
        )}
      </div>

      {video.isCompleted && !isSelected && (
        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <FiCheck className="w-2.5 h-2.5 stroke-3" />
        </div>
      )}
    </button>
  );
}

// Save page / view source / print — Chromium and Firefox still let page JS
// suppress these plain Ctrl/Cmd combos.
const BLOCKED_SHORTCUT_KEYS = new Set(["s", "u", "p"]);
// DevTools shortcuts — Ctrl/Cmd+Shift+I/J/C (inspector/console/element-pick)
// and F12. Current Chrome/Edge intentionally ignore preventDefault() on
// these (hardened specifically against pages trying this), so the
// DevTools-open detector below is the real backstop there; this still works
// in Firefox and some other browsers, so it's kept as a first line.
const BLOCKED_SHIFT_SHORTCUT_KEYS = new Set(["i", "j", "c", "k"]);

function VideoPlayer({ videoId }: { videoId: string }) {
  const router = useRouter();
  const [playback, setPlayback] = useState<VideoPlayback | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<PlayerJsInstance | null>(null);
  const violationTriggeredRef = useRef(false);

  // Escalation for every real (non-cosmetic) guard below: pause, tell the
  // learner why via a blocking alert (guaranteed visible even mid-navigation,
  // unlike a toast), and send them back to the dashboard. Guarded by a ref
  // so a burst of events (e.g. the devtools-poll interval firing repeatedly
  // while the panel stays open) only triggers this once.
  const triggerViolation = useCallback(
    (message: string) => {
      if (violationTriggeredRef.current) return;
      violationTriggeredRef.current = true;
      playerRef.current?.pause();
      window.alert(`${message} You've been returned to your dashboard.`);
      router.push("/dashboard");
    },
    [router],
  );

  useEffect(() => {
    getVideoPlayback(videoId)
      .then(setPlayback)
      .catch(() => setPlayback(null));
  }, [videoId]);

  // "Theater mode" — a CSS overlay that fills the viewport, not the real
  // Fullscreen API (deliberately: this app's own on-page keyboard guards
  // already run at the window/document level regardless of real vs CSS
  // fullscreen, so switching away from requestFullscreen() doesn't change
  // what those guards can or can't see — it's a viewing-experience choice,
  // not a protection one). Exited only via the explicit close button, since
  // there's no browser-guaranteed Esc handling like real fullscreen has.
  const [isMaximized, setIsMaximized] = useState(false);

  // Pauses playback while the tab is backgrounded (soft deterrent against
  // recording via a second window) and opens theater mode when playback
  // starts.
  useEffect(() => {
    if (!playback) return;

    let cancelled = false;

    loadPlayerJsScript().then((loaded) => {
      if (!loaded || cancelled || !iframeRef.current || !window.playerjs) return;
      const player = new window.playerjs.Player(iframeRef.current);
      playerRef.current = player;
      player.on("play", () => setIsMaximized(true));
    });

    const handleVisibilityChange = () => {
      if (document.hidden) playerRef.current?.pause();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Broader than visibilitychange (which only fires on tab-switch/minimize)
    // — this also catches focus leaving the browser window entirely, e.g.
    // another app's window (or the Game Bar overlay) being clicked into
    // while this window stays visibly on screen. It does NOT catch a
    // recording shortcut that never takes focus in the first place.
    const handleWindowBlur = () => playerRef.current?.pause();
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      cancelled = true;
      playerRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [playback]);

  const handleClose = () => {
    playerRef.current?.pause();
    setIsMaximized(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        triggerViolation("A restricted keyboard shortcut was used.");
        return;
      }
      const key = e.key.toLowerCase();
      const isModified = e.ctrlKey || e.metaKey;
      if (isModified && !e.shiftKey && BLOCKED_SHORTCUT_KEYS.has(key)) {
        e.preventDefault();
        triggerViolation("A restricted keyboard shortcut was used.");
      }
      if (isModified && e.shiftKey && BLOCKED_SHIFT_SHORTCUT_KEYS.has(key)) {
        e.preventDefault();
        triggerViolation("A restricted keyboard shortcut was used.");
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== "PrintScreen") return;
      triggerViolation("A screenshot attempt was detected.");
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerViolation]);

  // Bunny's iframe runs a small script we inject via the library's own
  // "Custom HTML head" player setting — same-origin *inside that document*,
  // so it can see keystrokes our page never could (the video having focus
  // is exactly when our own window-level listeners above go blind). It
  // reports PrintScreen back to us via postMessage, the one sanctioned way
  // for a cross-origin frame to talk to its parent.
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://iframe.mediadelivery.net") return;
      if (e.data?.source !== "uptrend-video-guard") return;
      if (e.data.reason === "screenshot") {
        triggerViolation("A screenshot attempt was detected.");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [triggerViolation]);

  // Docked-right/left DevTools panels shrink the inner viewport width
  // relative to the outer window. Width-only, deliberately: the height gap
  // (tab strip + bookmarks bar + omnibox chrome) is commonly 100-150px on
  // its own with DevTools closed, so a height-based check false-triggers
  // on completely normal browser chrome — the width gap stays near-zero
  // unless DevTools is actually docked to a side, which is the reliable
  // signal. Trade-off: a DevTools panel docked to the bottom isn't caught.
  useEffect(() => {
    const THRESHOLD = 220;
    const check = () => {
      if (window.outerWidth - window.innerWidth > THRESHOLD) {
        triggerViolation("Developer tools were opened.");
      }
    };
    check();
    const interval = window.setInterval(check, 1000);
    return () => window.clearInterval(interval);
  }, [triggerViolation]);

  if (!playback) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={
        isMaximized
          ? "fixed inset-0 z-100 bg-black"
          : "absolute inset-0 bg-black"
      }
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        ref={iframeRef}
        src={playback.embedUrl}
        className="w-full h-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
      {isMaximized && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Exit theater mode"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <HiOutlineX className="text-lg" />
        </button>
      )}
    </div>
  );
}

function ModulePanel({
  mod,
  isOpen,
  onToggleModule,
  activeVideoId,
  onSelectVideo,
}: {
  mod: EnrolledModule;
  isOpen: boolean;
  onToggleModule: () => void;
  activeVideoId: string | null;
  onSelectVideo: (id: string) => void;
}) {
  const completed = mod.videos.filter((v) => v.isCompleted).length;
  const total = mod.videos.length;
  const totalDuration = mod.videos.reduce((sum, v) => sum + (v.durationSeconds ?? 0), 0);

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={onToggleModule}
        className="w-full px-4 py-3.5 flex items-start justify-between gap-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <div className="min-w-0">
          <h3 className="text-[13px] font-bold text-slate-900 leading-snug wrap-break-word">{mod.title}</h3>
          {mod.description && <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2 wrap-break-word">{mod.description}</p>}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: total > 0 ? `${(completed / total) * 100}%` : "0%" }}
              />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              {completed}/{total} &bull; {formatDuration(totalDuration)}
            </span>
          </div>
        </div>
        <div className="text-slate-400 shrink-0 pt-0.5">
          <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {mod.videos.map((video, i) => (
              <PlaylistRow
                key={video.id}
                video={video}
                index={i + 1}
                isSelected={video.id === activeVideoId}
                onSelect={() => onSelectVideo(video.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseVideoLearningPage({ params }: PageProps) {
  const { slug: courseId } = use(params);
  // Keying on courseId forces a full remount when navigating between courses,
  // so `loading`/`activeVideoId` etc. reset to their initial values naturally
  // instead of needing a manual setState(true) reset at the top of an effect.
  return <CourseLearningView key={courseId} courseId={courseId} />;
}

function CourseLearningView({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<EnrolledCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [marking, setMarking] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobilePlaylistOpen, setMobilePlaylistOpen] = useState(false);

  const refreshCourse = useCallback(async () => {
    try {
      const data = await getEnrolledCourse(courseId);
      setCourse(data);
      setOpenModules((prev) => {
        const next = { ...prev };
        data.modules.forEach((m) => {
          if (!(m.id in next)) next[m.id] = true;
        });
        return next;
      });
      return data;
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Could not load this course.");
      return null;
    }
  }, [courseId]);

  useEffect(() => {
    let ignore = false;
    getEnrolledCourse(courseId)
      .then((data) => {
        if (ignore) return;
        setCourse(data);
        setOpenModules((prev) => {
          const next = { ...prev };
          data.modules.forEach((m) => {
            if (!(m.id in next)) next[m.id] = true;
          });
          return next;
        });
        setActiveVideoId(data.continueVideoId ?? data.modules[0]?.videos[0]?.id ?? null);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        setLoadError(err instanceof ApiError ? err.message : "Could not load this course.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="h-16 bg-white border-b border-slate-200" />
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="hidden lg:block w-80 xl:w-88 bg-white border-r border-slate-200 shrink-0" />
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="aspect-video w-full rounded-2xl bg-slate-200 animate-pulse" />
              <div className="h-24 rounded-2xl bg-slate-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-sm text-slate-600">{loadError || "Course not found."}</p>
        <Link href="/dashboard" className="text-brand-navy font-semibold hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const allItems: { video: EnrolledVideo; module: EnrolledModule }[] = course.modules.flatMap((mod) =>
    mod.videos.map((video) => ({ video, module: mod })),
  );
  const completedCount = allItems.filter((item) => item.video.isCompleted).length;
  const currentIndex = allItems.findIndex((item) => item.video.id === activeVideoId);
  const currentItem = currentIndex >= 0 ? allItems[currentIndex] : allItems[0];
  const activeVideo = currentItem?.video;
  const activeModule = currentItem?.module;

  const toggleModuleAccordion = (moduleId: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSelectVideo = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const handleNext = () => {
    if (currentIndex < allItems.length - 1) setActiveVideoId(allItems[currentIndex + 1].video.id);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setActiveVideoId(allItems[currentIndex - 1].video.id);
  };

  const handleMarkCompleted = async () => {
    if (!activeVideo || marking) return;
    setMarking(true);
    try {
      await updateVideoProgress(activeVideo.id, {
        watchedSeconds: activeVideo.durationSeconds ?? 0,
        completed: true,
      });
      await refreshCourse();
    } finally {
      setMarking(false);
    }
  };

  const handleMarkAndNext = async () => {
    if (activeVideo && !activeVideo.isCompleted) {
      await handleMarkCompleted();
    }
    handleNext();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      <style>{`@keyframes nowplaying { 0%, 100% { height: 30%; } 50% { height: 100%; } }`}</style>

      {/* TOP HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 p-1.5 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          >
            <HiOutlineArrowLeft className="text-base" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-40 sm:max-w-md lg:max-w-xl">{course.name}</h1>
            <p className="text-[11px] text-slate-500 truncate hidden md:block">
              {activeModule?.title} &bull; {activeVideo?.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 bg-slate-50 border border-slate-200 px-2.5 sm:px-3 py-1.5 rounded-full text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Progress:</span>
            <div className="w-12 sm:w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-brand-gold to-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${course.progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-slate-900">{course.progressPercent}%</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* LEFT SIDEBAR — DESKTOP PLAYLIST */}
        <aside
          className={`bg-white border-r border-slate-200 flex-col shrink-0 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-0 overflow-hidden border-r-0" : "w-80 xl:w-88"
          }`}
        >
          <div className="p-4 border-b border-slate-100 min-w-80">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Course Content</h2>
              <span className="text-[11px] font-bold text-slate-500">
                {completedCount}/{allItems.length} done
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-gold to-amber-400"
                style={{ width: `${course.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 min-w-80">
            {course.modules.map((mod) => (
              <ModulePanel
                key={mod.id}
                mod={mod}
                isOpen={openModules[mod.id] ?? true}
                onToggleModule={() => toggleModuleAccordion(mod.id)}
                activeVideoId={activeVideoId}
                onSelectVideo={handleSelectVideo}
              />
            ))}
          </div>
        </aside>

        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-white border border-slate-300 rounded-full shadow-lg items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all duration-300 cursor-pointer hover:scale-110 ${
            isSidebarCollapsed ? "left-4" : "left-76 xl:left-84"
          }`}
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <HiOutlineChevronRight className="w-4 h-4 text-slate-800" /> : <HiOutlineChevronLeft className="w-4 h-4 text-slate-800" />}
        </button>

        {/* MAIN VIDEO PLAYER */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
          <div className={`mx-auto space-y-4 sm:space-y-6 transition-all duration-300 ${isSidebarCollapsed ? "max-w-6xl" : "max-w-4xl"}`}>
            <div
              className="bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-lg relative aspect-video w-full select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              {activeVideoId && <VideoPlayer key={activeVideoId} videoId={activeVideoId} />}
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
              <div className="px-4 py-3 sm:px-5 sm:py-3.5">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide truncate min-w-0">
                    {activeModule?.title} &bull; Lesson {currentIndex + 1} of {allItems.length}
                  </span>
                  {activeVideo?.isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 shrink-0">
                      <FiCheck className="w-3 h-3 stroke-3" />
                      Completed
                    </span>
                  )}
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1 leading-snug wrap-break-word">{activeVideo?.title}</h2>
                {activeVideo?.description && (
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1.5 max-w-2xl wrap-break-word">{activeVideo.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                  aria-label="Previous lesson"
                >
                  <HiOutlineChevronLeft className="text-sm" />
                </button>

                <button
                  type="button"
                  onClick={handleMarkCompleted}
                  disabled={marking || activeVideo?.isCompleted}
                  className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed ${
                    activeVideo?.isCompleted
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-60"
                  }`}
                >
                  <FiCheck className="text-sm" />
                  <span>{activeVideo?.isCompleted ? "Completed" : marking ? "Saving..." : "Mark as complete"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkAndNext}
                  disabled={currentIndex >= allItems.length - 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <span>Next</span>
                  <HiOutlineChevronRight className="text-sm" />
                </button>
              </div>
            </div>

            {/* INLINE PLAYLIST — MOBILE/TABLET (YouTube-style, below the video) */}
            <div className="lg:hidden bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setMobilePlaylistOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Course Content</h3>
                    <span className="text-[11px] font-bold text-slate-500 shrink-0">
                      {completedCount}/{allItems.length} done
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-brand-gold to-amber-400"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>
                <HiOutlineChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ease-in-out ${
                    mobilePlaylistOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  mobilePlaylistOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {course.modules.map((mod) => (
                      <ModulePanel
                        key={mod.id}
                        mod={mod}
                        isOpen={openModules[mod.id] ?? true}
                        onToggleModule={() => toggleModuleAccordion(mod.id)}
                        activeVideoId={activeVideoId}
                        onSelectVideo={handleSelectVideo}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
