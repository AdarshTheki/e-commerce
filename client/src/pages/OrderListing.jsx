import React from "react";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";
import { PackageSearch } from "lucide-react";

const OrderEmpty = () => {
  return (
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
  );
};

const OrderListing = () => {
  const { data, loading } = useFetch("/order");

  if (data?.length === 0) return <OrderEmpty />;

  return (
    <div>
      <div className="p-2 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 border-2 border-gray-300">
            {data?.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 border border-gray-300">
                <div className="text-sm mb-2 space-x-2">
                  <span>Order ID:</span>
                  <span className="font-mono">{order._id}</span>
                </div>

                <div className="text-sm flex text-gray-700 mb-2 space-x-2">
                  <span>Products:</span>
                  <span>
                    {order?.items?.map((item, i) => (
                      <NavLink
                        to={`/product/${item.productId._id}`}
                        key={i}
                        className="border-b block w-fit">
                        {item.productId.title} x{item.quantity}
                        {i < order.items.length - 1 ? `, ` : ""}
                      </NavLink>
                    ))}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2 space-x-2">
                  <span>Status:</span>
                  <span
                    className={`font-semibold capitalize ${order.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2 space-x-2">
                  <span>Total:</span>
                  <strong>
                    {order?.items
                      ?.reduce((a, i) => i.productId.price * i.quantity + a, 0)
                      .toFixed(2)}{" "}
                    Rs. /-
                  </strong>
                </div>
                <div className="text-sm text-gray-600 mb-2 space-x-2">
                  <span>Date:</span>
                  <span>
                    {format(
                      new Date(order.createdAt || Date.now()),
                      "dd MMM yyyy h:mma"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListing;
