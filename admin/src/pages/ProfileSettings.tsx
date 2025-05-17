import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input, Select } from "../utils";
import { RootState } from "../redux/store";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../constant/axiosInstance";
import useTitle from "../hooks/useTitle";
import { countries } from "../constant/countries";

const ProfileSettings = () => {
  useTitle(`Cartify: profile details`);
  return (
    <div className="bg-white min-h-screen sm:p-6 p-2 sm:flex justify-evenly overflow-hidden rounded-lg">
      {/* Profile Avatar */}
      <AvatarComponent />
      {/* Tab Sections */}
      <div className="sm:w-1/2 mt-5">
        <Tabs>
          <Tab label={"General"}>
            <SectionsComponent />
          </Tab>
          <Tab label="Address">
            <AddressComponent />
          </Tab>
          <Tab label="Security">
            <SecurityComponent />
          </Tab>
          <Tab label="Preferences">
            <PreferencesComponent />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default ProfileSettings;

const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="flex border-b border-gray-200 w-full overflow-x-auto">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`mr-6 py-2 text-sm font-medium border-b-2  text-gray-500 hover:text-gray-700 focus:outline-none ${
              index === activeTab
                ? "border-indigo-500 text-indigo-700"
                : "border-transparent"
            }`}
            onClick={() => handleTabClick(index)}>
            {React.isValidElement(child) && child.props.label}
          </button>
        ))}
      </div>
      <>
        {React.isValidElement(React.Children.toArray(children)[activeTab]) &&
          (React.Children.toArray(children)[activeTab] as React.ReactElement)
            .props.children}
      </>
    </>
  );
};

interface TabProps {
  label: string;
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = () => {
  return null; // This component doesn't render anything directly
};

const AvatarComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [avatar, setAvatar] = useState<string | File>(user?.avatar || "");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUploadAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar); // 'image' is the name expected by your server

      const res = await axiosInstance.patch("/user/update-avatar", formData);
      if (res.data) {
        toast.success("upload avatar image succeed");
        setPreview("");
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      console.log(error);
      toast.error("image upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
        ) : (
          <img
            src={avatar.toString() || "https://avatar.iran.liara.run/public"}
            alt="Profile"
            className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
        )}
      </div>
      {preview ? (
        <div className="flex gap-4">
          <button
            onClick={handleUploadAvatar}
            className="mt-4 cursor-pointer px-4 py-2 bg-green-700 hover:bg-green-600 transition-colors duration-300 rounded-md text-white text-sm">
            Submit
          </button>
          <button
            onClick={() => setPreview("")}
            className="mt-4 cursor-pointer px-4 py-2 bg-red-700 hover:bg-red-600 transition-colors duration-300 rounded-md text-white text-sm">
            Cancel
          </button>
        </div>
      ) : (
        <label
          htmlFor="avatar"
          className="mt-4 cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-white text-sm">
          Change Avatar
        </label>
      )}
      <input
        id="avatar"
        onChange={handleImageChange}
        type="file"
        className=" opacity-0"
      />
    </div>
  );
};

const SectionsComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phoneNumber?.split("-")[1] || "",
    code: user?.phoneNumber?.split("-")[0] || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      const response = await axiosInstance.patch("/user/update", {
        ...formData,
        phoneNumber: `${formData.code}-${formData.phone}`,
      });
      if (response.data) toast.success("user update success");
    } catch (error) {
      console.log(error);
      toast.error("user update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid pt-5 gap-4" onSubmit={onSettingsSubmit}>
      <Input
        value={formData.firstName}
        onChange={handleChange}
        name="firstName"
        label="First Name"
        required
      />
      <Input
        value={formData.lastName}
        onChange={handleChange}
        name="lastName"
        label="Last Name"
        required
      />
      <Input
        value={formData.phone}
        type="number"
        onChange={handleChange}
        name="phone"
        label="Phone"
        required
        minLength={10}
        maxLength={10}
      />
      <Select
        required
        options={countries}
        name="code"
        label="country code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white">
        {loading ? "loading..." : "Save Changes"}
      </button>
    </form>
  );
};

const SecurityComponent = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSecuritySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;

    if (oldPassword === newPassword || !newPassword || !oldPassword)
      return toast.error("please enter a valid password");

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/change-password", {
        oldPassword,
        newPassword,
      });
      if (response.data) {
        setFormData({ ...formData, oldPassword: "", newPassword: "" });
        toast.success("your password change succeed");
      }
    } catch (error) {
      console.log(error);
      toast.error("password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid pt-5 gap-4" onSubmit={onSecuritySubmit}>
      <Input
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        label="Old Password"
      />
      <Input
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        label="New Password"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white">
        {loading ? "loading..." : "Save Changes"}
      </button>
    </form>
  );
};

const AddressComponent = () => {
  const { data } = useFetch<AddressType>("/address");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!data?._id) {
        const res = await axiosInstance.post(
          "/address",
          { ...address, pinCode: parseInt(address.pinCode) },
          { withCredentials: true }
        );
        if (res.data) {
          toast.success("address crated success");
          setAddress(res.data);
        }
      } else {
        const res = await axiosInstance.patch(
          "/address/" + data?._id,
          { ...address, pinCode: parseInt(address.pinCode) },
          { withCredentials: true }
        );
        if (res.data) {
          toast.success("address updated success");
          setAddress(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("address update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid pt-5 gap-3" onSubmit={onSubmitHandle}>
      <Input
        onChange={handleChange}
        value={address.addressLine1}
        name="addressLine1"
        label="address Line 1"
        optionals="(required)"
      />
      <Input
        onChange={handleChange}
        value={address.addressLine2}
        name="addressLine2"
        label="address Line 2"
        optionals="(optionals)"
      />
      <Input
        onChange={handleChange}
        value={address.city}
        name="city"
        label="city"
        optionals="(required)"
      />
      <Input
        onChange={handleChange}
        value={address.pinCode}
        name="pinCode"
        label="pinCode"
        type="number"
        optionals="(required)"
      />
      <Input
        onChange={handleChange}
        value={address.state}
        name="state"
        label="state"
        optionals="(required)"
      />
      <Input
        onChange={handleChange}
        value={address.country}
        name="country"
        label="country"
        optionals="(required)"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white">
        {loading ? "loading..." : "Save Changes"}
      </button>
    </form>
  );
};

const PreferencesComponent = () => {
  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      if (res.data) {
        toast.success("user logout success");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div id="preference">
      <div className="space-y-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-gray-700 font-medium">Email Notifications</h4>
            <p className="text-neutral-600 text-sm">
              Receive emails about your account activity
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-gray-700 font-medium">Order Updates</h4>
            <p className="text-neutral-600 text-sm">
              Get updates about your order status
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-gray-700 font-medium">Marketing Preferences</h4>
            <p className="text-gray-600 text-sm">
              Receive marketing emails and promotions
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <button
          className="p-2 bg-red-600 text-white hover:opacity-85 px-4 rounded-lg"
          onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
