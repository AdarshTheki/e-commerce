import { ChevronLeftIcon, ChevronRightIcon, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { useFetch, useTitle } from '../hooks';
import { Input, Loading, NotFound } from '../components/ui';
import { MultiSelect, UserCard } from '@/components';

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
  const [limit, setLimit] = useState<number>(10);

  useTitle('Cartify: Users Listing');

  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    query: search || '',
    sort: sortBy.split('-')[0],
    order: sortBy.split('-')[1],
  });

  const { data, error, loading } = useFetch<PaginationType<UserType>>(
    `/user/admin?${params.toString()}`
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users Listing</h2>
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
          placeholder="User search..."
        />
        <MultiSelect
          className="!w-[150px] max-md:right-0"
          selected={
            sortByOptions.find((i) => sortBy === i.value)?.label || 'Select'
          }
          label="Filters"
          listOption={sortByOptions}
          onSelected={setSortBy}
        />
      </div>

      {loading && <Loading />}

      {error && <NotFound title={JSON.stringify(error)} />}

      {!loading && data?.totalDocs && <UserCard items={data.docs} />}

      <div className="flex gap-4 items-center justify-end text-sm">
        <label htmlFor="limits">
          Rows per page:
          <select
            name="limits"
            id="limits"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="py-2 cursor-pointer focus:outline-none">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </label>
        <p>
          {(page - 1) * limit || 1} - {limit * page} of {data?.totalDocs}
        </p>
        <button
          disabled={!data?.hasPrevPage}
          onClick={() => setPage((p) => p - 1)}
          className="svg-btn">
          <ChevronLeftIcon size={18} />
        </button>
        <button
          disabled={!data?.hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className="svg-btn">
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default Customers;
