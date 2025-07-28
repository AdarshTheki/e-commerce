const Analytics = () => {
  return (
    <div>
      {/* <!-- Header --> */}
      <div className="mb-6 sm:flex-row flex gap-2 flex-col items-center sm:justify-between justify-center">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
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
        </div>
      </div>

      {/* <!-- Key Metrics --> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-semibold">$24,567.89</h3>
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm text-green-500">+12.5% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <h3 className="text-2xl font-semibold">456</h3>
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm text-green-500">+8.2% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-semibold">3.2%</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm text-red-500">-1.5% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <h3 className="text-2xl font-semibold">$124.32</h3>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm text-green-500">+5.3% from last period</p>
        </div>
      </div>

      {/* <!-- Charts Section --> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* <!-- Revenue Chart --> */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* <!-- Chart Placeholder --> */}
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>

        {/* <!-- Orders Chart --> */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200/30">
          <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* <!-- Chart Placeholder --> */}
            <p className="text-gray-500">Orders Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* <!-- Top Products & Categories --> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <!-- Top Products --> */}
        <div className="bg-white rounded-lg border border-neutral-200/30">
          <div className="p-6 border-b border-neutral-200/30">
            <h3 className="text-lg font-semibold">Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                    <h4 className="font-medium">Wireless Earbuds</h4>
                    <p className="text-sm text-gray-500">1,234 units sold</p>
                  </div>
                </div>
                <p className="font-medium">$45,678</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Smart Watch</h4>
                    <p className="text-sm text-gray-500">856 units sold</p>
                  </div>
                </div>
                <p className="font-medium">$34,567</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Top Categories --> */}
        <div className="bg-white rounded-lg border border-neutral-200/30">
          <div className="p-6 border-b border-neutral-200/30">
            <h3 className="text-lg font-semibold">Category Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Electronics</h4>
                  <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                    <div className="w-3/4 h-full bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
                <p className="font-medium">45%</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Accessories</h4>
                  <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                    <div className="w-1/2 h-full bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
                <p className="font-medium">30%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
