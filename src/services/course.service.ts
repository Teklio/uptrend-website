import { api } from "@/lib/api";
import { Paginated } from "@/types/common.type";
import { CourseDetail, CourseListItem, CourseListParams, CourseReview } from "@/types/course.type";

const toQuery = <T extends object>(params: T) => {
  const search = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== "") search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

export const listCourses = (params: CourseListParams = {}) =>
  api.get<Paginated<CourseListItem>>(`/courses${toQuery(params)}`);

export const getCourse = (courseId: string) => api.get<CourseDetail>(`/courses/${courseId}`);

export const listCourseReviews = (
  courseId: string,
  params: { page?: number; limit?: number; rating?: number; sort?: "newest" | "highest" | "lowest" } = {},
) => api.get<Paginated<CourseReview>>(`/courses/${courseId}/reviews${toQuery(params)}`);

export const postCourseReview = (courseId: string, data: { rating: number; comment?: string }) =>
  api.post<CourseReview>(`/courses/${courseId}/reviews`, data);
