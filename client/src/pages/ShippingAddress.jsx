import { useEffect, useState } from "react";

import { Edit2, Trash2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import useFetch from "../hooks/useFetch";
import { errorHandler, axios } from "../helper";
import { Input, Loading, NotFound, Select } from "../utils";
import { NavLink } from "react-router-dom";
import { HomeSpotlight } from "../components";

const ShippingAddress = () => {
  const { data, loading: isLoad, error } = useFetch("/address");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    addressLine: "",
    city: "",
    postalCode: "",
    countryCode: "IN",
    isDefault: false,
    isEdit: false,
  });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data?.length) {
      setAddresses(data);
      setFormData((prev) => ({ ...prev, ...data.find((a) => a.isDefault) }));
    }
  }, [data]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.addressLine || !formData.city || !formData.postalCode) {
        throw new Error("please fill all filed");
      }
      const method = formData?._id ? "patch" : "post";
      const url = formData?._id ? `/address/${formData._id}` : "/address";
      const res = await axios[method](url, {
        ...formData,
        countryCode: "IN",
      });
      if (res.data) {
        setAddresses((prev) => [...prev, res.data.shipping]);
        setFormData({ isEdit: false });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await axios.delete(`/address/${id}`);
      if (res.data) {
        setAddresses((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!formData._id) return toast.error("user address not define");
      const res = await axios.post("/stripe/stripe-checkout", {
        userId: user._id,
        addressId: formData?._id,
      });
      if (res.data) {
        window.location.href = res.data?.url;
      }
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

  if (error) return <NotFound title={JSON.stringify(error)} />;

  return (
    <div className="p-4 min-h-screen mx-auto max-w-6xl">
      {!formData.isEdit && (
        <div
          className="border border-gray-300 cursor-pointer card mb-5 relative max-w-3xl"
          onClick={() => setFormData({ isEdit: true })}>
          <h2 className="font-semibold pl-2">Add New Address</h2>
        </div>
      )}

      {!formData.isEdit &&
        addresses?.map((item) => (
          <div key={item._id} className="relative mb-5 max-w-3xl">
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

      <div className="flex gap-5 text-sm font-semibold mt-10 mb-5">
        <NavLink
          to="/cart"
          className="bg-slate-800 border btn text-nowrap text-white">
          Go Back
        </NavLink>
        {!formData.isEdit && formData?._id && (
          <button
            className="bg-indigo-600 btn text-nowrap text-white"
            onClick={handleCheckout}>
            {"Save & Checkout"}
          </button>
        )}
      </div>

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

      <HomeSpotlight />
    </div>
  );
};

export default ShippingAddress;
