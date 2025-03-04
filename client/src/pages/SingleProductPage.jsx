import axios from 'axios';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useFetch from '../hooks/useFetch';
import { HeartFavorite } from '../components';
import { baseUrl } from '../helper/constant';
import { Loading } from '../utils';
import errorHandler from '../helper/errorHandler';
import instance from '../helper/axiosInstance';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('black');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`/api/v1/product/${id}`);
        if (res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const res = await instance.post(`/api/v1/cart`, { productId, quantity });
      if (res.data) {
        toast.success('Add to cart success');
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <section id='ProductDetail' className='py-8 bg-gray-50'>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* <!-- Product Images --> */}
          <div className='space-y-4'>
            <div className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
              <img
                src={product?.thumbnail || 'https://placehold.co/600x600'}
                alt='Product'
                className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                loading='lazy'
              />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {Array.from({ length: 4 }, (_, index) => (
                <button key={index} className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg'>
                  <img
                    src={product?.images[index] || 'https://placehold.co/150x150'}
                    alt={index + '_Product-images'}
                    className='object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100'
                    loading='lazy'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* <!-- Product Info --> */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>{product?.title}</h1>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                  <Star className='text-yellow-400' />
                  <span className='ml-2 text-sm text-gray-600'>(128 reviews)</span>
                </div>
                <span className='text-green-600'>In Stock</span>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center'>
                <span className='text-3xl font-bold'>${product?.price}</span>
                <span className='ml-4 text-lg text-gray-500 line-through'>
                  ${(product?.price / (1 - product?.discount / 100)).toFixed(2)}
                </span>
                <span className='ml-2 bg-red-500 text-white px-2 py-1 text-sm rounded'>
                  {product?.discount}% OFF
                </span>
              </div>
              <p className='text-sm text-gray-600'>Price includes VAT</p>
            </div>

            {/* <!-- Color Selection --> */}
            <div>
              <h3 className='font-semibold mb-3'>Color</h3>
              <div className='flex space-x-3'>
                {['black', 'blue', 'gray'].map((i) => (
                  <button
                    onClick={() => setColor(i)}
                    style={{ background: i }}
                    key={i}
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      i === color && 'ring-2 ring-offset-2 ring-black'
                    }`}></button>
                ))}
              </div>
            </div>

            <div>
              <span className='text-xl capitalize'>{product?.brand}</span>
              <span className='px-4 py-1 ml-4 capitalize rounded-lg bg-gray-100'>
                {product?.category}
              </span>
              <p className='pt-5'>{product?.description}</p>
            </div>

            {/* <!-- Quantity --> */}
            <div>
              <h3 className='font-semibold mb-3'>Quantity</h3>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center border rounded-lg border-gray-300'>
                  <button
                    onClick={() => setQuantity((pre) => (pre === 1 ? 1 : pre - 1))}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    -
                  </button>
                  <button className='px-4 text-center border-x border-gray-300'>{quantity}</button>
                  <button
                    onClick={() =>
                      setQuantity((pre) => (pre === product?.stock ? product?.stock : pre + 1))
                    }
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    +
                  </button>
                </div>
                <span className='text-sm text-gray-600'>
                  {product?.stock - quantity} items available
                </span>
              </div>
            </div>

            {/* <!-- Actions --> */}
            <div className='flex space-x-4'>
              <button
                onClick={() => handleAddToCart(product?._id || '', quantity)}
                className='flex-1 bg-blue-600 max-w-56 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                Add to Cart
              </button>

              <HeartFavorite id={id || ''} className='py-2 px-3 border rounded-lg' />
            </div>

            {/* <!-- Delivery Info --> */}
            <div className='border-t pt-6 space-y-4'>
              <div className='flex items-center space-x-4'>
                <i className='fa-solid fa-truck text-2xl text-gray-600'></i>
                <div>
                  <h4 className='font-semibold'>Free Delivery</h4>
                  <p className='text-sm text-gray-600'>
                    Enter your postal code for delivery availability
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <i className='fa-solid fa-rotate-left text-2xl text-gray-600'></i>
                <div>
                  <h4 className='font-semibold'>30-Day Returns</h4>
                  <p className='text-sm text-gray-600'>Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Related Products --> */}
      <RelatedProduct url={product?.category} />
    </section>
  );
};

export default ProductDetail;

const RelatedProduct = ({ url }) => {
  const { data, error, loading } = useFetch(`/api/v1/product?category=${url}&limit=30&sortBy=asc`);

  if (error || loading) return <h2>loading...</h2>;

  return (
    <section className='mt-10 pl-2'>
      <h2 className='text-2xl font-bold py-2'>Related Products</h2>
      <div className='flex w-full gap-4 overflow-x-auto scrollbar-hidden'>
        {data?.totalDocs
          ? data?.docs?.map((item) => (
              <div key={item._id} className='bg-white overflow-hidden min-w-[230px]'>
                <div className='relative min-h-[200px] bg-black/20 rounded-lg overflow-hidden'>
                  <NavLink to={`/product/${item._id}`}>
                    <img
                      src={item.thumbnail || item.images[0] || 'https://placehold.co/200x140'}
                      alt='Product'
                      className='w-full max-h-[200px] object-contain transition-opacity duration-300 opacity-100'
                      loading='lazy'
                    />
                  </NavLink>
                  <div className='absolute top-2 right-2 space-y-2'>
                    <HeartFavorite id={item._id} />
                  </div>
                  <div className='absolute top-2 left-2'>
                    <span className='bg-red-500 text-white px-2 py-1 text-sm rounded'>
                      {item.discount}%
                    </span>
                  </div>
                </div>
                <div className='p-4 space-y-2 capitalize'>
                  <p className='space-x-3'>
                    <span className='text-gray-600 text-sm'>{item.brand}</span>
                    <span className='bg-gray-200 px-3 text-xs rounded-2xl py-1 w-fit'>
                      {item.category}
                    </span>
                  </p>
                  <h3 className='font-semibold mb-2 text-gray-700 line-clamp-2'>{item.title}</h3>

                  <p className='flex justify-between'>
                    <span className='text-gray-600 text-xl'>${item.price}</span>{' '}
                    <span>
                      {item.rating} <span className='text-xl text-yellow-400'>★</span>
                    </span>
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};
