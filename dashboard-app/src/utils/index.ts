import {
  Box,
  ShoppingBag,
  BookText,
  Users,
  Settings,
  ChartBar,
  HousePlug,
  Cat,
  Gift,
} from 'lucide-react';

import Loading from './Loading';
import SpinnerBtn from './SpinnerBtn';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import DropdownMenu from './Dropdown';
import Breadcrumb from './Breadcrumb';
import PaginationBtn from './PaginationBtn';

export { Loading, PaginationBtn, Breadcrumb, DropdownMenu, SpinnerBtn, Input, Select, Textarea };

export const menuItems = [
  { id: 1, title: 'Dashboard', path: '/', icon: HousePlug },
  { id: 2, title: 'Products', path: '/product', icon: Box },
  { id: 8, title: 'Categories', path: '/category', icon: Cat },
  { id: 9, title: 'Brands', path: '/brand', icon: Gift },
  { id: 3, title: 'Orders', path: '/order', icon: ShoppingBag },
  { id: 4, title: 'Customers', path: '/customer', icon: Users },
  { id: 5, title: 'Inventory', path: '/inventory', icon: BookText },
  { id: 6, title: 'Analytics', path: '/analytic', icon: ChartBar },
  { id: 7, title: 'Settings', path: '/setting', icon: Settings },
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
