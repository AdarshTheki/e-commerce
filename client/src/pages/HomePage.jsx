import { useSelector } from "react-redux";
import {
  CategoryCard,
  HomeCertificate,
  HomeNew,
  HomeSpotlight,
  HomeWishlist,
} from "../components";
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

  return (
    <main className="min-h-screen">
      {/* Banner Listing */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="h-full relative overflow-hidden">
          <NavLink to={`/product`} className="">
            <img
              src={data[index]?.image}
              alt="image"
              className="object-cover bg-right w-full max-sm:h-[40vh]"
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
      <CategoryCard
        items={categories?.items}
        heading="Categories"
        slug="category"
      />

      <HomeSpotlight />

      {/* Brand Listing */}
      <CategoryCard items={brands?.items} heading="Brands" slug="brand" />

      <HomeNew />

      <HomeCertificate />

      <HomeWishlist />
    </main>
  );
};

export default HomePage;
