import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    nameOrEmail: "",
    password: "",
  },
  reducers: {
    setNameOrEmail: (state, action) => {
      state.nameOrEmail = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearForm: (state) => {
      state.nameOrEmail = "";
      state.password = "";
    },
  },
});

export const { setNameOrEmail, setPassword, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
