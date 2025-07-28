/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

enum OrderStatus {
  pending = 'pending',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

enum UserRole {
  customer = 'customer',
  admin = 'admin',
  seller = 'seller',
}

enum ProductStatus {
  active = 'active',
  inactive = 'inactive',
  outOfStock = 'out-of-stock',
  pending = 'pending',
}

enum ActiveOrInActive {
  active = 'active',
  inactive = 'inactive',
}

interface PromiseResponseType<T = any> {
  message: string;
  data?: T;
  statusCode?: number;
  status?: boolean;
  success?: boolean;
}

interface PaginationType<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface UserType {
  fullName: string;
  email: string;
  _id?: string;
  password?: string;
  role: UserRole;
  status: ActiveOrInActive;
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
  status: ActiveOrInActive;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface ProductType {
  _id: string;
  status: ProductStatus;
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
  status: ActiveOrInActive;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType | string;
}

interface CategoryType {
  _id: string;
  status: ActiveOrInActive;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType | string;
}

interface OrderType {
  _id: string;
  customer: string;
  shipping_address: {
    name: string;
    email: string;
    line1: string;
    line2: string;
    city: string;
    country: string;
    postal_code: string;
    state: string;
  };
  status: OrderStatus;
  items: {
    productId: string;
    quantity: number;
    product: ProductType;
  }[];
  payment: {
    id: string;
    status: string;
    method: string;
  };
  createdAt: string;
  updatedAt: string;
}
