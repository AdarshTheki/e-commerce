import { NavLink, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { MultiSelect, ProductCard } from '@/components';
import { Input, NotFound } from '../components/ui';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import { useTitle } from '@/hooks';

const sortByOptions = [
  { label: 'Title (A-Z)', value: 'title-asc' },
  { label: 'Title (Z-A)', value: 'title-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
  { label: 'Stock (High to Low)', value: 'stock-desc' },
  { label: 'Stock (Low to High)', value: 'stock-asc' },
  { label: 'Status (A-Z)', value: 'status-asc' },
  { label: 'Status (Z-A)', value: 'status-desc' },
];

export default function Product() {
  const [sortBy, setSortBy] = useState<string>('title-asc');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const query = useDebounce(search, 500);

  useTitle('Cartify: Products Listing');

  const { data, loading, error } = useFetch<PaginationType<ProductType>>(
    `/product?title=${query}&page=${page}&limit=${limit}&sortBy=${
      sortBy.split('-')[0]
    }&order=${sortBy.split('-')[1]}`
  );

  useEffect(() => {
    const title = searchParams.get('title');
    if (title) setSearch(title);
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold capitalize">Products Listing</h2>
        <NavLink
          to={'/product/create'}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add Product</span>
        </NavLink>
      </div>

      {/* Filter products */}
      <div className="flex gap-2 max-w-xl items-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full text-sm py-1.5 pl-4"
          placeholder="Products search..."
        />
        <MultiSelect
          className="!w-[200px] max-md:right-0"
          selected={
            sortByOptions.find((i) => sortBy === i.value)?.label || 'Select'
          }
          label="Filters"
          listOption={sortByOptions}
          onSelected={setSortBy}
        />
      </div>

      {error && <NotFound title={JSON.stringify(error)} />}

      {!loading && data?.totalDocs ? <ProductCard items={data?.docs} /> : null}

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
}
