import React from "react";

const Collection = () => {
  return (
    <div className="mx-auto container">
      <div className="md:flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-md">
        <div className="md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            New Home Collection
          </h3>
          <p className="text-gray-600 mb-6">
            Discover our latest arrivals of minimalist home decor and furniture.
            Perfect for modern living spaces.
          </p>
          <a
            href="#featured"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-300">
            Explore Collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1477901492169-d59e6428fc90?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8OXx8b25saW5lJTJCc3RvcmUlMkJjYXRlZ29yeSUyQm5hdmlnYXRpb258ZW58MHx8fHwxNzQ1ODE4OTUzfDA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
            alt="Home Collection"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>

      <div className="mt-8 bg-indigo-100 rounded-xl p-8">
        <div className="md:flex justify-between gap-5 items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <p className="text-2xl font-bold text-indigo-900 mb-2">
              Stay Updated on Special Offers
            </p>
            <p className="text-indigo-800">
              Subscribe to our newsletter and be the first to know about
              exclusive deals and promotions.
            </p>
          </div>
          <div className="md:w-1/2">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border bg-white border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
