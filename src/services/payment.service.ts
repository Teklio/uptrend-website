import { api } from "@/lib/api";
import { Paginated } from "@/types/common.type";
import { CheckoutResponse, Payment, PaymentStatus, VerifyPaymentResponse } from "@/types/payment.type";

export const checkout = (data: { courseId: string; name?: string; phone?: string; state?: string }) =>
  api.post<CheckoutResponse>("/payments/checkout", data);

export const checkoutGuest = (data: {
  courseId: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  state: string;
}) => api.post<CheckoutResponse>("/payments/checkout/guest", data);

export const verifyPayment = (data: {
  paymentId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => api.post<VerifyPaymentResponse>("/payments/verify", data);

export const listMyPayments = (params: { page?: number; limit?: number; status?: PaymentStatus } = {}) => {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.status) search.set("status", params.status);
  const qs = search.toString();
  return api.get<Paginated<Payment>>(`/payments/me${qs ? `?${qs}` : ""}`);
};

export const getMyPayment = (paymentId: string) => api.get<Payment>(`/payments/me/${paymentId}`);
