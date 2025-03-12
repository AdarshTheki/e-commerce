import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  Phone,
  Mail,
  ShoppingCart,
  CakeSlice,
  Menu,
  MapPin,
  Store,
  Search,
} from "lucide-react";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header
      id="header"
      className="sticky top-0 left-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* <!-- Top Bar --> */}
        <div className="hidden lg:flex justify-between items-center py-2 text-sm border-b">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1 hover:text-indigo-600">
              <Phone size={14} />
              <span>+1 234 567 890</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-indigo-600">
              <Mail size={14} />
              <span>support@store.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="hover:text-indigo-600 flex gap-1 items-center">
              <MapPin size={14} /> Track Order
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 flex gap-1 items-center">
              <Store size={14} /> Store Locator
            </a>
          </div>
        </div>

        {/* <!-- Main Header --> */}
        <div className="flex items-center justify-between py-4">
          {/* <!-- Mobile Menu Button --> */}
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu />
          </button>

          {/* <!-- Logo --> */}
          <NavLink to="/" className="text-2xl font-semibold mr-4">
            STORE
          </NavLink>

          {/* <!-- Search Bar - Desktop --> */}
          <div className="hidden lg:flex flex-1 mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="text-gray-400 hover:text-indigo-600" />
              </button>
            </div>
          </div>

          {/* <!-- Right Actions --> */}
          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <Search className="text-xl" />
            </button>

            <a
              href="#"
              className="relative hover:text-indigo-600 hidden lg:block">
              <ShoppingCart />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </a>

            <a href="#" className="relative hover:text-indigo-600">
              <CakeSlice />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </a>

            <div className="hidden lg:flex items-center space-x-2">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="User"
                className="w-8 h-8 rounded-full transition-opacity duration-300 opacity-100"
                loading="lazy"
              />
              {user?.email ? (
                <NavLink to={"/profile"}>{user?.username}</NavLink>
              ) : (
                <div className="text-sm">
                  <NavLink to={"/login"} className="hover:text-indigo-600">
                    Sign In
                  </NavLink>
                  <span className="px-2">|</span>
                  <NavLink to={"/register"} className="hover:text-indigo-600">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <!-- Navigation - Desktop --> */}
        {/* <nav className='hidden lg:block border-t'>
          <ul className='flex items-center space-x-8 py-4'>
            {[
              { title: 'product', slug: 'admin/product' },
              { title: 'category', slug: 'admin/category' },
              { title: 'brand', slug: 'admin/brand' },
              { title: 'profile', slug: 'admin/profile' },
              { title: 'create', slug: 'admin/product/create' },
              { title: 'register', slug: 'register' },
              { title: 'login', slug: 'login' },
            ].map((item) => (
              <NavLink
                key={item.title}
                to={`/${item.slug}`}
                className='hover:text-indigo-600 capitalize'>
                {item.title}
              </NavLink>
            ))}
          </ul>
        </nav> */}

        {/* <!-- Ecommerce App --> */}
        {/* <nav className='hidden lg:block border-t'>
          <ul className='flex items-center space-x-8 py-4'>
            {[
              { title: 'products', slug: 'products' },
              { title: 'categories', slug: 'categories' },
            ].map((item) => (
              <NavLink
                key={item.title}
                to={`/${item.slug}`}
                className='hover:text-indigo-600 capitalize'>
                {item.title}
              </NavLink>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
