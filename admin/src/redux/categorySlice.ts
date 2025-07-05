import { axiosInstance } from '@/lib/utils';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface CategoryState {
    list: CategoryType[];
    loading: boolean;
    error: string | null;
}

// Initial state with type
const initialState: CategoryState = {
    list: [],
    loading: false,
    error: null,
};

// Async thunk with typed response
export const fetchCategories = createAsyncThunk<CategoryType[]>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosInstance.get(`/category`);
        return response.data?.docs;
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchCategories.fulfilled,
                (state, action: PayloadAction<CategoryType[]>) => {
                    state.loading = false;
                    state.list = action.payload;
                }
            )
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default categorySlice.reducer;
