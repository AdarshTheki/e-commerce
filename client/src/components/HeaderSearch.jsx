import React, { useCallback, useState } from "react";
import useDropdown from "../hooks/useDropdown";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { LazyImage } from "../utils";

const HeaderSearch = () => {
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(
    `/product?title=${searchQuery}&limit=10&sortBy=price`
  );
  const navigate = useNavigate();

  const boldQuery = useCallback(
    (str) => {
      const regex = new RegExp(`(${searchQuery})`, "gi");
      return str.replace(regex, "<b>$1</b>");
    },
    [searchQuery]
  );

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Search products"
        className="cursor-pointer flex gap-1 items-center">
        <Search size={22} />
        <span className="text-lg font-serif max-sm:hidden">Search</span>
      </button>

      <div
        style={{ display: !isOpen ? "none" : "block" }}
        className={`absolute top-11 z-30 card sm:w-80 w-full duration-75 ease-in-out right-0 !rounded-l-4xl !border !border-gray-200 !rounded-b-4xl`}>
        <div className="flex items-center gap-4 border border-indigo-500 p-2 rounded-lg mb-2">
          <Search size={26} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-none w-full"
          />
          <X
            size={26}
            className="cursor-pointer hover:text-indigo-600"
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
          />
        </div>
        <ul>
          {data && data?.items?.length > 0 ? (
            data?.items?.map((item) => (
              <li
                key={item?._id}
                className="flex gap-2 items-center hover:bg-indigo-100 px-4 rounded cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item?._id}`);
                }}>
                <LazyImage
                  src={item.thumbnail}
                  placeholder={"/placeholder.jpg"}
                  width={40}
                  height={40}
                  lazy={"static"}
                />
                <p
                  className="w-full text-left text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: boldQuery(item?.title),
                  }}
                />
              </li>
            ))
          ) : (
            <li className="py-1.5 block pl-5 text-sm">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderSearch;
