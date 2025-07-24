import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2Icon } from "lucide-react";
import { Loading, NotFound } from "../utils";
import { HomeCertificate } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts, removeItem, updateItemQuantity } from "../redux/cartSlice";

const ShoppingCartPage = () => {
  const { items, loading } = useSelector((state) => state.cart);
  const { items: addresses } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState(null);
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      if (!selectAddress) return toast.error("User Address not Defined");
      const res = await axios.post("/order/stripe-checkout", {
        addressId: selectAddress._id,
        userId: user._id,
      });
      if (res.data) {
        window.location.href = res.data?.data?.url;
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdateQty = async (id, productId, quantity) => {
    try {
      const res = await axios.put("/cart", { productId, quantity });
      if (res.data) {
        dispatch(updateItemQuantity({ _id: id, quantity }));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`/cart/${id}`);
      if (res.data) {
        dispatch(removeItem(id));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const totals =
    items && items?.reduce((p, c) => c?.productId?.price * c?.quantity + p, 0);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen sm:p-4 p-3 max-w-6xl mx-auto">
      {items?.length === 0 && (
        <NotFound
          canvas={
            <ShoppingCart className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
          }
          title="Your cart is empty"
          description="Looks like you haven’t added anything to your cart yet."
          linkName="Start Shopping"
          linkClass="bg-indigo-600"
          linkTo="/products"
          mainClass="min-h-[100px]"
        />
      )}
      <div className="flex max-sm:flex-col gap-5">
        <div className="md:flex-1 w-full">
          {items &&
            items?.map((item) => {
              if (!item?.productId) return null;
              return (
                <CartListing
                  key={item._id}
                  {...item}
                  onQtyChange={(qty) =>
                    handleUpdateQty(item._id, item.productId._id, qty)
                  }
                  onRemove={() => handleRemoveItem(item._id)}
                />
              );
            })}

          <p className="font-semibold text-2xl py-4">Shipping Address</p>

          <div
            onClick={() => navigate("/shipping-address")}
            className="font-semibold capitalize border border-gray-300 cursor-pointer !px-5 mb-4 card !bg-transparent">
            Add New Address
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

          {selectAddress && !!items?.length && (
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

        {!!items?.length && (
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
              <span className="text-red-600">$5</span>
            </div>
            <div className="flex justify-between font-semibold text-3xl">
              <span>Total:</span>
              <span>${((totals + 5) | 0).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <HomeCertificate />
    </section>
  );
};

export default ShoppingCartPage;

const CartListing = ({ productId, quantity, onRemove, onQtyChange }) => {
  const { _id, thumbnail, title, price, category, brand } = productId;
  const [qty, setQty] = useState(quantity);

  return (
    <div className="flex max-sm:flex-col gap-5 items-start border-b text-slate-700 border-gray-300 py-4">
      <NavLink to={`/products/${_id}`} className="bg-gray-300 max-sm:w-full">
        <img
          src={thumbnail || "https://placehold.co/120x120"}
          alt="Product"
          className="w-[200px] mx-auto object-cover rounded transition-opacity duration-300 opacity-100"
        />
      </NavLink>
      <div className="sm:flex-1 max-sm:px-4 w-full space-y-2 capitalize">
        <p className="font-medium text-lg">{title || "Smartphone X Pro"}</p>
        <p>Category : {category || "other"}</p>
        <p>Brand: {brand || "other"}</p>
        <div className="flex items-center my-1">
          <span>Unit Price:</span>
          <span className="ml-2 font-semibold">
            ${price || 79.99} x {qty}
          </span>
        </div>
        <p>
          Totals: <span className="font-bold">${(price * qty).toFixed(2)}</span>
        </p>
        <div className="flex gap-5 items-center mt-3">
          <div className="py-1 gap-6 flex items-center justify-center px-6 border border-slate-300 rounded-full w-fit font-medium">
            <button
              className="text-center text-xl"
              onClick={() => {
                if (qty !== 1) {
                  onQtyChange(qty - 1);
                  setQty((prev) => prev - 1);
                }
              }}>
              -
            </button>
            <button className="text-center">{qty}</button>
            <button
              className="text-center text-xl"
              onClick={() => {
                if (qty < 5) {
                  onQtyChange(qty + 1);
                  setQty((prev) => prev + 1);
                }
              }}>
              +
            </button>
          </div>
          <button onClick={onRemove} className="text-red-600 svg-btn !p-2">
            <Trash2Icon />
          </button>
        </div>
      </div>
    </div>
  );
};
