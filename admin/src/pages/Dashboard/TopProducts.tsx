import { AxiosError } from 'axios';
import { Download, Loader } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFetch } from '@/hooks';
import { Counter } from '@/components';
import { Loading } from '@/components/ui';
import { downloadProductsAsCSV } from '@/lib/action';
import { axiosInstance, errorHandler } from '@/lib/utils';

interface TopProductsProp {
  thumbnail: string;
  category: string;
  brand: string;
  title: string;
  totalQuantity: number;
  totalRevenue: number;
  unitPrice: number;
  _id: string;
}

function TopProducts() {
  const { data, loading } = useFetch<TopProductsProp[]>(
    '/dashboard/top-products'
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCSV = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/dashboard/download/product');
      if (res.data) {
        downloadProductsAsCSV(res.data.data);
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Products</h2>
        <button
          onClick={handleDownloadCSV}
          className="w-fit flex items-center justify-between gap-1 text-sm px-4 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
          {isLoading ? <Loader size={16} /> : <Download size={16} />} Export
        </button>
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
                      <NavLink
                        to={`/product/${product._id}`}
                        className="font-medium">
                        {product.title || 'Wireless Earbuds'}
                      </NavLink>
                      <p className="text-sm text-gray-500">
                        {product.category}, {product.brand}
                      </p>
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

export default TopProducts;
