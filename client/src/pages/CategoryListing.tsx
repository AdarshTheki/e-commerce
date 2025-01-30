import { Input, Select, useFetch } from '../utils';
import { format } from 'date-fns';

const CategoryListing = () => {
  const { data, error, refetch, loading } = useFetch('/brand?limit=500');

  if (loading)
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center ${
          loading ? 'flex' : 'hidden'
        }`}>
        <div className='p-8 rounded-lg'>
          <div className='flex space-x-4'>
            <div className='w-4 h-4 bg-indigo-700 rounded-full animate-pulse'></div>
            <div className='w-4 h-4 bg-indigo-700 rounded-full animate-pulse delay-100'></div>
            <div className='w-4 h-4 bg-indigo-700 rounded-full animate-pulse delay-200'></div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className='p-2'>
        <div className='p-2 rounded-lg bg-white flex items-center gap-3'>
          <Input name='title' placeholder='Search title...' />
          <Select
            name='top_brand'
            options={[
              { _id: 'NO', title: 'No' },
              { _id: 'YES', title: 'Yes' },
            ]}
          />
          <Select
            name='status'
            options={[
              { _id: 'ACTIVE', title: 'Active' },
              { _id: 'INACTIVE', title: 'Inactive' },
            ]}
          />
        </div>
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2'>
        {data?.data?.map((item: BrandType) => (
          <CategoryItem key={item._id} {...item} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default CategoryListing;

const CategoryItem = ({
  _id,
  status,
  title,
  createdAt,
  sequence,
  thumbnail,
  top_brand,
  refetch,
}: BrandType & { refetch: () => void }) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await (
        await fetch(`http://localhost:8000/api/v1/brand/${id}`, { method: 'DELETE' })
      ).json();
      if (res) {
        refetch();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-200/20'>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='w-16 h-16 bg-neutral-100 rounded-lg'></div>
          <div className='flex sm:gap-2'>
            <button className='text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'></path>
              </svg>
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className='text-red-600 hover:bg-neutral-50 rounded-lg transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
              </svg>
            </button>
          </div>
        </div>
        <h3 className='font-semibold text-lg mb-2 capitalize'>{title}</h3>
        <p className='text-sm text-neutral-600 mb-4'>Sequence: {sequence}</p>
        <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
          <span>Created: {createdAt ? format(new Date(createdAt), 'yyyy-MM-dd') : 'N/A'}</span>
          {status == 'ACTIVE' ? (
            <span className='text-green-500'>{status}</span>
          ) : (
            <span className='text-red-500'>{status}</span>
          )}
        </div>
      </div>
    </div>
  );
};
