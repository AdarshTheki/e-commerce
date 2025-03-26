import React, { useEffect, useState } from "react";

import { Loading } from "../../utils";
import errorHandler from "../../helper/errorHandler";
import instance from "../../helper/axiosInstance";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import ShippingPayment from "./ShippingPayment";
import OrderCheckout from "./OrderCheckout";
import CartItems from "./CartItems";
import Tabs from "./TabComponent";

const CartComponent = () => {
  const [carts, setCarts] = useState({ items: [], wishlist: [] });
  const [loading, setLoading] = useState(false);

  const getAllCarts = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/api/v1/cart`);
      if (res.data) {
        setCarts({
          items: res.data?.data?.items,
          wishlist: res.data?.data?.wishlist,
        });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  const { items, wishlist } = carts;

  const totals = items
    ?.reduce((acc, curr) => curr?.productId?.price * curr?.quantity + acc, 0)
    .toFixed(2);

  const tabData = [
    {
      label: "Proceed to Checkout",
      content: <CartItems items={items} getAllCarts={getAllCarts} />,
    },
    {
      label: "Shipping Address",
      content: <ShippingAddress />,
    },
    {
      label: "Shipping Payment",
      content: <ShippingMethod />,
    },
    {
      label: "shipping Payment",
      content: <ShippingPayment />,
    },
    {
      label: "order checkout",
      content: <OrderCheckout items={items} />,
    },
  ];

  if (loading) return <Loading />;

  return (
    <section id="cart" className="py-8 px-2 bg-gray-50 text-gray-700">
      <Tabs tabs={tabData} items={items} totals={totals} />
    </section>
  );
};

export default CartComponent;
