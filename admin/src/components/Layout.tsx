import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BellDotIcon, Menu, Settings, X } from "lucide-react";
import { Input } from "../utils";
import menuItems from "../constant/menuItems";

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div id="root" className="bg-[#E5E7EB]">
      <div className="flex">
        {/* <!-- Desktop Menu --> */}
        <Sidebar />

        {/* <!-- Mobile Menu Button Fixed --> */}
        <div className="lg:hidden fixed top-3.5 right-2 z-50">
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="mobile-menu-button bg-white p-2 rounded-lg focus:outline-none">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* <!-- Mobile Menu --> */}
        <div
          onClick={() => setOpen(false)}
          style={{ display: open ? "block" : "none" }}
          className="mobile-menu fixed h-screen inset-0 rounded-b-2xl overflow-hidden shadow-lg bg-gray-700/30 z-40 lg:hidden">
          <div
            onClick={() => setOpen(true)}
            className="p-4 space-y-4 bg-white max-h-[50vh] overflow-y-auto overflow-hidden">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100">
                {<item.icon size={18} />}
                <span className="ml-3">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Main Body */}
        <main className="h-full sm:overflow-y-auto w-[100vw]">
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-200/30">
            <div className="flex items-center justify-end gap-4 py-4 pl-4 pr-14">
              <Input name="search" placeholder="Search..." />
              <NavLink
                to={"/products"}
                className="text-gray-600 hover:text-gray-900">
                <BellDotIcon />
              </NavLink>
              <NavLink
                to={"/settings"}
                className="text-gray-600 hover:text-gray-900">
                <Settings />
              </NavLink>
            </div>
          </div>

          {/* Main of all Components */}
          <div className="w-full p-4 sm:p-6 h-full space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
