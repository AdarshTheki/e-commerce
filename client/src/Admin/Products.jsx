import React from 'react';

const Products = () => {
    return (
        <div id='products' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            {/* <!-- Header --> */}
            <div className='mb-6 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Products</h1>
                <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-200'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                    </svg>
                    <span>Add Product</span>
                </button>
            </div>

            {/* <!-- Filters --> */}
            <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
                <input
                    type='text'
                    placeholder='Search products...'
                    className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'
                />
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>All Categories</option>
                    <option value='electronics'>Electronics</option>
                    <option value='clothing'>Clothing</option>
                    <option value='accessories'>Accessories</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Status</option>
                    <option value='in-stock'>In Stock</option>
                    <option value='out-of-stock'>Out of Stock</option>
                    <option value='low-stock'>Low Stock</option>
                </select>
                <select className='px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-indigo-500 bg-white'>
                    <option value=''>Sort By</option>
                    <option value='price-asc'>Price: Low to High</option>
                    <option value='price-desc'>Price: High to Low</option>
                    <option value='name-asc'>Name: A to Z</option>
                    <option value='name-desc'>Name: Z to A</option>
                </select>
            </div>

            {/* <!-- Products Table --> */}
            <div className='bg-white rounded-lg border border-neutral-200/30'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-neutral-200/30'>
                                <th className='text-left p-4'>Product</th>
                                <th className='text-left p-4'>Category</th>
                                <th className='text-left p-4'>Price</th>
                                <th className='text-left p-4'>Stock</th>
                                <th className='text-left p-4'>Status</th>
                                <th className='text-left p-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-neutral-200/30'>
                                <td className='p-4'>
                                    <div className='flex items-center space-x-3'>
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
                                            <p className='font-medium text-nowrap'>
                                                Wireless Earbuds
                                            </p>
                                            <p className='text-sm text-gray-500 text-nowrap'>
                                                SKU: WE-001
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>Electronics</td>
                                <td className='p-4'>$129.99</td>
                                <td className='p-4'>45</td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'>
                                        In Stock
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
                                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                            </svg>
                                        </button>
                                        <button className='p-2 text-red-600 hover:bg-red-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className='border-b border-neutral-200/30'>
                                <td className='p-4'>
                                    <div className='flex items-center space-x-3'>
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
                                            <p className='font-medium'>Smart Watch</p>
                                            <p className='text-sm text-gray-500'>SKU: SW-002</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>Gadgets</td>
                                <td className='p-4'>$199.99</td>
                                <td className='p-4'>12</td>
                                <td className='p-4'>
                                    <span className='px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full text-nowrap'>
                                        Low Stock
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
                                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                            </svg>
                                        </button>
                                        <button className='p-2 text-red-600 hover:bg-red-50 rounded-lg'>
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
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
                    <p className='text-sm text-gray-500'>Showing 1 to 10 of 45 entries</p>
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

export default Products;
