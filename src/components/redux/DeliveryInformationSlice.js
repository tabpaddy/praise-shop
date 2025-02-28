import { createSlice } from "@reduxjs/toolkit";

const DeliveryInformationSlice = createSlice({
  name: "deliveryInformation",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    error: { message: null },
    success: "",
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearForm: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.street = "";
      state.city = "";
      state.state = "";
      state.zipCode = "";
      state.country = "";
      state.phone = "";
      state.error = { message: null };
      state.success = "";
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setStreet,
  setCity,
  setState,
  setCountry,
  setZipCode,
  setPhone,
  setError,
  setSuccess,
  clearForm,
} = DeliveryInformationSlice.actions;

export default DeliveryInformationSlice.reducer;
