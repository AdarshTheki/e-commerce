import React from "react";
import { NavLink } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className="flex px-4 items-center w-full overflow-x-auto scrollbar-hidden py-2 bg-white gap-5 text-sm font-medium text-gray-700 capitalize pl-2 sm:pl-10">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/product">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/checkout">checkout</NavLink>
      <NavLink to="/setting">Setting</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
};

export default MenuBar;
