import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";
import { useState } from "react";

const userMenu = [
  { id: 1, name: "Carts", path: "/cart" },
  { id: 2, name: "Setting", path: "/setting" },
  { id: 3, name: "Favorite", path: "/favorite" },
  { id: 4, name: "Orders", path: "/orders" },
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
    <div>
      <div
        className={`absolute top-12 z-30 card w-40 duration-75 ease-in-out right-0 ${!isOpen ? "opacity-0 !-top-120" : "opacity-100"} ${!user && "hidden"}`}
        ref={dropdownRef}>
        <ul className="w-full">
          {userMenu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `py-1.5 block text-left text-gray-700 pl-5 rounded-lg hover:bg-indigo-100 ${
                    isActive ? "bg-indigo-100" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}>
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to={"#"}
              onClick={logoutHandler}
              className={`py-1.5 block mb-2 text-left !text-red-500 font-medium pl-5 rounded-lg hover:bg-indigo-100`}>
              {loading ? "Loading..." : "Logout"}
            </NavLink>
          </li>
        </ul>
      </div>

      <img
        onClick={() => (user?._id ? setIsOpen(true) : navigate("/login"))}
        src={user?.avatar || "https://avatar.iran.liara.run/public"}
        alt="User"
        className="min-w-9 min-h-9 h-9 w-9 rounded-full object-cover cursor-pointer bg-gray-500"
        loading="lazy"
      />
    </div>
  );
};

export default HeaderUserMenu;
