import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full bg-slate-50 py-1 z-20 px-4">
      <div className="flex justify-between w-full max-w-6xl mx-auto relative">
        {/* Logo */}
        <NavLink to="/">
          <img src="/logo.png" alt="logo" width={140} />
        </NavLink>

        <div className="flex items-center gap-5">
          {/* Main Header*/}
          <NavLink to={"/"} className="max-sm:hidden">
            Home
          </NavLink>
          <NavLink to={"/product"} className="max-sm:hidden">
            Product
          </NavLink>

          {/* Right Actions*/}
          <HeaderSearch />
          <HeaderUserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
