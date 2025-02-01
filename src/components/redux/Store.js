import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import resetPasswordReducer from "./ResetPasswordSlice";
import AdminLoginReducer from "./AdminLoginSlice";
import AdminCreateUserReducer from "./AdminCreateUserSlice";
import AdminCreateSubAdminReducer from "./AdminCreateSubAdminSlice";
import AdminCategoryAndSubCategoryReducer from "./AdminCategoryAndSubCategorySlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    AdminLogin: AdminLoginReducer,
    adminCreateUser: AdminCreateUserReducer,
    adminCreateSubAdmin: AdminCreateSubAdminReducer,
    adminCategoryAndSubCategory: AdminCategoryAndSubCategoryReducer,
  },
});
