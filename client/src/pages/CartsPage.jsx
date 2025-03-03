import { useEffect, useState } from 'react';
import { ArrowLeftIcon, LockIcon, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AmexCard, MasterCard, PaypalCard, VistaCard } from '../utils/Svgs';
import { Loading } from '../utils';
import errorHandler from '../helper/errorHandler';
import instance from '../helper/axiosInstance';

const Cart = () => {
  const user = null;
  const [carts, setCarts] = useState({ items: [], wishlist: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCarts = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/api/v1/cart`);
      if (res.data) {
        setCarts({ items: res.data?.items, wishlist: res.data?.wishlist });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/api/v1/cart/${id}`);
      if (res.data) {
        getAllCarts();
        toast.success('Delete cart successfully');
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const { items, wishlist } = carts;

  const totals = items
    ?.reduce((acc, curr) => curr?.productId?.price * curr?.quantity + acc, 0)
    .toFixed(2);

  if (loading) return <Loading />;

  return (
    <section id='cart' className='py-8 px-2 bg-gray-50 text-gray-700'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* <!-- Cart Items --> */}
        <div className='lg:w-2/3'>
          <div className='bg-white rounded-lg shadow-sm'>
            <div className='sm:p-6 p-2 border-b border-gray-300'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Shopping Cart {items.length}</h1>
                <button className='text-gray-600 hover:text-red-600'>Clear Cart</button>
              </div>
            </div>

            {/* <!-- Cart Empty --> */}
            {!items.length && (
              <div className='flex items-center justify-center h-64'>
                <h2 className='font-semibold'>Empty cart's</h2>
              </div>
            )}

            {/* Cart Items */}
            {items.length &&
              items?.map((item, index) => (
                <CartItem
                  key={index}
                  item={item?.productId}
                  quantity={item?.quantity}
                  handleDelete={handleDelete}
                />
              ))}

            {/* <!-- Continue Shopping --> */}
            <div className='p-6'>
              <NavLink
                to={'/product'}
                className='flex items-center text-indigo-600 hover:text-indigo-700'>
                <ArrowLeftIcon size={18} className='mr-3' />
                Continue Shopping
              </NavLink>
            </div>
          </div>
        </div>

        {/* <!-- Order Summary --> */}
        <div className='lg:w-1/3'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Subtotal ({items.length || 0} items)</span>
                <span className='font-semibold'>${totals}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Shipping</span>
                <span className='font-semibold'>Free</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Tax</span>
                <span className='font-semibold'>$5.00</span>
              </div>

              {/* <!-- Promo Code --> */}
              <div className='border-t pt-4'>
                <div className='flex'>
                  <input
                    type='text'
                    placeholder='Enter promo code'
                    className='flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-600'
                  />
                  <button className='px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700 transition-colors'>
                    Apply
                  </button>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className='border-t pt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold'>Total</span>
                  <span className='text-2xl font-bold'>${Number(totals + 5).toFixed(2)}</span>
                </div>
              </div>

              {/* <!-- Checkout Button --> */}
              <button
                onClick={() => {
                  if (user) navigate('/checkout');
                }}
                className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors'>
                Proceed to Checkout
              </button>

              {/* <!-- Secure Transaction --> */}
              <div className='flex items-center justify-center text-gray-600 text-sm'>
                <LockIcon size={18} className='mr-3' />
                Secure Transaction
              </div>
            </div>
          </div>

          {/* <!-- Accepted Payment Methods --> */}
          <div className='mt-6 bg-white rounded-lg shadow-sm p-6'>
            <h3 className='font-semibold mb-4'>Accepted Payment Methods</h3>
            <div className='flex space-x-4'>
              <AmexCard />
              <VistaCard />
              <PaypalCard />
              <MasterCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

const CartItem = ({ item, quantity, handleDelete = () => {} }) => {
  const { _id, thumbnail, title, price, category, brand } = item;
  return (
    <div key={_id} className='sm:p-6 p-2 border-b border-gray-300'>
      <div className='flex items-start'>
        <NavLink to={`/product/${_id}`} className='bg-gray-300'>
          <img
            src={thumbnail || 'https://placehold.co/120x120'}
            alt='Product'
            className='sm:w-32 sm:h-32 h-24 w-24 object-cover rounded transition-opacity duration-300 opacity-100'
            loading='lazy'
          />
        </NavLink>
        <div className='flex-1 ml-6 relative'>
          <h3 className='font-semibold'>{title || 'Smartphone X Pro'}</h3>
          <p className='capitalize'>
            {category}
            {brand && (
              <span className='py-1 px-2 rounded-lg ml-4 bg-gray-300 text-xs'>{brand}</span>
            )}
          </p>
          <div className='flex items-center my-1'>
            <span className='text-sm text-gray-600'>Unit Price:</span>
            <span className='ml-2 font-semibold'>
              ${price || 79.99} x {quantity}
            </span>
          </div>
          <button
            onClick={() => handleDelete(_id)}
            className='text-gray-400 absolute top-6 sm:right-5 right-1 cursor-pointer hover:text-red-600'>
            <X />
          </button>
          <h3>
            Totals: <span className='font-bold'>${price * quantity}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};
