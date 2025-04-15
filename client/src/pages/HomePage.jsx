import { Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Typewriter } from "../utils";
import { useSelector } from "react-redux";
import { Card } from "../components";

const HomePage = () => {
  const { list: categories } = useSelector((state) => state.categories);
  const { list: brands } = useSelector((state) => state.brands);

  return (
    <main id="homepage" className="min-h-screen">
      {/* <!-- Hero Section --> */}
      <section className="relative h-[500px] overflow-hidden object-contain mb-6">
        <div className="absolute inset-0 w-full">
          <img
            src="./home.jpg"
            alt="Background"
            className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="px-4 h-full flex items-center justify-center relative">
          <div className="max-w-lg text-center text-white grid items-center gap-6 justify-center">
            <h1 className="sm:text-8xl text-5xl font-semibold">JUST DO IT</h1>
            <Typewriter
              text="Your sport journey begins here. Push your limits, break boundaries."
              name="heading"
              className="sm:text-xl text-lg"
            />
            <NavLink
              to={"/product"}
              className="py-3 px-6 rounded-lg mx-auto hover:opacity-80 cursor-pointer bg-white text-black font-semibold text-xl w-fit">
              Shop Now
            </NavLink>
            <NavLink to={"/product"} className="underline font-medium">
              Explore Collection
            </NavLink>
          </div>
        </div>
      </section>

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

      {/* <!-- Testimonials --> */}
      <Testimonials />
    </main>
  );
};

export default HomePage;

const Testimonials = () => {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <h2 className="text-2xl font-bold">What Our Customers Say</h2>
      <div className="flex sm:gap-4 gap-2 w-full py-5 overflow-x-auto scrollbar-hidden">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="bg-white min-w-[200px] p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Customer"
                className="w-10 h-10 rounded-full transition-opacity duration-300 opacity-100"
                loading="lazy"
              />
              <div className="ml-4">
                <h4 className="font-semibold">John Doe</h4>
                <div className="flex">
                  <Star size={16} fill="#000" />
                  <Star size={16} fill="#000" />
                  <Star size={16} fill="#000" />
                  <Star size={16} fill="#000" />
                  <Star size={16} fill="#000" />
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              &quot;Great products and excellent service. Will definitely shop
              here again!&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
