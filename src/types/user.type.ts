export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  state: string | null;
  isActive: boolean;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
