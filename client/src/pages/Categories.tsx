import { Pen, Trash2 } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { formatDate, Input, Loading, Select } from '../utils';

const CategoryListing = () => {
  const { data, refetch } = useFetch('/api/v1/category');

  return (
    <div className='p-2'>
      <div className='p-2 rounded-lg bg-white flex items-center gap-3'>
        <Input name='title' placeholder='Search title...' />
      </div>
      <div className='grid md:grid-cols-3 sm:grid-cols-2  gap-2'>
        {data?.length ? (
          data?.map((item: BrandType) => (
            <CategoryItem key={item._id} {...item} refetch={refetch} />
          ))
        ) : (
          <Loading />
        )}
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
  thumbnail,
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
      <div className='flex items-center justify-between mb-2 relative rounded-t-lg overflow-hidden'>
        <img alt={title} src={thumbnail} />
        <button className='text-neutral-600 hover:bg-neutral-50 rounded-lg absolute top-1 right-8'>
          <Pen size={18} />
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className='text-red-600 hover:bg-neutral-50 rounded-lg  absolute top-1 right-1'>
          <Trash2 size={18} />
        </button>
      </div>
      <div className='p-3'>
        <h3 className='mb-2 font-medium capitalize'>{title}</h3>
        <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
          <span>{formatDate(createdAt)}</span>
          {status === 'active' ? (
            <span className='text-green-500'>{status}</span>
          ) : (
            <span className='text-red-500'>{status}</span>
          )}
        </div>
      </div>
    </div>
  );
};
