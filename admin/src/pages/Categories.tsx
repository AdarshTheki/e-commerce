import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, Plus } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { Input, Loading, NotFound } from '../components/ui';
import { useFetch, useDebounce, useTitle } from '../hooks';
import { CategoryCard, MultiSelect } from '@/components';

const sortByOptions = [
  { label: 'Title (A to Z)', value: 'title-asc' },
  { label: 'Title (Z to A)', value: 'title-desc' },
  { label: 'Date (Oldest)', value: 'createdAt-asc' },
  { label: 'Date (Newest)', value: 'createdAt-desc' },
];

const CategoryListing = () => {
  const { pathname, search } = useLocation();
  const path = pathname.split('/').join('');
  const [sortBy, setSortBy] = useState<string>('title-asc');
  const [query, setQuery] = useState<string>(search.replace('?q=', '') || '');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const q = useDebounce(query, 500);
  useTitle(`Cartify: ${path} Listing`);

  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    title: q || '',
    sort: sortBy.split('-')[0],
    order: sortBy.split('-')[1],
  });

  const { data, error, loading } = useFetch<PaginationType<CategoryType>>(
    `/${path}?${params.toString()}`
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold capitalize">{path} Listing</h2>
        <NavLink
          to={`${pathname}/create`}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add {path}</span>
        </NavLink>
      </div>

      {/* Filter products */}
      <div className="max-w-xl flex items-center gap-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="w-full text-sm py-1.5 pl-4"
          placeholder="Search..."
        />
        <MultiSelect
          className="!w-[150px] max-md:right-0"
          selected={
            sortByOptions.find((i) => sortBy === i.value)?.label || 'Select'
          }
          listOption={sortByOptions}
          onSelected={setSortBy}
          label="Filters"
        />
      </div>

      {loading ? <Loading /> : null}

      {error ? <NotFound title={JSON.stringify(error)} /> : null}

      {!loading && data?.totalDocs ? <CategoryCard items={data?.docs} /> : null}

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
export default CategoryListing;
