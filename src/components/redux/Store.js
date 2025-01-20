import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import resetPasswordReducer from "./ResetPasswordSlice";
import AdminLoginReducer from "./AdminLoginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    AdminLogin: AdminLoginReducer,
  },
});
