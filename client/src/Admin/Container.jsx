import React from 'react';

const Container = () => {
    // Mobile menu toggle
    // document.querySelector('.mobile-menu-button').addEventListener('click', function () {
    //     this.querySelector('.menu-icon').classList.toggle('hidden');
    //     this.querySelector('.close-icon').classList.toggle('hidden');
    // });

    // Active link handler
    // document.addEventListener('DOMContentLoaded', function () {
    //     const links = document.querySelectorAll('nav a');

    //     function setActiveLink() {
    //         const hash = window.location.hash || '#dashboard';
    //         links.forEach((link) => {
    //             if (link.getAttribute('href') === hash) {
    //                 link.classList.add('active', 'bg-gray-100');
    //             } else {
    //                 link.classList.remove('active', 'bg-gray-100');
    //             }
    //         });
    //     }

    //     window.addEventListener('hashchange', setActiveLink);
    //     setActiveLink();
    // });

    // Close mobile menu when clicking outside
    // document.addEventListener('click', function (event) {
    //     const mobileMenu = document.querySelector('.mobile-menu');
    //     const menuButton = document.querySelector('.mobile-menu-button');

    //     if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
    //         mobileMenu.classList.add('hidden');
    //         menuButton.querySelector('.menu-icon').classList.remove('hidden');
    //         menuButton.querySelector('.close-icon').classList.add('hidden');
    //     }
    // });
    return (
        <div id='root' className='bg-[#E5E7EB]'>
            <div className='flex'>
                {/* <!-- Desktop Menu --> */}
                <nav className='h-screen sticky top-0 flex-shrink-0 w-64 bg-white border-r border-neutral-200/30 hidden lg:block'>
                    <div className='flex flex-col h-full'>
                        <div className='p-6'>
                            <div className='flex items-center space-x-2'>
                                <svg
                                    className='w-8 h-8 text-indigo-600'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                                </svg>
                                <span className='text-xl font-semibold'>Admin</span>
                            </div>
                        </div>
                        <div className='flex-1 px-4 space-y-1'>
                            <a
                                href='#dashboard'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
                                </svg>
                                <span className='ml-3'>Dashboard</span>
                            </a>
                            <a
                                href='#products'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
                                </svg>
                                <span className='ml-3'>Products</span>
                            </a>
                            <a
                                href='#orders'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'></path>
                                </svg>
                                <span className='ml-3'>Orders</span>
                            </a>
                            <a
                                href='#customers'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100 active bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                                </svg>
                                <span className='ml-3'>Customers</span>
                            </a>
                            <a
                                href='#inventory'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                                </svg>
                                <span className='ml-3'>Inventory</span>
                            </a>
                            <a
                                href='#analytics'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                                </svg>
                                <span className='ml-3'>Analytics</span>
                            </a>
                            <a
                                href='#settings'
                                className='flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
                                </svg>
                                <span className='ml-3'>settings</span>
                            </a>
                        </div>
                        <div className='p-4 border-t border-neutral-200/30'>
                            <a href='#profile' className='flex items-center space-x-3'>
                                <img
                                    src='https://avatar.iran.liara.run/public'
                                    className='w-10 h-10 rounded-full transition-opacity duration-300 opacity-100'
                                    loading='lazy'
                                />
                                <div>
                                    <p className='text-sm font-medium'>Admin User</p>
                                    <p className='text-xs text-gray-500'>admin@example.com</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>

                {/* <!-- Mobile Menu Button Fixed --> */}
                <div className='lg:hidden fixed top-4 right-2 z-50'>
                    <button
                        type='button'
                        className='mobile-menu-button bg-white p-2 rounded-lg focus:outline-none'
                        onClick={() =>
                            document.querySelector('.mobile-menu').classList.toggle('hidden')
                        }>
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                className='menu-icon'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'></path>
                            <path
                                className='close-icon hidden'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    </button>
                </div>

                {/* <!-- Mobile Menu --> */}
                <div className='mobile-menu fixed inset-0 max-h-[60vh] rounded-b-2xl overflow-hidden shadow-lg bg-white z-40 hidden lg:hidden'>
                    <div className='p-4 space-y-4 h-full overflow-y-auto overflow-hidden'>
                        <a
                            href='#dashboard'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Dashboard
                        </a>
                        <a
                            href='#products'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Products
                        </a>
                        <a
                            href='#orders'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Orders
                        </a>
                        <a
                            href='#customers'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Customers
                        </a>
                        <a
                            href='#inventory'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Inventory
                        </a>
                        <a
                            href='#analytics'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Analytics
                        </a>
                        <a
                            href='#settings'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Settings
                        </a>
                        <a
                            href='#profile'
                            className='block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg'>
                            Profile
                        </a>
                    </div>
                </div>

                {/* Main Body */}
                <main className='flex-1 overflow-y-auto'>
                    <div className='sticky top-0 z-10 bg-white border-b border-neutral-200/30'>
                        <div className='sm:px-6 px-2 py-4 pr-14 flex items-center justify-between'>
                            <div className='flex-1'>
                                <input
                                    type='search'
                                    placeholder='Search...'
                                    className='w-full max-w-xs px-4 py-2 rounded-lg border border-neutral-200/30 focus:outline-none focus:border-indigo-500'
                                />
                            </div>
                            <div className='flex items-center'>
                                <button className='p-2 text-gray-600 hover:text-gray-900'>
                                    <svg
                                        className='w-6 h-6'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
                                    </svg>
                                </button>
                                <button className='text-gray-600 hover:text-gray-900'>
                                    <svg
                                        className='w-6 h-6'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'></path>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <mountpoint>{/* All components */}</mountpoint>
                </main>
            </div>
        </div>
    );
};

export default Container;