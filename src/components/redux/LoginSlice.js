import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    ip_address: "",
    error: {},
    success: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIp_address: (state, action) => {
      state.ip_address = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
      state.ip_address = "",
      state.error = {};
      state.success = "";
    },
  },
});

export const { setEmail, setPassword, setIp_address, setError, setSuccess, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
