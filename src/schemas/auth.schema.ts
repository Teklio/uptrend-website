import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "./common.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    agreeTerms: z.boolean().refine((v) => v === true, {
      message: "You must agree to the Terms of Service and Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignupSchemaType = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormSchemaType = z.infer<typeof resetPasswordFormSchema>;

// No confirm field — mirrors server's changePasswordSchema exactly (just
// currentPassword + newPassword, both full-complexity).
export const changePasswordFormSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});
export type ChangePasswordFormSchemaType = z.infer<typeof changePasswordFormSchema>;

export const resendVerificationSchema = z.object({
  email: emailSchema,
});
export type ResendVerificationSchemaType = z.infer<typeof resendVerificationSchema>;
