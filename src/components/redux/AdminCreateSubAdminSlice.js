import { createSlice } from "@reduxjs/toolkit";

const AdminCreateSubAdminSlice = createSlice({
  name: "adminCreateSubAdmin",
  initialState: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: {},
    success: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.error = action.payload;
    },
    clearForm: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
      state.error = {};
      state.success = "";
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setError,
  setSuccess,
  clearForm,
} = AdminCreateSubAdminSlice.actions;

export default AdminCreateSubAdminSlice.reducer;
