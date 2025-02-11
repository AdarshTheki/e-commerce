import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import useFetch from '../hooks/useFetch';

const ProductListing = () => {
  const { data, error, loading } = useFetch('/api/v1/product?limit=30');

  console.log(data);

  if (loading || error || !data?.totalDocs)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='flex space-x-2'>
          <div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
          <div
            className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'
            style={{ animationDelay: '0.2s' }}></div>
          <div
            className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'
            style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );

  return (
    <section id='productListing' className='py-2 bg-gray-50'>
      <div className='flex flex-col lg:flex-row gap-2'>
        {/* <!-- Filters Sidebar --> */}
        <div className='w-[300px] max-lg:hidden sticky h-fit top-[108px] overflow-y-auto scrollbar'>
          <div className='bg-white rounded-lg shadow-sm px-6 py-3'>
            <h2 className='font-bold text-lg mb-4'>Filters</h2>

            {/* <!-- Price Range --> */}
            <div className='mb-6'>
              <h3 className='font-semibold mb-3'>Price Range</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input type='range' className='w-full' min='0' max='1000' step='10' />
                </div>
                <div className='flex justify-between'>
                  <input
                    type='number'
                    className='w-24 px-2 py-1 border rounded'
                    placeholder='Min'
                  />
                  <input
                    type='number'
                    className='w-24 px-2 py-1 border rounded'
                    placeholder='Max'
                  />
                </div>
              </div>
            </div>

            {/* <!-- Brand Filter --> */}
            <div className='mb-6'>
              <h3 className='font-semibold mb-3'>Brand</h3>
              <div className='space-y-2'>
                <label className='flex items-center'>
                  <input type='checkbox' className='form-checkbox text-blue-600' />
                  <span className='ml-2'>Apple (24)</span>
                </label>
                <label className='flex items-center'>
                  <input type='checkbox' className='form-checkbox text-blue-600' />
                  <span className='ml-2'>Samsung (36)</span>
                </label>
                <label className='flex items-center'>
                  <input type='checkbox' className='form-checkbox text-blue-600' />
                  <span className='ml-2'>Google (12)</span>
                </label>
              </div>
            </div>

            {/* <!-- Rating Filter --> */}
            <div className='mb-6'>
              <h3 className='font-semibold mb-3'>Rating</h3>
              <div className='space-y-2'>
                <label className='flex items-center'>
                  <input type='radio' name='rating' className='form-radio text-blue-600' />
                  <span className='ml-2 flex items-center'>
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <span className='ml-1'>(5)</span>
                  </span>
                </label>
                <label className='flex items-center'>
                  <input type='radio' name='rating' className='form-radio text-blue-600' />
                  <span className='ml-2 flex items-center'>
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <Star className='text-yellow-400' size={16} />
                    <span className='ml-1'>(4+)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* <!-- Apply Filters Button --> */}
            <button className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
              Apply Filters
            </button>
          </div>
        </div>

        {/* <!-- Product Grid --> */}
        <div className='w-full'>
          {/* <!-- Sort and View Options --> */}
          <div className='bg-white sticky h-fit top-[108px] z-10 rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <span className='text-gray-600'>Sort by:</span>
              <select className='border rounded px-2 py-1'>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-600'>View:</span>
            </div>
          </div>

          {/* <!-- Products Grid --> */}
          <div className={`grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4`}>
            {/* <!-- Product Card --> */}
            {data?.totalDocs
              ? data?.docs?.map((item: ProductType) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden group`}>
                    <div className='relative'>
                      <img
                        src='https://placehold.co/200x140'
                        alt='Product'
                        className='w-full transition-opacity duration-300 opacity-100'
                        loading='lazy'
                      />
                      <div className='absolute top-2 right-2 space-y-2'>
                        <button className='bg-white p-1.5 rounded-full shadow hover:bg-gray-100'>
                          <Heart fill='red' stroke='0' />
                        </button>
                      </div>
                      <div className='absolute top-2 left-2'>
                        <span className='bg-red-500 text-white px-2 py-1 text-sm rounded'>
                          {item.discount}%
                        </span>
                      </div>
                    </div>
                    <div className='p-4 space-y-2 capitalize'>
                      <p className='text-gray-600 text-sm'>{item.brand}</p>
                      <h3 className='font-semibold mb-2 text-gray-700 line-clamp-2'>
                        {item.title}
                      </h3>
                      <p className='bg-gray-200 px-3 text-xs rounded-2xl py-1 w-fit'>
                        {item.category}
                      </p>
                      <p className='text-gray-600 text-xl'>${item.price}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {/* <!-- Pagination --> */}
          <div className='my-5 p-4 shadow-sm rounded-lg bg-white flex items-center justify-between'>
            <div>
              <p>Show page 1 to 100</p>
            </div>
            <nav className='flex items-center space-x-2'>
              <button className='px-3 text-sm py-1 border hover:bg-gray-100'>
                <ChevronLeft size={18} className='text-gray-700' />
              </button>
              <button className='px-3 text-sm py-1 border rounded bg-blue-600 text-white'>1</button>
              <button className='px-3 text-sm py-1 border rounded hover:bg-gray-100'>2</button>
              <button className='px-3 text-sm py-1 border rounded hover:bg-gray-100'>3</button>
              <span className='px-3 text-sm py-1 border'>...</span>
              <button className='px-3 text-sm py-1 border rounded hover:bg-gray-100'>10</button>
              <button className='px-3 text-sm py-1 border hover:bg-gray-100'>
                <ChevronRight size={18} className='text-gray-700' />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
