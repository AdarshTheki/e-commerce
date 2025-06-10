import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const HomeNew = () => {
  const items = [
    {
      id: 1,
      icon: "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545623/gallery/zxlcmvdd9sitcvabremz.avif",
      title: "Kevin Aucoin",
      content: "Studio-approved makeup for your vanity",
    },
    {
      id: 2,
      icon: "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545624/gallery/d3k50dlf7a54sa9oullg.avif",
      title: "Tira Merch",
      content: "Go beyond beauty with high-quality everyday essentials",
    },
    {
      id: 3,
      icon: "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545624/gallery/sqzzzirvzshe1s8yaivs.avif",
      title: "Nuse",
      content: "Makeup with soft colours for fresh and natural look",
    },
  ];

  const [itemsToShow] = useState(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  return (
    <div className="sm:p-4 p-3 mx-auto max-w-6xl">
      <h2 className="font-medium text-xl mb-5">New On Cartify</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {itemsToShow.map((item) => (
          <NavLink to={`/product`} key={item.id} className="w-full">
            <img
              src={item.icon}
              alt="images"
              className="w-full object-contain rounded"
            />
            <div className="p-2 space-y-1 text-slate-700">
              <h5 className="font-medium">{item.title}</h5>
              <p className="text-xs">{item.content}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HomeNew;
