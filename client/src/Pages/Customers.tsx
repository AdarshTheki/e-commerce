const Customers = () => {
    return (
        <div>
            <div className='bg-white rounded-lg border border-neutral-200/30 p-6'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-4'>
                        <img
                            src='https://avatar.iran.liara.run/public'
                            alt='Customer'
                            className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                            loading='lazy'
                        />
                        <div>
                            <h3 className='font-medium'>Jane Smith</h3>
                            <p className='text-sm text-gray-500'>jane@example.com</p>
                        </div>
                    </div>
                    <div className='flex space-x-2'>
                        <button className='p-2 text-gray-600 hover:bg-gray-50 rounded-lg'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Member Since</span>
                        <span>Nov 28, 2023</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Total Orders</span>
                        <span>18</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Total Spent</span>
                        <span>$1,856.00</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Status</span>
                        <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>
                            Active
                        </span>
                    </div>
                </div>
                <div className='mt-6 flex space-x-3'>
                    <button className='flex-1 px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50'>
                        View Profile
                    </button>
                    <button className='flex-1 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customers;
