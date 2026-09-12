import { z } from "zod";

// Mirrors server/src/schemas/courseReview.schema.ts's createCourseReviewSchema.
export const courseReviewSchema = z.object({
  rating: z.number().int().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  comment: z.string().trim().max(1000, "Comment must be under 1000 characters").optional(),
});
export type CourseReviewSchemaType = z.infer<typeof courseReviewSchema>;
