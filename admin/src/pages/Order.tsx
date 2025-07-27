import { NavLink } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import { useFetch } from '@/hooks';
import { Loading } from '@/components/ui';
import { axiosInstance, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import React, { useState } from 'react';

export default function Orders() {
  const { data, loading } = useFetch<OrderType[]>(`/order?limit=10`);

  return (
    <div className="p-6 text-slate-800">
      <h2 className="text-2xl font-bold">Order Listing</h2>

      {loading && <Loading />}

      {data?.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="p-8 max-w-md text-center">
            <PackageSearch className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven’t placed any orders. Start shopping to place your first
              order.
            </p>
            <NavLink
              to="/"
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">
              Shop Now
            </NavLink>
          </div>
        </div>
      ) : (
        <div>{data?.map((i) => <OrderCard key={i._id} {...i} />)}</div>
      )}

      {/* Pagination */}
    </div>
  );
}

const OrderCard: React.FC<OrderType> = ({ ...order }) => {
  const [status, setStatus] = useState(order.status);
  const orderStatusMessages = {
    pending:
      'Your order has been placed successfully and is pending confirmation.',
    shipped: 'Good news! Your order has been shipped and is on its way.',
    delivered:
      'Your order has been delivered. We hope you enjoy your purchase!',
    cancelled:
      'Your order has been cancelled. If this was a mistake, please contact support.',
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const res = await axiosInstance.patch(`/order/${orderId}/status`, {
        status: newStatus,
      });
      if (res.data) {
        console.log(res.data);
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <div className="border-b border-gray-300 pb-3 mb-6">
      <h2 className="text-xl font-semibold my-2">Id: {order._id}</h2>
      <div className="mb-2">
        <strong>Status:</strong>
        <select
          className="border px-2 py-1 cursor-pointer mx-2 capitalize rounded-lg border-indigo-300"
          value={status}
          onChange={(e) => {
            handleStatusChange(order._id, e.target.value as OrderStatus);
            setStatus(e.target.value as OrderStatus);
          }}>
          {['pending', 'shipped', 'delivered', 'cancelled'].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <span className="capitalize">{orderStatusMessages[status]}</span>
      </div>

      <div className="mb-2">
        <strong>Payment:</strong> {order.payment.method} -{' '}
        {order.payment.status}
      </div>

      <div className="mb-2">
        <strong>Customer:</strong> {order.shipping_address.name} (
        {order.shipping_address.email})
      </div>

      <div className="mb-2">
        <strong>Shipping:</strong>
        <div className="text-sm ml-2 capitalize">
          {order.shipping_address.line1}, {order.shipping_address.line2},<br />
          {order.shipping_address.city} - {order.shipping_address.postal_code},{' '}
          {order.shipping_address.state}, {order.shipping_address.country}
        </div>
      </div>

      <div className="mt-2">
        <strong>Items:</strong>
        <ul className="ml-4 list-disc">
          {order.items.map((item, index) => (
            <li key={index} className="flex gap-3 items-center mt-2">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-12 h-12 object-contain"
              />
              <div>
                <p>{item.product.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>${item.product?.price?.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
