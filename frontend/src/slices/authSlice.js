import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    saveTakingExam: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        takingExam: action.payload.takingExam,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, saveTakingExam, logout } = authSlice.actions;

export default authSlice.reducer;
