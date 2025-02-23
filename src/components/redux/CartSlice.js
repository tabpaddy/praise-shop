import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [], // Load guest cart
  cart_id: localStorage.getItem("cart_id") || null, // Load cart_id
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (!exists) {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart)); // Save guest cart
      }

      // Ensure cart_id is set
      if (!state.cart_id) {
        state.cart_id = uuidv4();
        localStorage.setItem("cart_id", state.cart_id);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      state.cart_id = null; // Reset cart_id
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_id"); // Remove cart_id from local storage
    },
    setCartId: (state, action) => {
      state.cart_id = action.payload;
      localStorage.setItem("cart_id", action.payload);
    },
  },
});

export const { addItem, removeItem, setCart, clearCart, setCartId } =
  cartSlice.actions;
export default cartSlice.reducer;
