import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import ShippingPayment from "./ShippingPayment";
import OrderCheckout from "./OrderCheckout";
import CartItems from "./CartItems";
import Tabs from "./TabComponent";
import OrderSuccess from "./OrderSuccess";

const CartComponent = () => {
  const { data: cartData, loading, refetch } = useFetch("/cart");

  const { items, wishlist } = cartData?.data || {};

  const totals = items
    ?.reduce((acc, curr) => curr?.productId?.price * curr?.quantity + acc, 0)
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
      label: "shipping Payment",
      content: <ShippingPayment />,
    },
    {
      label: "order checkout",
      content: <OrderCheckout items={items} />,
    },
    {
      label: "order success",
      content: <OrderSuccess />,
    },
  ];

  if (loading || !items) return <Loading />;

  return (
    <section id="cart" className="py-10 mx-auto text-gray-700">
      <Tabs tabs={tabData} items={items} totals={totals} />
    </section>
  );
};

export default CartComponent;
