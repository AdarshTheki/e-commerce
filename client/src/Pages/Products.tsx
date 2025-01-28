import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDownAZ, ArrowUpZA, Pencil, Trash2 } from 'lucide-react';

import useFetch from '../hooks/useFetch';
import { categories, brands, Select, Input, Loading } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Product() {
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // GET /products?title=laptop&category=Electronics&minPrice=1000&sortBy=rating&order=desc&page=1&limit=5

  const { data, loading, refetch } = useFetch<FetchResponseProp>(
    `/api/v1/product?title=${search}&category=${category}&brand=${brand}&minPrice=1000&sortBy=${
      sort.split('-')[0]
    }&order=${sort.split('-')[1]}&page=${page}&limit=${limit}`
  );

  return (
    <div>
      <section id='products' className='sm:p-6 p-2'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='mb-6 text-xl font-semibold'>Products</h2>
          <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
            Add Product
          </button>
        </div>

        {/* Filter products */}
        <div className='bg-white p-4 rounded-lg border border-gray-200 mb-6'>
          <div className='flex max-md:flex-wrap sm:gap-4 gap-2 items-center justify-between'>
            <Input
              name='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              className='flex-1'
              placeholder='Search products...'
            />

            <Select
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { id: '', title: 'status' },
                { id: 'ACTIVE', title: 'active' },
                { id: 'INACTIVE', title: 'inactive' },
              ]}
              className='capitalize'
            />
          </div>
        </div>

        {data?.totalDocs ? (
          <ProductDisplay item={data?.docs} refetch={refetch} />
        ) : (
          <Loading className='min-h-[50vh]' />
        )}
      </section>
    </div>
  );
}

const ProductDisplay = ({ item, refetch }: { item: ProductType[]; refetch: () => void }) => {
  return (
    <>
      <div className='overflow-x-auto lg:block hidden'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-50'>
              {['product', 'brand', 'category', 'price', 'status', 'action'].map((heading) => (
                <th
                  key={heading}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
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
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden'>
        {item?.map((item: ProductType) => (
          <ProductMobile key={item._id} item={item} refetch={refetch} />
        ))}
      </div>
    </>
  );
};

const ProductMobile = ({ item, refetch }: { item: ProductType; refetch: () => void }) => {
  const [status, setStatus] = useState<string>('');

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

  const handleStatus = async (id: string, status: string) => {
    try {
      const res = await axios.patch(`/api/v1/product/${id}/status`, { status });
      if (res.data) {
        refetch();
      }
    } catch (err) {
      toast.error('Failed to status product');
    }
  };
  return (
    <div key={item._id} className='border bg-white rounded-lg p-4'>
      <h3 className='font-semibold line-clamp-2 capitalize'>{item.title.toLowerCase()}</h3>
      <p className='text-sm text-gray-600 pt-2'>
        {item?.brand} | {item?.category}
      </p>
      <div className='space-x-4 capitalize space-y-3'>
        <strong className='whitespace-nowrap text-sm text-gray-700'>Price ${item.price}</strong>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          {item.status}
        </span>
        <div className='flex items-center justify-end gap-5'>
          <NavLink to={`/product/${item?._id}/update`}>
            <Pencil size={18} className='text-blue-600 hover:text-blue-800' />
          </NavLink>
          <Trash2
            size={18}
            onClick={() => handleDelete(item._id)}
            className='text-red-600 hover:text-red-900 cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
};

const ProductDesktop = ({ item, refetch }: { item: ProductType; refetch: () => void }) => {
  const [status, setStatus] = useState<string>(item.status);

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
      const res = await axios.patch(`/api/v1/product/${item._id}/status`, { status: text });
      if (res.data) {
        toast.success('Product status updated');
        refetch();
      }
    } catch (err) {
      toast.error('Failed to status product');
      console.log(err);
    }
  };

  return (
    <tr key={item._id}>
      <td className='px-6 py-4 whitespace-nowrap'>
        <h2 className='text-sm line-clamp-1 font-medium text-gray-900'>{item.title}</h2>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>{item?.brand}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{item?.category}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.price}</td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleStatus(e.target.value);
          }}>
          <option defaultChecked>Select</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </td>
      <td className='flex gap-5 pt-5 justify-center'>
        <NavLink to={`/product/${item?._id}/update`}>
          <Pencil size={18} className='text-blue-600 hover:text-blue-800' />
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
