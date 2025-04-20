import { Grid, Grid2X2, List } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Card = ({ title = "", cardData = [] }) => {
  const [view, setView] = useState(false);

  if (cardData?.length === 0) return <h2>loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto px-2 relative">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <span className="status-active !bg-gray-900 !text-white">
            {cardData?.length}
          </span>
        </div>
        <button className="svg-btn p-1" onClick={() => setView(!view)}>
          {!view ? <Grid2X2 /> : <List />}
        </button>
      </section>
      <div
        className={`w-full relative py-5 sm:gap-4 gap-2 ${view ? "grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2" : "flex overflow-x-auto scrollbar-hidden"}`}>
        {cardData?.map((item) => (
          <div
            key={item}
            className="bg-white shadow-lg min-w-[200px] rounded-lg overflow-hidden">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_610,c_limit/0ebd455c-1c7e-4958-8c64-20eacc1d760d/image.png"
              alt="New Release 1"
              className="w-full h-[150px] object-cover transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-black mb-2 line-clamp-1">
                {item}
              </h3>
              <p className="text-gray-600 text-sm mb-4 font-futura">
                Latest innovation in comfort
              </p>
              <NavLink
                to={"/product"}
                className="bg-black text-white px-5 py-2 hover:bg-black/80 rounded-md hover:shadow-glow hover:scale-105 transition-all duration-300">
                Shop Now
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
    </div>
  );
};

export default Card;
