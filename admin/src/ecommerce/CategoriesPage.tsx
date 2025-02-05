const categoryListing = () => {
    return (
        <section id='categoryListing' className='py-8 bg-gray-50'>
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
                            <span className='text-gray-900'>Categories</span>
                        </li>
                    </ol>
                </nav>

                {/* <!-- Category Grid --> */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* <!-- Fashion Category --> */}
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow'>
                        <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
                            <img
                                src='https://placehold.co/600x400'
                                alt='Fashion'
                                className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            {/* <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                                            <h3 className='text-white text-2xl font-bold'>
                                                Fashion
                                            </h3>
                                        </div> */}
                        </div>
                        <div className='p-6'>
                            <ul className='space-y-2'>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-shirt mr-2'></i>
                                            Men's Clothing
                                        </span>
                                        <span className='text-sm text-gray-500'>(250)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-person-dress mr-2'></i>
                                            Women's Clothing
                                        </span>
                                        <span className='text-sm text-gray-500'>(320)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-shoe-prints mr-2'></i>
                                            Footwear
                                        </span>
                                        <span className='text-sm text-gray-500'>(180)</span>
                                    </a>
                                </li>
                            </ul>
                            <button className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                                View All
                            </button>
                        </div>
                    </div>

                    {/* <!-- Electronics Category --> */}
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow'>
                        <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
                            <img
                                src='https://placehold.co/600x400'
                                alt='Electronics'
                                className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            {/* <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                                            <h3 className='text-white text-2xl font-bold'>
                                                Electronics
                                            </h3>
                                        </div> */}
                        </div>
                        <div className='p-6'>
                            <ul className='space-y-2'>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-mobile-screen mr-2'></i>
                                            Smartphones
                                        </span>
                                        <span className='text-sm text-gray-500'>(150)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-laptop mr-2'></i>
                                            Laptops
                                        </span>
                                        <span className='text-sm text-gray-500'>(120)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-headphones mr-2'></i>
                                            Accessories
                                        </span>
                                        <span className='text-sm text-gray-500'>(280)</span>
                                    </a>
                                </li>
                            </ul>
                            <button className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                                View All
                            </button>
                        </div>
                    </div>

                    {/* <!-- Home & Living Category --> */}
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow'>
                        <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
                            <img
                                src='https://placehold.co/600x400'
                                alt='Home &amp; Living'
                                className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            {/* <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                                            <h3 className='text-white text-2xl font-bold'>
                                                Home &amp; Living
                                            </h3>
                                        </div> */}
                        </div>
                        <div className='p-6'>
                            <ul className='space-y-2'>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-couch mr-2'></i>
                                            Furniture
                                        </span>
                                        <span className='text-sm text-gray-500'>(180)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-kitchen-set mr-2'></i>
                                            Kitchen
                                        </span>
                                        <span className='text-sm text-gray-500'>(140)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-lamp mr-2'></i>
                                            Decor
                                        </span>
                                        <span className='text-sm text-gray-500'>(210)</span>
                                    </a>
                                </li>
                            </ul>
                            <button className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                                View All
                            </button>
                        </div>
                    </div>

                    {/* <!-- Beauty Category --> */}
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow'>
                        <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
                            <img
                                src='https://placehold.co/600x400?text=Beauty'
                                alt='Beauty'
                                className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                                loading='lazy'
                            />
                            {/* <div className='absolute inset-0 h-full bg-black bg-opacity-40 flex items-center justify-center'>
                                            <h3 className='text-white text-2xl font-bold'>
                                                Beauty
                                            </h3>
                                        </div> */}
                        </div>
                        <div className='p-6'>
                            <ul className='space-y-2'>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-spa mr-2'></i>
                                            Skincare
                                        </span>
                                        <span className='text-sm text-gray-500'>(160)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-pump-soap mr-2'></i>
                                            Haircare
                                        </span>
                                        <span className='text-sm text-gray-500'>(130)</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='flex items-center justify-between text-gray-600 hover:text-blue-600'>
                                        <span className='flex items-center'>
                                            <i className='fa-solid fa-prescription-bottle mr-2'></i>
                                            Makeup
                                        </span>
                                        <span className='text-sm text-gray-500'>(190)</span>
                                    </a>
                                </li>
                            </ul>
                            <button className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
                                View All
                            </button>
                        </div>
                    </div>
                </div>

                {/* <!-- Featured Categories Banner --> */}
                <div className='mt-12 bg-white rounded-lg shadow-sm p-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <div className='text-center md:text-left mb-6 md:mb-0'>
                            <h2 className='text-2xl font-bold mb-2'>Explore Featured Categories</h2>
                            <p className='text-gray-600'>
                                Discover our most popular categories with exclusive deals
                            </p>
                        </div>
                        <button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                            View All Categories
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default categoryListing;
