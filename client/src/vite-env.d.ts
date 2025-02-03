/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface FetchResponseProp {
  message: string;
  status: boolean;
  [key?: string]: any;
}

interface PaginationProp {
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
  username: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'user';
  favorite: [string];
  avatar: string;
  refreshToke: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phoneNumber?: number;
}

interface AddressType {
  owner: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface PromiseResponseType {
  data?: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface ProductType {
  _id: string;
  status: 'active' | 'inactive';
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
  status: 'ACTIVE' | 'INACTIVE';
  top_brand?: 'YES' | 'NO';
  title: string;
  sequence?: number;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryType {
  _id: string;
  status: 'ACTIVE' | 'INACTIVE';
  title: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface VariantType {
  _id: string;
  status: 'ACTIVE' | 'INACTIVE';
  size?: string;
  color?: string;
  quantity?: number;
  images?: [string];
  original_price?: number;
  discount_price?: number;
  createdAt?: string;
  updatedAt?: string;
}
