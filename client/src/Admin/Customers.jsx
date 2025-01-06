import React from 'react';

const Customers = () => {
    return (
        <div id='customers' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            {/* <!-- Header --> */}
            <div className='mb-6 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Customers</h1>
                <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-200'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                    </svg>
                    <span>Add Customer</span>
                </button>
            </div>

            {/* <!-- Filters --> */}
            <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
                <input
                    type='text'
                    placeholder='Search customers...'
                    className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'
                />
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Status</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Member Type</option>
                    <option value='regular'>Regular</option>
                    <option value='premium'>Premium</option>
                    <option value='vip'>VIP</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Sort By</option>
                    <option value='recent'>Most Recent</option>
                    <option value='orders'>Most Orders</option>
                    <option value='spending'>Highest Spending</option>
                </select>
            </div>

            {/* <!-- Customers Grid --> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* <!-- Customer Card --> */}
                <div className='bg-white rounded-lg border border-neutral-200/30 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center space-x-4'>
                            <img
                                src='https://avatar.iran.liara.run/public'
                                alt='Customer'
                                className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            <div>
                                <h3 className='font-medium'>John Doe</h3>
                                <p className='text-sm text-gray-500'>john@example.com</p>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <button className='p-2 text-gray-600 hover:bg-gray-50 rounded-lg'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Member Since</span>
                            <span>Dec 15, 2023</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Orders</span>
                            <span>24</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Spent</span>
                            <span>$2,156.00</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Status</span>
                            <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>
                                Active
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex space-x-3'>
                        <button className='flex-1 px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50'>
                            View Profile
                        </button>
                        <button className='flex-1 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
                            Message
                        </button>
                    </div>
                </div>

                {/* <!-- Customer Card --> */}
                <div className='bg-white rounded-lg border border-neutral-200/30 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center space-x-4'>
                            <img
                                src='https://avatar.iran.liara.run/public'
                                alt='Customer'
                                className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            <div>
                                <h3 className='font-medium'>Jane Smith</h3>
                                <p className='text-sm text-gray-500'>jane@example.com</p>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <button className='p-2 text-gray-600 hover:bg-gray-50 rounded-lg'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Member Since</span>
                            <span>Nov 28, 2023</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Orders</span>
                            <span>18</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Spent</span>
                            <span>$1,856.00</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Status</span>
                            <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>
                                Active
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex space-x-3'>
                        <button className='flex-1 px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50'>
                            View Profile
                        </button>
                        <button className='flex-1 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
                            Message
                        </button>
                    </div>
                </div>

                {/* <!-- Customer Card --> */}
                <div className='bg-white rounded-lg border border-neutral-200/30 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center space-x-4'>
                            <img
                                src='https://avatar.iran.liara.run/public'
                                alt='Customer'
                                className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            <div>
                                <h3 className='font-medium'>Mike Johnson</h3>
                                <p className='text-sm text-gray-500'>mike@example.com</p>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <button className='p-2 text-gray-600 hover:bg-gray-50 rounded-lg'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Member Since</span>
                            <span>Oct 10, 2023</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Orders</span>
                            <span>32</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Total Spent</span>
                            <span>$3,242.00</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-500'>Status</span>
                            <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>
                                Active
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex space-x-3'>
                        <button className='flex-1 px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50'>
                            View Profile
                        </button>
                        <button className='flex-1 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
                            Message
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Pagination --> */}
            <div className='mt-6 sm:flex-row flex gap-2 flex-col items-center sm:justify-between justify-center'>
                <p className='text-sm text-gray-500'>Showing 1 to 9 of 45 customers</p>
                <div className='flex space-x-2'>
                    <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
                        Previous
                    </button>
                    <button className='px-3 py-1 bg-indigo-600 text-white rounded-lg'>1</button>
                    <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
                        2
                    </button>
                    <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
                        3
                    </button>
                    <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customers;
