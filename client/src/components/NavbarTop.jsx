import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar } from "../utils";

const menuItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Product",
    path: "/product",
  },
  {
    id: 3,
    name: "Gallery",
    path: "/gallery",
  },
  {
    id: 4,
    name: "Message",
    path: "/message",
  },
  {
    id: 5,
    name: "AI Generate",
    path: "/ai",
  },
];

const NavbarTop = () => {
  const [mobileView, setMobileView] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      className="backdrop-blur-2xl shadow-md sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo  */}
          <h2
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-800 cursor-pointer">
            Cartify
          </h2>

          {/* Desktop Navigation  */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((link) => (
                <li
                  key={link.id}
                  onClick={() => navigate(link.path)}
                  className="text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors duration-300">
                  {link.name}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Icons  */}
          <div className="flex items-center space-x-5">
            {/* Search Icon  */}
            <button onClick={() => setSearchOpen(!searchOpen)}>
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {/* Cart Icon with Counter  */}
            <button
              onClick={() => navigate("/cart")}
              aria-label="Shopping Cart"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative">
              <ShoppingCart className="w-5 h-5" />
              {!!items?.length && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items?.length}
                </span>
              )}
            </button>

            {/* Wishlist Icon  */}
            <button
              onClick={() => navigate("/favorite")}
              aria-label="Wishlist"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 max-sm:hidden">
              <Heart className="w-5 h-5" />
            </button>

            {/* User Account Icon  */}
            <button
              onClick={() => navigate("/setting")}
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 max-sm:hidden">
              {user?._id ? (
                <Avatar
                  avatarUrl={user?.avatar}
                  name={user?.fullName}
                  className="!w-7 !h-7"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button  */}
            <button
              onClick={() => setMobileView(!mobileView)}
              id="mobile-menu-button"
              aria-label="Menu"
              className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors duration-300">
              {mobileView ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (Hidden by default)  */}
        <div
          id="mobile-menu"
          className={`md:hidden border-t border-gray-300 ${mobileView ? "block" : "hidden"}`}>
          <ul className="flex py-5 flex-col mx-auto w-64 gap-4">
            {menuItems.map((link) => (
              <li
                key={link.id}
                onClick={() => {
                  setMobileView(false);
                  navigate(link.path);
                }}
                className="cursor-pointer py-2 font-medium block rounded-2xl text-center duration-300 ease-in text-slate-600 hover:bg-indigo-600 hover:text-white">
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {!!searchOpen && (
          <div className="p-2 flex gap-2 items-center justify-center left-0 w-full">
            <div class="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[40px] rounded-full overflow-hidden max-w-md w-full">
              <Search className="w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
                class="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
              />
            </div>
            <button
              onClick={() => {
                navigate(`/product?title=${searchQuery}`);
                setSearchOpen(false);
              }}
              className="btn-primary h-[40px] text-sm !rounded-full">
              Search
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarTop;
