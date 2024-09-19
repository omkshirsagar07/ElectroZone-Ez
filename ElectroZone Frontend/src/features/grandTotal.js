import {createSlice} from '@reduxjs/toolkit';

const grandTotal = createSlice({
    name:'grandTotal',
    initialState:0,
    reducers: {
        updateAmount: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const {updateAmount} = grandTotal.actions;
export default grandTotal.reducer;