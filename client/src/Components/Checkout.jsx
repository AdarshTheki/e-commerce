import React from 'react';

const Checkout = () => {
    return (
        <section id='checkout' className='py-8 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* <!-- Checkout Progress --> */}
                <div className='mb-8'>
                    <div className='flex items-center justify-center space-x-4'>
                        <div className='flex items-center'>
                            <div className='bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                                1
                            </div>
                            <span className='ml-2 font-semibold'>Shipping</span>
                        </div>
                        <div className='w-24 h-0.5 bg-gray-300'></div>
                        <div className='flex items-center'>
                            <div className='border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                                2
                            </div>
                            <span className='ml-2'>Payment</span>
                        </div>
                        <div className='w-24 h-0.5 bg-gray-300'></div>
                        <div className='flex items-center'>
                            <div className='border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                                3
                            </div>
                            <span className='ml-2'>Review</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* <!-- Checkout Form --> */}
                    <div className='lg:w-2/3'>
                        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
                            <h2 className='text-xl font-bold mb-6'>Shipping Information</h2>
                            <form className='space-y-6'>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium mb-2'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium mb-2'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='tel'
                                        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium mb-2'>
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Apartment, suite, etc. (optional)'
                                        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            State
                                        </label>
                                        <select className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'>
                                            <option>Select State</option>
                                            {/* <!-- Add state options --> */}
                                        </select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            ZIP Code
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium mb-2'>
                                            Country
                                        </label>
                                        <select className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600'>
                                            <option>Select Country</option>
                                            {/* <!-- Add country options --> */}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className='flex items-center'>
                                        <input
                                            type='checkbox'
                                            className='form-checkbox text-blue-600'
                                        />
                                        <span className='ml-2'>
                                            Save this information for next time
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Shipping Method --> */}
                        <div className='bg-white rounded-lg shadow-sm p-6'>
                            <h2 className='text-xl font-bold mb-6'>Shipping Method</h2>
                            <div className='space-y-4'>
                                <label className='flex items-center p-4 border rounded cursor-pointer hover:border-blue-600'>
                                    <input
                                        type='radio'
                                        name='shipping'
                                        className='form-radio text-blue-600'
                                    />
                                    <span className='ml-2'>
                                        <span className='font-semibold'>Standard Shipping</span>
                                        <span className='block text-sm text-gray-600'>
                                            4-5 business days
                                        </span>
                                    </span>
                                    <span className='ml-auto font-semibold'>Free</span>
                                </label>

                                <label className='flex items-center p-4 border rounded cursor-pointer hover:border-blue-600'>
                                    <input
                                        type='radio'
                                        name='shipping'
                                        className='form-radio text-blue-600'
                                    />
                                    <span className='ml-2'>
                                        <span className='font-semibold'>Express Shipping</span>
                                        <span className='block text-sm text-gray-600'>
                                            2-3 business days
                                        </span>
                                    </span>
                                    <span className='ml-auto font-semibold'>$14.99</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Order Summary --> */}
                    <div className='lg:w-1/3'>
                        <div className='bg-white rounded-lg shadow-sm p-6'>
                            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

                            {/* <!-- Order Items --> */}
                            <div className='space-y-4 mb-6'>
                                <div className='flex items-center'>
                                    <img
                                        src='https://placehold.co/80x80'
                                        alt='Product'
                                        className='w-20 h-20 object-cover rounded transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                    <div className='ml-4 flex-1'>
                                        <h3 className='font-semibold'>Smartphone X Pro</h3>
                                        <p className='text-sm text-gray-600'>Qty: 1</p>
                                    </div>
                                    <span className='font-semibold'>$799.99</span>
                                </div>

                                <div className='flex items-center'>
                                    <img
                                        src='https://placehold.co/80x80'
                                        alt='Product'
                                        className='w-20 h-20 object-cover rounded transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                    <div className='ml-4 flex-1'>
                                        <h3 className='font-semibold'>Wireless Headphones</h3>
                                        <p className='text-sm text-gray-600'>Qty: 1</p>
                                    </div>
                                    <span className='font-semibold'>$149.99</span>
                                </div>
                            </div>

                            <div className='border-t pt-4 space-y-4'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Subtotal</span>
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
                                <div className='flex justify-between text-lg font-bold'>
                                    <span>Total</span>
                                    <span>$1,044.98</span>
                                </div>
                            </div>

                            <button className='w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                                Continue to Payment
                            </button>

                            {/* <!-- Security Badge --> */}
                            <div className='mt-6 flex items-center justify-center text-gray-600 text-sm'>
                                <i className='fa-solid fa-lock mr-2'></i>
                                Secure Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
