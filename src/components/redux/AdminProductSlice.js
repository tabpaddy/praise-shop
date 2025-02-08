import { createSlice } from "@reduxjs/toolkit";

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    name: "",
    description: "",
    keyword: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: {},
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
    setImage1: (state, action) => {
      state.image1 = action.payload;
    },
    setImage2: (state, action) => {
      state.image2 = action.payload;
    },
    setImage3: (state, action) => {
      state.image3 = action.payload;
    },
    setImage4: (state, action) => {
      state.image4 = action.payload;
    },
    setImage5: (state, action) => {
      state.image5 = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setSizes: (action, state) => {
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
      state.image1 = "";
      state.image2 = "";
      state.image3 = "";
      state.image4 = "";
      state.image5 = "";
      state.category = "";
      state.subCategory = "";
      state.sizes = [];
      state.bestSeller = {};
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
  setImage1,
  setImage2,
  setImage3,
  setImage4,
  setImage5,
  setCategory,
  setSubCategory,
  setSizes,
  setBestSeller,
  setError,
  setSuccess,
  clearForm,
} = AdminProductSlice.actions;

export default AdminProductSlice.reducer;
