import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import ShippingPayment from "./ShippingPayment";
import OrderCheckout from "./OrderCheckout";
import CartItems from "./CartItems";
import Tabs from "./TabComponent";
import OrderSuccess from "./OrderSuccess";
import { NavLink } from "react-router-dom";

const CartComponent = () => {
  const { data: cartData, loading, refetch } = useFetch("/cart");
  const items = cartData?.data?.items || [];

  const totals = items
    .reduce(
      (acc, curr) =>
        acc + (curr?.productId?.price || 0) * (curr?.quantity || 0),
      0
    )
    .toFixed(2);

  const tabData = [
    {
      label: "Proceed to Checkout",
      content: <CartItems items={items} getAllCarts={refetch} />,
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
      label: "Shipping Payment",
      content: <ShippingPayment />,
    },
    {
      label: "Order Checkout",
      content: <OrderCheckout items={items} />,
    },
    {
      label: "Order Success",
      content: <OrderSuccess />,
    },
  ];

  if (loading) return <Loading />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] gap-5">
        <h2>Empty cart items</h2>
        <NavLink to="/product" className="btn border text-indigo-600">
          Go to Products
        </NavLink>
      </div>
    );
  }

  return (
    <section id="cart" className="p-2 max-w-6xl mx-auto">
      <Tabs tabs={tabData} items={items} totals={totals} />
    </section>
  );
};

export default CartComponent;
