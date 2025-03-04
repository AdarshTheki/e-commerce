import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Input } from '../utils';
import errorHandler from '../helper/errorHandler';
import { baseUrl } from '../helper/constant';
import instance from '../helper/axiosInstance';

const Address = () => {
  const { data } = useFetch('/api/v1/address');
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
  });

  useEffect(() => {
    if (data?._id) {
      setAddress({
        addressLine1: data?.addressLine1 || '',
        addressLine2: data?.addressLine2 || '',
        city: data?.city || '',
        state: data?.state || '',
        pinCode: data?.pinCode || '',
        country: data?.country || '',
      });
    }
  }, [data?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      if (!data?._id) {
        const res = await instance.post('/api/v1/address', { ...address });
        if (res.data) {
          toast.success('address crated success');
          setAddress(res.data);
        }
      } else {
        const res = await instance.patch(`/api/v1/address/${data?._id}`, { ...address });
        if (res.data) {
          toast.success('address updated success');
          setAddress(res.data);
        }
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <form className='pt-5 grid sm:grid-cols-2 gap-5' onSubmit={onSubmitHandle}>
      <Input
        onChange={handleChange}
        value={address.addressLine1}
        name='addressLine1'
        label='address Line 1'
        required
      />
      <Input
        onChange={handleChange}
        value={address.addressLine2}
        name='addressLine2'
        label='address Line 2'
      />
      <Input onChange={handleChange} value={address.city} name='city' label='city' required />
      <Input
        onChange={handleChange}
        value={address.pinCode}
        name='pinCode'
        label='pincode'
        type='number'
        required
      />
      <Input onChange={handleChange} value={address.state} name='state' label='state' required />
      <Input
        onChange={handleChange}
        value={address.country}
        name='country'
        label='country'
        required
      />
      <button
        type='submit'
        className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white'>
        {'Save Changes'}
      </button>
    </form>
  );
};

export default Address;
