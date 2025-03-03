import { createSlice } from '@reduxjs/toolkit';

const localStorageData = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState).items : [];
  } catch (e) {
    console.warn('Could not load state from localStorage', e);
    return [];
  }
};

const initialState = {
  items: localStorageData(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1, flag: true });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((i) => i._id === _id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    moveToCart: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload);
      if (existingItem) {
        existingItem.flag = !existingItem.flag;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  moveToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
