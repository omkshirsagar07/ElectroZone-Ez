import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCartAction: (state, action) => {
      state.push(action.payload);
    },
    removeFromCartAction: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    updateQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCartAction: (state, action) => {
      return action.payload; // Replace entire cart with new items
    },
  },
});

export const { addToCartAction, removeFromCartAction, updateQuantityAction, updateCartAction } = cartSlice.actions;
export default cartSlice.reducer;
