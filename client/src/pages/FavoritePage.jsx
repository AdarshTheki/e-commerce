import React from "react";
import useFetch from "../hooks/useFetch";
import { ProductItem } from "../components";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";

const FavoritePage = () => {
  const { data, loading } = useFetch("/user/favorite");

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen max-w-3xl w-full mx-auto p-2">
      <h2 className="text-2xl font-bold my-5">Favorite Item Gallery</h2>

      {data?.length > 0 ? (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 w-full">
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
