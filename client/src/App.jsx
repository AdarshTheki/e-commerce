import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  Notfound,
  RegisterPage,
  SettingPage,
  CartsPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  FavoritePage,
  OrderFailed,
  OrderListing,
  OrderSuccess,
  ShippingAddress,
  GalleryPage,
  ChatPage,
} from "./pages";
import useFetch from "./hooks/useFetch";
import { Footer, FooterMenu, Header, PrivateRoute } from "./components";
import { Loading } from "./utils";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";
import { fetchCarts } from "./redux/cartSlice";
import { fetchAddresses } from "./redux/addressSlice";
import { fetchProducts } from "./redux/productSlice";

const App = () => {
  const { data, loading } = useFetch("/user/current-user");
  const dispatch = useDispatch();
  let auth = data?._id;

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
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute isAuth={auth} />}>
            <Route path="/cart" element={<CartsPage />} />
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/order/failed" element={<OrderFailed />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderListing />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
        <FooterMenu />
      </Router>
    </div>
  );
};

export default App;
