import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ShoppingCart, CakeSlice, Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input blur
  const handleBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-gray-900 text-gray-300 z-20">
      <div className="px-4 flex justify-between">
        {/* Main Header*/}
        <div className="hidden text-sm font-bold sm:flex items-center gap-4 justify-center py-2 flex-1/2">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/product"}>Product</NavLink>
          <NavLink to={"/favorite"}>Favorite</NavLink>
          <NavLink to={"/setting"}>Profile</NavLink>
        </div>
        <div className="flex items-center justify-end gap-4 py-2 flex-1/2">
          {/* Desktop Search Bar */}
          <div
            className={`w-full relative max-w-[400px] flex items-center border rounded-md border-gray-500 ${
              isDropdownOpen && "outline outline-indigo-600"
            }`}>
            <Search size={20} className="mx-3" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-1.5 border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              ref={inputRef}
            />
            {isDropdownOpen && (
              <>
                <X
                  className=" absolute right-2 top-2 cursor-pointer"
                  onClick={() => {
                    setSearchTerm("");
                    setIsDropdownOpen(false);
                  }}
                />
                <ul
                  onClick={handleBlur}
                  className="w-full list-none min-w-[350px] max-w-[400px] absolute top-12 border border-gray-300 h-fit bg-white py-2 rounded-lg shadow-lg">
                  <SearchResults query={searchTerm} />
                </ul>
              </>
            )}
          </div>

          {/* Right Actions*/}
          <div className="flex items-center gap-4">
            <NavLink
              to={"/cart"}
              className="hover:text-indigo-600"
              title="cart items">
              <ShoppingCart size={28} />
            </NavLink>

            <div className="flex items-center gap-1" title="user profile">
              {user?.email ? (
                <NavLink to={"/setting"}>
                  <img
                    src={user?.avatar || "https://avatar.iran.liara.run/public"}
                    alt="User"
                    className="min-w-9 min-h-9 h-9 w-9 rounded-full object-cover"
                    loading="lazy"
                  />
                </NavLink>
              ) : (
                <NavLink
                  to={"/login"}
                  className="hover:text-indigo-600 text-sm">
                  <User size={26} />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const SearchResults = ({ query = "" }) => {
  const { data, loading } = useFetch(`/api/v1/product?title=${query}&limit=10`);

  const boldQuery = (str) => {
    const regex = new RegExp(`(${query})`, "gi");
    return str.replace(regex, "<b>$1</b>");
  };

  if (loading || data?.docs?.length === 0) {
    return <li className="py-1.5 block pl-5 text-sm">No results found</li>;
  }

  return data?.docs?.map((item) => (
    <NavLink
      to={`/product/${item?._id}`}
      key={item?._id}
      className="py-1.5 block cursor-pointer text-gray-700 pl-5 text-sm hover:bg-gray-200"
      dangerouslySetInnerHTML={{ __html: boldQuery(item?.title) }}
    />
  ));
};
