import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../helper";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
  const response = await axios.get(`/cart`);
  return response?.data?.data?.items;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // product item & quantity
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((i) => i._id === _id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    moveToCart: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload);
      if (existingItem) {
        existingItem.flag = !existingItem.flag;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  moveToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
