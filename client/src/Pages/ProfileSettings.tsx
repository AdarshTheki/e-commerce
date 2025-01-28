import { useState } from 'react';
import { Input } from '../../Utils';

const Profile = () => {
    const [tab, setTab] = useState('setting');
    return (
        <section id='profile' className='sm:p-6 p-2 bg-[#E5E7EB] min-h-[80vh]'>
            <div className='bg-white p-6 sm:flex justify-evenly'>
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
                <div className='sm:w-1/2'>
                    <nav className='space-x-8 my-5'>
                        {['setting', 'address', 'security', 'preference'].map((i) => (
                            <button
                                onClick={() => setTab(i)}
                                key={i}
                                className={`py-4 px-1 border-b-2 border-transparent text-sm font-medium capitalize hover:text-blue-700 ${
                                    tab === i && 'border-b-2 !border-blue-500 text-blue-600'
                                }`}>
                                {i}
                            </button>
                        ))}
                    </nav>
                    <div className='flex flex-col'>
                        {tab == 'setting' && (
                            <>
                                <h2 className='text-lg font-semibold my-2'>General Settings</h2>
                                <form>
                                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                        <Input name='First Name' label='First Name' />
                                        <Input name='Last Name' label='Last Name' />
                                        <Input name='Email' label='Email' />
                                        <Input name='Phone' label='Phone' />
                                    </div>
                                    <button
                                        type='submit'
                                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
                                        Save Changes
                                    </button>
                                </form>
                            </>
                        )}
                        {tab == 'address' && (
                            <>
                                <h2 className='text-lg font-semibold mb-2'>General Address</h2>
                                <form>
                                    <Input name='Street Address' label='Street Address' />
                                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                        <Input name='City' label='City' />
                                        <Input name='State/Province' label='State/Province' />
                                        <Input name='Postal Code' label='Postal Code' />
                                        <Input name='Country' label='Country' />
                                    </div>
                                    <button
                                        type='submit'
                                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
                                        Save Changes
                                    </button>
                                </form>
                            </>
                        )}
                        {tab == 'security' && (
                            <>
                                <h2 className='text-lg font-semibold mb-2'>Change Password</h2>
                                <form
                                    action='
							'>
                                    <Input name='Last Name' label='Last Name' />
                                    <Input name='Email' label='Email' />
                                    <button
                                        type='submit'
                                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
                                        Save Changes
                                    </button>
                                </form>
                            </>
                        )}
                        {tab == 'preference' && (
                            <div className=''>
                                <h3 className='text-xl font-semibold text-gray-900 mb-6'>
                                    Preferences
                                </h3>
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h4 className='text-gray-700 font-medium'>
                                                Email Notifications
                                            </h4>
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
                                            <h4 className='text-gray-700 font-medium'>
                                                Order Updates
                                            </h4>
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
                                            <h4 className='text-gray-700 font-medium'>
                                                Marketing Preferences
                                            </h4>
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
