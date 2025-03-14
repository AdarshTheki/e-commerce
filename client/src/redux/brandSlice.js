import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../helper/constant";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await axios.get(`${baseUrl}/api/v1/brand`);
  return response.data?.docs;
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
