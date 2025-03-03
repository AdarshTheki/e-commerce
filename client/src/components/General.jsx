import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Input } from '../utils';
import { baseUrl } from '../helper/constant';

const General = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '',
    phoneNumber: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        countryCode: user?.countryCode || '',
        phoneNumber: user?.phoneNumber || 0,
      });
    }
  }, [user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSettingsSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber } = formData;
    try {
      setLoading(true);
      const response = await axios.patch(baseUrl + '/api/v1/user/update', {
        firstName,
        lastName,
        phoneNumber,
        countryCode: '+91',
      });
      if (response.data) toast.success('user update success please refresh');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='grid pt-5 gap-6' onSubmit={onSettingsSubmit}>
      <Input
        value={formData.firstName}
        onChange={handleChange}
        name='firstName'
        label='First Name'
      />
      <Input value={formData.lastName} onChange={handleChange} name='lastName' label='Last Name' />
      <Input
        value={formData.phoneNumber || ''}
        type='number'
        onChange={handleChange}
        name='phoneNumber'
        label='Phone'
      />
      <button
        type='submit'
        className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white'>
        {loading ? 'loading...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default General;
