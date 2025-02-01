import { NavLink } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

import { Input, Loading, DropdownMenu, Breadcrumb } from '../utils';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';

const sortByOptions = [
  { label: 'title by asc ', value: 'title-asc' },
  { label: 'title by desc ', value: 'title-desc' },
  { label: 'price by asc ', value: 'price-asc' },
  { label: 'price by desc ', value: 'price-desc' },
];

const pageSizeOptions = [
  { label: '10 per page', value: 10 },
  { label: '30 per page', value: 30 },
  { label: '50 per page', value: 50 },
  { label: '100 per page', value: 100 },
];

export default function Product() {
  const [sortBy, setSortBy] = useState<string>('title-asc');
  const [limit, setLimit] = useState<string>('10');
  const [search, setSearch] = useState<string>('');
  const query = useDebounce(search, 500);

  // GET /products?title=laptop&category=Electronics&minPrice=1000&sortBy=rating&order=desc&page=1&limit=5

  const { data, loading } = useFetch<FetchResponseProp>(
    `/api/v1/product?title=${query}&status=${status}&limit=${limit}&sortBy=${
      sortBy.split('-')[0]
    }&order=${sortBy.split('-')[1]}`
  );

  const pageItem = () => {
    return (
      <div className='w-[140px]'>
        {pageSizeOptions.map((i) => (
          <button
            onClick={() => setLimit(String(i.value))}
            className={`w-full hover:bg-gray-50 py-1.5 text-sm ${
              i.value == Number(limit) && 'text-indigo-600'
            }`}
            key={i.label}>
            {i.label}
          </button>
        ))}
      </div>
    );
  };

  const sortByItem = () => {
    return (
      <div className='w-[140px]'>
        {sortByOptions.map((i) => (
          <button
            onClick={() => setSortBy(i.value)}
            className={`w-full hover:bg-gray-50 py-1.5 text-sm ${
              i.value === sortBy && 'text-indigo-600'
            }`}
            key={i.label}>
            {i.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Breadcrumb
          paths={[
            { label: 'Home', to: '/' },
            { label: 'Product', to: '/product' },
          ]}
        />
        <NavLink
          to={'/product/create'}
          className='bg-indigo-600 flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700'>
          <Plus size={16} /> <span>Add Product</span>
        </NavLink>
      </div>

      <div className='p-4 rounded-lg bg-white'>
        {/* Filter products */}
        <div className='flex sm:gap-4 gap-2 items-center justify-between'>
          <Input
            name='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            className='w-full text-sm py-1.5'
            placeholder='Search products...'
          />
          <div className='flex items-center justify-between sm:gap-4 gap-2'>
            <DropdownMenu name='sort' position='right'>
              {sortByItem()}
            </DropdownMenu>
            <DropdownMenu name='page' position='right'>
              {pageItem()}
            </DropdownMenu>
          </div>
        </div>
        <div className='sm:flex-row flex gap-2 flex-col items-center sm:justify-between text-sm justify-center pt-5'>
          <p className='text-sm text-gray-500'>Showing 1 to 10 of 45 products</p>
          <div className='flex space-x-2'>
            <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
              Previous
            </button>
            <button className='px-3 py-1 bg-indigo-600 text-white rounded-lg'>1</button>
            <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
              2
            </button>
            <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
              3
            </button>
            <button className='px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-gray-50'>
              Next
            </button>
          </div>
        </div>
      </div>

      {data?.totalDocs && !loading ? (
        <ProductDisplay item={data?.docs} />
      ) : (
        <Loading className='min-h-[50vh]' />
      )}
    </>
  );
}

const ProductDisplay = ({ item }: { item: ProductType[] }) => {
  return (
    <>
      <table className='w-full border-collapse lg:block hidden overflow-x-auto'>
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
            <ProductDesktop key={index} item={item} />
          ))}
        </tbody>
      </table>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden'>
        {item?.map((item: ProductType) => (
          <ProductMobile key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

const ProductMobile = ({ item }: { item: ProductType }) => {
  const [status, setStatus] = useState<string>(item?.status === 'active' ? 'active' : 'inactive');

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/v1/product/${id}`);
      if (res.data) {
        toast.success('Product deleted success');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleStatus = async (text: string) => {
    try {
      const res = await axios.post(`/api/v1/product/status/${item._id}`, { status: text });
      if (res.data) {
        toast.success('Product status updated');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div key={item._id} className='border bg-white rounded-lg p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold line-clamp-2 capitalize'>{item.title.toLowerCase()}</h3>
        <div className='flex items-center justify-end gap-3'>
          <NavLink to={`/product/${item?._id}`}>
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
      <div className='space-x-4 space-y-3'>
        <strong className='whitespace-nowrap text-sm text-gray-700'>Price ${item.price}</strong>
        <DropdownMenu name={status}>
          {['active', 'inactive'].map((i) => (
            <button
              className={`block mr-6 hover:bg-gray-50 py-1.5 pl-5 text-sm ${
                i === status && 'text-indigo-600'
              }`}
              key={i}
              onClick={() => {
                setStatus(i);
                handleStatus(i);
              }}>
              {i}
            </button>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
};

const ProductDesktop = ({ item }: { item: ProductType }) => {
  const [status, setStatus] = useState<string>(item?.status === 'active' ? 'active' : 'inactive');

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/v1/product/${id}`);
      if (res.data) {
        toast.success('Product deleted success');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleStatus = async (text: string) => {
    try {
      const res = await axios.post(`/api/v1/product/status/${item._id}`, { status: text });
      if (res.data) {
        toast.success('Product status updated');
      }
    } catch (err) {
      toast.error(err.response.data.message);
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
        <DropdownMenu name={status}>
          {['active', 'inactive'].map((i) => (
            <button
              className={`block mr-6 hover:bg-gray-50 py-1.5 pl-5 text-sm ${
                i === status && 'text-indigo-600'
              }`}
              key={i}
              onClick={() => {
                setStatus(i);
                handleStatus(i);
              }}>
              {i}
            </button>
          ))}
        </DropdownMenu>
      </td>
      <td className='flex gap-3 pt-5 justify-center'>
        <NavLink to={`/product/${item?._id}`}>
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
