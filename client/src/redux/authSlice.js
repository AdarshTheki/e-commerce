import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  chatId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
    // chatId
    handleChatId: (state, action) => {
      return {
        ...state,
        chatId: action.payload,
      };
    },
  },
});

export const { login, logout, handleChatId } = authSlice.actions;
export default authSlice.reducer;
