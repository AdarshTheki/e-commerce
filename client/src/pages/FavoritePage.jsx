import useFetch from "../hooks/useFetch";
import { ProductItem, HomeCertificate } from "../components";
import { NavLink } from "react-router-dom";
import { Loading, NotFound } from "../utils";
import Trending from "./Home/Trending";
import { ShoppingCart } from "lucide-react";

const FavoritePage = () => {
  const { data, loading } = useFetch("/user/favorite");

  if (loading) return <Loading />;

  return (
    <div>
      <div className="relative mx-auto px-2 container">
        <p className="font-medium text-xl my-5">Favorite Item Gallery</p>
        {data?.length < 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 w-full">
            {data?.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <NotFound
            canvas={
              <ShoppingCart className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
            }
            title="Your favorite is empty."
            description="Looks like you haven’t added anything to Your favorite is empty."
            linkName="Go to Products"
            linkClass="bg-indigo-600"
            linkTo="/products"
            mainClass="min-h-[100px]"
          />
        )}
      </div>

      <HomeCertificate />

      <Trending heading="For Your Wishlist" size={4} />
    </div>
  );
};

export default FavoritePage;
