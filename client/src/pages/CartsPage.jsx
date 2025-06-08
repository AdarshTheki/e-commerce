import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { Loading } from "../utils";
import { CartListing, HomeCertificate, HomeWishlist } from "../components";

const CartComponent = () => {
  const { data, loading, refetch } = useFetch("/cart");
  const items = data?.data?.items || [];

  if (loading) return <Loading />;

  if (items?.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-center p-4">
          <div className="p-8 max-w-md text-center">
            <ShoppingCart className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <NavLink
              to="/product"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
              Start Shopping
            </NavLink>
          </div>
        </div>
        <HomeCertificate />

        <HomeWishlist />
      </div>
    );
  }

  const totals =
    items && items?.reduce((p, c) => c.productId.price * c.quantity + p, 0);

  return (
    <section className="min-h-screen sm:p-4 p-3 max-w-6xl mx-auto">
      <div className="flex max-sm:flex-col gap-5">
        <div className="md:flex-1 w-full">
          {items &&
            items.map((item) => (
              <CartListing key={item._id} {...item} refetch={refetch} />
            ))}
        </div>
        <div className="p-4 md:w-1/3 space-y-3 w-full">
          <h3>This Order shipping Fee!</h3>
          <div className="flex justify-between font-semibold text-xl">
            <span>({items?.length}) Item</span>
            <span>${totals | 1}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between">
            <span>Estimate Tax:</span>
            <span>$5</span>
          </div>
          <div className="flex justify-between font-semibold text-3xl">
            <span>Total:</span>
            <span>${((totals + 5) | 0).toFixed(2)}</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold mt-10">
            <NavLink
              to={"/product"}
              className="text-red-600 btn text-nowrap border">
              Go Product
            </NavLink>
            <NavLink to={"/shipping"} className="bg-indigo-600 text-white btn">
              Checkout Address
            </NavLink>
          </div>
        </div>
      </div>

      <HomeCertificate />

      <HomeWishlist />
    </section>
  );
};

export default CartComponent;
