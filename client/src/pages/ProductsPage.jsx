import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { Loading, PaginationBtn, Input } from "../utils";
import { ProductItem } from "../components";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import {
  ListFilterPlus,
  Scaling,
  Settings,
  TrainFrontTunnel,
} from "lucide-react";

const sortByOptions = [
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];

const pageSizeOptions = [
  { label: "10 Items per Page", value: 10 },
  { label: "30 Items per Page", value: 30 },
  { label: "50 Items per Page", value: 50 },
  { label: "100 Items per Page", value: 100 },
];

const ratingOptions = [
  { _id: 1, title: "1.0 ★ below 2 to 1" },
  { _id: 2, title: "2.0 ★ below 3 to 2" },
  { _id: 3, title: "3.0 ★ below 4 to 3" },
  { _id: 4, title: "4.0 ★ below 5 to 4" },
  { _id: 5, title: "5.0 ★ below 5 to 4.5" },
];

const ProductListing = () => {
  const [params] = useSearchParams();
  const { list: categories } = useSelector((state) => state.categories);
  const { list: brands } = useSelector((state) => state.brands);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState(params.get("category") || "");
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("title-asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 500);
  const { isOpen, setIsOpen, dropdownRef } = useDropdown();

  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(brand && { brand }),
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
    ...(rating && {
      minRating: (rating === 5 ? rating - 0.5 : rating).toString(),
      maxRating: (rating === 5 ? rating : rating + 1).toString(),
    }),
    sortBy: sortBy.split("-")[0],
    order: sortBy.split("-")[1],
    page,
    limit,
    title: query,
  }).toString();

  const { data } = useFetch(`/product?${queryParams}`);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const SortByItem = () => {
    const { isOpen, setIsOpen, dropdownRef } = useDropdown();
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(true)}
          className="btn border border-gray-300 !py-1.5 !flex items-center gap-1">
          Sort <ListFilterPlus size={16} />
        </button>
        <div
          className={`absolute mt-1 z-20 card duration-300 ease-in ${!isOpen ? "right-80 sm:-right-80 opacity-0" : "right-0 opacity-100"}`}>
          {sortByOptions.map((i) => (
            <button
              onClick={() => setSortBy(i.value)}
              className={`block text-left pl-4 text-nowrap hover:bg-indigo-100 rounded px-3 py-2 ${
                i.value === sortBy && "text-indigo-600"
              }`}
              key={i.label}>
              {i.label}
            </button>
          ))}
          {pageSizeOptions.map((i) => (
            <button
              onClick={() => setLimit(i.value)}
              className={`block text-left pl-4 text-nowrap hover:bg-indigo-100 rounded px-3 py-2 ${
                i.value == Number(limit) && "text-indigo-600"
              }`}
              key={i.label}>
              {i.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const categoryFilter = React.useCallback(
    (items = [], heading = "", value = "", setValue) => {
      return (
        items?.length > 1 && (
          <div>
            <h3 className="font-medium mb-1">{heading} :</h3>
            <ul>
              {items.map((it) => (
                <label
                  htmlFor={it.title}
                  key={it._id}
                  className="flex items-center capitalize text-sm mb-1 cursor-pointer">
                  <input
                    onChange={(e) => setValue(e.target.checked ? it.title : "")}
                    value={value}
                    checked={value === it.title}
                    id={it.title}
                    name={it.title}
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2">{it.title.replace("-", " ")}</span>
                </label>
              ))}
            </ul>
          </div>
        )
      );
    },
    []
  );

  return (
    <section className="p-2 max-w-6xl mx-auto">
      <div className="lg:grid gap-5" style={{ gridTemplateColumns: "1fr 3fr" }}>
        {/* <!-- Filters Sidebar --> */}
        <div
          className={
            isOpen
              ? "fixed inset-0 bg-black/50 z-30 pt-20 duration-300 ease-in" // mobile
              : "w-full max-lg:hidden lg:sticky lg:h-fit lg:top-[54px]" // desktop
          }>
          <div
            ref={dropdownRef}
            className={
              isOpen
                ? "!p-5 h-full text-gray-800 !rounded-2xl bg-white overflow-auto card flex flex-col gap-4"
                : "overflow-y-auto scrollbar card text-gray-800  flex flex-col gap-4"
            }>
            {/* <!-- Clear Filters --> */}
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                className="text-sm text-red-600 font-bold"
                onClick={() => {
                  setLimit(10);
                  setCategory("");
                  setBrand("");
                  setMaxPrice(100000);
                  setMinPrice(0);
                  setRating(0);
                  setSearch("");
                  setPage(1);
                }}>
                Clear All
              </button>
            </div>

            {/* <!-- Price Range --> */}
            <div>
              <h3 className="font-medium mb-1">Price:</h3>
              <input
                type="range"
                className="w-full"
                min={0}
                max={100000}
                step="10"
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <div className="flex gap-5 justify-between text-sm">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* <!-- Category Filter --> */}
            {categoryFilter(
              categories?.items,
              "Category",
              category,
              setCategory
            )}

            {/* Brand Filter */}
            {categoryFilter(brands?.items, "Brand", brand, setBrand)}

            {/* <!-- Rating Filter --> */}
            <div>
              <h3 className="font-medium mb-1">Rating:</h3>
              <ul className="max-h-[200px] overflow-y-auto w-full scrollbar-hidden">
                {ratingOptions.map((it) => (
                  <label
                    htmlFor={it._id}
                    key={it._id}
                    className="flex items-center gap-2 capitalize text-sm cursor-pointer">
                    <input
                      onChange={(e) => setRating(e.target.checked ? it._id : 0)}
                      value={rating}
                      checked={rating === it._id}
                      id={it._id}
                      name={it._id}
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">{it.title}</span>
                  </label>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* search products */}
          <div className="flex sm:gap-4 gap-2 flex-wrap items-center">
            <Input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full min-w-[300px] pl-4"
              placeholder="Search..."
            />
            {/* mobile filters */}
            <button
              onClick={() => setIsOpen(isOpen ? false : true)}
              className="border rounded-lg border-gray-300 !py-1.5 px-4 ! flex items-center gap-1 lg:hidden">
              Filter
              <Settings size={16} />
            </button>
            <SortByItem />
          </div>

          {/* <!-- Products Grid --> */}
          {!data?.totalItems && <Loading className="h-[70vh]" />}
          <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-4`}>
            {/* <!-- Product Card --> */}
            {data?.items?.length &&
              data?.items?.map((item) => (
                <ProductItem key={item?._id} {...item} />
              ))}
          </div>

          {/* Pagination */}
          <div className="flex  gap-4 flex-wrap justify-between items-center card">
            <h2>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, data?.totalItems || 0)} of{" "}
              {data?.totalItems}
            </h2>
            <div className="flex gap-2 items-center">
              <button
                className={`svg-btn !w-14 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                  page === 1 && "hidden"
                }`}
                onClick={() => handlePageChange(page - 1)}>
                Prev
              </button>

              <PaginationBtn
                handlePageChange={handlePageChange}
                page={data?.page || 1}
                totalPages={data?.totalPages || 1}
              />

              <button
                className={`svg-btn !w-14 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                  page === data?.totalPages && "hidden"
                }`}
                onClick={() => handlePageChange(page + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
