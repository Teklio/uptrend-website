import { api } from "@/lib/api";
import { Paginated } from "@/types/common.type";
import {
  CertificateResponse,
  EnrolledCourse,
  EnrolledCourseDetail,
  VideoPlayback,
  VideoProgressRow,
} from "@/types/learn.type";

export const listEnrolledCourses = (params: { page?: number; limit?: number; search?: string } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  const qs = search.toString();
  return api.get<Paginated<EnrolledCourse>>(`/learn/courses${qs ? `?${qs}` : ""}`);
};

export const getEnrolledCourse = (courseId: string) =>
  api.get<EnrolledCourseDetail>(`/learn/courses/${courseId}`);

export const getCertificate = (courseId: string) =>
  api.get<CertificateResponse>(`/learn/courses/${courseId}/certificate`);

export const getVideoPlayback = (videoId: string) => api.get<VideoPlayback>(`/learn/videos/${videoId}/play`);

export const updateVideoProgress = (videoId: string, data: { watchedSeconds: number; completed?: boolean }) =>
  api.patch<VideoProgressRow>(`/learn/videos/${videoId}/progress`, data);
