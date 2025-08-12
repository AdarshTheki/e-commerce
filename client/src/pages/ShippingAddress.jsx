import { useState } from 'react';
import { Edit2, Trash2Icon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { errorHandler, axios } from '../config';
import { Input, Select } from '../utils';
import {
  updateAddress,
  addAddress,
  removeAddress,
} from '../redux/addressSlice';

const countries = [
  { label: 'China', value: '+86' },
  { label: 'India', value: '+91' },
  { label: 'United States', value: '+1' },
  { label: 'Indonesia', value: '+62' },
  { label: 'Pakistan', value: '+92' },
  { label: 'Nigeria', value: '+234' },
  { label: 'Brazil', value: '+55' },
  { label: 'Bangladesh', value: '+880' },
  { label: 'Russia', value: '+7' },
  { label: 'Mexico', value: '+52' },
];

const ShippingAddress = () => {
  const { items } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [formData, setFormData] = useState({
    addressLine: '',
    city: '',
    postalCode: '',
    countryCode: 'IN',
    isDefault: false,
    value: '',
  });

  const handleAddressSubmit = async (item) => {
    try {
      setLoading(true);
      if (!item.addressLine || !item.city || !item.postalCode) {
        throw new Error('please fill all filed');
      }
      const method = item?._id ? 'patch' : 'post';
      const url = item?._id ? `/address/${item._id}` : '/address';

      const res = await axios[method](url, item);

      if (res.data) {
        if (item._id) {
          dispatch(updateAddress(res.data.data));
        } else {
          dispatch(addAddress(res.data.data));
        }

        setIsOpenForm(false);
        setFormData({});
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`/address/${id}`);
      dispatch(removeAddress(id));
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-4">
      <div
        onClick={() => {
          setIsOpenForm(!isOpenForm);
          setFormData({});
        }}
        className="border border-gray-300 cursor-pointer card mb-5 relative max-w-3xl">
        <p className="font-medium pl-2 text-xl">Add New Address</p>
      </div>

      {items &&
        items?.map((item) => {
          return (
            <AddressItem
              key={item._id}
              item={item}
              isDelete={() => handleDeleteAddress(item._id)}
              isEdit={() => {
                setIsOpenForm(true);
                setFormData(item);
              }}
            />
          );
        })}

      {isOpenForm && (
        <AddressForm
          item={formData}
          loading={loading}
          onClose={() => {
            setIsOpenForm(false);
            setFormData({});
          }}
          onSubmit={handleAddressSubmit}
        />
      )}
    </div>
  );
};

export default ShippingAddress;

const AddressForm = ({ item, loading, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    addressLine: item?.addressLine || '',
    city: item?.city || '',
    postalCode: item?.postalCode || '',
    countryCode: item?.countryCode || 'IN',
    isDefault: item?.isDefault || false,
    _id: item?._id || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...formData, value: item?._id });
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/10">
      <form
        className="space-y-4 max-w-2xl w-full p-5 sm:p-10 mx-3 shadow-2xl bg-white rounded-xl"
        onSubmit={handleSubmit}>
        <p className="text-2xl font-semibold">
          {item?._id ? 'Update Address' : 'Add New Address'}
        </p>
        <Input
          label="AddressLine"
          name="addressLine"
          value={formData.addressLine}
          onChange={(e) =>
            setFormData({ ...formData, addressLine: e.target.value })
          }
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <div className="flex gap-4">
          <Input
            label="Postal code"
            name="postalCode"
            type="number"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <Select
            label="Country"
            name="countryCode"
            options={countries}
            value={formData.countryCode}
            onChange={(e) =>
              setFormData({ ...formData, countryCode: e.target.value })
            }
          />
        </div>
        <label htmlFor="address default" className="flex gap-2">
          <input
            type="checkbox"
            name="isDefault"
            id="address default"
            value={formData.isDefault}
            checked={formData.isDefault}
            onChange={(e) => {
              console.log(e.target.checked);
              setFormData({
                ...formData,
                isDefault: e.target.checked,
              });
            }}
          />
          <span>Default Address</span>
        </label>

        <div className="flex gap-5 mt-5 max-w-[300px]">
          <button
            onClick={onClose}
            type="button"
            className="text-red-600 btn text-nowrap w-full border border-red-600">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 btn text-nowrap w-full text-white">
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

const AddressItem = ({ item, isEdit, isDelete }) => {
  return (
    <div key={item._id} className="relative mb-5 max-w-3xl">
      <div
        className={`capitalize !pl-5 border border-gray-300 cursor-pointer card`}>
        {item.isDefault && <p className="status-active w-fit mb-2">Default</p>}
        <div className="flex items-center">
          <p className="font-semibold">{item.addressLine}</p>
          <button onClick={isEdit} className="svg-btn p-2 ">
            <Edit2 />
          </button>
          <button onClick={isDelete} className="svg-btn p-2  text-red-600">
            <Trash2Icon />
          </button>
        </div>
        <p>
          {item.city}, {item.postalCode}, <br />
          {countries.filter((i) => i.value === item?.countryCode)[0]?.label}
        </p>
      </div>
    </div>
  );
};
