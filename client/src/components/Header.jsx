import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ChartBar,
  Heart,
  Home,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar } from "../utils";
import HeaderSearch from "./HeaderSearch";

const MenuItem = () => {
  const menuItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: <Home size={22} />,
    },
    {
      id: 2,
      name: "Product",
      path: "/product",
      icon: <ShoppingBag size={22} />,
    },
    {
      id: 5,
      name: "Gallery",
      path: "/gallery",
      icon: <Image size={22} />,
    },
    {
      id: 6,
      name: "Chat",
      path: "/chat",
      icon: <ChartBar size={22} />,
    },
  ];
  return (
    <ul className="flex md:space-x-8 max-md:space-y-8 max-md:flex-col">
      {menuItems.map((link) => (
        <li key={link.id}>
          <Link
            to={link.path}
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
            {link.name}
          </Link>
        </li>
      ))}
      <li>
        <a
          href={"/#categories"}
          className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
          Categories
        </a>
      </li>
      <li>
        <a
          href={"/#featured"}
          className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
          Featured
        </a>
      </li>
    </ul>
  );
};

const Header = () => {
  const [mobileView, setMobileView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);
  const { items } = useSelector((s) => s.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      id="header"
      className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo  */}
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-gray-800">
              Cartify
            </NavLink>
          </div>

          {/* Desktop Navigation  */}
          <nav className="hidden md:block">
            <MenuItem />
          </nav>

          {/* Right Side Icons  */}
          <div className="flex items-center space-x-4">
            {/* Search Icon  */}
            <HeaderSearch>
              <button
                aria-label="Search"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center justify-center">
                <Search size={20} />
              </button>
            </HeaderSearch>

            {/* User Account Icon  */}
            <button
              aria-label="My Account"
              onClick={() => navigate("/setting")}
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
              {user?._id ? (
                <Avatar
                  avatarUrl={user?.avatar}
                  name={user?.fullName}
                  className="!w-7 !h-7"
                />
              ) : (
                <User size={20} />
              )}
            </button>

            {/* Wishlist Icon  */}
            <button
              onClick={() => navigate("/favorite")}
              aria-label="Wishlist"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
              <Heart size={20} />
            </button>

            {/* Cart Icon with Counter  */}
            <button
              onClick={() => navigate("/cart")}
              aria-label="Shopping Cart"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative">
              <ShoppingBag size={20} />
              {items?.length && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items?.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button  */}
            <button
              onClick={() => setMobileView(!mobileView)}
              id="mobile-menu-button"
              aria-label="Menu"
              className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors duration-300">
              {mobileView ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (Hidden by default)  */}
        <div
          id="mobile-menu"
          className={`md:hidden pb-4 ${mobileView ? "block" : "hidden"}`}>
          <MenuItem />
        </div>
      </div>
    </header>
  );
};

export default Header;
