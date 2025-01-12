import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { setEmail, setPassword, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
