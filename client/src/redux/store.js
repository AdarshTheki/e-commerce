import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import checkoutReducer from "./checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    categories: categoryReducer,
    brands: brandReducer,
    checkout: checkoutReducer,
  },
});

export default store;
