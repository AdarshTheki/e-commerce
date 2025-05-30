import { useState } from "react";

import { Input, Loading, Select } from "../../utils";
import useFetch from "../../hooks/useFetch";
import { Edit2, Trash2Icon } from "lucide-react";
import errorHandler from "../../helper/errorHandler";
import axiosInstance from "../../helper/axiosInstance";
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const { data, refetch, loading: isLoad } = useFetch("/address");
  const [loading, setLoading] = useState(false);
  const address = data?.find((i) => i?.isDefault);

  const [formData, setFormData] = useState({
    addressLine: address?.addressLine || "",
    city: address?.city || "",
    postalCode: address?.postalCode || "",
    countryCode: address?.countryCode || "IN",
    isDefault: address?.isDefault || false,
    isEdit: false,
  });

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.addressLine || !formData.city || !formData.postalCode) {
        throw new Error("please fill all filed");
      }
      const method = formData?._id ? "patch" : "post";
      const url = formData?._id ? `/address/${formData._id}` : "/address";
      const res = await axiosInstance[method](url, {
        ...formData,
        countryCode: "IN",
      });
      if (res.data) {
        setFormData({ isEdit: false });
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await axiosInstance.delete(`/address/${id}`);
      if (res.data) {
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!formData._id) return toast.error("user address not define");
      const res = await axiosInstance.post("/order/stripe-checkout", {
        userId: "",
        addressId: formData?._id,
      });
      if (res.data) window.location.href = res.data;
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (isLoad) return <Loading />;

  return (
    <div className="p-4 min-h-screen">
      {!formData.isEdit && (
        <div
          className="border border-gray-300 cursor-pointer card mb-5"
          onClick={() => setFormData({ isEdit: true })}>
          <h2 className="font-semibold pl-2">Add New Address</h2>
        </div>
      )}

      {!formData.isEdit &&
        data?.map((item) => (
          <div key={item._id} className="relative mb-5">
            <div
              onClick={() => setFormData(item)}
              className={`capitalize !pl-5 border border-gray-300 cursor-pointer card ${item._id === formData._id && "!bg-indigo-100 border !border-indigo-300"}`}>
              <h4 className="font-semibold">{item.addressLine}</h4>
              <p>
                {item.city}, {item.postalCode}, India
              </p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, isEdit: true })}
              className="svg-btn p-2 absolute right-10 top-5">
              <Edit2 />
            </button>
            <button
              onClick={() => handleDeleteAddress(item._id)}
              className="svg-btn p-2 absolute right-0 top-5 text-red-600">
              <Trash2Icon />
            </button>
          </div>
        ))}

      {!formData.isEdit && formData?._id && (
        <div className="flex gap-5 mt-5">
          <button className="bg-red-600 btn text-nowrap text-white">
            Go Back
          </button>
          <button
            className="bg-indigo-600 btn text-nowrap text-white"
            onClick={handleCheckout}>
            {"Save & Checkout"}
          </button>
        </div>
      )}

      {formData.isEdit && (
        <form className="space-y-4" onSubmit={handleAddressSubmit}>
          <Input
            label="AddressLine"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <div className="flex gap-4">
            <Input
              label="Postal code"
              name="postalCode"
              type="number"
              min={6}
              max={6}
              value={formData.postalCode}
              onChange={handleChange}
            />
            <Select
              label="Country"
              name="countryCode"
              options={[{ value: "IN", label: " India " }]}
              value={formData.countryCode}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="address default" className="flex gap-2">
            <input
              type="checkbox"
              name="isDefault"
              id="address default"
              value={formData.isDefault}
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <span>Default Address</span>
          </label>

          <div className="flex gap-5 mt-5">
            <button
              onClick={() => setFormData({ isEdit: false })}
              type="button"
              className="bg-red-600 btn text-nowrap text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 btn text-nowrap text-white"
              onClick={handleAddressSubmit}>
              {loading ? "Loading..." : "Save Address"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingAddress;
