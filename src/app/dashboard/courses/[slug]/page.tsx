"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { COURSES_DATA } from "@/data/courses";
import { COURSE_CURRICULA, Lesson, Module } from "@/data/curriculum";
import { useAuth } from "@/context/AuthContext";
import {
  HiOutlineArrowLeft,
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineArrowsExpand,
  HiOutlineBookOpen,
  HiOutlineMenu,
  HiX,
} from "react-icons/hi";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { FiCheck } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseVideoLearningPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const {
    user,
    completedLessons,
    toggleLessonCompleted,
    isLessonCompleted,
    setLastWatched,
    getCourseProgress,
  } = useAuth();

  const course = COURSES_DATA.find((c) => c.slug === resolvedParams.slug);
  const curriculum = COURSE_CURRICULA[resolvedParams.slug] || COURSE_CURRICULA["swing-trading-master-course"];

  // Flattened lessons list for easy traversal
  const allLessons: { lesson: Lesson; module: Module }[] = [];
  if (curriculum) {
    curriculum.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        allLessons.push({ lesson: les, module: mod });
      });
    });
  }

  // Active Lesson State
  const [activeLessonId, setActiveLessonId] = useState<string>(
    allLessons[0]?.lesson.id || "sw-intro-1"
  );

  // Accordion open/close state for module subheadings
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    "mod-intro": true,
    "mod-week-1": true,
    "mod-week-2": true,
    "mod-week-3": true,
    "mod-week-4": true,
  });

  // Video player controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(30);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const currentItem = allLessons.find((item) => item.lesson.id === activeLessonId) || allLessons[0];
  const activeLesson = currentItem?.lesson;
  const currentModule = currentItem?.module;
  const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLessonId);

  useEffect(() => {
    if (activeLessonId && resolvedParams.slug) {
      setLastWatched(resolvedParams.slug, activeLessonId);
    }
  }, [activeLessonId, resolvedParams.slug]);

  if (!course || !curriculum) {
    return notFound();
  }

  const courseOverallProgress = getCourseProgress(course.slug);

  const toggleModuleAccordion = (moduleId: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setIsPlaying(true);
    setProgressPercent(0);
    setSidebarOpen(false);
  };

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].lesson.id);
      setIsPlaying(true);
      setProgressPercent(0);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setActiveLessonId(allLessons[currentIndex - 1].lesson.id);
      setIsPlaying(true);
      setProgressPercent(0);
    }
  };

  const handleMarkAndNext = () => {
    if (activeLesson) {
      if (!isLessonCompleted(activeLesson.id)) {
        toggleLessonCompleted(activeLesson.id);
      }
      handleNextLesson();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ============================================================ */}
      {/* 1. TOP HEADER WITH BACK TO DASHBOARD & PROGRESS */}
      {/* ============================================================ */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 p-1.5 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          >
            <HiOutlineArrowLeft className="text-base" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md lg:max-w-xl">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-500 truncate hidden md:block">
              {currentModule?.subheading} &bull; {activeLesson?.title}
            </p>
          </div>
        </div>

        {/* Progress Bar & Mobile Drawer Button */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs">
            <span className="text-slate-500 font-medium">Progress:</span>
            <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(5, courseOverallProgress.percentage)}%` }}
              />
            </div>
            <span className="font-bold text-slate-900">
              {courseOverallProgress.percentage}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
          >
            <HiOutlineMenu className="text-base" />
            <span>Curriculum</span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN LEARNING SPLIT VIEW */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* ======================================================== */}
        {/* A. LEFT SIDEBAR: SUBHEADINGS & LESSON LIST */}
        {/* ======================================================== */}
        <aside
          className={`bg-white border-r border-slate-200 flex flex-col shrink-0 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex relative transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-0 overflow-hidden border-r-0" : "w-80 xl:w-88"
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between min-w-[320px]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <HiOutlineBookOpen className="text-base text-slate-700" />
              <span>Course Curriculum</span>
            </h2>
            <span className="text-[11px] font-bold text-slate-700">
              {completedLessons.length} / {allLessons.length} Done
            </span>
          </div>

          {/* Modules with Subheadings */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 min-w-[320px]">
            {curriculum.modules.map((mod) => {
              const isOpen = openModules[mod.id] ?? true;
              const moduleLessons = mod.lessons;

              return (
                <div key={mod.id} className="bg-white">
                  {/* Subheading header */}
                  <button
                    type="button"
                    onClick={() => toggleModuleAccordion(mod.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                        {mod.subheading}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {mod.title}
                      </h3>
                    </div>

                    <div className="text-slate-400">
                      {isOpen ? (
                        <HiOutlineChevronUp className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Lessons List with Active Bar */}
                  {isOpen && (
                    <div className="bg-slate-50/60 divide-y divide-slate-100/80">
                      {moduleLessons.map((les) => {
                        const isSelected = les.id === activeLessonId;
                        const isDone = isLessonCompleted(les.id);

                        return (
                          <div
                            key={les.id}
                            className={`flex items-center justify-between px-4 py-3 transition-all relative ${
                              isSelected
                                ? "bg-white border-l-4 border-slate-900 text-slate-950 font-bold shadow-sm"
                                : "border-l-4 border-transparent text-slate-600 hover:bg-white hover:text-slate-900"
                            }`}
                          >
                            {/* Active Watch Bar Indicator */}
                            {isSelected && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
                            )}

                            <button
                              type="button"
                              onClick={() => handleSelectLesson(les.id)}
                              className="flex-1 flex items-start gap-2.5 text-left min-w-0 cursor-pointer"
                            >
                              <div className="pt-0.5 shrink-0">
                                {isSelected ? (
                                  <HiOutlinePlay className="text-slate-900 text-base" />
                                ) : isDone ? (
                                  <HiOutlineCheckCircle className="text-emerald-600 text-base" />
                                ) : (
                                  <HiOutlinePlay className="text-slate-400 text-sm" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs leading-snug line-clamp-2">
                                  {les.title}
                                </p>
                                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                                  {les.duration}
                                </span>
                              </div>
                            </button>

                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonCompleted(les.id);
                              }}
                              title={isDone ? "Completed (Click to uncheck)" : "Mark as completed"}
                              className={`p-1.5 rounded-md ml-2 cursor-pointer ${
                                isDone
                                  ? "text-emerald-600 bg-emerald-50"
                                  : "text-slate-300 hover:text-slate-600"
                              }`}
                            >
                              {isDone ? (
                                <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded border border-slate-300" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Floating Center Open / Close Toggle Button on Sidebar Border */}
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-white border border-slate-300 rounded-full shadow-lg items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all duration-300 cursor-pointer hover:scale-110 ${
            isSidebarCollapsed ? "left-4" : "left-[304px] xl:left-[336px]"
          }`}
          title={isSidebarCollapsed ? "Open Curriculum Sidebar" : "Close Sidebar (Full Screen Video)"}
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? (
            <HiOutlineChevronRight className="w-4 h-4 text-slate-800" />
          ) : (
            <HiOutlineChevronLeft className="w-4 h-4 text-slate-800" />
          )}
        </button>

        {/* Mobile Slide-Over Curriculum */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 bg-white h-full flex flex-col shadow-xl z-10">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Curriculum Modules
                </h2>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-900"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {curriculum.modules.map((mod) => (
                  <div key={mod.id} className="p-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {mod.subheading}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mb-2">
                      {mod.title}
                    </h3>
                    <div className="space-y-1">
                      {mod.lessons.map((les) => (
                        <button
                          key={les.id}
                          type="button"
                          onClick={() => handleSelectLesson(les.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs ${
                            les.id === activeLessonId
                              ? "bg-slate-900 text-white font-bold"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className="truncate pr-2">{les.title}</span>
                          <span className="font-mono text-[10px] shrink-0 opacity-75">
                            {les.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* B. MAIN VIDEO PLAYER & CONTENT */}
        {/* ======================================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className={`mx-auto space-y-6 transition-all duration-300 ${isSidebarCollapsed ? "max-w-6xl" : "max-w-4xl"}`}>
            {/* 1. VIDEO PLAYER CONTAINER */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative aspect-video w-full flex items-center justify-center group">
              {/* Simulated Video Screen */}
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-105 transition-transform shadow-xl cursor-pointer"
                >
                  <HiOutlinePlay className="w-8 h-8 ml-1 text-slate-950" />
                </button>

                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {currentModule?.subheading}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white max-w-md">
                    {activeLesson?.title}
                  </h2>
                </div>
              </div>

              {/* Player Overlay Controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 space-y-2.5 z-10">
                {/* Scrub bar */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      setProgressPercent(Math.round((clickX / rect.width) * 100));
                    }}
                    className="flex-1 bg-white/20 hover:bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  >
                    <div
                      className="bg-white h-full rounded-full transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white font-medium shrink-0">
                    {activeLesson?.duration}
                  </span>
                </div>

                {/* Player actions */}
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 text-white hover:text-slate-200"
                    >
                      <HiOutlinePlay className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handlePrevLesson}
                      disabled={currentIndex === 0}
                      className="text-white hover:text-slate-200 disabled:opacity-30"
                    >
                      <HiOutlineChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextLesson}
                      disabled={currentIndex === allLessons.length - 1}
                      className="text-white hover:text-slate-200 disabled:opacity-30"
                    >
                      <HiOutlineChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-slate-200"
                    >
                      {isMuted ? (
                        <HiOutlineSpeakerXMark className="w-5 h-5 text-red-400" />
                      ) : (
                        <HiOutlineSpeakerWave className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="bg-black/80 border border-white/20 text-[11px] text-white rounded px-1.5 py-0.5"
                    >
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const elem = document.documentElement;
                        if (!document.fullscreenElement) {
                          elem.requestFullscreen?.().catch(() => {});
                        } else {
                          document.exitFullscreen?.().catch(() => {});
                        }
                      }}
                      className="text-white hover:text-slate-200"
                    >
                      <HiOutlineArrowsExpand className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. LESSON ACTION BAR */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">
                  {currentModule?.subheading} &bull; Lesson {currentIndex + 1} of {allLessons.length}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {activeLesson?.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => activeLesson && toggleLessonCompleted(activeLesson.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                    activeLesson && isLessonCompleted(activeLesson.id)
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  <HiOutlineCheckCircle className="text-base" />
                  <span>
                    {activeLesson && isLessonCompleted(activeLesson.id)
                      ? "Completed"
                      : "Mark Completed"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkAndNext}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Next Video</span>
                  <HiOutlineChevronRight className="text-base" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
