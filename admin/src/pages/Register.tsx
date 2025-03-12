import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "../utils";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const conPassword = (
      form.elements.namedItem("confirm-password") as HTMLInputElement
    ).value;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;

    try {
      if (password !== conPassword) {
        return toast.error("please check your password");
      }
      const register = await axios.post("/api/v1/user/sign-up", {
        email,
        password,
        username,
      });
      if (register.data) {
        toast.success("User register succeeded");
        navigate("/login");
      }
    } catch (err) {
      toast.success("User register failed, Try again!");
      console.log(err);
    }
  };

  return (
    <section
      id="auth"
      className="bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* <!-- Register Form --> */}
        <div
          className="bg-white p-8 rounded-lg border border-gray-200"
          x-show="isRegister"
          x-cloak="">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
            <p className="text-gray-600 mt-2">Sign up for a new account</p>
          </div>

          <form onSubmit={handelSubmit}>
            <Input
              name="username"
              type="text"
              label="Username"
              autoComplete="off"
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              autoComplete="off"
              required
            />
            <Input
              name="password"
              type="text"
              label="Password"
              autoComplete="off"
              required
            />
            <Input
              name="confirm-password"
              type="text"
              label="Confirm Password"
              autoComplete="off"
              required
            />

            <label
              htmlFor="checkbox"
              className="gap-2 my-2 cursor-pointer text-sm flex items-center text-gray-600">
              <input
                type="checkbox"
                id="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                required
              />
              <span>I agree to the Terms and Privacy Policy</span>
            </label>

            <button
              type="submit"
              className="w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <NavLink
              to={"/login"}
              className="text-indigo-600 mx-2 hover:text-indigo-500">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
