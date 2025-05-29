import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, User, X } from "lucide-react";
import { Input } from "../utils";
import menuItems from "../constant/menuItems";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="flex">
      {/* <!-- Desktop Menu --> */}
      <Sidebar />

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
        <div className="sticky top-0 z-10 border-b">
          <div className="flex items-center justify-end gap-5 p-2 sm:px-4 bg-white">
            {/* Inputs Search */}
            <div className="relative sm:w-[350px]">
              <Input
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              {debouncedSearch.length > 1 && (
                <>
                  <X
                    className=" absolute right-2 top-2 cursor-pointer"
                    onClick={() => {
                      setSearch("");
                    }}
                  />
                  <SearchResults query={debouncedSearch} setClose={setSearch} />
                </>
              )}
            </div>
            <NavLink to={"/profile"} className="svg-btn !scale-125 border">
              <User size={18} />
            </NavLink>

            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="svg-btn scale-125 sm:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Main of all Components */}
        <div className="w-full p-4 sm:p-6 h-full space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

const SearchResults = ({
  query = "",
  setClose,
}: {
  query: string;
  setClose: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useFetch<PaginationTypeWithDocs<ProductType>>(
    `/product?title=${query}&limit=10`
  );

  const boldQuery = (str: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return str.replace(regex, "<b>$1</b>");
  };

  return (
    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
      {data && data?.items?.length === 0 && (
        <li className="py-1.5 block px-4 text-sm h-20">No results found</li>
      )}
      {data?.items?.map((item) => (
        <li
          key={item._id}
          className="py-1.5 block px-4 text-sm hover:bg-gray-100 ">
          <NavLink
            onClick={() => setClose("")}
            to={`/product?title=${item.title}`}
            className="!text-gray-700 line-clamp-1">
            <span dangerouslySetInnerHTML={{ __html: boldQuery(item.title) }} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
