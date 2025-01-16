import { createSlice } from "@reduxjs/toolkit";

const ResetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: {
        email: "",
        token: "",
        password: "",
        confirmPassword: "",
        error: {},
        success: "",
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearForm: (state) => {
            state.email = "";
            state.token = "";
            state.password = "";
            state.confirmPassword = "";
            state.error = {};
            state.success = "";
        },
    },
});

export const {setEmail, setToken, setPassword, setConfirmPassword, setError, setSuccess} = ResetPasswordSlice.actions;

export default ResetPasswordSlice.reducer;