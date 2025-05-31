import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import ShippingAddress from "./ShippingAddress";
import CartItems from "./CartItems";
import Tabs from "./TabComponent";
import CartEmpty from "./CartEmpty";

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
  ];

  if (loading) return <Loading />;

  if (items.length === 0) return <CartEmpty />;

  return (
    <section id="cart" className="p-2 max-w-6xl mx-auto">
      <Tabs tabs={tabData} items={items} totals={totals} />
    </section>
  );
};

export default CartComponent;
