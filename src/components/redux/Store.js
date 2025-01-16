import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import resetPasswordReducer from "./ResetPasswordSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
  },
});
