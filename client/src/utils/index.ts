import { Box, ShoppingBag, BookText, Users, Settings, ChartBar, HousePlug } from 'lucide-react';

import Loading from './Loading';
import SpinnerBtn from './SpinnerBtn';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Dropdown from './Dropdown';

export { Loading, SpinnerBtn, Input, Select, Textarea, Dropdown };

export const menuItems = [
  { id: 1, title: 'Dashboard', path: '/', icon: HousePlug },
  { id: 2, title: 'Products', path: '/products', icon: Box },
  { id: 2, title: 'Categories', path: '/categories', icon: Box },
  { id: 3, title: 'Orders', path: '/orders', icon: ShoppingBag },
  { id: 4, title: 'Customers', path: '/customers', icon: Users },
  { id: 5, title: 'Inventory', path: '/inventory', icon: BookText },
  { id: 6, title: 'Analytics', path: '/analytics', icon: ChartBar },
  { id: 7, title: 'Settings', path: '/settings', icon: Settings },
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short', // Nov
    day: '2-digit', // 28
    year: 'numeric', // 2023
  });
};

export const categories = [
  'beauty',
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
  'tops',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];
