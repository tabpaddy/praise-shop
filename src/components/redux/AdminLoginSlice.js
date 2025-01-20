import { createSlice } from "@reduxjs/toolkit";

const AdminLoginSlice = createSlice({
  name: "AdminLogin",
  initialState: {
    email: "",
    password: "",
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
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
      state.error = {};
      state.success = "";
    },
  },
});

export const { setEmail, setPassword, setError, setSuccess, clearForm } = AdminLoginSlice.actions;

export default AdminLoginSlice.reducer;
