import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, LockIcon, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as svg from '../utils/Svgs';
import { Input, Loading } from '../utils';
import errorHandler from '../helper/errorHandler';
import instance from '../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Tabs = ({ tabs, totals, items, formData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(4);

  const handleToNext = async () => {
    if (activeTab === 3) {
      const res = await instance.post('/api/v1/order', { shipping: formData });
      if (res.data) {
        console.log(res.data);
        setActiveTab(4);
      }
    } else {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handleToPrev = () => {
    if (activeTab === 0) {
      navigate('/product');
    } else {
      setActiveTab((prev) => prev - 1);
    }
  };

  if (activeTab === 4) return tabs[activeTab]?.content;

  return (
    <div className='flex flex-col lg:flex-row gap-8'>
      <div className='lg:w-2/3'>
        <div className='bg-white rounded-lg shadow-sm'>
          {tabs[activeTab]?.content}

          <button
            onClick={handleToPrev}
            className='flex p-6 items-center text-indigo-600 hover:text-indigo-700'>
            <ArrowLeftIcon size={18} className='mr-3' />
            {activeTab ? 'Go Back' : 'Continue Shopping'}
          </button>
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
                if (tabs[activeTab]?.flag) handleToNext();
              }}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:opacity-70 transition-colors ${
                !tabs[activeTab]?.flag && 'bg-red-600'
              }`}>
              {tabs[activeTab]?.label || 'Proceed to Checkout'} to Checkout
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
            <svg.AmexCard />
            <svg.MasterCard />
            <svg.PaypalCard />
            <svg.VistaCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const [carts, setCarts] = useState({ items: [], wishlist: [] });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phoneNumber || '',
    addressLine1: '',
    city: '',
    pinCode: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const { items, wishlist } = carts;

  const totals = items
    ?.reduce((acc, curr) => curr?.productId?.price * curr?.quantity + acc, 0)
    .toFixed(2);

  const tabData = [
    {
      label: 'Proceed',
      flag: items.length !== 0,
      content: <Item1 items={items} getAllCarts={getAllCarts} />,
    },
    {
      label: 'Shipping',
      flag: formData.firstName.length && formData.lastName.length && formData.phone.length,
      content: <Item2 formData={formData} handleChange={handleChange} />,
    },
    {
      label: 'Address',
      flag:
        formData.addressLine1.length &&
        formData.city.length &&
        formData.country.length &&
        formData.pinCode.length &&
        formData.state.length,
      content: <Item3 formData={formData} handleChange={handleChange} />,
    },
    {
      label: 'Payment',
      flag: true,
      content: <Item4 formData={formData} items={items} />,
    },
    {
      label: 'Success',
      flag: true,
      content: <Item5 />,
    },
  ];

  if (loading) return <Loading />;

  return (
    <section id='cart' className='py-8 px-2 bg-gray-50 text-gray-700'>
      <Tabs tabs={tabData} items={items} totals={totals} formData={formData} />
    </section>
  );
};

export default CartComponent;

const CartItem = ({ item, quantity, handleDelete }) => {
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
              <span className='py-1 px-2 rounded-xl ml-2 bg-gray-200 text-xs'>{brand}</span>
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

const Item1 = ({ items, getAllCarts }) => {
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

  return (
    <>
      {/* <!-- Cart Empty --> */}
      {!items?.length && (
        <div className='flex items-center justify-center h-[50vh]'>
          <h2 className='font-semibold'>Empty cart's</h2>
        </div>
      )}

      {/* Cart Items */}
      {items?.length ? (
        <>
          <div className='flex justify-between p-6 items-center border-b border-gray-300'>
            <h1 className='text-xl font-medium'>Shopping Cart {items?.length}</h1>
            <button className='text-gray-600 hover:text-red-600'>Clear Cart</button>
          </div>
          {items?.map((item, index) => (
            <CartItem
              key={index}
              item={item?.productId}
              quantity={item?.quantity}
              handleDelete={handleDelete}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

const Item2 = ({ formData, handleChange }) => {
  return (
    <div className='p-6 space-y-4'>
      <h2 className='text-xl font-medium'>User Details</h2>
      <Input
        label='first name'
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
      />
      <Input label='last name' name='lastName' value={formData.lastName} onChange={handleChange} />

      <Input
        type='number'
        label='phone number'
        name='phone'
        value={formData.phone}
        onChange={handleChange}
      />
    </div>
  );
};

const Item3 = ({ formData, handleChange }) => {
  return (
    <div className='p-6 space-y-4'>
      <h2 className='text-xl font-medium'>Shipping Address</h2>
      <Input
        label='strate Address'
        name='addressLine1'
        value={formData.addressLine1}
        onChange={handleChange}
      />
      <Input label='city' name='city' value={formData.city} onChange={handleChange} />

      <Input
        type='number'
        label='postal code'
        name='pinCode'
        value={formData.pinCode}
        onChange={handleChange}
      />

      <Input label='state' name='state' value={formData.state} onChange={handleChange} />

      <Input label='country' name='country' value={formData.country} onChange={handleChange} />
    </div>
  );
};

const Item4 = ({ formData, items }) => {
  return (
    <>
      <div className='p-6'>
        <h2 className='text-xl font-medium mt-4'>Paying with pay on Delivery/Cash on Delivery</h2>
        <p>Scan and pay at delivery with cartify pay UPI and win reword up to 500</p>
        <h2 className='text-xl font-medium mt-4'>Delivering At</h2>
        <p className='capitalize'>{Object.values(formData).join(', ').toLowerCase()}</p>
        <p></p>
        <h2 className='text-xl font-medium mt-4'>Guaranteed Delivery: Tomorrow 7 pm - 12 pm</h2>
        {items.map((i) => {
          const { title, _id, thumbnail, price } = i.productId;
          return (
            <div key={_id} className='flex items-center gap-5 p-1 border-b border-gray-300'>
              <img src={thumbnail} alt={title} width={100} />
              <div className='text-sm'>
                <p className='font-medium'>{title}</p>
                <p>
                  Unit Price: : ${price} x {i.quantity}
                </p>
                <p>Totals: ${(price * i.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

function Item5() {
  return (
    <div className='flex items-center justify-center h-[50vh]'>
      <div className='text-center'>
        <h1>Order Placed Successfully 🎉</h1>
        <p className='mb-10'>Thank you for your order!</p>
        <NavLink to='/product' className='border p-2 text-blue-600 border-blue-500 rounded-lg'>
          Back to Products
        </NavLink>
      </div>
    </div>
  );
}
