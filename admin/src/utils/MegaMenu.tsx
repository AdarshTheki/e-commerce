const MegaMenu = ({ name }: { name: string }) => {
  // <div className='group relative'>
  return (
    <div className="group">
      <button className="capitalize cursor-pointer text-gray-700 rounded-lg focus:text-blue-600">
        {name}
      </button>
      <div className="absolute top-full border left-0 w-full bg-white shadow-xl z-50 hidden rounded-lg group-hover:block max-h-[70vh] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-5 gap-8">
            {/* <!-- Fashion Category --> */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Fashion</h3>
              <ul className="space-y-2 max-sm:flex items-center flex-wrap">
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-shirt w-6"></i>Men&quot;s Wear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-person-dress w-6"></i>
                    Women&quot;s Wear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-child w-6"></i>Kids Wear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-shoe-prints w-6"></i>
                    Footwear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-glasses w-6"></i>
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Electronics Category --> */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Electronics
              </h3>
              <ul className="space-y-2 max-sm:flex items-center flex-wrap">
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-mobile-screen w-6"></i>
                    Smartphones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-laptop w-6"></i>Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-tablet-screen-button w-6"></i>
                    Tablets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-tv w-6"></i>Television
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-headphones w-6"></i>Audio
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Home & Living --> */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Home &amp; Living
              </h3>
              <ul className="space-y-2 max-sm:flex items-center flex-wrap">
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-couch w-6"></i>Furniture
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-bed w-6"></i>Bedding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-kitchen-set w-6"></i>
                    Kitchen
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-lamp w-6"></i>Lighting
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-box w-6"></i>Decor
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Beauty & Health --> */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Beauty &amp; Health
              </h3>
              <ul className="space-y-2 max-sm:flex items-center flex-wrap">
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-spa w-6"></i>Skincare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-pump-soap w-6"></i>
                    Haircare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-prescription-bottle w-6"></i>
                    Makeup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-dumbbell w-6"></i>Fitness
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <i className="fa-solid fa-pills w-6"></i>Healthcare
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Featured Brands --> */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Featured Brands
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded hover:shadow-lg transition-shadow">
                  <i className="fa-solid fa-star text-2xl mb-2"></i>
                  <p className="text-sm">Brand 1</p>
                </div>
                <div className="text-center p-4 border rounded hover:shadow-lg transition-shadow">
                  <i className="fa-solid fa-star text-2xl mb-2"></i>
                  <p className="text-sm">Brand 2</p>
                </div>
                <div className="text-center p-4 border rounded hover:shadow-lg transition-shadow">
                  <i className="fa-solid fa-star text-2xl mb-2"></i>
                  <p className="text-sm">Brand 3</p>
                </div>
                <div className="text-center p-4 border rounded hover:shadow-lg transition-shadow">
                  <i className="fa-solid fa-star text-2xl mb-2"></i>
                  <p className="text-sm">Brand 4</p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Bottom Banner --> */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Special Offer!</h4>
                <p className="text-sm text-gray-600">
                  Get 20% off on your first purchase
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Shop Now
                </button>
              </div>
              <i className="fa-solid fa-gift text-6xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
