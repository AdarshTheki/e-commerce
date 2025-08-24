import { toast } from 'react-toastify';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import {
  Users,
  LayoutDashboard,
  Tags,
  Boxes,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const countries = [
  { title: 'China', id: '+86' },
  { title: 'India', id: '+91' },
  { title: 'United States', id: '+1' },
  { title: 'Indonesia', id: '+62' },
  { title: 'Pakistan', id: '+92' },
  { title: 'Nigeria', id: '+234' },
  { title: 'Brazil', id: '+55' },
  { title: 'Bangladesh', id: '+880' },
  { title: 'Russia', id: '+7' },
  { title: 'Mexico', id: '+52' },
];

export const menuItems = [
  { id: 1, title: 'Dashboard', path: '/', icon: LayoutDashboard }, // Better than HousePlug
  { id: 5, title: 'Brands', path: '/brand', icon: Tags }, // Tags is a better fit for Brands
  { id: 6, title: 'Products', path: '/product', icon: Boxes }, // Boxes or Package work well
  { id: 7, title: 'Categories', path: '/category', icon: Package }, // Grouped package for categories
  { id: 8, title: 'Customers', path: '/customer', icon: Users },
  { id: 9, title: 'Orders', path: '/order', icon: ShoppingCart }, // ShoppingCart is more intuitive
];

export const errorHandler = (error: AxiosError) => {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response) {
      toast.error(
        `${axiosError.response.data.message || axiosError.response.statusText}`
      );
    } else if (axiosError.request) {
      toast.error('No response received from server');
    } else {
      toast.error(`Error: ${axiosError.message}`);
    }
  } else {
    toast.error('An unexpected error occurred.');
  }
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 50000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const productStatus = ['active', 'inactive', 'out-of-stock', 'pending'];

export const categories = [
  'beauty Nykaa',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories',
  'motorcycle',
  'skin-care',
  'smartphones',
  'sports-accessories',
  'sunglasses',
  'tablets',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];

export const brands = [
  'Amazon',
  'Annibale Colombo',
  'Apple',
  'Asus',
  'Attitude',
  'Bath Trends',
  'Beats',
  'Calvin Klein',
  'Casual Comfort',
  'Chanel',
  'Chic Cosmetics',
  'Chrysler',
  'Classic Wear',
  'Comfort Trends',
  'Dell',
  'Dior',
  'Dodge',
  'Dolce & Gabbana',
  'Elegance Collection',
  'Essence',
  'Fashion Co.',
  'Fashion Diva',
  'Fashion Express',
  'Fashion Fun',
  'Fashion Gold',
  'Fashion Shades',
  'Fashion Timepieces',
  'Fashion Trends',
  'Fashionista',
  'Furniture Co.',
  'GadgetMaster',
  'Generic Motors',
  'Gigabyte',
  'Glamour Beauty',
  'Gucci',
  'Heshe',
  'Huawei',
  'IWC',
  'Kawasaki',
  'Knoll',
  'Lenovo',
  'Longines',
  'MotoGP',
  'Nail Couture',
  'Nike',
  'Off White',
  'Olay',
  'Oppo',
  'Pampi',
  'Prada',
  'ProVision',
  'Puma',
  'Realme',
  'Rolex',
  'Samsung',
  'ScootMaster',
  'SnapTech',
  'SpeedMaster',
  'TechGear',
  'TempGear',
  'Urban Chic',
  'Vaseline',
  'Velvet Touch',
  'Vivo',
];
