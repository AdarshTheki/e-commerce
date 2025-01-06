import React from 'react';

const Cart = () => {
    return (
        <section id='cart' className='py-8 bg-gray-50'>
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
                            <span className='text-gray-900'>Shopping Cart</span>
                        </li>
                    </ol>
                </nav>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* <!-- Cart Items --> */}
                    <div className='lg:w-2/3'>
                        <div className='bg-white rounded-lg shadow-sm'>
                            <div className='p-6 border-b'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>Shopping Cart (3)</h1>
                                    <button className='text-gray-600 hover:text-red-600'>
                                        <i className='fa-regular fa-trash-can mr-2'></i>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Cart Item --> */}
                            <div className='p-6 border-b'>
                                <div className='flex items-center'>
                                    <img
                                        src='https://placehold.co/120x120'
                                        alt='Product'
                                        className='w-24 h-24 object-cover rounded transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                    <div className='flex-1 ml-6'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <h3 className='font-semibold'>Smartphone X Pro</h3>
                                                <p className='text-sm text-gray-600'>
                                                    Color: Black, Storage: 128GB
                                                </p>
                                                <div className='flex items-center mt-2'>
                                                    <span className='text-sm text-gray-600'>
                                                        Unit Price:
                                                    </span>
                                                    <span className='ml-2 font-semibold'>
                                                        $799.99
                                                    </span>
                                                </div>
                                            </div>
                                            <button className='text-gray-400 hover:text-red-600'>
                                                <i className='fa-solid fa-times'></i>
                                            </button>
                                        </div>
                                        <div className='flex items-center justify-between mt-4'>
                                            <div className='flex items-center border rounded'>
                                                <button className='px-3 py-1 hover:bg-gray-100'>
                                                    -
                                                </button>
                                                <input
                                                    type='number'
                                                    value='1'
                                                    className='w-12 text-center border-x'
                                                    min='1'
                                                />
                                                <button className='px-3 py-1 hover:bg-gray-100'>
                                                    +
                                                </button>
                                            </div>
                                            <span className='font-bold'>$799.99</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Repeat Cart Item --> */}
                            <div className='p-6 border-b'>
                                <div className='flex items-center'>
                                    <img
                                        src='https://placehold.co/120x120'
                                        alt='Product'
                                        className='w-24 h-24 object-cover rounded transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                    <div className='flex-1 ml-6'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <h3 className='font-semibold'>
                                                    Wireless Headphones
                                                </h3>
                                                <p className='text-sm text-gray-600'>
                                                    Color: White
                                                </p>
                                                <div className='flex items-center mt-2'>
                                                    <span className='text-sm text-gray-600'>
                                                        Unit Price:
                                                    </span>
                                                    <span className='ml-2 font-semibold'>
                                                        $149.99
                                                    </span>
                                                </div>
                                            </div>
                                            <button className='text-gray-400 hover:text-red-600'>
                                                <i className='fa-solid fa-times'></i>
                                            </button>
                                        </div>
                                        <div className='flex items-center justify-between mt-4'>
                                            <div className='flex items-center border rounded'>
                                                <button className='px-3 py-1 hover:bg-gray-100'>
                                                    -
                                                </button>
                                                <input
                                                    type='number'
                                                    value='1'
                                                    className='w-12 text-center border-x'
                                                    min='1'
                                                />
                                                <button className='px-3 py-1 hover:bg-gray-100'>
                                                    +
                                                </button>
                                            </div>
                                            <span className='font-bold'>$149.99</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Continue Shopping --> */}
                            <div className='p-6'>
                                <button className='flex items-center text-blue-600 hover:text-blue-700'>
                                    <i className='fa-solid fa-arrow-left mr-2'></i>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Order Summary --> */}
                    <div className='lg:w-1/3'>
                        <div className='bg-white rounded-lg shadow-sm p-6'>
                            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

                            <div className='space-y-4'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Subtotal (3 items)</span>
                                    <span className='font-semibold'>$949.98</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Shipping</span>
                                    <span className='font-semibold'>Free</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Tax</span>
                                    <span className='font-semibold'>$95.00</span>
                                </div>

                                {/* <!-- Promo Code --> */}
                                <div className='border-t pt-4'>
                                    <div className='flex'>
                                        <input
                                            type='text'
                                            placeholder='Enter promo code'
                                            className='flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-600'
                                        />
                                        <button className='px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors'>
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* <!-- Total --> */}
                                <div className='border-t pt-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg font-bold'>Total</span>
                                        <span className='text-2xl font-bold'>$1,044.98</span>
                                    </div>
                                </div>

                                {/* <!-- Checkout Button --> */}
                                <button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                                    Proceed to Checkout
                                </button>

                                {/* <!-- Secure Transaction --> */}
                                <div className='flex items-center justify-center text-gray-600 text-sm'>
                                    <i className='fa-solid fa-lock mr-2'></i>
                                    Secure Transaction
                                </div>
                            </div>
                        </div>

                        {/* <!-- Accepted Payment Methods --> */}
                        <div className='mt-6 bg-white rounded-lg shadow-sm p-6'>
                            <h3 className='font-semibold mb-4'>Accepted Payment Methods</h3>
                            <div className='flex space-x-4'>
                                <i className='fa-brands fa-cc-visa text-2xl text-gray-600'></i>
                                <i className='fa-brands fa-cc-mastercard text-2xl text-gray-600'></i>
                                <i className='fa-brands fa-cc-amex text-2xl text-gray-600'></i>
                                <i className='fa-brands fa-cc-paypal text-2xl text-gray-600'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
