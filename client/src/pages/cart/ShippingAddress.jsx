import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setShippingAddress, setSteps } from "../../redux/checkoutSlice";
import { Input } from "../../utils";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.checkout);

  const [formData, setFormData] = useState({
    firstName: shippingAddress?.firstName || "",
    lastName: shippingAddress?.lastName || "",
    email: shippingAddress?.email || "",
    addressLine1: shippingAddress?.addressLine1 || "",
    city: shippingAddress?.city || "",
    pinCode: shippingAddress?.pinCode || "",
    state: shippingAddress?.state || "",
    country: shippingAddress?.country || "",
    phone: shippingAddress?.phone || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).every((i) => i.toString().trim() !== "")) {
      dispatch(setShippingAddress(formData));
      dispatch(setSteps(2));
    } else {
      toast.error("please fill the shipping address");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex gap-4 sm:flex-row flex-col">
        <Input
          label="first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          label="last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <Input
        type="email"
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        type="number"
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        label="Street Address"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          type="number"
          label="ZIP Code"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
        />
        <Input
          label="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          label="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      <div className="flex mt-10 gap-5 w-[250px] font-semibold">
        <button
          type="button"
          className="text-red-600 btn text-nowrap border"
          onClick={() => dispatch(setSteps(0))}>
          Go Back
        </button>
        <button
          type="submit"
          className="btn text-white bg-indigo-600"
          onClick={handleSubmit}>
          Save Next
        </button>
      </div>
    </form>
  );
};

export default ShippingAddress;
