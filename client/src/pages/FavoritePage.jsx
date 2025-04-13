import React from "react";
import useFetch from "../hooks/useFetch";
import { ProductItem } from "../components";
import { NavLink } from "react-router-dom";

const FavoritePage = () => {
  const { data, loading } = useFetch("/api/v1/user/favorite");

  return (
    <div className="py-5 px-2 bg-gray-100 text-gray-700 min-h-screen">
      <h2 className="text-3xl text-center font-bold mb-10">
        Favorite Item Gallery
      </h2>
      {loading && <p className="text-center">Loading...</p>}

      {!loading && data?.length > 0 ? (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 mx-auto max-w-3xl">
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
  );
};

export default FavoritePage;
