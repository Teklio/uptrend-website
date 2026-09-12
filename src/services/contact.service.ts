import { api } from "@/lib/api";

export const submitContact = (data: { fullName: string; email: string; subject: string; message: string }) =>
  api.post<void>("/contact", data);
