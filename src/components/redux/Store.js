import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import resetPasswordReducer from "./ResetPasswordSlice";
import AdminLoginReducer from "./AdminLoginSlice";
import AdminCreateUserReducer from "./AdminCreateUserSlice";
import AdminCreateSubAdminReducer from "./AdminCreateSubAdminSlice";
import AdminCategoryAndSubCategoryReducer from "./AdminCategoryAndSubCategorySlice";
import AdminSubCategoryReducer from "./AdminSubCategorySlice";
import AdminProductReducer from "./AdminProductSlice";
import CartSlice from "./CartSlice";
import DeliveryInformationSlice from "./DeliveryInformationSlice";
import SearchSlice from "./SearchSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    AdminLogin: AdminLoginReducer,
    adminCreateUser: AdminCreateUserReducer,
    adminCreateSubAdmin: AdminCreateSubAdminReducer,
    adminCategoryAndSubCategory: AdminCategoryAndSubCategoryReducer,
    adminSubCategory: AdminSubCategoryReducer,
    adminProduct: AdminProductReducer,
    cart: CartSlice,
    deliveryInformation: DeliveryInformationSlice,
    search: SearchSlice,
  },
});
