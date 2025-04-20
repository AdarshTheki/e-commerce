import { useSelector } from "react-redux";
import { Card } from "../components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { list: categories } = useSelector((state) => state.categories);
  const { list: brands } = useSelector((state) => state.brands);

  return (
    <main id="homepage" className="min-h-screen">
      {/* <!-- Banner --> */}
      <BannerSlider />

      <Card
        cardData={categories}
        title={
          categories?.length > 1 ? "Featured Categories" : "Feature Category"
        }
      />

      <Card
        cardData={brands}
        title={brands?.length > 1 ? "Featured Brands" : "Feature Brand"}
      />
    </main>
  );
};

export default HomePage;

const BannerSlider = () => {
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [index, data.length]);

  return (
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
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === i ? "bg-gray-800 w-10" : "bg-gray-300"
              }`}
              onClick={() => setIndex(i)}></button>
          ))}
        </div>
      </div>
    </div>
  );
};
