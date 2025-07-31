import { Skeleton } from '@/components';
import { useFetch } from '@/hooks';
import { downloadOrdersAsCSV } from '@/lib/action';
import { axiosInstance, cn, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { Download, Loader } from 'lucide-react';
import { useState } from 'react';

export default function RecentOrders() {
  const { data, loading } = useFetch<OrderType[]>('/order?page=1&limit=10');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCSV = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/dashboard/download/order');
      if (res.data) {
        downloadOrdersAsCSV(res.data.data);
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <button
          onClick={handleDownloadCSV}
          className="w-fit flex items-center justify-between gap-1 text-sm px-4 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
          {isLoading ? <Loader size={16} /> : <Download size={16} />} Export
        </button>
      </div>
      {!!loading || !data ? (
        <div className="p-6 rounded-lg border animate-pulse bg-white">
          <Skeleton className="h-7 w-40 mb-6 bg-gray-100 rounded" />
          <div className="grid grid-cols-4 md:gap-20 sm:gap-14 gap-8 mb-4">
            <Skeleton className="h-4 bg-gray-200" />
            <Skeleton className="h-4 bg-gray-200" />
            <Skeleton className="h-4 bg-gray-200" />
            <Skeleton className="h-4 bg-gray-200" />
          </div>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 md:gap-14 sm:gap-8 gap-6 mb-2">
              <Skeleton className="h-4 bg-gray-100" />
              <Skeleton className="h-4 bg-gray-100" />
              <Skeleton className="h-4 bg-gray-100" />
              <Skeleton className="h-4 bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 pr-4 text-nowrap">Customer</th>
                  <th className="pb-3 pr-4 text-nowrap">Status</th>
                  <th className="pb-3 pr-4 text-nowrap">Amount</th>
                  <th className="pb-3 pr-4 text-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data?.map((order) => {
                      const name = order.shipping_address.name.toLowerCase();
                      return (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-gray-100">
                          <td className="py-3 capitalize">{name}</td>
                          <td className="py-3">
                            <span
                              className={cn(
                                order.status === 'delivered' && 'status-active',
                                order.status === 'cancelled' &&
                                  'status-inactive',
                                order.status === 'pending' && 'status-pending',
                                order.status === 'shipped' &&
                                  'status-processing',
                                ''
                              )}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3">
                            $
                            {order.items.reduce(
                              (p, i) =>
                                Number(i.quantity) * Number(i.product.price) +
                                p,
                              0
                            )}
                          </td>
                          <td className="py-3">
                            {format(new Date(order.updatedAt), 'MMM d, yyyy')}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
