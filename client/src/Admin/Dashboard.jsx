import React from 'react';

const Dashboard = () => {
    return (
        <div id='dashboard' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            {/* <!-- Stats Grid --> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
                <div className='bg-white p-6 rounded-lg border border-neutral-200/30'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Revenue</p>
                            <h3 className='text-2xl font-semibold'>$54,239</h3>
                            <p className='text-green-500 text-sm'>+8.4% from last month</p>
                        </div>
                        <div className='p-3 bg-indigo-100 rounded-lg'>
                            <svg
                                className='w-6 h-6 text-indigo-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg border border-neutral-200/30'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Orders</p>
                            <h3 className='text-2xl font-semibold'>1,245</h3>
                            <p className='text-green-500 text-sm'>+12% from last month</p>
                        </div>
                        <div className='p-3 bg-blue-100 rounded-lg'>
                            <svg
                                className='w-6 h-6 text-blue-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg border border-neutral-200/30'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Products</p>
                            <h3 className='text-2xl font-semibold'>384</h3>
                            <p className='text-red-500 text-sm'>-2.3% from last month</p>
                        </div>
                        <div className='p-3 bg-green-100 rounded-lg'>
                            <svg
                                className='w-6 h-6 text-green-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg border border-neutral-200/30'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-sm text-gray-500'>Total Customers</p>
                            <h3 className='text-2xl font-semibold'>2,874</h3>
                            <p className='text-green-500 text-sm'>+4.6% from last month</p>
                        </div>
                        <div className='p-3 bg-purple-100 rounded-lg'>
                            <svg
                                className='w-6 h-6 text-purple-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Recent Orders and Top Products --> */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* <!-- Recent Orders --> */}
                <div className='bg-white rounded-lg border border-neutral-200/30'>
                    <div className='p-6 border-b border-neutral-200/30'>
                        <h2 className='text-lg font-semibold'>Recent Orders</h2>
                    </div>
                    <div className='p-6'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='text-left border-b border-neutral-200/30'>
                                        <th className='pb-3 pr-4 text-nowrap'>Order ID</th>
                                        <th className='pb-3 pr-4 text-nowrap'>Customer</th>
                                        <th className='pb-3 pr-4 text-nowrap'>Status</th>
                                        <th className='pb-3 pr-4 text-nowrap'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b border-neutral-200/30'>
                                        <td className='py-3'>#45672</td>
                                        <td className='py-3'>John Doe</td>
                                        <td className='py-3'>
                                            <span className='px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'>
                                                Completed
                                            </span>
                                        </td>
                                        <td className='py-3'>$125.00</td>
                                    </tr>
                                    <tr className='border-b border-neutral-200/30'>
                                        <td className='py-3'>#45673</td>
                                        <td className='py-3'>Jane Smith</td>
                                        <td className='py-3'>
                                            <span className='px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full'>
                                                Pending
                                            </span>
                                        </td>
                                        <td className='py-3'>$243.00</td>
                                    </tr>
                                    <tr className='border-b border-neutral-200/30'>
                                        <td className='py-3'>#45674</td>
                                        <td className='py-3'>Robert Johnson</td>
                                        <td className='py-3'>
                                            <span className='px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full'>
                                                Cancelled
                                            </span>
                                        </td>
                                        <td className='py-3'>$75.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* <!-- Top Products --> */}
                <div className='bg-white rounded-lg border border-neutral-200/30'>
                    <div className='p-6 border-b border-neutral-200/30'>
                        <h2 className='text-lg font-semibold'>Top Products</h2>
                    </div>
                    <div className='p-6'>
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                                        <svg
                                            className='w-6 h-6 text-gray-600'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Wireless Earbuds</h3>
                                        <p className='text-sm text-gray-500'>Electronics</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium'>$239.00</p>
                                    <p className='text-sm text-green-500'>+12 sold</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                                        <svg
                                            className='w-6 h-6 text-gray-600'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Laptop Sleeve</h3>
                                        <p className='text-sm text-gray-500'>Accessories</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium'>$49.00</p>
                                    <p className='text-sm text-green-500'>+8 sold</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                                        <svg
                                            className='w-6 h-6 text-gray-600'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Smart Watch</h3>
                                        <p className='text-sm text-gray-500'>Gadgets</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium'>$199.00</p>
                                    <p className='text-sm text-green-500'>+6 sold</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;