import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";
import { useState } from "react";
import {
  ClipboardList,
  Heart,
  Image,
  LogOut,
  ShoppingBag,
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
      const res = await axiosInstance.post("/user/logout");
      if (res.data) {
        localStorage.removeItem("token");
        dispatch(logout());
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`absolute top-11 z-30 card w-60 duration-75 ease-in-out right-0 ${!isOpen ? "opacity-0 !-top-120" : "opacity-100"} ${!user && "hidden"}`}
        ref={dropdownRef}>
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
        title="Account"
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => (user?._id ? setIsOpen(true) : navigate("/login"))}>
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public"}
          alt="User"
          className="h-7 w-7 rounded-full object-cover bg-gray-500"
          loading="lazy"
        />
        <span className="text-lg font-serif max-sm:hidden">User</span>
      </button>
    </>
  );
};

export default HeaderUserMenu;
