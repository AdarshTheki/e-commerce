import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";

const CategoriesPage = () => {
  const [loadMore, setLoadMore] = useState(10);
  const { data, error, loading } = useFetch(`/category?limit=${loadMore}`);

  if (error || loading) return <Loading />;

  return (
    <section className="bg-white py-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-5">Shop by Category</h2>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-2 sm:gap-5 gap-2">
          {data?.totalDocs
            ? data?.docs?.map((item) => (
                <div
                  key={item._id}
                  className="relative min-h-[280px] overflow-hidden rounded-lg group animate__animated animate__fadeInUp animate__fadeIn">
                  <img
                    src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1680,c_limit/73c4a613-c354-4bd5-9df8-e0cc7705c467/nike-just-do-it.jpg"
                    alt="Sports Collection"
                    className="w-full h-full object-cover group-hover:scale-110 transition-opacity duration-300 opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-3 capitalize">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Performance wear for every athlete
                    </p>
                    <NavLink
                      to={`/category/${item._id}`}
                      className="bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
                      Explore
                    </NavLink>
                  </div>
                </div>
              ))
            : null}
        </div>
        <button
          onClick={() => setLoadMore((prev) => prev + 10)}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 mt-5">
          Load More
        </button>
      </div>
    </section>
  );
};

export default CategoriesPage;
