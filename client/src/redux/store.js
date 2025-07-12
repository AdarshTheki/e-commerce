import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import addressReduce from "./addressSlice";
import productReduce from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    categories: categoryReducer,
    brands: brandReducer,
    address: addressReduce,
    product: productReduce,
  },
});

export default store;
