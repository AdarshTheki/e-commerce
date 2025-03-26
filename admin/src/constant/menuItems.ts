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
  Router,
} from "lucide-react";

const menuItems = [
  { id: 1, title: "Dashboard", path: "/", icon: HousePlug },
  { id: 2, title: "Analytics", path: "/analytic", icon: ChartBar },
  { id: 3, title: "Inventory", path: "/inventory", icon: BookText },
  { id: 4, title: "Sessions", path: "/sessions", icon: Router },
  { id: 5, title: "Brands", path: "/brand", icon: Gift },
  { id: 6, title: "Products", path: "/product", icon: Box },
  { id: 7, title: "Categories", path: "/category", icon: Cat },
  { id: 8, title: "Customers", path: "/customer", icon: Users },
  { id: 9, title: "Orders", path: "/order", icon: ShoppingBag },
  { id: 10, title: "Settings", path: "/setting", icon: Settings },
];

export default menuItems;
