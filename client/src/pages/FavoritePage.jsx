import React from "react";
import useFetch from "../hooks/useFetch";
import { HomeNew, HomeWishlist, ProductItem } from "../components";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";

const FavoritePage = () => {
  const { data, loading } = useFetch("/user/favorite");

  if (loading) return <Loading />;

  return (
    <div>
      <div className="relative mx-auto max-w-6xl sm:p-4 p-3">
        <h2 className="font-medium text-xl my-5">Favorite Item Gallery</h2>
        {data?.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 w-full">
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

      <HomeNew />
    </div>
  );
};

export default FavoritePage;
