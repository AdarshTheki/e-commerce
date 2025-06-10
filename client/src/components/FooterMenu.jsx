import { Heart, Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const FooterMenu = () => {
  return (
    <footer className="sm:hidden sticky bottom-0 left-0 w-full p-3 bg-slate-50">
      <div className="flex items-center justify-between text-xs font-medium">
        <NavLink to={"/"} className="flex items-center justify-center flex-col">
          <Home /> Home
        </NavLink>
        <NavLink
          to={"/product"}
          className="flex items-center justify-center flex-col">
          <ShoppingBag /> Product
        </NavLink>
        <NavLink
          to={"/favorite"}
          className="flex items-center justify-center flex-col">
          <Heart /> Wishlist
        </NavLink>
        <NavLink
          to={"/cart"}
          className="flex items-center justify-center flex-col">
          <ShoppingCart /> Cart
        </NavLink>
        <NavLink
          to={"/setting"}
          className="flex items-center justify-center flex-col">
          <User /> Account
        </NavLink>
      </div>
    </footer>
  );
};

export default FooterMenu;
