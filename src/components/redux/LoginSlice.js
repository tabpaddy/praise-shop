import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    error: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
      state.error = {};
    },
  },
});

export const { setEmail, setPassword, setError, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
