import React, { useCallback, useState } from "react";
import useDropdown from "../hooks/useDropdown";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const HeaderSearch = () => {
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(`/product?title=${searchQuery}&limit=10`);
  const navigate = useNavigate();

  const boldQuery = useCallback(
    (str) => {
      const regex = new RegExp(`(${searchQuery})`, "gi");
      return str.replace(regex, "<b>$1</b>");
    },
    [searchQuery]
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(isOpen ? false : true)}
        title="Search products"
        className="cursor-pointer hover:text-indigo-600 flex gap-1 items-center">
        <Search size={18} />
        <span>Search</span>
      </button>

      {isOpen && (
        <div className="fixed top-14 right-2 z-30 card w-80" ref={dropdownRef}>
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
                <li key={item?._id}>
                  <button
                    onClick={() => {
                      navigate(`/product/${item?._id}`);
                    }}
                    className="p-1.5 px-4 w-full text-left text-gray-700 rounded-lg text-sm hover:bg-indigo-100"
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
      )}
    </>
  );
};

export default HeaderSearch;
