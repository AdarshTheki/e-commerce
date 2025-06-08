import { useState } from "react";
import { NavLink } from "react-router-dom";

const HomeWishlist = () => {
  const items = [
    { id: 1, icon: "/wishlist/wishlist_1.jpeg" },
    { id: 2, icon: "/wishlist/wishlist_2.jpeg" },
    { id: 3, icon: "/wishlist/wishlist_3.jpeg" },
    { id: 4, icon: "/wishlist/wishlist_4.jpeg" },
    { id: 5, icon: "/wishlist/wishlist_5.jpeg" },
  ];
  // Shuffle items and pick a random one when page loads
  const [itemsToShow] = useState(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  return (
    <div className="relative mx-auto max-w-6xl sm:p-4 p-3">
      <h2 className="font-medium text-xl">For Your Wishlist</h2>
      <div className="w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden">
        {itemsToShow.map((item) => (
          <NavLink to={"/product"} key={item.id} className="snap-start">
            <img
              src={item.icon}
              alt={`image-${item.id}`}
              className="object-cover min-w-[300px] rounded h-[200px]"
            />
            <p className="p-2 text-gray-700">Up to 2{item.id}% off</p>
          </NavLink>
        ))}
      </div>
      <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
    </div>
  );
};

export default HomeWishlist;
