import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import { axios, errorHandler } from "../helper";
import { logout } from "../redux/authSlice";
import { useState } from "react";
import {
  ChartBar,
  ClipboardList,
  Heart,
  Image,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";

const menuItems = [
  {
    id: 2,
    name: "Carts",
    path: "/cart",
    icon: <ShoppingCart size={22} />,
  },
  {
    id: 3,
    name: "Account",
    path: "/setting",
    icon: <User size={22} />,
  },
  {
    id: 4,
    name: "Favorite",
    path: "/favorite",
    icon: <Heart size={22} />,
  },
  {
    id: 5,
    name: "Orders",
    path: "/orders",
    icon: <ClipboardList size={22} />,
  },
  {
    id: 1,
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

const HeaderUserMenu = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/user/logout");
      if (res.data) {
        localStorage.removeItem("token");
        dispatch(logout());
        window.location.href = "/";
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handelToggle = () => {
    if (!user?._id) {
      navigate("/login");
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef}>
      <div
        style={{ display: !isOpen ? "none" : "flex" }}
        className={`absolute top-11 z-30 w-60 duration-75 ease-in-out right-5 p-2 border border-gray-200 bg-white !rounded-l-4xl !rounded-b-4xl overflow-hidden`}>
        <ul className="w-full">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 mb-1 flex items-center gap-3 !text-lg text-left text-gray-700 pl-5 rounded-lg hover:bg-indigo-100 ${
                    isActive ? "bg-indigo-100" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}>
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to={"#"}
              onClick={logoutHandler}
              className={`px-3 py-2 mb-1 flex items-center gap-3 !text-lg text-left !text-red-500 font-medium pl-5 rounded-lg hover:bg-indigo-100`}>
              <LogOut size={22} />
              {loading ? "Loading..." : "Logout"}
            </NavLink>
          </li>
        </ul>
      </div>

      <button
        type="button"
        title="Account"
        className="flex items-center gap-1 cursor-pointer"
        onClick={handelToggle}>
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public"}
          alt="User"
          className="h-7 w-7 rounded-full object-cover bg-gray-500"
          loading="lazy"
        />
        <span className="text-lg font-serif max-sm:hidden">User</span>
      </button>
    </div>
  );
};

export default HeaderUserMenu;
