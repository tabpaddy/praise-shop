import { createSlice } from "@reduxjs/toolkit";

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    name: "",
    description: "",
    keyword: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
    error: { message: null },
    success: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
    setBestSeller: (state, action) => {
      state.bestSeller = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearForm: (state) => {
      state.name = "";
      state.description = "";
      state.keyword = "";
      state.price = "";
      state.category = "";
      state.subCategory = "";
      state.sizes = [];
      state.bestSeller = false;
      state.error = { message: null };
      state.success = "";
    },
  },
});

export const {
  setName,
  setDescription,
  setKeyword,
  setPrice,
  setCategory,
  setSubCategory,
  setSizes,
  setBestSeller,
  setError,
  setSuccess,
  clearForm,
} = AdminProductSlice.actions;

export default AdminProductSlice.reducer;
