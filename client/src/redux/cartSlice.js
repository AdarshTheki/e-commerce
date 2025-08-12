import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../config';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCarts = createAsyncThunk('carts/fetchCarts', async () => {
  const response = await axios.get(`/cart`);
  return response?.data?.data?.items;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return { ...state, items: action.payload };
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter((i) => i._id !== action.payload),
      };
    },
    updateItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((i) => (i._id === _id ? { ...i, quantity } : i)),
      };
    },
    clearCart: (state) => {
      return { ...state, items: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message;
      });
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
