import React, { useEffect } from "react";
import { login } from "./redux/authSlice";
import useFetch from "./hooks/useFetch";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";
import { fetchAddresses } from "./redux/addressSlice";
import { fetchProducts } from "./redux/productSlice";
import { fetchCarts } from "./redux/cartSlice";
import { Loading } from "./utils";
import { Footer, NavbarBottom, NavbarTop } from "./components";
import { Outlet } from "react-router-dom";

// Root Layout for main structure and data fetching
const RootLayout = () => {
  const { data, loading } = useFetch("/user/current-user");
  const dispatch = useDispatch();
  const auth = data?._id;

  useEffect(() => {
    if (auth) {
      dispatch(login(data));
    }
  }, [data, auth, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchCarts());
    dispatch(fetchAddresses());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="bg-slate-50 text-slate-700">
      <NavbarTop />
      <main>
        <Outlet />
      </main>
      <Footer />
      <NavbarBottom />
    </div>
  );
};

export default RootLayout;
