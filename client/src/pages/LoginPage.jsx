import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../utils";
import { baseUrl } from "../helper/constant";

const Login = () => {
  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return toast.error("please fill the valid inputs");
    }

    try {
      const { data } = await axios.post(baseUrl + "/api/v1/user/sign-in", {
        email,
        password,
      });
      if (data) {
        toast.success("user login succeeded");
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        localStorage.setItem("token", data.accessToken);
        window.location.href = "/";
      }
    } catch (err) {
      toast.error(err?.message);
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

          <form onSubmit={handelSubmit} className="space-y-4">
            <Input
              defaultValue="demo-user@gmail.com"
              name="email"
              type="email"
              label="Email"
              autoComplete="off"
              required
            />
            <Input
              defaultValue="12345"
              name="password"
              type="text"
              label="Password"
              autoComplete="off"
              required
            />

            <div className="text-sm flex gap-2 items-center text-gray-500">
              <input
                type="checkbox"
                name="privacy"
                id="privacy"
                checked
                readOnly
              />
              <label htmlFor="privacy">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <NavLink
              to={"/register"}
              className="text-indigo-600 mx-2 font-medium underline hover:text-indigo-500">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
