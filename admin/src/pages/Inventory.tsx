const Inventory = () => {
  return (
    <div id="inventory" className="sm:p-6 p-2 bg-[#E5E7EB]">
      {/* <!-- Header --> */}
      <div className="mb-6 sm:flex-row flex gap-2 flex-col items-center sm:justify-between justify-center">
        <h1 className="text-2xl font-semibold">Inventory Management</h1>
        <div className="flex space-x-3">
          <button className="bg-white border border-neutral-200/30 text-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span>Export</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* <!-- Stats Overview --> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-semibold">1,245</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <h3 className="text-2xl font-semibold">28</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h3 className="text-2xl font-semibold">12</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <h3 className="text-2xl font-semibold">8</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Inventory Table --> */}
      <div className="bg-white rounded-lg border border-neutral-200/30">
        <div className="p-6 border-b border-neutral-200/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Search inventory..."
              className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
              <select className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500">
                <option>Stock Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200/30">
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">SKU</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Reserved</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200/30">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Wireless Earbuds</p>
                      <p className="text-sm text-gray-500">Black</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">WE-001</td>
                <td className="p-4">Electronics</td>
                <td className="p-4">45</td>
                <td className="p-4">5</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    In Stock
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Adjust Stock">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <!-- Pagination --> */}
        <div className="sm:flex-row flex gap-2 flex-col items-center sm:justify-between justify-center p-4 border-t border-neutral-200/30">
          <p className="text-sm text-gray-500">
            Showing 1 to 10 of 45 products
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
