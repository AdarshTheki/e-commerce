import useFetch from "../hooks/useFetch";
import { ProductItem, HomeCertificate } from "../components";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";
import Trending from "./Home/Trending";

const FavoritePage = () => {
  const { data, loading } = useFetch("/user/favorite");

  if (loading) return <Loading />;

  return (
    <div>
      <div className="relative mx-auto px-2 container">
        <h2 className="font-medium text-xl my-5">Favorite Item Gallery</h2>
        {data?.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-4 w-full">
            {data?.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center space-y-4">
            <p className="">Your favorite is empty.</p>
            <NavLink to="/product" className="btn border text-indigo-600">
              Go to Products
            </NavLink>
          </div>
        )}
      </div>

      <HomeCertificate />

      <Trending heading="For Your Wishlist" size={4} />
    </div>
  );
};

export default FavoritePage;
