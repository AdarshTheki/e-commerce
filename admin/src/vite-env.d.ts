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
  fullName: string;
  email: string;
  password: string;
  role: "customer" | "admin" | "seller";
  status: "active" | "inactive";
  avatar: string;
  phoneNumber: string;
  favorite: [string];
  refreshToke: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface AddressType {
  _id: string;
  createdBy: UserType | string;
  status: "active" | "inactive";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface ProductType {
  _id: string;
  status: "active" | "inactive" | "out-of-stock" | "pending";
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
  createdBy: UserType | string;
  createdAt: Date;
  updatedAt: Date;
}

interface BrandType {
  _id: string;
  status: "active" | "inactive";
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType | string;
}

interface CategoryType {
  _id: string;
  status: "active" | "inactive";
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType | string;
}
