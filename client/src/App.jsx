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
} from "./pages";
import useFetch from "./hooks/useFetch";
import { Footer, Header, PrivateRoute, TopBar } from "./components";
import { Loading } from "./utils";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";

const App = () => {
  const { data, loading } = useFetch("/api/v1/user/current-user");
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
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="w-full bg-gray-100 ">
      <Router>
        <TopBar />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute isAuth={auth} />}>
            <Route path="/cart" element={<CartsPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
