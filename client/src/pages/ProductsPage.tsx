import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { Loading } from '../utils';

const ProductListing = () => {
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const query = new URLSearchParams({
    ...(category && { category }),
    ...(brand && { brand }),
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
  }).toString();

  const { data } = useFetch(`/api/v1/product?limit=30${query}`);

  return (
    <section id='productListing' className='py-2 bg-gray-50'>
      <div className='flex flex-col lg:flex-row gap-2'>
        {/* <!-- Filters Sidebar --> */}
        <div className='w-[300px] max-lg:hidden sticky h-fit top-[54px] overflow-y-auto scrollbar'>
          <div className='bg-white text-gray-700 shadow-sm px-6 py-3'>
            <h2 className='font-bold text-lg mb-4'>Filters</h2>

            {/* <!-- Price Range --> */}
            <div>
              <h3 className='font-medium'>Price Range</h3>
              <input
                type='range'
                className='w-full'
                min={0}
                max={1000}
                step='10'
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <div className='flex gap-5 justify-between text-sm'>
                <input
                  type='number'
                  className='w-full px-2 py-1 border rounded'
                  placeholder='Min'
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <input
                  type='number'
                  className='w-full px-2 py-1 border rounded'
                  placeholder='Max'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* <!-- Brand Filter --> */}
            <div className='my-2'>
              <h3 className='font-medium'>Brand</h3>
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

            {/* <!-- Category Filter --> */}
            <div className='my-2'>
              <h3 className='font-medium'>Category</h3>
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

            {/* <!-- Rating Filter --> */}
            <div className=''>
              <h3 className='font-medium'>Rating</h3>
              <label className='flex items-center'>
                <input type='radio' name='rating' className='form-radio text-blue-600' />
                <span className='ml-2 flex items-center'>
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <span className='ml-1'>(5)</span>
                </span>
              </label>
              <label className='flex items-center'>
                <input type='radio' name='rating' className='form-radio text-blue-600' />
                <span className='ml-2 flex items-center'>
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star size={16} />
                  <span className='ml-1'>(4+)</span>
                </span>
              </label>
              <label className='flex items-center'>
                <input type='radio' name='rating' className='form-radio text-blue-600' />
                <span className='ml-2 flex items-center'>
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star fill='#000' size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <span className='ml-1'>(3+)</span>
                </span>
              </label>
            </div>

            {/* <!-- Apply Filters Button --> */}
            <button className='w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>
              Apply Filters
            </button>
          </div>
        </div>

        {/* <!-- Product Grid --> */}
        <div className='w-full'>
          {/* <!-- Sort and View Options --> */}
          <div className='bg-white sticky h-fit top-[54px] z-10 shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between'>
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
          {!data?.totalDocs && <Loading className='h-[70vh]' />}
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
                      <p className=' space-x-3'>
                        <span className='text-gray-600 text-sm'>{item.brand}</span>
                        <span className='bg-gray-200 px-3 text-xs rounded-2xl py-1 w-fit'>
                          {item.category}
                        </span>
                      </p>
                      <h3 className='font-semibold mb-2 text-gray-700 line-clamp-2'>
                        {item.title}
                      </h3>

                      <p className='text-gray-600 text-xl'>${item.price}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {/* <!-- Pagination --> */}
          {/* <div className='my-5 p-4 shadow-sm rounded-lg bg-white flex items-center justify-between'>
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
