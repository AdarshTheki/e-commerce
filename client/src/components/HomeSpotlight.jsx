import { useState } from "react";
import HomeCard from "./HomeCard";

const HomeSpotlight = () => {
  const items = [
    {
      _id: 1,
      title: "Up to 10% off on ₹999",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/uqnqqzb4ybgsanunn5a4.avif",
    },
    {
      _id: 2,
      title: "Up to 10% off on ₹999",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/dxwytiqjmdsa2bzxoqjh.avif",
    },
    {
      _id: 3,
      title: "Up to 15% off on ₹799",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545007/gallery/zq24hw1qtdhkmopg7i78.avif",
    },
    {
      _id: 4,
      title: "Up to 8% off on ₹199",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/rgwszo9ptxigmqmr2bmb.avif",
    },
    {
      _id: 5,
      title: "Up to 22% off on ₹599",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/cefx3jx4y6icn2e0hvpo.avif",
    },
    {
      _id: 6,
      title: "Up to 28% off on ₹899",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/zuqkqaye0p9rvu4qtofl.avif",
    },
    {
      _id: 7,
      title: "Up to 40% off on ₹1999",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/ycevsxxhvl1octxxp2gi.avif",
    },
    {
      _id: 8,
      title: "Up to 30% off on ₹3999",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/svuaipnystulmobythyu.avif",
    },
    {
      _id: 9,
      title: "Up to 5% off on ₹1999",
      thumbnail:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1749545003/gallery/ox2obutegrw8rdh53ss0.avif",
    },
  ];
  // Shuffle items and pick a random one when page loads
  const [itemsToShow] = useState(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  return <HomeCard heading="Spotlight On" items={itemsToShow} />;
};

export default HomeSpotlight;
