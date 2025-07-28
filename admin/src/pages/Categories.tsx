import { useState } from 'react';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Input, Loading, DeleteModal, NotFound } from '../components/ui';
import { useFetch, useDebounce, useTitle } from '../hooks';
import { errorHandler, axiosInstance } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { format } from 'date-fns';

const sortByOptions = [
  { label: 'Title (A to Z)', value: 'title-asc' },
  { label: 'Title (Z to A)', value: 'title-desc' },
  { label: 'Date (Oldest)', value: 'createdAt-asc' },
  { label: 'Date (Newest)', value: 'createdAt-desc' },
];

const CategoryListing = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/').join('');
  const [sortBy, setSortBy] = useState<string>('title-asc');
  const [search, setSearch] = useState<string>('');
  const query = useDebounce(search, 500);
  useTitle(`Cartify: ${path} listing`);

  const { data, error, loading } = useFetch<PaginationType<CategoryType>>(
    `/${path}?limit=200&title=${query}&sort=${
      sortBy.split('-')[0]
    }&order=${sortBy.split('-')[1]}`
  );

  return (
    <div className="space-y-5 py-2">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold text-gray-700 capitalize">{path}</h2>
        <NavLink
          to={`${pathname}/create`}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add {path}</span>
        </NavLink>
      </div>

      {/* Filter products */}
      <div className="max-w-xl flex items-center gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full text-sm py-1.5 pl-4"
          placeholder="Search..."
        />
        <Select onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-1/2">
            <SelectValue
              placeholder={
                sortByOptions.filter((i) => i.value === sortBy)[0]?.label
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortByOptions.map((item) => (
              <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && <Loading />}

      {error && <NotFound title={JSON.stringify(error)} />}

      {!loading && data?.totalDocs && <CategoryList items={data?.docs} />}
    </div>
  );
};
export default CategoryListing;

const CategoryList = ({ items }: { items: CategoryType[] }) => {
  const [categories, setCategories] = useState<CategoryType[]>(
    () => items || []
  );
  const { pathname } = useLocation();
  const path = pathname.split('/').join('');
  const [showModel, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/${path}/${id}`);
      if (res.data) {
        setCategories((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleStatusChange = async (id: string, status: ActiveOrInActive) => {
    try {
      const res = await axiosInstance.patch(`/${path}/${id}`, { status });
      if (res.data) {
        setCategories((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <div className="w-full" style={{ overflow: 'auto' }}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300 text-slate-700">
            <th className="text-left py-3 px-4">#</th>
            <th className="text-left py-3 px-4">Category</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={index}
              className="border-b text-sm border-gray-100 hover:bg-gray-50 capitalize">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <img
                  src={category.thumbnail || '/placeholder.jpg'}
                  alt={'category_' + index}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <span className="text-nowrap line-clamp-1">
                  {category.title}
                </span>
              </td>
              <td className="py-3 px-4 text-nowrap">
                {format(new Date(category.updatedAt), 'MMM d, yyyy')}
              </td>
              <td className="py-3 px-4">
                <select
                  id={category._id}
                  name={category._id}
                  className="cursor-pointer"
                  value={category.status}
                  onChange={(e) =>
                    handleStatusChange(
                      category._id,
                      e.target.value as ActiveOrInActive
                    )
                  }>
                  <option value="active">Active</option>
                  <option value="inactive">In-Active</option>
                </select>
              </td>
              <td className="flex items-center gap-2 pb-5">
                <DeleteModal
                  isOpen={showModel}
                  onClose={() => setShowModal(false)}
                  onConfirm={() => handleDeleteCategory(category._id)}
                />
                <SquarePen
                  onClick={() => navigate(`/${path}/${category._id}`)}
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
