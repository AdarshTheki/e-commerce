import React, { useState } from 'react';
import { Input, SpinnerBtn } from './ui';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { AxiosError } from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { axiosInstance, countries, errorHandler } from '@/lib/utils';

const UserForm = ({ userData }: { userData?: UserType }) => {
  const [user, setUser] = React.useState({
    email: userData?.email || '',
    password: userData?.password || '',
    fullName: userData?.fullName || '',
    role: userData?.role || '',
    status: userData?.status || '',
    code: userData?.phoneNumber?.split('-')[0] || '+91',
    phone: userData?.phoneNumber?.split('-')[1] || '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useTitle(`Cartify: ${userData?._id ? 'Update User' : 'Add New User'}`);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
    try {
      if (userData?._id) {
        response = await axiosInstance.patch(`/user/admin/${userData._id}`, {
          ...user,
          phoneNumber: `${user.code}-${user.phone}`,
        });
      } else {
        response = await axiosInstance.post('/user/admin', {
          ...user,
          phoneNumber: `${user.code}-${user.phone}`,
        });
      }
      if (response.data) {
        navigate('/customer');
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-lg space-y-6 p-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-medium">
        {user?.email ? 'User Update' : 'Create User'}
      </h2>
      <Input
        name="fullName"
        onChange={handleChange}
        type="text"
        value={user.fullName}
        required={true}
      />

      <Input
        name="email"
        type="email"
        onChange={handleChange}
        value={user.email}
        required={true}
      />

      {!userData?._id && (
        <Input
          name="password"
          onChange={handleChange}
          type="text"
          value={user.password}
          required={true}
        />
      )}
      <div className="flex gap-3 items-end">
        <Input
          type="number"
          name="phone"
          placeholder="Enter Phone Number"
          onChange={handleChange}
          value={user.phone}
          required={true}
        />
        <Select onValueChange={(value) => setUser({ ...user, code: value })}>
          <SelectTrigger className="w-xl">
            <SelectValue placeholder={user.code} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {countries.map((item) => (
              <SelectItem value={item.id}>
                {item.id} - {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3">
        <Select
          onValueChange={(value) =>
            setUser({
              ...user,
              role: value as 'customer' | 'admin' | 'seller',
            })
          }>
          <SelectTrigger className="">
            <SelectValue placeholder={user.role || 'Select Role'} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              { id: 'customer', title: 'Customer' },
              { id: 'seller', title: 'Seller' },
              { id: 'user', title: 'User' },
            ].map((item) => (
              <SelectItem value={item.id}>{item.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setUser({ ...user, status: value })}>
          <SelectTrigger className="">
            <SelectValue placeholder={user.status || 'Select Status'} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              { id: 'active', title: 'Active' },
              { id: 'inActive', title: 'In-Active' },
            ].map((item) => (
              <SelectItem value={item.id}>{item.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-5 items-center mt-5">
        <SpinnerBtn
          className="!btn"
          type="submit"
          loading={loading}
          primaryName={userData?._id ? 'Update User' : 'Create User'}
        />
        <NavLink to={'/customer'} className="btn bg-red-600 !text-white">
          Cancel
        </NavLink>
      </div>
    </form>
  );
};

export default UserForm;
