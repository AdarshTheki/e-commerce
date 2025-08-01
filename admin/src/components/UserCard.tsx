import { axiosInstance, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from './ui';
import { SquarePen, Trash2 } from 'lucide-react';
import Select from './ui/Select';

export default function UserCard({ items }: { items: UserType[] }) {
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
            <th className="text-center py-3 px-4">Role</th>
            <th className="text-center py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((category, index) => (
            <tr
              key={index}
              className="border-b text-sm border-gray-100 hover:bg-gray-50 capitalize">
              <td className="sm:py-3 sm:px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2 min-w-[200px]">
                <img
                  src={category.avatar || '/placeholder.jpg'}
                  alt={'category_' + index}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <p>{category.fullName}</p>
              </td>
              <td className="py-3 px-4 text-nowrap">
                {format(
                  new Date(category.createdAt || new Date()),
                  'MMM d, yyyy'
                )}
              </td>
              <td className="px-4">
                <Select
                  onSelected={(e) =>
                    handleRoleChange(category._id, e as UserRole)
                  }
                  list={['customer', 'seller', 'user']}
                  selected={category.role}
                />
              </td>
              <td className="px-4">
                <Select
                  onSelected={(e) =>
                    handleStatusChange(category._id, e as ActiveOrInActive)
                  }
                  list={['active', 'inactive']}
                  selected={category.status}
                />
              </td>
              <td className="flex items-center pb-5 justify-end">
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
}
