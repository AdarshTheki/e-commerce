import React from 'react';

const Settings = () => {
    return (
        <div id='settings' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            {/* <!-- Header --> */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold'>Settings</h1>
                <p className='text-gray-500 mt-1'>
                    Manage your store preferences and configurations
                </p>
            </div>

            {/* <!-- Settings Grid --> */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* <!-- Left Sidebar Navigation --> */}
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-lg border border-neutral-200/30'>
                        <nav className='flex flex-col p-2'>
                            <button className='flex items-center space-x-2 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                                <span>General Settings</span>
                            </button>
                            <button className='flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                                <span>Store Hours</span>
                            </button>
                            <button className='flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'></path>
                                </svg>
                                <span>Payment Methods</span>
                            </button>
                            <button className='flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20'></path>
                                </svg>
                                <span>Shipping</span>
                            </button>
                            <button className='flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
                                </svg>
                                <span>Notifications</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* <!-- Main Settings Area --> */}
                <div className='lg:col-span-2'>
                    <div className='bg-white rounded-lg border border-neutral-200/30'>
                        <div className='p-6 border-b border-neutral-200/30'>
                            <h2 className='text-lg font-semibold'>General Settings</h2>
                            <p className='text-sm text-gray-500 mt-1'>
                                Update your store information and preferences
                            </p>
                        </div>

                        <div className='p-6 space-y-6'>
                            {/* <!-- Store Information --> */}
                            <div className='space-y-4'>
                                <h3 className='text-md font-medium'>Store Information</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Store Name
                                        </label>
                                        <input
                                            type='text'
                                            value='My Store'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Email Address
                                        </label>
                                        <input
                                            type='email'
                                            value='store@example.com'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Phone Number
                                        </label>
                                        <input
                                            type='tel'
                                            value='+1 234 567 890'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Currency
                                        </label>
                                        <select className='w-full px-4 py-2 border border-neu-200/30 rounded-lg focus:outline-none focus:border-indigo-500'>
                                            <option>USD ($)</option>
                                            <option>EUR (€)</option>
                                            <option>GBP (£)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Store Address --> */}
                            <div className='space-y-4'>
                                <h3 className='text-md font-medium'>Store Address</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='md:col-span-2'>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Street Address
                                        </label>
                                        <input
                                            type='text'
                                            value='123 Store Street'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            value='Store City'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            State/Province
                                        </label>
                                        <input
                                            type='text'
                                            value='Store State'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Postal Code
                                        </label>
                                        <input
                                            type='text'
                                            value='12345'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Country
                                        </label>
                                        <select className='w-full px-4 py-2 border border-neu-200/30 rounded-lg focus:outline-none focus:border-indigo-500'>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Save Button --> */}
                            <div className='flex justify-end'>
                                <button className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200'>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
