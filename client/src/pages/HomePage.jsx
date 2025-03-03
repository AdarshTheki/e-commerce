import { Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Typewriter } from '../utils';
import { useState } from 'react';

const HomePage = () => {
  return (
    <main id='homepage' className='min-h-screen'>
      {/* <!-- Hero Section --> */}
      <section className='relative h-[500px] overflow-hidden object-contain'>
        <div className='absolute inset-0 w-full'>
          <img
            src='./home.jpg'
            alt='Background'
            className='w-full h-full object-cover transition-opacity duration-300 opacity-100'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-black/60'></div>
        </div>
        <div className='px-4 h-full flex items-center justify-center relative'>
          <div className='max-w-lg text-center text-white grid items-center gap-6 justify-center'>
            <h1 className='sm:text-8xl text-5xl font-semibold'>JUST DO IT</h1>
            <Typewriter
              text='Your sport journey begins here. Push your limits, break boundaries.'
              name='heading'
              className='sm:text-xl text-lg'
            />
            <NavLink
              to={'/product'}
              className='py-3 px-6 rounded-lg mx-auto hover:opacity-80 cursor-pointer bg-white text-black font-semibold text-xl w-fit'>
              Shop Now
            </NavLink>
            <NavLink to={'/product'} className='underline font-medium'>
              Explore Collection
            </NavLink>
          </div>
        </div>
      </section>

      {/* <!-- Featured Categories --> */}
      <FeaturedCategory />

      {/* <!-- Featured Products --> */}
      <FeaturedBrand />

      {/* <!-- Testimonials --> */}
      <Testimonials />
    </main>
  );
};

export default HomePage;

const FeaturedCategory = () => {
  const { data, error, loading } = useFetch('/api/v1/category?limit=30');
  const [limit, setLimit] = useState(6);

  if (error || loading) return <h2>loading...</h2>;

  return (
    <section className='bg-white py-5'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold px-4'>Shop by Category</h2>

        <div className='flex w-full py-5 overflow-x-auto scrollbar-hidden'>
          {data?.totalDocs
            ? data?.docs?.slice(0, limit)?.map((item) => (
                <div
                  key={item._id}
                  className='min-w-[200px] mx-2 max-w-[200px] min-h-[300px] relative overflow-hidden rounded-lg group'>
                  <img
                    src='https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1680,c_limit/73c4a613-c354-4bd5-9df8-e0cc7705c467/nike-just-do-it.jpg'
                    alt='Sports Collection'
                    className='w-full h-full object-cover group-hover:scale-110 transition-opacity duration-300 opacity-100'
                    loading='lazy'
                  />
                  <div className='absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <h3 className='text-2xl font-bold text-white mb-3 capitalize'>{item.title}</h3>
                    <p className='text-gray-200 mb-4'>Performance wear for every athlete</p>
                    <NavLink
                      to={`/category/${item._id}`}
                      className='bg-white text-black px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300'>
                      Explore
                    </NavLink>
                  </div>
                </div>
              ))
            : null}
          {limit !== 30 && (
            <div className='min-w-[200px] mx-2 max-w-[200px] min-h-[300px] shadow-lg rounded-lg flex items-center justify-center'>
              <button
                onClick={() => setLimit(30)}
                className='text-blue-500 cursor-pointer hover:text-blue-700 font-medium'>
                View All
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FeaturedBrand = () => {
  const { data, error, loading } = useFetch('/api/v1/brand?limit=30');
  const [limit, setLimit] = useState(6);

  if (error || loading) return <h2>loading...</h2>;

  return (
    <section className='bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold px-4'>Featured Products</h2>
        <div className='flex w-full py-5 overflow-x-auto scrollbar-hidden'>
          {data?.totalDocs
            ? data?.docs?.slice(0, limit)?.map((item) => (
                <div className='min-w-[200px] mx-2 max-w-[200px] min-h-[300px] bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 animate__animated animate__fadeIn animate__fadeInUp'>
                  <img
                    src='https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_610,c_limit/0ebd455c-1c7e-4958-8c64-20eacc1d760d/image.png'
                    alt='New Release 1'
                    className='w-full h-[150px] object-cover transition-opacity duration-300 opacity-100'
                    loading='lazy'
                  />
                  <div className='p-4'>
                    <h3 className='text-xl font-bold text-black mb-2 line-clamp-1'>{item.title}</h3>
                    <p className='text-gray-600 text-sm mb-4 font-futura'>
                      Latest innovation in comfort
                    </p>
                    <NavLink
                      to={'/product'}
                      className='bg-black text-white px-5 py-2 hover:bg-black/80 rounded-md hover:shadow-glow hover:scale-105 transition-all duration-300'>
                      Shop Now
                    </NavLink>
                  </div>
                </div>
              ))
            : null}
          {limit !== 30 && (
            <div className='min-w-[200px] mx-2 max-w-[200px] min-h-[300px] shadow-lg rounded-lg flex items-center justify-center'>
              <button
                onClick={() => setLimit(30)}
                className='text-blue-500 cursor-pointer hover:text-blue-700 font-medium'>
                View All
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className='py-5 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold px-4'>What Our Customers Say</h2>
        <div className='flex w-full py-5 overflow-x-auto scrollbar-hidden'>
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className='bg-white min-w-[300px] max-w-[300px] p-4 rounded-lg shadow-sm mx-2'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://avatar.iran.liara.run/public'
                  alt='Customer'
                  className='w-10 h-10 rounded-full transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4'>
                  <h4 className='font-semibold'>John Doe</h4>
                  <div className='flex'>
                    <Star size={16} fill='#000' />
                    <Star size={16} fill='#000' />
                    <Star size={16} fill='#000' />
                    <Star size={16} fill='#000' />
                    <Star size={16} fill='#000' />
                  </div>
                </div>
              </div>
              <p className='text-gray-600'>
                &quot;Great products and excellent service. Will definitely shop here again!&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
