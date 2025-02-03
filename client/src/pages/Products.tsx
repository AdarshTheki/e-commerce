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
          className='btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize'>
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
            className='w-full text-sm py-1.5 pl-4'
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
        {/* <!-- Pagination --> */}
        <div className='sm:flex-row flex gap-2 flex-col sm:justify-between text-sm pt-5'>
          <p className='text-sm text-gray-500'>Showing 1 to 10 of 45 products</p>
          <div className='flex gap-2'>
            <button className='btn  text-xs border border-neutral-200 rounded-lg hover:bg-gray-50'>
              Prev
            </button>
            <button className='btn text-xs bg-indigo-600 text-white rounded-lg'>1</button>
            <button className='btn text-xs border border-neutral-200 rounded-lg hover:bg-gray-50'>
              2
            </button>
            <button className='btn text-xs border border-neutral-200 rounded-lg hover:bg-gray-50'>
              3
            </button>
            <button className='btn text-xs border border-neutral-200 rounded-lg hover:bg-gray-50'>
              Next
            </button>
          </div>
        </div>
      </div>

      {!loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
          {data?.docs?.map((item: ProductType) => (
            <ProductMobile key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <Loading className='min-h-[50vh]' />
      )}
    </>
  );
}

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

  return (
    <div key={item._id} className='border relative bg-white rounded-lg'>
      <button className='svg-btn text-indigo-600 hover:text-indigo-800 absolute top-1 right-10'>
        <NavLink to={`/product/${item?._id}`}>
          <Pencil size={18} />
        </NavLink>
      </button>
      <button className='svg-btn text-red-600 hover:text-red-900 cursor-pointer absolute top-1 right-2'>
        <Trash2 size={18} onClick={() => handleDelete(item._id)} />
      </button>
      <div>
        <img alt={item._id} src={item.thumbnail || 'https://placehold.co/600x500'} loading='lazy' />
      </div>
      <div className='space-y-2 p-4'>
        <h3 className='font-semibold line-clamp-2 capitalize'>{item.title.toLowerCase()}</h3>
        <p className='text-sm text-gray-600'>
          {item?.brand} | {item?.category}
        </p>
        <div className='flex flex-wrap gap-1   justify-between items-center'>
          <h3 className='whitespace-nowrap font-semibold text-sm text-gray-700'>
            Price: ${item.price}
          </h3>
          <span
            className={`text-white capitalize bg-green-600 px-2 py-1 rounded-lg text-xs ${
              status.toLowerCase() !== 'active' && '!bg-red-600'
            }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
