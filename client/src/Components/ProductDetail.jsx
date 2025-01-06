import React from 'react';

const productDetail = () => {
    return (
        <section id='productDetail' className='py-8 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4'>
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
                            <span className='text-gray-900'>Smartphone X Pro</span>
                        </li>
                    </ol>
                </nav>

                <div className='bg-white rounded-lg shadow-sm p-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* <!-- Product Images --> */}
                        <div className='space-y-4'>
                            <div className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                                <img
                                    src='https://placehold.co/600x600'
                                    alt='Product'
                                    className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                                    loading='lazy'
                                />
                            </div>
                            <div className='grid grid-cols-4 gap-4'>
                                <button className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                                    <img
                                        src='https://placehold.co/150x150'
                                        alt='Product thumbnail'
                                        className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                </button>
                                <button className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                                    <img
                                        src='https://placehold.co/150x150'
                                        alt='Product thumbnail'
                                        className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                </button>
                                <button className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                                    <img
                                        src='https://placehold.co/150x150'
                                        alt='Product thumbnail'
                                        className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                </button>
                                <button className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                                    <img
                                        src='https://placehold.co/150x150'
                                        alt='Product thumbnail'
                                        className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                </button>
                            </div>
                        </div>

                        {/* <!-- Product Info --> */}
                        <div className='space-y-6'>
                            <div>
                                <h1 className='text-3xl font-bold mb-2'>Smartphone X Pro</h1>
                                <div className='flex items-center space-x-4'>
                                    <div className='flex items-center'>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star text-yellow-400'></i>
                                        <i className='fa-solid fa-star-half-alt text-yellow-400'></i>
                                        <span className='ml-2 text-sm text-gray-600'>
                                            (128 reviews)
                                        </span>
                                    </div>
                                    <span className='text-green-600'>In Stock</span>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <div className='flex items-center'>
                                    <span className='text-3xl font-bold'>$799.99</span>
                                    <span className='ml-4 text-lg text-gray-500 line-through'>
                                        $999.99
                                    </span>
                                    <span className='ml-2 bg-red-500 text-white px-2 py-1 text-sm rounded'>
                                        20% OFF
                                    </span>
                                </div>
                                <p className='text-sm text-gray-600'>Price includes VAT</p>
                            </div>

                            {/* <!-- Color Selection --> */}
                            <div>
                                <h3 className='font-semibold mb-3'>Color</h3>
                                <div className='flex space-x-3'>
                                    <button className='w-8 h-8 bg-black rounded-full ring-2 ring-offset-2 ring-black'></button>
                                    <button className='w-8 h-8 bg-blue-600 rounded-full'></button>
                                    <button className='w-8 h-8 bg-gray-200 rounded-full'></button>
                                </div>
                            </div>

                            {/* <!-- Storage Selection --> */}
                            <div>
                                <h3 className='font-semibold mb-3'>Storage</h3>
                                <div className='grid grid-cols-3 gap-3'>
                                    <button className='border rounded-lg py-2 px-4 hover:border-blue-600'>
                                        128GB
                                    </button>
                                    <button className='border rounded-lg py-2 px-4 hover:border-blue-600'>
                                        256GB
                                    </button>
                                    <button className='border rounded-lg py-2 px-4 hover:border-blue-600'>
                                        512GB
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Quantity --> */}
                            <div>
                                <h3 className='font-semibold mb-3'>Quantity</h3>
                                <div className='flex items-center space-x-4'>
                                    <div className='flex items-center border rounded-lg'>
                                        <button className='px-4 py-2 hover:bg-gray-100'>-</button>
                                        <input
                                            type='number'
                                            value='1'
                                            className='w-16 text-center border-x'
                                            min='1'
                                        />
                                        <button className='px-4 py-2 hover:bg-gray-100'>+</button>
                                    </div>
                                    <span className='text-sm text-gray-600'>
                                        10 items available
                                    </span>
                                </div>
                            </div>

                            {/* <!-- Actions --> */}
                            <div className='flex space-x-4'>
                                <button className='flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                                    Add to Cart
                                </button>
                                <button className='p-3 border rounded-lg hover:bg-gray-100'>
                                    <i className='fa-regular fa-heart text-xl'></i>
                                </button>
                            </div>

                            {/* <!-- Delivery Info --> */}
                            <div className='border-t pt-6 space-y-4'>
                                <div className='flex items-center space-x-4'>
                                    <i className='fa-solid fa-truck text-2xl text-gray-600'></i>
                                    <div>
                                        <h4 className='font-semibold'>Free Delivery</h4>
                                        <p className='text-sm text-gray-600'>
                                            Enter your postal code for delivery availability
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <i className='fa-solid fa-rotate-left text-2xl text-gray-600'></i>
                                    <div>
                                        <h4 className='font-semibold'>30-Day Returns</h4>
                                        <p className='text-sm text-gray-600'>
                                            Shop with confidence
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Details Tabs --> */}
                    <div className='mt-12'>
                        <div className='border-b'>
                            <div className='flex space-x-8'>
                                <button className='py-4 border-b-2 border-blue-600 font-semibold'>
                                    Description
                                </button>
                                <button className='py-4 text-gray-600 hover:text-gray-900'>
                                    Specifications
                                </button>
                                <button className='py-4 text-gray-600 hover:text-gray-900'>
                                    Reviews (128)
                                </button>
                            </div>
                        </div>
                        <div className='py-6'>
                            <p className='text-gray-600 leading-relaxed'>
                                Experience the next generation of mobile technology with the
                                Smartphone X Pro. Featuring a stunning 6.7-inch OLED display,
                                advanced AI-powered camera system, and all-day battery life. The
                                device comes with the latest processor ensuring smooth performance
                                for all your tasks and gaming needs.
                            </p>
                            <ul className='mt-4 space-y-2'>
                                <li className='flex items-center text-gray-600'>
                                    <i className='fa-solid fa-check text-green-600 mr-2'></i>
                                    6.7-inch OLED Display
                                </li>
                                <li className='flex items-center text-gray-600'>
                                    <i className='fa-solid fa-check text-green-600 mr-2'></i>
                                    Triple Camera System
                                </li>
                                <li className='flex items-center text-gray-600'>
                                    <i className='fa-solid fa-check text-green-600 mr-2'></i>
                                    5G Connectivity
                                </li>
                                <li className='flex items-center text-gray-600'>
                                    <i className='fa-solid fa-check text-green-600 mr-2'></i>
                                    All-day Battery Life
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* <!-- Related Products --> */}
                <div className='mt-12'>
                    <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                        {/* <!-- Related Product Card --> */}
                        <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
                            <div className='aspect-w-1 aspect-h-1'>
                                <img
                                    src='https://placehold.co/300x300'
                                    alt='Related product'
                                    className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                                    loading='lazy'
                                />
                            </div>
                            <div className='p-4'>
                                <h3 className='font-semibold'>Smartphone Y</h3>
                                <div className='flex items-center mt-2'>
                                    <span className='font-bold'>$699.99</span>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Repeat for other related products --> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default productDetail;
