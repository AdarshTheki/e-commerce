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

interface PaginationTypeWithDocs<T> {
  items: T[];
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  totalItems: number;
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "customer" | "admin" | "user";
  status: "active" | "inactive" | "pending";
  favorite: [string];
  refreshToke: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
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
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryType {
  _id: string;
  status: "active" | "inactive" | "pending";
  title: string;
  description: string;
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
