import React from "react";
import { NavLink } from "react-router-dom";
import menuItems from "../constant/menuItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth?.user);

  return (
    <nav className="h-screen sticky top-0 flex-shrink-0 w-64 bg-white border-r border-neutral-200/30 hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
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
              src="https://avatar.iran.liara.run/public"
              className="w-10 h-10 rounded-full transition-opacity duration-300 opacity-100"
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
