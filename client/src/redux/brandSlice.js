import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../helper";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await axios.get(`/brand`);
  return response?.data?.data?.docs;
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
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
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
