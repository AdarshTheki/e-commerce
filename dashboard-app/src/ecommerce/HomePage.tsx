const HomePage = () => {
  return (
    <main id='homepage' className='min-h-screen'>
      {/* <!-- Hero Section --> */}
      <section className='relative h-[600px] bg-gray-100 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 h-full flex items-center'>
          <div className='w-full md:w-1/2 space-y-6 animate-fadeIn'>
            <h1 className='text-4xl md:text-6xl font-bold'>Summer Collection 2024</h1>
            <p className='text-xl text-gray-600'>
              Discover the latest trends in fashion and lifestyle
            </p>
            <button className='bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors'>
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Featured Categories --> */}
      <section className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <a href='#' className='group'>
              <div className='rounded-lg bg-gray-50 p-6 text-center transition-transform hover:-translate-y-1'>
                <i className='fa-solid fa-shirt text-4xl text-gray-600 mb-4'></i>
                <h3 className='font-semibold'>Fashion</h3>
              </div>
            </a>
            <a href='#' className='group'>
              <div className='rounded-lg bg-gray-50 p-6 text-center transition-transform hover:-translate-y-1'>
                <i className='fa-solid fa-laptop text-4xl text-gray-600 mb-4'></i>
                <h3 className='font-semibold'>Electronics</h3>
              </div>
            </a>
            <a href='#' className='group'>
              <div className='rounded-lg bg-gray-50 p-6 text-center transition-transform hover:-translate-y-1'>
                <i className='fa-solid fa-couch text-4xl text-gray-600 mb-4'></i>
                <h3 className='font-semibold'>Home</h3>
              </div>
            </a>
            <a href='#' className='group'>
              <div className='rounded-lg bg-gray-50 p-6 text-center transition-transform hover:-translate-y-1'>
                <i className='fa-solid fa-spa text-4xl text-gray-600 mb-4'></i>
                <h3 className='font-semibold'>Beauty</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Featured Products --> */}
      <section className='py-12 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8'>Featured Products</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
              <div className='aspect-w-1 aspect-h-1 bg-gray-200'>
                <img
                  src='https://placehold.co/300x300'
                  alt='Product'
                  className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>Premium T-Shirt</h3>
                <p className='text-gray-600'>$29.99</p>
                <button className='w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors'>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
              <div className='aspect-w-1 aspect-h-1 bg-gray-200'>
                <img
                  src='https://placehold.co/300x300'
                  alt='Product'
                  className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>Wireless Headphones</h3>
                <p className='text-gray-600'>$149.99</p>
                <button className='w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors'>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
              <div className='aspect-w-1 aspect-h-1 bg-gray-200'>
                <img
                  src='https://placehold.co/300x300'
                  alt='Product'
                  className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>Smart Watch</h3>
                <p className='text-gray-600'>$199.99</p>
                <button className='w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors'>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm overflow-hidden group'>
              <div className='aspect-w-1 aspect-h-1 bg-gray-200'>
                <img
                  src='https://placehold.co/300x300'
                  alt='Product'
                  className='object-cover w-full h-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>Designer Bag</h3>
                <p className='text-gray-600'>$89.99</p>
                <button className='w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors'>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Promotional Banners --> */}
      <section className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-gray-100 rounded-lg p-8 flex items-center justify-between'>
              <div>
                <h3 className='text-2xl font-bold mb-2'>New Arrivals</h3>
                <p className='text-gray-600 mb-4'>Check out our latest collection</p>
                <button className='bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors'>
                  Shop Now
                </button>
              </div>
              <i className='fa-solid fa-stars text-6xl text-gray-600'></i>
            </div>

            <div className='bg-gray-100 rounded-lg p-8 flex items-center justify-between'>
              <div>
                <h3 className='text-2xl font-bold mb-2'>Special Offer</h3>
                <p className='text-gray-600 mb-4'>Get up to 50% off on selected items</p>
                <button className='bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors'>
                  View Deals
                </button>
              </div>
              <i className='fa-solid fa-badge-percent text-6xl text-gray-600'></i>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Testimonials --> */}
      <section className='py-12 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center'>What Our Customers Say</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://avatar.iran.liara.run/public'
                  alt='Customer'
                  className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4'>
                  <h4 className='font-semibold'>John Doe</h4>
                  <div className='flex text-yellow-400'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                  </div>
                </div>
              </div>
              <p className='text-gray-600'>
                &doublequote;Great products and excellent service. Will definitely shop here
                again!&doublequote;
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://avatar.iran.liara.run/public'
                  alt='Customer'
                  className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4'>
                  <h4 className='font-semibold'>Jane Smith</h4>
                  <div className='flex text-yellow-400'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                  </div>
                </div>
              </div>
              <p className='text-gray-600'>
                &doublequote;Fast shipping and amazing customer support. Highly
                recommended!&doublequote;
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://avatar.iran.liara.run/public'
                  alt='Customer'
                  className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4'>
                  <h4 className='font-semibold'>Mike Johnson</h4>
                  <div className='flex text-yellow-400'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                  </div>
                </div>
              </div>
              <p className='text-gray-600'>
                &doublequote;Quality products at great prices. Very satisfied with my
                purchase!&doublequote;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Newsletter --> */}
      <section className='py-12 bg-gray-800 text-white'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Subscribe to Our Newsletter</h2>
          <p className='mb-8'>Get updates about our latest products and special offers</p>
          <form className='max-w-md mx-auto flex gap-4'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-2 rounded text-gray-800 focus:outline-none'
            />
            <button
              type='submit'
              className='bg-white text-gray-600 px-6 py-2 rounded hover:bg-gray-100 transition-colors'>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
