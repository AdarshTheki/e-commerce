import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

import useFetch from '../hooks/useFetch';
import { Input, Loading, Dropdown } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Product() {
  const [sortBy, setSortBy] = useState<string>('title-asc');
  const [limit, setLimit] = useState<string>('10');
  const [search, setSearch] = useState<string>('');

  // GET /products?title=laptop&category=Electronics&minPrice=1000&sortBy=rating&order=desc&page=1&limit=5

  const { data, loading, refetch } = useFetch<FetchResponseProp>(
    `/api/v1/product?title=${search}&status=${status}&limit=${limit}&sortBy=${
      sortBy.split('-')[0]
    }&order=${sortBy.split('-')[1]}`
  );

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='mb-6 text-xl font-semibold'>Products</h2>
        <NavLink
          to={'/products/create'}
          className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200'>
          Add Product
        </NavLink>
      </div>

      {/* Filter products */}
      <div className='flex mb-5 sm:gap-4 max-sm:flex-wrap gap-2 items-center justify-between bg-white sm:p-3 p-2 border rounded-lg'>
        <Input
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          className='w-full'
          placeholder='Search products...'
        />
        <div className='flex items-center justify-between gap-5'>
          <Dropdown
            value={sortBy}
            onSelect={setSortBy}
            options={['title-asc', 'title-desc', 'price-asc', 'price-desc']}
          />
          <Dropdown value={limit} onSelect={setLimit} options={['10', '30', '50', '100']} />
        </div>
      </div>

      {data?.totalDocs && !loading ? (
        <ProductDisplay item={data?.docs} refetch={refetch} />
      ) : (
        <Loading className='min-h-[50vh]' />
      )}
    </>
  );
}

const ProductDisplay = ({ item, refetch }: { item: ProductType[]; refetch: () => void }) => {
  return (
    <>
      <table className='w-full border-collapse lg:block hidden'>
        <thead>
          <tr className='bg-gray-50'>
            {['product', 'brand', 'category', 'price', 'status', 'action'].map((heading) => (
              <th
                key={heading}
                className='px-6 py-4 text-left text-xs font-medium bg-indigo-50 text-gray-500 uppercase tracking-wider border-b'>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {item?.map((item: ProductType, index: number) => (
            <ProductDesktop key={index} item={item} refetch={refetch} />
          ))}
        </tbody>
      </table>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden'>
        {item?.map((item: ProductType) => (
          <ProductMobile key={item._id} item={item} refetch={refetch} />
        ))}
      </div>
    </>
  );
};

const ProductMobile = ({ item, refetch }: { item: ProductType; refetch: () => void }) => {
  const [status, setStatus] = useState<string>(item?.status === 'active' ? 'active' : 'inactive');

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/v1/product/${id}`);
      if (res.data) {
        refetch();
      }
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleStatus = async (text: string) => {
    try {
      const res = await axios.post(`/api/v1/product/status/${item._id}`, { status: text });
      if (res.data) {
        toast.success('Product status updated');
        refetch();
      }
    } catch (err) {
      toast.error(`Failed to status product`);
    }
  };

  return (
    <div key={item._id} className='border bg-white rounded-lg p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold line-clamp-2 capitalize'>{item.title.toLowerCase()}</h3>
        <div className='flex items-center justify-end gap-3'>
          <NavLink to={`/products/${item?._id}`}>
            <Pencil size={18} className='text-indigo-600 hover:text-indigo-800' />
          </NavLink>
          <Trash2
            size={18}
            onClick={() => handleDelete(item._id)}
            className='text-red-600 hover:text-red-900 cursor-pointer'
          />
        </div>
      </div>
      <p className='text-sm text-gray-600 pt-2'>
        {item?.brand} | {item?.category}
      </p>
      <div className='space-x-4 capitalize space-y-3'>
        <strong className='whitespace-nowrap text-sm text-gray-700'>Price ${item.price}</strong>
        <Dropdown
          options={['active', 'inactive']}
          value={status}
          onSelect={setStatus}
          onFetch={handleStatus}
        />
      </div>
    </div>
  );
};

const ProductDesktop = ({ item, refetch }: { item: ProductType; refetch: () => void }) => {
  const [status, setStatus] = useState<string>(item?.status === 'active' ? 'active' : 'inactive');

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/v1/product/${id}`);
      if (res.data) {
        refetch();
      }
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleStatus = async (text: string) => {
    try {
      const res = await axios.post(`/api/v1/product/status/${item._id}`, { status: text });
      if (res.data) {
        toast.success('Product status updated');
        refetch();
      }
    } catch (err) {
      toast.error(`Failed to status product`);
    }
  };

  return (
    <tr key={item._id} className='text-sm'>
      <td className='px-6 py-2 whitespace-nowrap w-full'>
        <h2 className='text-sm line-clamp-1 font-medium text-gray-900'>{item.title}</h2>
      </td>
      <td className='px-6 py-2 whitespace-nowrap'>{item?.brand}</td>
      <td className='px-6 py-2 whitespace-nowrap'>{item?.category}</td>
      <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.price}</td>
      <td className='px-6 py-2 whitespace-nowrap'>
        <Dropdown
          options={['active', 'inactive']}
          value={status}
          onFetch={handleStatus}
          onSelect={setStatus}
        />
      </td>
      <td className='flex gap-3 pt-5 justify-center'>
        <NavLink to={`/products/${item?._id}`}>
          <Pencil size={18} className='text-indigo-600 hover:text-indigo-800' />
        </NavLink>
        <Trash2
          size={18}
          onClick={() => handleDelete(item._id)}
          className='text-red-600 hover:text-red-900 cursor-pointer'
        />
      </td>
    </tr>
  );
};
