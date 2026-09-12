export interface CourseListItem {
  id: string;
  name: string;
  description: string | null;
  mentorName: string | null;
  language: string | null;
  price: number;
  actualPrice: number;
  primaryImageUrl: string | null;
  avgRating: number;
  reviewCount: number;
}

export interface CourseVideoPreview {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
  durationSeconds: number | null;
}

export interface CourseModulePreview {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
  videos: CourseVideoPreview[];
}

export interface CourseDetail {
  id: string;
  name: string;
  description: string | null;
  mentorName: string | null;
  language: string | null;
  features: string[];
  price: number;
  actualPrice: number;
  primaryImageUrl: string | null;
  mentorImageUrl: string | null;
  avgRating: number;
  reviewCount: number;
  modules: CourseModulePreview[];
}

export interface CourseReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { name: string | null };
}

export type CourseSort = "newest" | "price_asc" | "price_desc";
export type CourseLanguage = "english" | "malayalam";

export interface CourseListParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: CourseLanguage;
  minPrice?: number;
  maxPrice?: number;
  sort?: CourseSort;
}
