import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { Input, SpinnerBtn } from "../utils";
import axiosInstance from "../constant/axiosInstance";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!email || !password) {
      return toast.error("please fill the valid inputs");
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/user/sign-in", {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("token", data.accessToken);
        toast.success("user login succeeded");
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("user login failed, Try again!", err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md space-y-8">
        {/* <!-- Login Form --> */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handelSubmit}>
            <Input
              defaultValue="demo-user@gmail.com"
              name="email"
              type="email"
              label="Email"
              autoComplete="off"
              required
            />
            <Input
              defaultValue={"12345"}
              name="password"
              type="text"
              label="Password"
              autoComplete="off"
              required
            />

            <div className="flex my-2 items-center justify-between">
              <div className="flex items-center">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  required
                  checked
                />
                <label
                  htmlFor="checkbox"
                  className="ml-2 cursor-pointer text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <NavLink
                to="/"
                className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </NavLink>
            </div>

            <div className="flex my-4 items-center w-full justify-center">
              <SpinnerBtn
                loading={loading}
                className="w-full"
                primaryName="Sign in"
                type="submit"
              />
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <NavLink
              to={"/register"}
              className="text-indigo-600 mx-2 hover:text-indigo-500">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
