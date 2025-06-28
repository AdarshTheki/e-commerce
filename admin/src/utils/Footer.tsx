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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </NavLink>
              <NavLink
                to={"/"}
                className="hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </NavLink>
              <NavLink
                to={"/"}
                className="hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
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
                  to={"/wishlist"}
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
                  to={"/product"}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
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
