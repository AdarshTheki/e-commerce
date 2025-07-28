import { ArrowLeft, ArrowRight, Plus, SquarePen, Trash2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';

import { useFetch, useTitle } from '../hooks';
import { DeleteModal, Input, Loading, NotFound } from '../components/ui';
import { axiosInstance, errorHandler } from '@/lib/utils';
import { MultiSelect } from '@/components';
import { format } from 'date-fns';

const sortByOptions = [
  { label: 'Name (A-Z)', value: 'fullName-asc' },
  { label: 'Name (Z-A)', value: 'fullName-desc' },
  { label: 'Email (A-Z)', value: 'email-asc' },
  { label: 'Email (Z-A)', value: 'email-desc' },
  { label: 'Creation a-z', value: 'createdAt-asc' },
  { label: 'Creation z-a', value: 'createdAt-desc' },
];

const Customers = () => {
  const [sortBy, setSortBy] = useState<string>('fullName-asc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useTitle('cartify: user information');

  const { data, loading, error } = useFetch<PaginationType<UserType>>(
    `/user/admin?limit=50&page=${page}&sort=${sortBy.split('-')[0]}&order=${sortBy.split('-')[1]}&query=${search}`
  );

  return (
    <div className="space-y-5 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700 capitalize">
          User Information
        </h2>
        <NavLink
          to={`/customer/create`}
          className="bg-indigo-600 capitalize flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus size={16} /> <span>Add User</span>
        </NavLink>
      </div>

      {/* Filter products */}
      <div className="max-w-xl flex gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full text-sm py-1.5 pl-4"
          placeholder="Products search..."
        />
        <MultiSelect
          selected={
            sortByOptions.find((i) => sortBy === i.value)?.label || 'Select'
          }
          listOption={sortByOptions}
          onSelected={setSortBy}
        />
      </div>

      {loading && <Loading />}

      {error && <NotFound title={JSON.stringify(error)} />}

      {!loading && data?.totalDocs && <UserList items={data.docs} />}

      <div className="flex items-center justify-center gap-4">
        {data?.hasPrevPage && (
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setPage((prev) => prev - 1)}
          />
        )}
        {data?.page}
        {data?.hasNextPage && (
          <ArrowRight
            className="cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
          />
        )}
      </div>
    </div>
  );
};

export default Customers;

const UserList = ({ items }: { items: UserType[] }) => {
  const [users, setUsers] = useState<UserType[]>(() => items || []);
  const [showModel, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async (id?: string) => {
    try {
      if (!id) return;
      const res = await axiosInstance.delete(`/user/admin/${id}`);
      if (res.data) {
        setUsers((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleStatusChange = async (id: string, status: ActiveOrInActive) => {
    try {
      const res = await axiosInstance.patch(`/user/admin/${id}`, { status });
      if (res.data) {
        setUsers((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleRoleChange = async (id: string, role: UserRole) => {
    try {
      const res = await axiosInstance.patch(`/user/admin/${id}`, { role });
      if (res.data) {
        setUsers((prev) =>
          prev.map((p) => (p._id === id ? { ...p, role } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <div className="w-full overflow-x-auto min-h-screen">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300 text-slate-700">
            <th className="text-left sm:py-3 sm:px-4">#</th>
            <th className="text-left py-3 px-4">Users</th>
            <th className="text-left py-3 px-4">Creation</th>
            <th className="text-left py-3 px-4">Role</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((category, index) => (
            <tr
              key={index}
              className="border-b text-sm border-gray-100 hover:bg-gray-50 capitalize">
              <td className="sm:py-3 sm:px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <img
                  src={category.avatar || '/placeholder.jpg'}
                  alt={'category_' + index}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="text-nowrap line-clamp-1">
                  {category.fullName}
                </span>
              </td>
              <td className="py-3 px-4 text-nowrap">
                {format(
                  new Date(category.createdAt || new Date()),
                  'MMM d, yyyy'
                )}
              </td>
              <td className="py-3">
                <MultiSelect
                  className="!w-[110px]"
                  onSelected={(e) =>
                    handleRoleChange(category._id || '', e as UserRole)
                  }
                  selected={category.role}
                  list={['customer', 'seller', 'user']}
                />
              </td>
              <td className="py-3 text-nowrap">
                <MultiSelect
                  className="!w-[100px]"
                  onSelected={(e) =>
                    handleStatusChange(
                      category._id || '',
                      e as ActiveOrInActive
                    )
                  }
                  selected={category.status}
                  list={['active', 'inactive']}
                />
              </td>
              <td className="flex items-center pb-5">
                <DeleteModal
                  isOpen={showModel}
                  onClose={() => setShowModal(false)}
                  onConfirm={() => handleDeleteUser(category._id)}
                />
                <SquarePen
                  onClick={() => navigate(`/customer/${category._id}`)}
                  className="svg-btn p-2 text-blue-600 !m-0 cursor-pointer"
                />
                <Trash2
                  onClick={() => setShowModal(true)}
                  className="svg-btn p-2 text-red-600 !m-0 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
