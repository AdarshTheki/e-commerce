import React, { useState } from "react";
import axiosInstance from "../constant/axiosInstance";
import { Input, Select, SpinnerBtn } from "../utils";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const UserForm = ({ userData }: { userData?: UserType }) => {
  const [user, setUser] = React.useState({
    email: userData?.email || "",
    password: userData?.password || "",
    phoneNumber: userData?.phoneNumber || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    countryCode: userData?.countryCode || "+91",
    role: userData?.role || "customer",
    status: userData?.status || "active",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      if (userData?.username) {
        response = await axiosInstance.post("/user/update", user);
      } else {
        response = await axiosInstance.post("/user/sign-up", {
          ...user,
          username: (user.firstName + user.lastName).toLowerCase(),
        });
      }
      if (response.data) {
        navigate("/customer");
      }
      console.log("user form", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl text-center pb-5 font-semibold text-gray-800">
        {userData?.username ? "Update User" : "Create User"}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="sm:flex gap-2">
          <Input
            name="firstName"
            label="First Name"
            placeholder="please enter a unique firstName"
            onChange={handleChange}
            type="text"
            value={user.firstName}
            required
          />
          <Input
            name="lastName"
            label="Last Name"
            placeholder="please enter a unique lastName"
            onChange={handleChange}
            type="text"
            value={user.lastName}
            required
          />
        </div>
        <div className="sm:flex gap-2">
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="please enter a unique email"
            onChange={handleChange}
            value={user.email}
            required
          />
          <Input
            name="username"
            className="cursor-not-allowed"
            label="username (auto generate)"
            placeholder="auto create username"
            type="text"
            value={(user.firstName + user.lastName).toLowerCase()}
            readOnly
            required
          />
        </div>

        {!userData?.username && (
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
          name="phoneNumber"
          label="Phone number"
          placeholder="please enter a phoneNumber"
          type="number"
          onChange={handleChange}
          value={user.phoneNumber}
          required
        />
        <div className="flex gap-2">
          <Select
            onChange={handleChange}
            value={user.countryCode}
            name="countryCode"
            label="Country"
            options={[
              { id: "+91", title: "India" },
              { id: "+234", title: "Pakistan" },
              { id: "+1", title: "USA" },
              { id: "+44", title: "UK" },
            ]}
          />
          <Select
            onChange={handleChange}
            value={user.status}
            name="status"
            label="Status"
            options={[
              { id: "active", title: "active" },
              { id: "inactive", title: "in-active" },
              { id: "pending", title: "pending" },
            ]}
          />
          <Select
            onChange={handleChange}
            value={user.role}
            name="role"
            label="role"
            options={[
              { id: "customer", title: "customer" },
              { id: "user", title: "user" },
            ]}
          />
        </div>
        <div className="flex gap-5 items-center mt-5">
          <SpinnerBtn
            className="w-fit"
            type="submit"
            loading={loading}
            primaryName={userData?.username ? "Update User" : "Create User"}
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
