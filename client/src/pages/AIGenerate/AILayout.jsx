import React from "react";
import { AiToolsData } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";
import { Home } from "lucide-react";
import { classNames } from "../../helper";

const AILayout = () => {
  return (
    <div className="sm:flex gap-5 w-full min-h-[80dvh]">
      {/* mobile menu */}
      <div className="sm:hidden p-2 py-4 overflow-hidden flex gap-1 overflow-x-auto scrollbar-hidden">
        <NavLink
          to={"/ai"}
          className="p-2 rounded-full text-sm items-center px-4 flex gap-1 border border-gray-300 text-nowrap">
          <Home className="w-3 h-3" />
          Dashboard
        </NavLink>
        {AiToolsData.map((tool, index) => (
          <NavLink
            key={index}
            to={tool.path}
            className={({ isActive }) =>
              classNames(
                isActive &&
                  "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
                "p-2 rounded-full text-sm items-center px-4 flex gap-1 border border-gray-300 text-nowrap"
              )
            }>
            <tool.Icon className="w-3 h-3" />
            {tool.title}
          </NavLink>
        ))}
      </div>

      {/* desktop menu */}
      <div className="flex flex-col w-[300px] p-4 sticky gap-2 text-sm top-14 h-full max-sm:hidden">
        <NavLink
          to={"/ai"}
          className={"p-2 rounded-lg flex gap-2 items-center"}>
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>
        {AiToolsData.map((tool, index) => (
          <NavLink
            key={index}
            to={tool.path}
            className={({ isActive }) =>
              "p-2 rounded-lg flex gap-2 items-center" +
              ` ${isActive && " bg-gradient-to-r from-blue-600 to-purple-600 text-white"}`
            }>
            <tool.Icon className="w-4 h-4" />
            <span>{tool.title}</span>
          </NavLink>
        ))}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AILayout;
