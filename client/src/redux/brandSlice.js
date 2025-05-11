import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../helper/axiosInstance";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await instance.get(`/product/brand-list`);
  return response.data;
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
