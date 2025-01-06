import React from 'react';

const Header = () => {
    return (
        <header id='header' className='fixed top-0 left-0 w-full bg-white shadow-sm z-50'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* <!-- Top Bar --> */}
                <div className='hidden lg:flex justify-between items-center py-2 text-sm border-b'>
                    <div className='flex items-center space-x-6'>
                        <a href='#' className='flex items-center hover:text-blue-600'>
                            <i className='fa-solid fa-phone mr-2'></i>
                            <span>+1 234 567 890</span>
                        </a>
                        <a href='#' className='flex items-center hover:text-blue-600'>
                            <i className='fa-solid fa-envelope mr-2'></i>
                            <span>support@store.com</span>
                        </a>
                    </div>
                    <div className='flex items-center space-x-6'>
                        <a href='#' className='hover:text-blue-600'>
                            Track Order
                        </a>
                        <a href='#' className='hover:text-blue-600'>
                            Store Locator
                        </a>
                    </div>
                </div>

                {/* <!-- Main Header --> */}
                <div className='flex items-center justify-between py-4'>
                    {/* <!-- Mobile Menu Button --> */}
                    <button className='lg:hidden p-2 hover:bg-gray-100 rounded-lg'>
                        <i className='fa-solid fa-bars text-xl'></i>
                    </button>

                    {/* <!-- Logo --> */}
                    <a href='#' className='text-2xl font-bold'>
                        STORE
                    </a>

                    {/* <!-- Search Bar - Desktop --> */}
                    <div className='hidden lg:flex flex-1 max-w-2xl mx-8'>
                        <div className='relative w-full'>
                            <input
                                type='text'
                                placeholder='Search products...'
                                className='w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                            />
                            <button className='absolute right-3 top-1/2 -translate-y-1/2'>
                                <i className='fa-solid fa-search text-gray-400 hover:text-blue-600'></i>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Right Actions --> */}
                    <div className='flex items-center space-x-4'>
                        <button className='lg:hidden'>
                            <i className='fa-solid fa-search text-xl'></i>
                        </button>

                        <a href='#' className='relative hover:text-blue-600 hidden lg:block'>
                            <i className='fa-regular fa-heart text-xl'></i>
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                0
                            </span>
                        </a>

                        <a href='#' className='relative hover:text-blue-600'>
                            <i className='fa-solid fa-cart-shopping text-xl'></i>
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                0
                            </span>
                        </a>

                        <div className='hidden lg:flex items-center space-x-2'>
                            <img
                                src='https://avatar.iran.liara.run/public'
                                alt='User'
                                className='w-8 h-8 rounded-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            <div className='text-sm'>
                                <button className='hover:text-blue-600'>Sign In</button>
                                <span className='px-2'>|</span>
                                <button className='hover:text-blue-600'>Register</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Navigation - Desktop --> */}
                <nav className='hidden lg:block border-t'>
                    <ul className='flex items-center space-x-8 py-4'>
                        <li>
                            <a href='#' className='hover:text-blue-600 font-medium'>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-blue-600'>
                                Categories
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-blue-600'>
                                Brands
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-blue-600'>
                                New Arrivals
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-blue-600'>
                                Deals
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-blue-600'>
                                Clearance
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
