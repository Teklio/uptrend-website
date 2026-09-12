import { z } from "zod";
import { nameSchema, phoneSchema, stateSchema } from "./common.schema";

// Server's updateUserProfileSchema treats all three as optional (it's a
// generic partial-update endpoint) — this form always submits all three
// together, so they're required here for a better inline-validation UX.
export const profileUpdateSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  state: stateSchema,
});
export type ProfileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;
