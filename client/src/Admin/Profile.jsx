import React from 'react';

const Profile = () => {
    return (
        <section id='profile' className='sm:p-6 p-2 bg-[#E5E7EB]'>
            <div className='bg-white'>
                <div className='p-6 sm:p-8'>
                    <div className='flex flex-col md:flex-row items-start gap-8'>
                        {/* <!-- Profile Image Section --> */}
                        <div className='w-full md:w-1/3'>
                            <div className='flex flex-col items-center'>
                                <div className='w-32 h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden'>
                                    <img
                                        src='https://placehold.co/400x400?text=Profile'
                                        alt='Profile'
                                        className='w-full h-full object-cover transition-opacity duration-300 opacity-100'
                                        loading='lazy'
                                    />
                                </div>
                                <button className='mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-white text-sm'>
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        {/* <!-- Profile Details Section --> */}
                        <div className='w-full md:w-2/3'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                Profile Settings
                            </h2>
                            <form className='space-y-6'>
                                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Email
                                        </label>
                                        <input
                                            type='email'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Phone
                                        </label>
                                        <input
                                            type='tel'
                                            className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Address
                                    </label>
                                    <textarea className='w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-indigo-500 h-24'></textarea>
                                </div>

                                <div className='flex sm:flex-row flex-col gap-4 items-center justify-between pt-4 border-t border-neutral-700/30'>
                                    <button
                                        type='button'
                                        className='px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-white'>
                                        Change Password
                                    </button>
                                    <button
                                        type='submit'
                                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Additional Settings Section --> */}
            <div className='mt-8 bg-white'>
                <div className='p-6 sm:p-8'>
                    <h3 className='text-xl font-semibold text-gray-900 mb-6'>Preferences</h3>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className='text-gray-700 font-medium'>Email Notifications</h4>
                                <p className='text-neutral-600 text-sm'>
                                    Receive emails about your account activity
                                </p>
                            </div>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' className='sr-only peer' />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className='text-gray-700 font-medium'>Order Updates</h4>
                                <p className='text-neutral-600 text-sm'>
                                    Get updates about your order status
                                </p>
                            </div>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' className='sr-only peer' />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className='text-gray-700 font-medium'>Marketing Preferences</h4>
                                <p className='text-gray-600 text-sm'>
                                    Receive marketing emails and promotions
                                </p>
                            </div>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' className='sr-only peer' />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
