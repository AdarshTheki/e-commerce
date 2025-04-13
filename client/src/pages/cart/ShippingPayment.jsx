import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSteps, setPayment } from "../../redux/checkoutSlice";
import * as SVG from "../../utils/Svgs";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";

const items = [
  { type: "Paypal", svg: <SVG.PaypalCard /> },
  { type: "Visa Card", svg: <SVG.VistaCard /> },
  { type: "Master Card", svg: <SVG.MasterCard /> },
  { type: "Cash on Delivery (COD)", svg: <Mail /> },
];

const ShippingPayment = () => {
  const [select, setSelect] = useState(null);

  const dispatch = useDispatch();
  const handleNext = () => {
    if (select) {
      dispatch(setPayment(select));
      dispatch(setSteps(4));
    } else {
      toast.error("please select the payment type");
    }
  };

  return (
    <>
      {/* Shipping Method Listing */}
      {items.map((method) => (
        <div
          onClick={() => setSelect(method.type)}
          key={method.type}
          className={`flex justify-between cursor-pointer items-center p-4 border  rounded-lg ${
            select === method.type
              ? "border-blue-600 bg-blue-100"
              : "border-gray-200"
          }`}>
          <h4 className="font-medium capitalize">{method.type}</h4>
          {method.svg}
        </div>
      ))}

      {/* steps */}
      <div className="flex gap-5 w-[250px] font-semibold">
        <button
          type="button"
          className="text-red-600 btn text-nowrap border"
          onClick={() => dispatch(setSteps(2))}>
          Back
        </button>
        <button
          type="submit"
          className="btn text-white bg-indigo-600"
          onClick={handleNext}>
          Payment Next
        </button>
      </div>
    </>
  );
};

export default ShippingPayment;
