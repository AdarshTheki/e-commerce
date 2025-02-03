import { EllipsisVertical, Plus } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { Breadcrumb, Loading, formatDate } from '../utils';
import { NavLink, useLocation } from 'react-router-dom';

const Customers = () => {
  const { pathname } = useLocation();
  const { data, loading, error } = useFetch('/api/v1/user');

  if (loading || error) return <Loading />;

  return (
    <>
      <div className='flex items-center justify-between'>
        <Breadcrumb
          paths={[
            { label: 'Home', to: '/' },
            { label: pathname.split('/').join(''), to: `${pathname}` },
          ]}
        />
        <NavLink
          to={`${pathname}/create`}
          className='bg-indigo-600 capitalize flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700'>
          <Plus size={16} /> <span>Add {pathname.split('/').join('')}</span>
        </NavLink>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {data?.map((i: UserType) => (
          <Card key={i?._id} user={i} />
        ))}
      </div>
    </>
  );
};

export default Customers;

const Card = ({ user }: { user: UserType }) => {
  const url = user?.avatar || 'https://avatar.iran.liara.run/public';
  return (
    <div className='bg-white rounded-lg border border-neutral-200/30 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-4'>
          <img
            src={url}
            alt='Customer'
            className='w-12 h-12 rounded-full transition-opacity duration-300 opacity-100'
            loading='lazy'
          />
          <div>
            <h3 className='font-medium'>{user.username || 'jane smite'}</h3>
            <p className='text-sm text-gray-500'>{user.email || 'jane@example.com'}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <button className='p-2 text-gray-600 hover:bg-gray-50 rounded-lg'>
            <EllipsisVertical size={18} />
          </button>
        </div>
      </div>
      <div className='space-y-3'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Member Since</span>
          <span>{formatDate(user?.createdAt) || 'Nov 28, 2023'}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Total Orders</span>
          <span>18</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Total Spent</span>
          <span>$1,856.00</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Status</span>
          <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full'>Active</span>
        </div>
      </div>
      <div className='mt-6 flex space-x-3'>
        <button className='flex-1 px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50'>
          View Profile
        </button>
        <button className='flex-1 px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
          Message
        </button>
      </div>
    </div>
  );
};
