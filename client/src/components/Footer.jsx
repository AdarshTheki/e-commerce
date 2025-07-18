import {
  Facebook,
  Instagram,
  LucideCircleArrowRight,
  TwitterIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300">
      {/* <!-- Main Footer --> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* <!-- Company Info --> */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Cartify</h3>
            <p className="text-sm">
              Your one-stop destination for all your shopping needs. Quality
              products, great prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <NavLink
                to={"/"}
                className="hover:text-white transition-colors duration-300">
                <Facebook />
              </NavLink>
              <NavLink
                to={"/"}
                className="hover:text-white transition-colors duration-300">
                <TwitterIcon />
              </NavLink>
              <NavLink
                to={"/"}
                className="hover:text-white transition-colors duration-300">
                <Instagram />
              </NavLink>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to={"/"}
                  className="hover:text-white transition-colors duration-300">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/"}
                  className="hover:text-white transition-colors duration-300">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/categories"}
                  className="hover:text-white transition-colors duration-300">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/brands"}
                  className="hover:text-white transition-colors duration-300">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className="hover:text-white transition-colors duration-300">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="hover:text-white transition-colors duration-300">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Customer Service --> */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to={"/setting"}
                  className="hover:text-white transition-colors duration-300">
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/order"}
                  className="hover:text-white transition-colors duration-300">
                  Track Order
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/favorite"}
                  className="hover:text-white transition-colors duration-300">
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/return-policy"}
                  className="hover:text-white transition-colors duration-300">
                  Returns Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/products"}
                  className="hover:text-white transition-colors duration-300">
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/faq"}
                  className="hover:text-white transition-colors duration-300">
                  FAQs
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Newsletter --> */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 border-gray-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
                  <LucideCircleArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Bottom Footer --> */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm">
              <p>© 2024 Cartify. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <NavLink
                  to={"/"}
                  className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </NavLink>
                <NavLink
                  to={"/"}
                  className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </NavLink>
                <NavLink
                  to={"/"}
                  className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
