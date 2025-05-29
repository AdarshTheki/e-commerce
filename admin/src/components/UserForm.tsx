import React, { useState } from "react";
import { Input, Select, SpinnerBtn } from "../utils";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { countries } from "../constant/countries";
import axiosInstance from "../constant/axiosInstance";
import useTitle from "../hooks/useTitle";
import { toast } from "react-toastify";

const UserForm = ({ userData }: { userData?: UserType }) => {
  const [user, setUser] = React.useState({
    email: userData?.email || "",
    password: userData?.password || "",
    fullName: userData?.fullName || "",
    role: userData?.role || "",
    status: userData?.status || "",
    code: userData?.phoneNumber?.split("-")[0] || "",
    phone: userData?.phoneNumber?.split("-")[1] || "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useTitle(`Cartify: ${userData?._id ? "Update User" : "Add New User"}`);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
    try {
      if (userData?._id) {
        response = await axiosInstance.patch(`/user/admin/${userData._id}`, {
          ...user,
          phoneNumber: `${user.code}-${user.phone}`,
        });
      } else {
        response = await axiosInstance.post("/user/admin", {
          ...user,
          phoneNumber: `${user.code}-${user.phone}`,
        });
      }
      if (response.data) {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl text-center pb-5 font-semibold text-gray-800">
        {userData?._id ? "Update User" : "Create User"}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="fullName"
          label="fullName"
          placeholder="please enter a unique fullName"
          onChange={handleChange}
          type="text"
          value={user.fullName}
          required
        />

        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="please enter a unique email"
          onChange={handleChange}
          value={user.email}
          required
        />

        {!userData?._id && (
          <Input
            name="password"
            label="Password"
            placeholder="please enter a strong password"
            onChange={handleChange}
            type="text"
            value={user.password}
            required
          />
        )}

        <Input
          name="phone"
          label="Phone number"
          placeholder="please enter a phoneNumber"
          type="number"
          onChange={handleChange}
          value={user.phone}
          required
        />
        <div className="flex gap-2">
          <Select
            onChange={handleChange}
            value={user.code}
            name="code"
            label="Country"
            options={countries}
          />
          <Select
            onChange={handleChange}
            value={user.status}
            name="status"
            label="Status"
            options={[
              { id: "active", title: "active" },
              { id: "inactive", title: "in-active" },
            ]}
          />
          <Select
            onChange={handleChange}
            value={user.role}
            name="role"
            label="role"
            options={[
              { id: "customer", title: "customer" },
              { id: "seller", title: "seller" },
            ]}
          />
        </div>
        <div className="flex gap-5 items-center mt-5">
          <SpinnerBtn
            className="w-fit"
            type="submit"
            loading={loading}
            primaryName={userData?._id ? "Update User" : "Create User"}
          />
          <NavLink
            to={"/customer"}
            className="btn bg-red-600 !text-white text-sm">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
