import { Grid2X2, List } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Card = ({ heading = "", items = [] }) => {
  const [view, setView] = useState(false);

  if (items?.length === 0) return <h2>loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto px-2 relative">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{heading || "heading"}</h2>
          <span className="status-active !bg-gray-900 !text-white">
            {items?.length}
          </span>
        </div>
        <button className="svg-btn p-1" onClick={() => setView(!view)}>
          {!view ? <Grid2X2 /> : <List />}
        </button>
      </section>
      <div
        className={`w-full relative py-5 sm:gap-4 gap-2 ${view ? "grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2" : "flex overflow-x-auto scrollbar-hidden"}`}>
        {items?.map((item) => (
          <NavLink
            to={`/product?title=${item?.title}`}
            key={item?._id}
            className="border border-gray-300 hover:shadow-lg min-w-[200px] rounded-lg overflow-hidden">
            <img
              src={item?.thumbnail || "placeholder.png"}
              alt="New Release 1"
              className="w-full h-[150px] object-cover transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black line-clamp-1">
                {item?.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item?.description || "Latest innovation in comfort"}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
    </div>
  );
};

export default Card;
