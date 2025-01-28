import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div>
      <div id='root' className='bg-[#E5E7EB]'>
        <div className='flex'>
          {/* <!-- Desktop Menu --> */}
          <Sidebar />

          {/* <!-- Mobile Menu Button Fixed --> */}
          <div className='lg:hidden fixed top-4 right-2 z-50'>
            <button
              type='button'
              className='mobile-menu-button bg-white p-2 rounded-lg focus:outline-none'
              // onClick={() =>
              //     document.querySelector('.mobile-menu').classList.toggle('hidden')
              // }
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
                    </svg>
                  </button>
                  <button className='text-gray-600 hover:text-gray-900'>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
            <>
              {/* All components */}
              <Outlet />
            </>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
