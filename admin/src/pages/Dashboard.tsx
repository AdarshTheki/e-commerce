import { Box, CircleDollarSign, ShoppingBag, Users } from 'lucide-react';
import { Counter } from '../components';
import { useTitle, useFetch } from '../hooks';
import { Loading, NotFound } from '../components/ui';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface DashboardData {
  totalUsers: number;
  lastMonthUser: number;
  totalProducts: number;
  lastMonthProduct: number;
  totalOrders: number;
  lastMonthOrder: number;
  totalRevenues: number;
  lastMonthRevenue: number;
}

interface TopProductsProp {
  thumbnail: string;
  title: string;
  totalQuantity: number;
  totalRevenue: number;
  unitPrice: number;
  _id: string;
}

const Dashboard = () => {
  useTitle(`Cartify: Dashboard`);
  const { data, loading, error } = useFetch<DashboardData>('/dashboard/totals');

  const percentageCalculate = (min: number = 0, max: number = 0) => {
    return parseFloat(((min / max) * 100).toFixed(2)) || 4.6;
  };

  if (loading) return <Loading />;

  if (error) return <NotFound title={JSON.stringify(error)} />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* <!-- Stats Grid --> */}
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between items-center capitalize">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-semibold">
                $<Counter target={data?.totalRevenues} />
              </h3>
              <p className="text-green-500 text-sm">
                +<Counter target={data?.lastMonthRevenue} /> last month
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <CircleDollarSign className="text-indigo-600" size={28} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border">
          <div className="flex justify-between items-center capitalize">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-semibold">
                <Counter target={data?.totalOrders} />
              </h3>
              <p className="text-green-500 text-sm">
                +<Counter target={data?.lastMonthOrder} /> last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="text-blue-600" size={28} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border">
          <div className="flex justify-between items-center capitalize">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-semibold">
                <Counter target={data?.totalProducts || 384} />
              </h3>
              <p className="text-green-500 text-sm">
                +
                <Counter
                  target={percentageCalculate(
                    data?.lastMonthProduct,
                    data?.totalProducts
                  )}
                />{' '}
                last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Box className="text-green-600" size={28} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border">
          <div className="flex justify-between items-center capitalize">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-semibold">
                <Counter target={data?.totalUsers || 1234} />
              </h3>
              <p className="text-green-500 text-sm">
                +
                <Counter
                  target={percentageCalculate(
                    data?.lastMonthUser,
                    data?.totalUsers
                  )}
                />{' '}
                last month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Recent Orders --> */}
      <RecentOrders />

      {/* <!-- Top Products --> */}
      <TopProducts />
    </div>
  );
};

export default Dashboard;

function RecentOrders() {
  const { data, loading } = useFetch<OrderType[]>('/order?page=1&limit=10');

  if (loading) return <Loading />;

  return (
    <div className="rounded-lg border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <NavLink to={'/order'} className="text-indigo-800 underline">
          View all
        </NavLink>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 pr-4 text-nowrap">Order ID</th>
                <th className="pb-3 pr-4 text-nowrap">Customer</th>
                <th className="pb-3 pr-4 text-nowrap">Status</th>
                <th className="pb-3 pr-4 text-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data?.slice(0, 8).map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-100">
                      <td className="py-3">#{order._id}</td>
                      <td className="py-3">{order.shipping_address.name}</td>
                      <td className="py-3">
                        <span
                          className={cn(
                            order.status === 'delivered' && 'status-active',
                            order.status === 'cancelled' && 'status-inactive',
                            order.status === 'pending' && 'status-pending',
                            order.status === 'shipped' && 'status-processing',
                            ''
                          )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">
                        $
                        {order.items.reduce(
                          (p, i) =>
                            Number(i.quantity) * Number(i.product.price) + p,
                          0
                        )}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TopProducts() {
  const { data, loading } = useFetch<TopProductsProp[]>(
    '/dashboard/top-products'
  );

  if (loading) return <Loading />;

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Products</h2>
        <NavLink to={'/order'} className="text-indigo-800 underline">
          View all
        </NavLink>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data
            ? data?.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        alt="image"
                        src={product.thumbnail || '/placeholder.jpg'}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {product.title || 'Wireless Earbuds'}
                      </h3>
                      <p className="text-sm text-gray-500">Electronics</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      $<Counter target={product.totalRevenue || 239} />
                      <span className="text-xs text-gray-400 px-2">
                        {product.unitPrice}
                      </span>
                    </p>
                    <p className="text-sm text-green-500">
                      +<Counter target={product.totalQuantity || 12} /> sold
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
