import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlistAction: (state, action) => {
            state.push(action.payload);
        },
        removeFromWishlistAction: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateWishlistAction: (state, action) => {
            return action.payload; // Replace entire wishlist with new items
        },
    },
});

export const { addToWishlistAction, removeFromWishlistAction, updateWishlistAction } = wishlistSlice.actions;
export default wishlistSlice.reducer;
