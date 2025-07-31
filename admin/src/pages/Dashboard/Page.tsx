import { useTitle } from '@/hooks';
import Dashboard from './Dashboard';
import RecentOrders from './RecentOrders';
import TopProducts from './TopProducts';
import TopCategories from './TopCategories';
import SalesChart from './SalesChart';

const Page = () => {
  useTitle(`Cartify: Dashboard`);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Dashboard />
      <SalesChart />
      <TopProducts />
      <RecentOrders />
      <TopCategories />
    </div>
  );
};

export default Page;
