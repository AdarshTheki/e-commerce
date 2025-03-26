import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSteps } from "../../redux/checkoutSlice";
import * as Svg from '../../utils/Svgs'

const items = [
  {type:'paytm',svg:<Svg.PaypalCard/>},
  {type:'visa',svg:<Svg.VistaCard/>},
  {type:'master',svg:<Svg.MasterCard/>},
  {type:'Amex',svg:<Svg.AmexCard/>},
]

const ShippingPayment = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(null)

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-medium">Shipping Payment</h2>
      
    {items.map((method) => (
        <div
          onClick={() => setSelect(method.type)}
          key={method.type}
          className={`flex justify-between mb-2 cursor-pointer items-center p-4 max-w-[600px] border uppercase text-sm rounded-lg ${
            select === method.type
              ? "border-blue-600 bg-blue-100"
              : "border-gray-200"
          }`}>
          <h2 className="font-medium">{method.type}</h2>
          {method.svg}
        </div>
      ))}


      {/* steps */}
      <div className="flex gap-5 w-[250px] font-semibold mt-10">
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
