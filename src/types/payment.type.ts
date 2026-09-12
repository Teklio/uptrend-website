export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface Payment {
  id: string;
  amount: number;
  extraFee: number;
  totalAmount: number;
  status: PaymentStatus;
  paymentMode: string | null;
  expiresAt: string | null;
  createdAt: string;
  course: {
    id: string;
    name: string;
    primaryImageUrl: string | null;
  };
}

export interface CheckoutResponse {
  paymentId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
  course: {
    id: string;
    name: string;
    price: number;
    extraFee: number;
    totalAmount: number;
  };
}

export interface VerifyPaymentResponse {
  status: PaymentStatus;
}
