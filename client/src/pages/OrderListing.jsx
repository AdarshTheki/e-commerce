import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { Loading } from "../utils";
import { PackageSearch } from "lucide-react";
import { classNames } from "../helper";

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
  const { data, loading } = useFetch("/order/user");
  const [orders, setOrders] = useState([]);

  const orderStatusMessages = {
    pending:
      "🕒 Your order has been placed successfully and is pending confirmation.",
    shipped: "🚚 Good news! Your order has been shipped and is on its way.",
    delivered:
      "📦 Your order has been delivered. We hope you enjoy your purchase!",
    cancelled:
      "❌ Your order has been cancelled. If this was a mistake, please contact support.",
  };

  useEffect(() => {
    if (data?.totalItems) {
      setOrders(data?.items);
    }
  }, [data]);

  if (data?.totalItems === 0) return <OrderEmpty />;

  return (
    <div>
      <div className="p-4 min-h-screen ">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {loading && <Loading />}

        <div className="flex flex-col gap-5">
          {orders?.length &&
            orders.map((order) => (
              <div key={order._id} className="sm:p-4 border-b border-gray-300">
                <div className="flex max-sm:flex-col gap-2 text-gray-700">
                  {order?.items?.map((item, i) => (
                    <NavLink
                      title={item.product.title}
                      to={`/product/${item.productId}`}
                      key={i}
                      className="sm:max-w-[260px] relative bg-white flex flex-col gap-2">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full"
                      />
                      <p className="text-center absolute bottom-2 w-full p-2 bg-white/70 flex gap-2 justify-center">
                        <span className="line-clamp-1">
                          {item.product.title}
                        </span>
                        <span>{item.quantity}</span>
                      </p>
                    </NavLink>
                  ))}

                  <div className="flex flex-col gap-3 w-full py-4 items-start">
                    <p className="capitalize">
                      Shipping: {Object.values(order.shipping).join(", ")}
                    </p>
                    <div className="flex gap-2">
                      <span> Status:</span>
                      <p
                        className={classNames(
                          order.status === "pending" && "status-pending",
                          order.status === "delivered" && "status-active",
                          order.status === "cancelled" && "status-inactive",
                          order.status === "shipped" && "status-processing"
                        )}>
                        {order.status}
                      </p>
                    </div>

                    <b className="text-xl">
                      $
                      {order?.items
                        ?.reduce((a, i) => i.product.price * i.quantity + a, 0)
                        .toFixed(2)}{" "}
                      /-
                    </b>

                    <p className="text-sm capitalize">
                      Order {order.status}:{" "}
                      {format(
                        new Date(order.updatedAt || Date.now()),
                        "dd MMM yyyy h:mma"
                      )}
                    </p>
                  </div>
                </div>
                <p
                  className={classNames(
                    order.status === "pending" && "status-pending",
                    order.status === "delivered" && "status-active",
                    order.status === "cancelled" && "status-inactive",
                    order.status === "shipped" && "status-processing",
                    "!w-fit !text-base !bg-transparent"
                  )}>
                  {orderStatusMessages[order?.status]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderListing;
