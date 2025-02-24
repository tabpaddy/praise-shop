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
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      // Set cart_id only for guests if not already set
      if (!state.cart_id && !action.payload.userId) {
        state.cart_id = uuidv4();
        localStorage.setItem("cart_id", state.cart_id);
      }
      // Clear cart_id if user is authenticated
      // if (action.payload.userId) {
      //   state.cart_id = null;
      //   localStorage.removeItem("cart_id");
      // }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCart: (state, action) => {
      state.cart = action.payload.items || [];
      state.cart_id = action.payload.cart_id || null;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      if (state.cart_id) {
        localStorage.setItem("cart_id", state.cart_id);
      } else {
        localStorage.removeItem("cart_id");
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.cart_id = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_id");
    },
    setCartId: (state, action) => {
      state.cart_id = action.payload;
      localStorage.setItem("cart_id", action.payload);
    },
    setUserCart: (state, action) => {
      state.cart = action.payload; // Merge or set cart items from backend
      //state.cart_id = null; // Clear cart_id for authenticated users
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.removeItem("cart_id");
    },
  },
});

export const { addItem, removeItem, setCart, clearCart, setCartId, setUserCart } =
  cartSlice.actions;
export default cartSlice.reducer;