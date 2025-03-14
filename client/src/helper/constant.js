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
} from "lucide-react";

export const menuItems = [
  { id: 1, title: "Dashboard", path: "/", icon: HousePlug },
  { id: 2, title: "Products", path: "/product", icon: Box },
  { id: 8, title: "Categories", path: "/category", icon: Cat },
  { id: 9, title: "Brands", path: "/brand", icon: Gift },
  { id: 3, title: "Orders", path: "/order", icon: ShoppingBag },
  { id: 4, title: "Customers", path: "/customer", icon: Users },
  { id: 5, title: "Inventory", path: "/inventory", icon: BookText },
  { id: 6, title: "Analytics", path: "/analytic", icon: ChartBar },
  { id: 7, title: "Settings", path: "/setting", icon: Settings },
];

export const baseUrl = "http://localhost:8000";

export const formatDate = (dateString = "") => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Nov
    day: "2-digit", // 28
    year: "numeric", // 2023
  });
};
