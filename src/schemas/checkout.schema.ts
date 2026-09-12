import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema, phoneSchema, stateSchema } from "./common.schema";

// Mirrors server/src/schemas/payment.schema.ts's checkoutSchema — logged-in
// checkout only ever needs name/phone/state (email/password come from the
// session already).
export const checkoutLoggedInSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  state: stateSchema,
});
export type CheckoutLoggedInSchemaType = z.infer<typeof checkoutLoggedInSchema>;

// Mirrors guestCheckoutSchema — purchasing and creating the account happen
// in the same step, so every field is required.
export const checkoutGuestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phone: phoneSchema,
  state: stateSchema,
});
export type CheckoutGuestSchemaType = z.infer<typeof checkoutGuestSchema>;

// The enrollment page is guest-only (logged-in users are redirected away
// from it) and additionally lets the visitor pick which course to buy.
export const enrollmentSchema = checkoutGuestSchema.extend({
  courseId: z.string().min(1, "Please select a course"),
});
export type EnrollmentSchemaType = z.infer<typeof enrollmentSchema>;

// CheckoutFlow (the drawer opened from a course detail page) serves both
// logged-in and guest visitors from the same form, so it needs one stable
// field shape whose validation strictness flips at runtime — a single
// zod object shape (kept, so useForm's generic type never changes) with
// email/password only enforced via superRefine when isGuest is true.
export const buildCheckoutFormSchema = (isGuest: boolean) =>
  z
    .object({
      name: nameSchema,
      phone: phoneSchema,
      state: stateSchema,
      email: z.string(),
      password: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!isGuest) return;
      const emailResult = emailSchema.safeParse(data.email);
      if (!emailResult.success) {
        ctx.addIssue({
          code: "custom",
          path: ["email"],
          message: emailResult.error.issues[0]?.message ?? "Invalid email address",
        });
      }
      const passwordResult = passwordSchema.safeParse(data.password);
      if (!passwordResult.success) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: passwordResult.error.issues[0]?.message ?? "Invalid password",
        });
      }
    });
export type CheckoutFormSchemaType = z.infer<ReturnType<typeof buildCheckoutFormSchema>>;
