import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSteps } from "../../redux/checkoutSlice";

const OrderCheckout = ({ items = [] }) => {
  const dispatch = useDispatch();
  const { shippingAddress, payment, shippingMethod } = useSelector(
    (state) => state.checkout
  );

  const {
    firstName,
    lastName,
    email,
    addressLine1,
    city,
    pinCode,
    state,
    country,
    phone,
  } = shippingAddress;

  return (
    <>
      <h2 className="text-xl font-medium mt-4">
        Paying with pay on Delivery/Cash on Delivery
      </h2>
      <p>
        Scan and pay at delivery with cartify pay UPI and win reword up to 500
      </p>
      <h2 className="text-xl font-medium mt-4">Delivering At</h2>
      <div className="capitalize gap-x-3 grid grid-cols-2">
        <p className="capitalize">full Name</p>
        <p>
          {firstName} {lastName}
        </p>
        <p>Shipping Address</p>
        <p>
          {addressLine1}, {city} - {pinCode}, {state}, {country}
        </p>
        <p>Phone Number</p>
        <p>{phone}</p>
        <p>Email Address </p>
        <p>{email}</p>
        <p>shipping fee </p>
        <p>{shippingMethod ? `$ ${shippingMethod}` : "COD"}</p>
        <p>Payment</p>
        <p>{payment}</p>
      </div>
      <h2 className="text-xl font-medium mt-4">
        Guaranteed Delivery: Tomorrow 7 pm - 12 pm
      </h2>
      {items?.map((i) => {
        const { title, _id, thumbnail, price } = i.productId;
        return (
          <div
            key={_id}
            className="flex items-center gap-5 p-1 border-b border-gray-300">
            <img src={thumbnail} alt={title} width={100} />
            <div className="text-sm">
              <p className="font-medium">{title}</p>
              <p>
                Unit Price: : ${price} x {i.quantity}
              </p>
              <p>Totals: ${(price * i.quantity).toFixed(2)}</p>
            </div>
          </div>
        );
      })}

      {/* steps */}
      <div className="flex mt-10 gap-5 w-[250px] font-semibold">
        <button
          type="button"
          className="w-full border py-2 !border-red-600 text-red-500"
          onClick={() => dispatch(setSteps(2))}>
          Go Back
        </button>
        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600"
          onClick={() => dispatch(setSteps(4))}>
          Place Order
        </button>
      </div>
    </>
  );
};

export default OrderCheckout;
