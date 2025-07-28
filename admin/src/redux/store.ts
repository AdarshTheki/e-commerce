import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categorySlice from './categorySlice';
import brandSlice from './brandSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categorySlice,
    brands: brandSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
