import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";

const CategoryCard = ({ heading = "", items = [], slug = "" }) => {
  const [view, setView] = useState(false);

  return (
    <div className="relative text-gray-700 mx-auto max-w-6xl">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{heading || "heading"}</h2>
          <span className="status-active !bg-indigo-300 !text-white">
            {items?.length}
          </span>
        </div>
        <button
          className="btn bg-indigo-100 text-sm"
          onClick={() => setView(!view)}>
          {view ? "Grid View" : "Lists View"}
        </button>
      </section>
      {items?.length === 0 && <Loading className="h-[200px]" />}
      <div
        className={`w-full relative py-5 sm:gap-4 gap-2 ${view ? "grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2" : "flex overflow-x-auto scrollbar-hidden"}`}>
        {items?.map((item) => (
          <NavLink
            to={`/product?${slug}=${item?.title}`}
            key={item?._id}
            className="border border-gray-300 hover:shadow-lg min-w-[180px] rounded-lg overflow-hidden">
            <img
              src={item?.thumbnail || "placeholder.png"}
              alt="New Release 1"
              className="w-full h-[150px] object-cover"
              loading="lazy"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl capitalize font-bold line-clamp-1">
                {item?.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item?.description || "Latest innovation in comfort"}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
      {!view && (
        <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
      )}
    </div>
  );
};

export default CategoryCard;
