import { api } from "@/lib/api";
import { User } from "@/types/user.type";

export const getMe = () => api.get<{ user: User }>("/user/auth/me");

export const login = (data: { email: string; password: string }) =>
  api.post<{ user: User }>("/user/auth/login", data);

export const register = (data: { email: string; password: string }) =>
  api.post<{ id: string; email: string }>("/user/auth/register", data);

export const logout = () => api.post<void>("/user/auth/logout");

export const verifyEmail = (token: string) =>
  api.get<{ user: User }>(`/user/auth/verify-email?token=${encodeURIComponent(token)}`);

export const resendVerification = (email: string) =>
  api.post<void>("/user/auth/resend-verification", { email });

export const forgotPassword = (email: string) => api.post<void>("/user/auth/forgot-password", { email });

export const validateResetToken = (token: string) =>
  api.get<{ email: string }>(`/user/auth/validate-reset-token?token=${encodeURIComponent(token)}`);

export const resetPassword = (data: { token: string; newPassword: string }) =>
  api.post<void>("/user/auth/reset-password", data);

export const updateProfile = (data: { name?: string; phone?: string; state?: string }) =>
  api.patch<{ user: User }>("/user/auth/update-profile", data);

export const changePassword = (data: { currentPassword: string; newPassword: string }) =>
  api.patch<void>("/user/auth/change-password", data);
