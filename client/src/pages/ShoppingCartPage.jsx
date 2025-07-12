import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { NotFound } from "../utils";
import { CartListing, HomeCertificate } from "../components";
import { useState } from "react";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateItemQuantity } from "../redux/cartSlice";

const ShoppingCartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const { items: addresses } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState(null);
  const { user } = useSelector((s) => s.auth);

  const handleCheckout = async () => {
    try {
      if (!selectAddress) return toast.error("User Address not Defined");
      const res = await axios.post("/order/stripe-checkout", {
        addressId: selectAddress,
        userId: user._id,
      });
      if (res.data) {
        window.location.href = res.data?.url;
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const totals =
    items && items?.reduce((p, c) => c?.productId?.price * c?.quantity + p, 0);

  return (
    <section className="min-h-screen sm:p-4 p-3 max-w-6xl mx-auto">
      {items.length === 0 && (
        <NotFound
          canvas={
            <ShoppingCart className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
          }
          title="Your cart is empty"
          description="Looks like you haven’t added anything to your cart yet."
          linkName="Start Shopping"
          linkClass="bg-indigo-600"
          linkTo="/product"
          mainClass="min-h-[100px]"
        />
      )}
      <div className="flex max-sm:flex-col gap-5">
        <div className="md:flex-1 w-full">
          {items &&
            items.map((item) => (
              <CartListing
                key={item._id}
                {...item}
                onQtyChange={(quantity) =>
                  dispatch(updateItemQuantity({ _id: item._id, quantity }))
                }
                onRemove={() => dispatch(removeItem(item._id))}
              />
            ))}

          <p className="font-semibold text-2xl py-4">Shipping Address</p>

          <div
            className={`capitalize border border-gray-300 cursor-pointer !px-5 mb-4 card !bg-transparent`}>
            <NavLink to={"/shipping"} className="font-semibold">
              Add New Address
            </NavLink>
          </div>

          {addresses?.map((i) => (
            <div
              key={i._id}
              onClick={() => setSelectAddress(i._id)}
              className={`capitalize border border-gray-300 cursor-pointer !px-5 mb-4 card ${selectAddress === i._id ? "!bg-blue-100" : "!bg-transparent"}`}>
              {i.isDefault && (
                <p className="status-active w-fit mb-2">Default</p>
              )}
              <p className="font-semibold">{i.addressLine}</p>
              <p>
                {i.city}, {i.postalCode}, {i?.countryCode?.toUpperCase()}
              </p>
            </div>
          ))}

          {selectAddress && (
            <div className="flex gap-6 font-semibold mt-10 ">
              <NavLink
                to={"/product"}
                className="text-red-600 btn !text-base text-nowrap border">
                Go Product
              </NavLink>
              <button
                onClick={handleCheckout}
                className="bg-indigo-600 text-white btn">
                Checkout Payment
              </button>
            </div>
          )}
        </div>

        <div className="p-4 md:w-1/3 space-y-3 w-full sticky top-20 h-fit">
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
        </div>
      </div>

      <HomeCertificate />
    </section>
  );
};

export default ShoppingCartPage;
