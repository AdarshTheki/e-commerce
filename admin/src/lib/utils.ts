import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Box, ShoppingBag, Users, HousePlug, Cat, Gift } from 'lucide-react';
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
  { id: 1, title: 'Dashboard', path: '/', icon: HousePlug },
  { id: 5, title: 'Brands', path: '/brand', icon: Gift },
  { id: 6, title: 'Products', path: '/product', icon: Box },
  { id: 7, title: 'Categories', path: '/category', icon: Cat },
  { id: 8, title: 'Customers', path: '/customer', icon: Users },
  { id: 9, title: 'Orders', path: '/order', icon: ShoppingBag },
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
