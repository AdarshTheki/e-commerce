import { axiosInstance } from '@/lib/utils';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface BrandState {
    list: BrandType[];
    loading: boolean;
    error: string | null;
}

// Initial state with type
const initialState: BrandState = {
    list: [],
    loading: false,
    error: null,
};

// Async thunk with typed response
export const fetchBrands = createAsyncThunk<BrandType[]>(
    'brands/fetchBrands',
    async () => {
        const response = await axiosInstance.get(`/brand`);
        if (response.data.docs.length === 0) return [];
        return response.data?.docs;
    }
);

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchBrands.fulfilled,
                (state, action: PayloadAction<BrandType[]>) => {
                    state.loading = false;
                    state.list = action.payload;
                }
            )
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default brandSlice.reducer;
