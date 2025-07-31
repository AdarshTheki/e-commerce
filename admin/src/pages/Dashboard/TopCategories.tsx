import { Counter } from '@/components';
import { Loading } from '@/components/ui';
import { useFetch } from '@/hooks';
import { downloadCategoriesAsCSV } from '@/lib/action';
import { axiosInstance, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import { Download, Loader } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type items = {
  _id: string;
  count: number;
};

type TopCategoriesProps = {
  categories: items[];
  brands: items[];
};

const TopCategories = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);

  const { data, loading } = useFetch<TopCategoriesProps>(
    '/dashboard/top-categories'
  );

  const handleDownloadCSV = async (name: string) => {
    try {
      setCategoryLoading(true);
      const res = await axiosInstance.get(`/dashboard/download/${name}`);
      if (res.data) {
        downloadCategoriesAsCSV(res.data.data, name);
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setCategoryLoading(false);
    }
  };

  if (loading) return <Loading className="!h-[10vh]" />;

  return (
    <div className="grid gap-5">
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Categories</h2>
          <button
            onClick={() => handleDownloadCSV('category')}
            className="w-fit flex items-center justify-between gap-1 text-sm px-4 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
            {categoryLoading ? <Loader size={16} /> : <Download size={16} />}{' '}
            Export
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data
              ? data?.categories.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img src={'/placeholder.jpg'} />
                      </div>
                      <NavLink
                        to={`/category?q=${product._id}`}
                        className="font-medium capitalize">
                        {product._id || 'Wireless Earbuds'}
                      </NavLink>
                    </div>
                    <p className="text-right text-green-500">
                      +<Counter target={product.count || 12} /> count
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Brands</h2>
          <button
            onClick={() => handleDownloadCSV('brand')}
            className="w-fit flex items-center justify-between gap-1 text-sm px-4 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
            {categoryLoading ? <Loader size={16} /> : <Download size={16} />}{' '}
            Export
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data
              ? data?.brands.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img alt="image" src={'/placeholder.jpg'} />
                      </div>
                      <NavLink
                        to={`/brand?q=${product._id}`}
                        className="font-medium">
                        {product._id || 'Wireless Earbuds'}
                      </NavLink>
                    </div>
                    <p className="text-right text-green-500">
                      +<Counter target={product.count || 12} /> count
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
