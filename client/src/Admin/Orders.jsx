import React from 'react';

const Orders = () => {
    return (
        <div id='orders' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            {/* <!-- Header --> */}
            <div className='mb-6 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Orders</h1>
                <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-200'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                    </svg>
                    <span>Export Orders</span>
                </button>
            </div>

            {/* <!-- Filters --> */}
            <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
                <input
                    type='text'
                    placeholder='Search orders...'
                    className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'
                />
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Order Status</option>
                    <option value='pending'>Pending</option>
                    <option value='processing'>Processing</option>
                    <option value='completed'>Completed</option>
                    <option value='cancelled'>Cancelled</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Payment Status</option>
                    <option value='paid'>Paid</option>
                    <option value='unpaid'>Unpaid</option>
                    <option value='refunded'>Refunded</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Time Period</option>
                    <option value='today'>Today</option>
                    <option value='week'>This Week</option>
                    <option value='month'>This Month</option>
                    <option value='year'>This Year</option>
                </select>
            </div>

            {/* <!-- Orders Table --> */}
            <div className='bg-white rounded-lg border border-neutral-200/30'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-neutral-200/30'>
                                <th className='text-left p-4'>Order ID</th>
                                <th className='text-left p-4'>Customer</th>
                                <th className='text-left p-4'>Date</th>
                                <th className='text-left p-4'>Total</th>
                                <th className='text-left p-4'>Status</th>
                                <th className='text-left p-4'>Payment</th>
                                <th className='text-left p-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-neutral-200/30'>
                                <td className='p-4'>
                                    <span className='font-medium text-nowrap'>#ORD-12345</span>
                                </td>
                                <td className='p-4'>
                                    <div className='flex items-center space-x-3'>
                                        <img
                                            src='https://avatar.iran.liara.run/public'
                                            alt='Customer'
                                            className='w-8 h-8 rounded-full transition-opacity duration-300 opacity-100'
                                            loading='lazy'
                                        />
                                        <div>
                                            <p className='font-medium'>John Doe</p>
                                            <p className='text-sm text-gray-500'>
                                                john@example.com
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div>
                                        <p className='font-medium text-nowrap'>Dec 15, 2023</p>
                                        <p className='text-sm text-gray-500 text-nowrap'>2:30 PM</p>
                                    </div>
                                </td>
                                <td className='p-4'>$349.99</td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full'>
                                        Processing
                                    </span>
                                </td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'>
                                        Paid
                                    </span>
                                </td>
                                <td className='p-4'>
                                    <div className='flex space-x-2'>
                                        <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
                                            </svg>
                                        </button>
                                        <button className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className='border-b border-neutral-200/30'>
                                <td className='p-4'>
                                    <span className='font-medium text-nowrap'>#ORD-12346</span>
                                </td>
                                <td className='p-4'>
                                    <div className='flex items-center space-x-3'>
                                        <img
                                            src='https://avatar.iran.liara.run/public'
                                            alt='Customer'
                                            className='w-8 h-8 rounded-full transition-opacity duration-300 opacity-100'
                                            loading='lazy'
                                        />
                                        <div>
                                            <p className='font-medium'>Jane Smith</p>
                                            <p className='text-sm text-gray-500'>
                                                jane@example.com
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div>
                                        <p className='font-medium'>Dec 15, 2023</p>
                                        <p className='text-sm text-gray-500'>1:45 PM</p>
                                    </div>
                                </td>
                                <td className='p-4'>$129.99</td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'>
                                        Completed
                                    </span>
                                </td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'>
                                        Paid
                                    </span>
                                </td>
                                <td className='p-4'>
                                    <div className='flex space-x-2'>
                                        <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
                                            </svg>
                                        </button>
                                        <button className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <!-- Pagination --> */}
                <div className='sm:flex-row flex gap-2 flex-col items-center sm:justify-between justify-center p-4 border-t border-neutral-200/30'>
                    <p className='text-sm text-gray-500'>Showing 1 to 10 of 50 entries</p>
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
        </div>
    );
};

export default Orders;
