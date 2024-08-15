import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex(
        (item) => item.id === productId
      );

      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 1) {
          state.items[productIndex].quantity -= 1;
        } else {
          state.items.splice(productIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
