import { NavLink } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

import { Input, Loading, DropdownMenu, Breadcrumb, PaginationBtn } from '../utils';
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
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const query = useDebounce(search, 500);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= data?.totalPages) {
      setPage(newPage);
    }
  };

  // GET /products?title=laptop&category=Electronics&minPrice=1000&sortBy=rating&order=desc&page=1&limit=5
  const { data, loading } = useFetch<FetchResponseProp>(
    `/api/v1/product?title=${query}&page=${page}&limit=${limit}&sortBy=${
      sortBy.split('-')[0]
    }&order=${sortBy.split('-')[1]}`
  );

  const pageItem = () => {
    return (
      <div className='w-[140px]'>
        {pageSizeOptions.map((i) => (
          <button
            onClick={() => setLimit(i.value)}
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
      <div className='flex items-center justify-between p-2'>
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

        <hr className='border my-4 border-gray-100' />

        {/* Pagination */}
        <div className='sm:flex-row flex gap-2 flex-col sm:justify-between text-sm'>
          <p className='text-sm text-gray-500'>
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, data?.totalDocs)} of{' '}
            {data?.totalDocs} products
          </p>
          <div className='flex gap-2 items-center'>
            <button
              className={`btn text-xs !py-1 !px-2.5 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                page === 1 && 'hidden'
              }`}
              onClick={() => handlePageChange(page - 1)}>
              Prev
            </button>

            <PaginationBtn
              handlePageChange={handlePageChange}
              page={data?.page}
              totalPages={data?.totalPages}
            />

            <button
              className={`btn text-xs !py-1 !px-2.5 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                page === data?.totalPages && 'hidden'
              }`}
              onClick={() => handlePageChange(page + 1)}>
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
    <div key={item._id} className='border relative bg-white rounded-lg overflow-hidden'>
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
      <div className='p-4 capitalize space-y-1'>
        <p className='text-sm'>#{item?.brand}</p>
        <h3 className='font-semibold line-clamp-1 capitalize'>{item.title.toLowerCase()}</h3>
        <p className='text-sm text-gray-600'>{item?.category?.split('-').join(' ')}</p>
        <div className='flex flex-wrap gap-1 justify-between items-center'>
          <h3 className='whitespace-nowrap font-semibold text-sm text-gray-700'>
            Price: ${item.price}
          </h3>
          <span className={status.toLowerCase() !== 'active' ? 'status-inactive' : 'status-active'}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
