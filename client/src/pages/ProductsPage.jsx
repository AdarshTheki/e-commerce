import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Loading } from "../utils";
import { NavLink } from "react-router-dom";
import { HeartFavorite, ProductItem } from "../components";
import { useSelector } from "react-redux";

const ProductListing = () => {
  const { list: categories } = useSelector((state) => state.categories);
  const { list: brands } = useSelector((state) => state.brands);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rating, setRating] = useState(0);

  const queryParams = new URLSearchParams({
    limit: limit.toString(), // Ensure limit is included correctly
    ...(category && { category }),
    ...(brand && { brand }),
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
    ...(rating && {
      minRating: (rating === 5 ? rating - 0.5 : rating).toString(),
      maxRating: (rating === 5 ? rating : rating + 1).toString(),
    }),
  }).toString();

  const { data } = useFetch(`/api/v1/product?${queryParams}`);

  return (
    <section id="productListing" className="py-2 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-2">
        {/* <!-- Filters Sidebar --> */}
        <div className="w-[300px] max-lg:hidden sticky h-full top-[54px] overflow-y-auto scrollbar">
          <div className="bg-white text-gray-700 shadow-sm px-6 py-3">
            <h2 className="font-bold text-lg mb-4">Filters</h2>

            {/* <!-- Price Range --> */}
            <div>
              <h3 className="font-medium">Price Range</h3>
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
            {categories?.length > 1 && (
              <div className="my-2">
                <h3 className="font-medium">Category</h3>
                <ul className="max-h-[150px] overflow-y-auto w-full scrollbar-hidden">
                  {categories?.map((it) => (
                    <label
                      htmlFor={it}
                      key={it}
                      className="flex items-center capitalize text-sm mb-1 cursor-pointer">
                      <input
                        onChange={(e) => {
                          setCategory(e.target.checked ? it : "");
                          setBrand("");
                        }}
                        value={category}
                        checked={category === it}
                        id={it}
                        name={it}
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                      />
                      <span className="ml-2">{it?.replace("-", " ")}</span>
                    </label>
                  ))}
                </ul>
              </div>
            )}

            {/* Brand Filter */}
            {brands?.length > 1 && (
              <div className="my-2">
                <h3 className="font-medium">Brand</h3>
                <ul className="max-h-[150px] overflow-y-auto w-full scrollbar-hidden">
                  {brands?.map((it) => (
                    <label
                      htmlFor={it}
                      key={it}
                      className="flex items-center capitalize text-sm mb-1 cursor-pointer">
                      <input
                        onChange={(e) => {
                          setBrand(e.target.checked ? it : "");
                          setCategory("");
                        }}
                        value={brand}
                        checked={brand === it}
                        id={it}
                        name={it}
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                      />
                      <span className="ml-2">{it?.replace("-", " ")}</span>
                    </label>
                  ))}
                </ul>
              </div>
            )}

            {/* <!-- Rating Filter --> */}
            <div className="my-2">
              <h3 className="font-medium">Rating</h3>
              <ul className="max-h-[200px] overflow-y-auto w-full scrollbar-hidden">
                {[3, 4, 5].map((it) => (
                  <label
                    htmlFor={it}
                    key={it}
                    className="flex items-center gap-2 capitalize text-sm cursor-pointer">
                    <input
                      onChange={(e) => setRating(e.target.checked ? it : 0)}
                      value={rating}
                      checked={rating === it}
                      id={it}
                      name={it}
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-yellow-400 text-xl">
                          {index < it ? "★" : "☆"}
                        </span>
                      ))}
                    </span>
                  </label>
                ))}
              </ul>
            </div>

            {/* <!-- Apply Filters Button --> */}
            <button
              onClick={() => {
                setLimit(10);
                setCategory("");
                setMaxPrice(100000);
                setMinPrice(0);
                setRating(0);
              }}
              className="mt-3 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors">
              Reset Filters
            </button>
          </div>
        </div>

        {/* <!-- Product Grid --> */}
        <div className="w-full">
          {/* <!-- Sort and View Options --> */}
          <div className="bg-white sticky h-fit top-[54px] z-10 p-4 mb-4 flex flex-wrap items-center justify-between">
            <div>
              <span className="text-sm capitalize">
                products show {data?.page} to {data?.limit} of {data?.totalDocs}
              </span>
            </div>
            <div className="flex text-sm items-center space-x-2">
              <label htmlFor="sortBy" className="text-gray-600">
                Sort by:
              </label>
              <select
                id="sortBy"
                className="border border-gray-300 rounded px-2 py-1">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
              <label htmlFor="page" className="text-gray-600">
                Limit:
              </label>
              <select
                id="page"
                onClick={(e) => setLimit(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1">
                <option value={10}>10 / page</option>
                <option value={30}>30 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>
          </div>

          {/* <!-- Products Grid --> */}
          {!data?.totalDocs && <Loading className="h-[70vh]" />}
          <div
            className={`grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4`}>
            {/* <!-- Product Card --> */}
            {data?.totalDocs
              ? data?.docs?.map((item) => <ProductItem {...item} />)
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
