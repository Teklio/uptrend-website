import { z } from "zod";

// Mirrors server/src/schemas/common.schema.ts exactly — same rules, same
// messages — so a value that passes here is guaranteed to also pass the
// server's own validation, and the user never sees a client-accepted value
// get rejected server-side with no client-side warning first.

export const passwordSchema = z
  .string()
  .min(6, "Must be at least 6 characters")
  .max(12, "Must be at most 12 characters")
  .regex(/[A-Za-z]/, "Must include a letter")
  .regex(/\d/, "Must include a number")
  .regex(/[^A-Za-z0-9]/, "Must include a special character");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Invalid phone number");

export const emailSchema = z.email("Invalid email address");

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters")
  .refine((value) => !/^[^a-zA-Z0-9\s]+$/.test(value), {
    message: "Name cannot contain only special characters.",
  });

export const stateSchema = z.string().trim().min(1, "Please select a state").max(100);
