import { useEffect } from "react";
import { login } from "./redux/authSlice";
import useApi from "./hooks/useApi";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";
import { fetchProducts } from "./redux/productSlice";
import { fetchCarts } from "./redux/cartSlice";
import { Footer, NavbarBottom, NavbarTop } from "./components";
import { Outlet } from "react-router-dom";

// Root Layout for main structure and data fetching
const RootLayout = () => {
  const { data, callApi } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    callApi("/user/current-user", {}, "get");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?._id) {
      dispatch(login(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchCarts());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-slate-50 text-slate-700 w-full flex flex-col">
      <NavbarTop />
      <main className="min-h-screen w-full">
        <Outlet />
        <Footer />
      </main>
      <NavbarBottom />
    </div>
  );
};

export default RootLayout;
