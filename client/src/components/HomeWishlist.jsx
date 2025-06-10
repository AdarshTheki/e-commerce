import { useState } from "react";
import HomeCard from "./HomeCard";

const HomeWishlist = () => {
  const items = [
    {
      _id: 1,
      title: "Up to 20% off",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545334/gallery/qhaik8xj8khcbxbtqbq3.avif",
    },
    {
      _id: 2,
      title: "Up to 30% off",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545333/gallery/iyzs0m8cnahclwh2lvik.avif",
    },
    {
      _id: 3,
      title: "Up to 5% off",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545329/gallery/hohmzavqswgh73fhwbh3.avif",
    },
    {
      _id: 4,
      title: "Up to 32% off",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545329/gallery/zhfuwvbap3rjvoqos8tc.avif",
    },
    {
      _id: 5,
      title: "Up to 24% off",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545329/gallery/krtywof4ohrjpvgyjne4.avif",
    },
  ];
  // Shuffle items and pick a random one when page loads
  const [itemsToShow] = useState(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  return <HomeCard heading="For Your Wishlist" items={itemsToShow} />;
};

export default HomeWishlist;
