import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Input } from "../utils";
import { baseUrl } from "../helper/constant";
import { Check } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const username = e.target.username.value;

    try {
      if (password !== confirmPassword) {
        return toast.error("please check your password");
      }
      const register = await axios.post(baseUrl + "/api/v1/user/sign-up", {
        email,
        password,
        username,
        role: "user",
      });

      if (register.data) {
        toast.success("User register succeeded");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.message);
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

          <form onSubmit={handelSubmit} className="space-y-4">
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
              name="confirmPassword"
              type="text"
              label="Confirm Password"
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
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?
            <NavLink
              to={"/login"}
              className="text-indigo-600 mx-2 font-medium underline hover:text-indigo-500">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
