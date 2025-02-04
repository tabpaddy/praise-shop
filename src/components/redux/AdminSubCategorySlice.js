import { createSlice } from "@reduxjs/toolkit";

const AdminSubCategorySlice = createSlice({
  name: "adminSubCategory",
  initialState: {
    input: "",
    error: { message: null },
    success: "",
  },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearForm: (state) => {
      state.input = "";
      state.error = { message: null };
      state.success = "";
    },
  },
});

export const { setInput, setError, setSuccess, clearForm } =
  AdminSubCategorySlice.actions;

export default AdminSubCategorySlice.reducer;
