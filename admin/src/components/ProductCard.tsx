import { axiosInstance, brands, categories, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from './ui';
import { SquarePen, Trash2 } from 'lucide-react';
import Select from './ui/Select';

export default function ProductCard({ items }: { items: ProductType[] }) {
  const [products, setProducts] = useState<ProductType[]>(() => items || []);
  const [showModel, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      if (res.data) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleStatusChange = async (id: string, status: ProductStatus) => {
    try {
      const res = await axiosInstance.patch(`/product/${id}`, { status });
      if (res.data) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleCategoryChange = async (id: string, category: string) => {
    try {
      const res = await axiosInstance.patch(`/product/${id}`, { category });
      if (res.data) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, category } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handleBrandChange = async (id: string, brand: string) => {
    try {
      const res = await axiosInstance.patch(`/product/${id}`, { brand });
      if (res.data) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, brand } : p))
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const statusOptions = ['active', 'inactive', 'out-of-stock', 'pending'];

  return (
    <div className="w-full !overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300 text-slate-700">
            <th className="text-left sm:py-3 sm:px-4">#</th>
            <th className="text-left py-3 px-4">Products</th>
            <th className="text-left py-3 px-4">Category</th>
            <th className="text-left py-3 px-4">Brand</th>
            <th className="text-left py-3 px-4">Stock</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="border-b text-sm border-gray-100 hover:bg-gray-50 capitalize">
              <td className="sm:py-3 sm:px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2 min-w-[200px] max-w-[220px]">
                <img
                  src={product.thumbnail || '/placeholder.jpg'}
                  alt={'category_' + index}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                />
                <p className=" line-clamp-2">{product.title}</p>
              </td>
              <td className="py-3 px-2">
                <Select
                  className="!w-[200px]"
                  onSelected={(e) => handleCategoryChange(product._id, e)}
                  list={categories}
                  selected={product.category}
                />
              </td>
              <td className="py-3 px-2 max-w-fit">
                <Select
                  className="!w-[200px]"
                  onSelected={(e) => handleBrandChange(product._id, e)}
                  list={brands}
                  selected={product.brand || '--select--'}
                />
              </td>
              <td className="py-3 px-4">{product.stock}</td>
              <td className="px-2">
                <Select
                  className="!w-[150px]"
                  onSelected={(e) =>
                    handleStatusChange(product._id, e as ProductStatus)
                  }
                  list={statusOptions}
                  selected={product.status}
                />
              </td>
              <td className="flex items-center gap-2 pb-5 justify-center">
                <DeleteModal
                  title="Delete Product"
                  isOpen={showModel}
                  onClose={() => setShowModal(false)}
                  onConfirm={() => handleDeleteProduct(product._id)}
                />
                <SquarePen
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="svg-btn p-2 text-blue-600 !m-0 cursor-pointer"
                />
                <Trash2
                  onClick={() => setShowModal(true)}
                  className="svg-btn p-2 text-red-600 !m-0 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
