import { z } from "zod";
import { emailSchema, nameSchema, phoneSchema } from "./common.schema";

// Mirrors server/src/schemas/contact.schema.ts's name/email/message rules.
// The server schema also has a `subject` field, but this form doesn't
// collect one — the page builds it internally from name+phone instead.
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
