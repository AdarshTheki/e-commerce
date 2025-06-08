import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const HomeNew = () => {
  const items = [
    {
      id: 1,
      icon: "/new/new (1).jpeg",
      title: "Kevin Aucoin",
      content: "Studio-approved makeup for your vanity",
    },
    {
      id: 2,
      icon: "/new/new (2).jpeg",
      title: "Tira Merch",
      content: "Go beyond beauty with high-quality everyday essentials",
    },
    {
      id: 3,
      icon: "/new/new (3).jpeg",
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
