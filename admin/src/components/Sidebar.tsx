import React from "react";
import { NavLink } from "react-router-dom";
import menuItems from "../constant/menuItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth?.user);

  return (
    <nav className="h-screen sticky top-0 flex-shrink-0 w-64 border-r hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span className="text-xl font-semibold">Admin</span>
          </div>
        </div>
        <div className="flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className="flex gap-2 items-center mb-2 pl-8 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200">
              {<item.icon size={22} />}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
        <div className="px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200">
          <NavLink
            to={user?.email ? "/profile" : "/login"}
            className="flex items-center space-x-3">
            <img
              src={user?.avatar || "https://avatar.iran.liara.run/public"}
              className="w-14 h-14 rounded-full object-cover border-2"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-medium uppercase">
                {user?.firstName || "Admin"} {user?.lastName || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "admin@example.com"}
              </p>
              <p className="text-xs text-blue-800">{user?.role || "Guest"}</p>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
