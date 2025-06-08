import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const HomeSpotlight = () => {
  const items = [
    { id: 1, icon: "/spotlight/spotlight (1).jpeg" },
    { id: 2, icon: "/spotlight/spotlight (2).jpeg" },
    { id: 3, icon: "/spotlight/spotlight (3).jpeg" },
    { id: 4, icon: "/spotlight/spotlight (4).jpeg" },
    { id: 5, icon: "/spotlight/spotlight (5).jpeg" },
    { id: 6, icon: "/spotlight/spotlight (6).jpeg" },
    { id: 7, icon: "/spotlight/spotlight (7).jpeg" },
    { id: 8, icon: "/spotlight/spotlight (8).jpeg" },
    { id: 9, icon: "/spotlight/spotlight (9).jpeg" },
  ];
  // Shuffle items and pick a random one when page loads
  const [itemsToShow] = useState(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  return (
    <div className="relative mx-auto max-w-6xl sm:p-4 p-3">
      <h2 className="font-medium text-xl">Spotlight On</h2>
      <div className="w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden">
        {itemsToShow.map((item) => (
          <NavLink to={"/product"} key={item.id} className="snap-start">
            <img
              src={item.icon}
              alt={`image-${item.id}`}
              className="object-cover min-w-[260px] rounded h-[180px]"
            />
            <p className="p-2">Up to {item.id}0% off on ₹999</p>
          </NavLink>
        ))}
      </div>
      <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
    </div>
  );
};

export default HomeSpotlight;
