import { Box, ShoppingBag, Users, HousePlug, Cat, Gift } from "lucide-react";

const menuItems = [
  { id: 1, title: "Dashboard", path: "/", icon: HousePlug },
  { id: 5, title: "Brands", path: "/brand", icon: Gift },
  { id: 6, title: "Products", path: "/product", icon: Box },
  { id: 7, title: "Categories", path: "/category", icon: Cat },
  { id: 8, title: "Customers", path: "/customer", icon: Users },
  { id: 9, title: "Orders", path: "/order", icon: ShoppingBag },
];

export default menuItems;
