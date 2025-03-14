import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: null,
  shippingMethod: null,
  paymentMethod: null,
  steps: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setShippingAddress,
  setShippingMethod,
  setPaymentMethod,
  resetCheckout,
  setSteps,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
