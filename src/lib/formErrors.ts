import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ApiError } from "./api";

// The server always sends a clean, generic top-level `message` (see
// server/src/helpers/errorHandler.ts) plus structured per-field errors in
// `errors`. When present, push those onto the matching form fields instead
// of only showing the generic message in one banner — returns true if any
// field errors were applied, so the caller can skip a redundant banner.
export function applyServerFieldErrors<T extends FieldValues>(form: UseFormReturn<T>, err: unknown): boolean {
  if (!(err instanceof ApiError) || !err.errors) return false;

  const entries = Object.entries(err.errors).filter(([field]) => field in form.getValues());
  if (entries.length === 0) return false;

  entries.forEach(([field, messages]) => {
    if (messages?.[0]) {
      form.setError(field as Path<T>, { message: messages[0] });
    }
  });
  return true;
}
