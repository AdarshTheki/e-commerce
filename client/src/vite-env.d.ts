/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface UserType {
  username: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'user';
  favorite: [string];
  avatar: string;
  refreshToke: string;
}

interface PromiseResponseType {
  data?: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface ProductType {
  _id: string;
  status: 'ACTIVE' | 'INACTIVE';
  title: string;
  original_price?: number;
  delivery_amount?: number;
  discount_price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  specification?: string;
  overview?: string;
  trending?: 'YES' | 'NO';
  category?: CategoryType;
  brand?: BrandType;
  lowest_variants?: [VariantType];
  variant?: VariantType;
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
