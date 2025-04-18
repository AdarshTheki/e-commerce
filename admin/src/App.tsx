import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./utils";
import { PrivateRoute } from "./components";
import {
  Login,
  Register,
  Notfound,
  Analytics,
  Dashboard,
  Customers,
  Inventory,
  Products,
  ProductUpdate,
  ProductCreate,
  ProfileSettings,
  Categories,
  CategoryCreate,
} from "./pages";
import useFetch from "./hooks/useFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/authSlice";
import { fetchCategories } from "./redux/categorySlice";
import { fetchBrands } from "./redux/brandSlice";
import { AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const { data, loading } = useFetch("/user/current-user");
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = data?._id;

  useEffect(() => {
    if (isAuth) {
      dispatch(login(data));
    }
  }, [data, dispatch, isAuth]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<PrivateRoute isAuth={isAuth} />}>
            <Route index element={<Dashboard />} />
            <Route path="/analytic" element={<Analytics />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<ProductUpdate />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/brand" element={<Categories />} />
            <Route path="/brand/create" element={<CategoryCreate />} />
            <Route path="/category/create" element={<CategoryCreate />} />
            <Route path="/setting" element={<ProfileSettings />} />
            <Route path="*" element={<Notfound />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
