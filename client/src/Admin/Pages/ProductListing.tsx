import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDownAZ, ArrowUpZA, Pencil, Trash2 } from 'lucide-react';
import { categories, brands, useFetch, Select, Input } from '../../Utils';

export default function Product() {
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');

  const { data, loading, refetch } = useFetch<PromiseResponseType>(
    `/products?limit=${limit}&categoryId=${category}&brandId=${brand}&status=${status}&sort=${sort}`
  );

  const productsFilter = data?.data?.filter((i: ProductType) =>
    search.length > 1 ? i?.title?.toLowerCase().includes(search.toLowerCase()) : i
  );

  if (loading) {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center ${
          loading ? 'flex' : 'hidden'
        }`}>
        <div className='p-8 rounded-lg'>
          <div className='flex space-x-4'>
            <div className='w-4 h-4 bg-blue-700 rounded-full animate-pulse'></div>
            <div className='w-4 h-4 bg-blue-700 rounded-full animate-pulse delay-100'></div>
            <div className='w-4 h-4 bg-blue-700 rounded-full animate-pulse delay-200'></div>
          </div>
        </div>
      </div>
    );
  }

  function EmptyData() {
    return (
      <div className='grid max-sm:grid-cols-2 sm:gap-4 gap-2 bg-white sm:p-4 p-1 rounded-lg'>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className='sm:flex sm:gap-5 bg-gray-50 p-2 rounded-lg'>
            <div className='h-4 bg-gray-200 my-2 rounded w-5/6'></div>
            <div className='h-4 bg-gray-200 my-2 rounded w-1/3'></div>
            <div className='h-4 bg-gray-200 my-2 rounded w-3/4'></div>
            <div className='h-4 bg-gray-200 my-2 rounded w-1/2'></div>
            <div className='h-4 bg-gray-200 my-2 rounded w-2/3'></div>
          </div>
        ))}
      </div>
    );
  }

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
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { _id: '', title: 'All category' },
                ...categories.map((i) => ({ _id: i.id, title: i.title })),
              ]}
              className='capitalize'
            />
            <Select
              name='brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              options={[
                { _id: '', title: 'All bands' },
                ...brands.map((i) => ({ _id: i.id, title: i.title })),
              ]}
              className='capitalize'
            />
            <Select
              name='limit'
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              options={[
                { _id: '10', title: '10 / page' },
                { _id: '20', title: '20 / page' },
                { _id: '100', title: '100 / page' },
              ]}
              className='capitalize'
            />
            <Select
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { _id: '', title: 'status' },
                { _id: 'ACTIVE', title: 'active' },
                { _id: 'INACTIVE', title: 'inactive' },
              ]}
              className='capitalize'
            />
            <button
              onClick={() => setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className='p-1.5 border rounded-lg'>
              {sort === 'asc' ? <ArrowUpZA /> : <ArrowDownAZ />}
            </button>
          </div>
        </div>

        {productsFilter?.length ? (
          <ProductDisplay item={productsFilter} refetch={refetch} />
        ) : (
          <EmptyData />
        )}
      </section>
    </div>
  );
}

const ProductDisplay = ({ item, refetch }: { item: ProductType[]; refetch: () => void }) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result) {
        console.log(result);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='overflow-x-auto lg:block hidden'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                Product
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {item?.map((item: ProductType, index: number) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <img
                      src='https://avatar.iran.liara.run/public'
                      alt='Product'
                      className='w-10 h-10 rounded-lg transition-opacity duration-300 opacity-100'
                      loading='lazy'
                    />
                    <div className='ml-4'>
                      <div className='text-sm line-clamp-1 font-medium text-gray-900'>
                        {item.title.substring(0, 30)}
                      </div>
                      <div className='text-sm text-gray-500'>{item?.brand?.title}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                    {item?.category?.title}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {item.delivery_amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {item.status}
                  </span>
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
            ))}
          </tbody>
        </table>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden'>
        {item?.map((item: ProductType) => (
          <div key={item._id} className='border bg-white rounded-lg p-4'>
            <h3 className='font-semibold line-clamp-2 capitalize'>{item.title.toLowerCase()}</h3>
            <p className='text-sm text-gray-600 pt-2'>
              {item?.brand?.title} | {item?.category?.title}
            </p>
            <div className='space-x-4 capitalize space-y-3'>
              <strong className='whitespace-nowrap text-sm text-gray-700'>
                Price ${item.delivery_amount}
              </strong>
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
        ))}
      </div>
    </>
  );
};
