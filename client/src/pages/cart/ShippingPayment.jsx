import React from "react";
import { useDispatch } from "react-redux";
import { setSteps } from "../../redux/checkoutSlice";

const ShippingPayment = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Payment</h2>
      <div className="flex gap-5 w-[250px] font-semibold">
        <button
          type="button"
          className="w-full border py-2 !border-red-600 text-red-500"
          onClick={() => dispatch(setSteps(2))}>
          Back
        </button>
        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600"
          onClick={() => dispatch(setSteps(4))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ShippingPayment;
