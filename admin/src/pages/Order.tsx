import { useFetch, useTitle } from '@/hooks';
import { Loading } from '@/components/ui';
import { OrderCard } from '@/components';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function Orders() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const sortBy = 'createdAt-asc';

  useTitle('Cartify: Order History');

  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    sort: sortBy.split('-')[0],
    order: sortBy.split('-')[1],
  });

  const { data, loading } = useFetch<OrderType[]>(
    `/order?${params.toString()}`
  );

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-lg font-semibold">Orders Listing</h2>

      {loading ? <Loading /> : <OrderCard items={data || []} />}

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
          {(page - 1) * limit || 1} - {limit * page}
        </p>
        <button
          disabled={!((page - 1) * limit)}
          onClick={() => setPage((p) => p - 1)}
          className="svg-btn">
          <ChevronLeftIcon size={18} />
        </button>
        <button
          disabled={!(Number(data?.length || 1) == limit)}
          onClick={() => setPage((p) => p + 1)}
          className="svg-btn">
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
