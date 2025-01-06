import React from 'react';

const productListing = () => {
    return (
        <section id='productListing' className='py-8 bg-gray-50'>
            {/* <!-- Breadcrumb --> */}
            <nav className='mb-8'>
                <ol className='flex items-center space-x-2 text-sm'>
                    <li>
                        <a href='#' className='text-gray-600 hover:text-blue-600'>
                            Home
                        </a>
                    </li>
                    <li>
                        <i className='fa-solid fa-chevron-right text-gray-400'></i>
                    </li>
                    <li>
                        <a href='#' className='text-gray-600 hover:text-blue-600'>
                            Electronics
                        </a>
                    </li>
                    <li>
                        <i className='fa-solid fa-chevron-right text-gray-400'></i>
                    </li>
                    <li>
                        <span className='text-gray-900'>Smartphones</span>
                    </li>
                </ol>
            </nav>

            <div className='flex flex-col lg:flex-row gap-2'>
                {/* <!-- Filters Sidebar --> */}
                <div className='lg:w-1/4'>
                    <div className='bg-white rounded-lg shadow-sm p-6'>
                        <h2 className='font-bold text-lg mb-4'>Filters</h2>

                        {/* <!-- Price Range --> */}
                        <div className='mb-6'>
                            <h3 className='font-semibold mb-3'>Price Range</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center'>
                                    <input
                                        type='range'
                                        className='w-full'
                                        min='0'
                                        max='1000'
                                        step='10'
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <input
                                        type='number'
                                        className='w-24 px-2 py-1 border rounded'
                                        placeholder='Min'
                                    />
                                    <input
                                        type='number'
                                        className='w-24 px-2 py-1 border rounded'
                                        placeholder='Max'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Brand Filter --> */}
                        <div className='mb-6'>
                            <h3 className='font-semibold mb-3'>Brand</h3>
                            <div className='space-y-2'>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='form-checkbox text-blue-600'
                                    />
                                    <span className='ml-2'>Apple (24)</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='form-checkbox text-blue-600'
                                    />
                                    <span className='ml-2'>Samsung (36)</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='form-checkbox text-blue-600'
                                    />
                                    <span className='ml-2'>Google (12)</span>
                                </label>
                            </div>
                        </div>

                        {/* <!-- Rating Filter --> */}
                        <div className='mb-6'>
                            <h3 className='font-semibold mb-3'>Rating</h3>
                            <div className='space-y-2'>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='rating'
                                        className='form-radio text-blue-600'
                                    />
                                    <span className='ml-2 flex items-center'>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <span className='ml-1'>(5)</span>
                                    </span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='rating'
                                        className='form-radio text-blue-600'
                                    />
                                    <span className='ml-2 flex items-center'>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-regular fa-star text-yellow-400'></i>
                                        <span className='ml-1'>(4+)</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* <!-- Apply Filters Button --> */}
                        <button className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* <!-- Product Grid --> */}
                <div className='lg:w-3/4'>
                    {/* <!-- Sort and View Options --> */}
                    <div className='bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                            <span className='text-gray-600'>Sort by:</span>
                            <select className='border rounded px-2 py-1'>
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Customer Rating</option>
                            </select>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <span className='text-gray-600'>View:</span>
                            <button className='p-2 hover:bg-gray-100 rounded-lg'>
                                <i className='fa-solid fa-grid text-gray-600'></i>
                            </button>
                            <button className='p-2 hover:bg-gray-100 rounded-lg'>
                                <i className='fa-solid fa-list text-gray-600'></i>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Products Grid --> */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {/* <!-- Product Card --> */}
                        <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
                            <div className='relative'>
                                <img
                                    src='https://placehold.co/300x300'
                                    alt='Product'
                                    className='w-full transition-opacity duration-300 opacity-100'
                                    loading='lazy'
                                />
                                <div className='absolute top-2 right-2 space-y-2'>
                                    <button className='bg-white p-2 rounded-full shadow hover:bg-gray-100'>
                                        <i className='fa-regular fa-heart text-gray-600'></i>
                                    </button>
                                </div>
                                <div className='absolute top-2 left-2'>
                                    <span className='bg-red-500 text-white px-2 py-1 text-sm rounded'>
                                        -20%
                                    </span>
                                </div>
                            </div>
                            <div className='p-4'>
                                <h3 className='font-semibold mb-2'>Smartphone X Pro</h3>
                                <div className='flex items-center mb-2'>
                                    <i className='fa-solid fa-star text-yellow-400'></i>
                                    <i className='fa-solid fa-star text-yellow-400'></i>
                                    <i className='fa-solid fa-star text-yellow-400'></i>
                                    <i className='fa-solid fa-star text-yellow-400'></i>
                                    <i className='fa-solid fa-star-half-alt text-yellow-400'></i>
                                    <span className='ml-2 text-sm text-gray-600'>(45)</span>
                                </div>
                                <div className='flex items-center justify-between mb-4'>
                                    <div>
                                        <span className='text-lg font-bold'>$799.99</span>
                                        <span className='text-sm text-gray-500 line-through ml-2'>
                                            $999.99
                                        </span>
                                    </div>
                                    <span className='text-green-600 text-sm'>In Stock</span>
                                </div>
                                <button className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* <!-- Repeat Product Card structure for more items --> */}
                        {/* <!-- Additional products would be identical in structure but with different content --> */}
                    </div>

                    {/* <!-- Pagination --> */}
                    <div className='mt-8 flex justify-center'>
                        <nav className='flex items-center space-x-2'>
                            <button className='p-2 border rounded hover:bg-gray-100'>
                                <i className='fa-solid fa-chevron-left'></i>
                            </button>
                            <button className='px-4 py-2 border rounded bg-blue-600 text-white'>
                                1
                            </button>
                            <button className='px-4 py-2 border rounded hover:bg-gray-100'>
                                2
                            </button>
                            <button className='px-4 py-2 border rounded hover:bg-gray-100'>
                                3
                            </button>
                            <span className='px-4 py-2'>...</span>
                            <button className='px-4 py-2 border rounded hover:bg-gray-100'>
                                10
                            </button>
                            <button className='p-2 border rounded hover:bg-gray-100'>
                                <i className='fa-solid fa-chevron-right'></i>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default productListing;
