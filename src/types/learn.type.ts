export interface EnrolledCourse {
  id: string;
  name: string;
  mentorName: string | null;
  primaryImageUrl: string | null;
  purchasedAt: string;
  expiresAt: string | null;
  progressPercent: number;
  isCourseComplete: boolean;
}

export interface EnrolledVideo {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
  durationSeconds: number | null;
  thumbnailUrl: string | null;
  watchedSeconds: number;
  isCompleted: boolean;
}

export interface EnrolledModule {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
  videos: EnrolledVideo[];
}

export interface EnrolledCourseDetail {
  id: string;
  name: string;
  description: string | null;
  mentorName: string | null;
  language: string | null;
  primaryImageUrl: string | null;
  mentorImageUrl: string | null;
  expiresAt: string | null;
  progressPercent: number;
  continueVideoId: string | null;
  resumeSeconds: number;
  modules: EnrolledModule[];
}

export interface VideoPlayback {
  videoId: string;
  title: string;
  embedUrl: string;
  expiresAt: string;
}

export interface VideoProgressRow {
  id: string;
  userId: string;
  videoId: string;
  watchedSeconds: number;
  isCompleted: boolean;
  lastWatchedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateResponse {
  certificateUrl: string;
}
