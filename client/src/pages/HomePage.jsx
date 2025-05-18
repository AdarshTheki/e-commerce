import { useSelector } from "react-redux";
import { Card } from "../components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035845/cartify/f8tk0reewmiwhnhmoeyu.avif",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/g54f8fsgovvs6eocrg2t.jpg",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/f1nswsejcfriolo1tlxa.jpg",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035857/cartify/jzamllhecn4x1jk4n1vd.jpg",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035859/cartify/ryf2cqa2acp3k7mycum0.jpg",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1745035861/cartify/vcb8fentke1pz0rsrcyw.jpg",
  },
];

const HomePage = () => {
  const { list: categories } = useSelector((state) => state.categories);
  const { list: brands } = useSelector((state) => state.brands);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    return Math.max(0, endOfDay - now);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${hours} hrs ${minutes} mins ${seconds} sec`;
  };

  return (
    <main id="homepage" className="min-h-screen">
      {/* offer valid */}
      <p className="max-w-6xl mx-auto py-2 my-2 bg-pink-200 text-center text-xs">
        Sale ends in <span className="font-bold">{formatTimeLeft()}</span>
      </p>

      {/* Banner Listing */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="h-full relative overflow-hidden">
          <NavLink to={"/product"}>
            <img
              src={data[index]?.image}
              alt={"banner_image"}
              className="w-full object-cover"
              loading="lazy"
            />
          </NavLink>
          <div className="flex items-center justify-center py-2">
            {data.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
                  index === i ? "bg-gray-800 w-10" : "bg-gray-300"
                }`}
                onClick={() => setIndex(i)}></button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Listing */}
      <Card
        items={categories?.items}
        heading={
          categories?.items?.length > 1
            ? "Featured Categories"
            : "Feature Category"
        }
      />

      {/* Brand Listing */}
      <Card
        items={brands?.items}
        heading={
          brands?.items?.length > 1 ? "Featured Brands" : "Feature Brand"
        }
      />
    </main>
  );
};

export default HomePage;
