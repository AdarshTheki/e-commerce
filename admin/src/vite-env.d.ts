/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface PromiseResponseType<T = any> {
  message: string;
  data?: T;
  statusCode?: number;
  status?: boolean;
  success?: boolean;
}

interface PaginationType {
  docs: [any];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPrevPage: boolean;
  prevPage: number | null;
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "customer" | "admin" | "user";
  status: "active" | "inactive" | "pending";
  favorite: [string];
  avatar: string;
  refreshToke: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phoneNumber?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AddressType {
  _id: string;
  owner: string;
  status: "active" | "inactive" | "pending";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface ProductType {
  _id: string;
  status: "active" | "inactive" | "pending";
  title: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: [string];
  createdAt: Date;
  updatedAt: Date;
}

interface BrandType {
  _id: string;
  status: "active" | "inactive" | "pending";
  title: string;
  sequence?: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  top_brand?: "YES" | "NO";
}

interface CategoryType {
  _id: string;
  status: "active" | "inactive" | "pending";
  title: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface VariantType {
  _id: string;
  status: "active" | "inactive" | "pending";
  size?: string;
  color?: string;
  quantity: number;
  images?: [string];
  original_price?: number;
  discount_price?: number;
  createdAt: string;
  updatedAt: string;
}
