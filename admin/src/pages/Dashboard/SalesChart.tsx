import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getSalesPerMonth, type SalesChartProp } from '@/lib/action';
import { useFetch } from '@/hooks';
import { Loading } from '@/components/ui';

const SalesChart = () => {
  const { data, loading } = useFetch<SalesChartProp[]>(
    '/dashboard/orders-chart'
  );

  const sales = getSalesPerMonth(data || []);

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold p-4">Total Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          className="w-full h-full"
          data={sales}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
