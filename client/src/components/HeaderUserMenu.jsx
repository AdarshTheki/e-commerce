import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import { logout } from "../redux/authSlice";

const userMenu = [
  { id: 1, name: "Carts", path: "/cart" },
  { id: 2, name: "Setting", path: "/setting" },
  { id: 3, name: "Favorite", path: "/favorite" },
  { id: 4, name: "Orders", path: "/orders" },
];

const HeaderUserMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      if (res.data) {
        localStorage.removeItem("token");
        navigate("/");
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      {isOpen && user?._id && (
        <div className="fixed top-14 right-2 z-30 card w-60" ref={dropdownRef}>
          <ul className="w-full">
            {userMenu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `py-1.5 block mb-2 text-left text-gray-700 pl-5 rounded-lg hover:bg-indigo-100 ${
                      isActive ? "bg-indigo-100" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button onClick={logoutHandler} className="btn text-red-600 px-5">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

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
