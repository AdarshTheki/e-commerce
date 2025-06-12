import { NavLink } from "react-router-dom";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderSearch from "./HeaderSearch";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";

const Header = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 left-0 w-full bg-slate-50 py-1 z-50 px-4">
      <div className="flex justify-between w-full max-w-6xl mx-auto relative">
        {/* Logo */}
        <NavLink to="/">
          <img
            src="https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545771/gallery/c7xok3k6msh7lizkis13.png"
            alt="logo"
            width={140}
          />
        </NavLink>

        <div className="flex items-center gap-5">
          {/* Main Header*/}
          <NavLink to={"/"} className="max-sm:hidden flex items-center gap-1">
            <Home size={22} />
            <span className="text-lg font-serif">Home</span>
          </NavLink>
          <NavLink
            to={"/product"}
            className="max-sm:hidden flex items-center gap-1">
            <ShoppingBag size={22} />
            <span className="text-lg font-serif">Product</span>
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
