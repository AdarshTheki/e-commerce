import { NavLink } from "react-router-dom";
import { Loading } from "../utils";

const CategoryCard = ({ heading = "", items = [], slug = "" }) => {
  return (
    <div className="relative mx-auto max-w-6xl sm:p-4 p-3">
      <h2 className="font-medium text-xl">{heading || "heading"}</h2>

      {items && items?.length > 0 ? (
        <div
          className={`w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden`}>
          {items?.map((item) => (
            <NavLink
              to={`/product?${slug}=${item?.title}`}
              key={item?._id}
              className="snap-start min-w-[200px] ">
              <img
                src={item?.thumbnail || "placeholder.png"}
                alt="New Release 1"
                className="w-full h-[180px] object-cover rounded"
                loading="lazy"
              />
              <h3 className="capitalize font-medium line-clamp-1 p-2">
                {item?.title}
              </h3>
            </NavLink>
          ))}
        </div>
      ) : (
        <Loading className="h-[200px]" />
      )}
      <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
    </div>
  );
};

export default CategoryCard;
