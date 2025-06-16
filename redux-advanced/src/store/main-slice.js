import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isCartVisibility: false,
   statusMessage: null,
};

const mainSlice = createSlice({
   name: 'cartVisibility',
   initialState,
   reducers: {
      toggleCartVisibility(state) {
         state.isCartVisibility = !state.isCartVisibility;
      },
      showStatusMessage(state, action) {
         state.statusMessage = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
         }
      },
   },
});

export const mainActions = mainSlice.actions;
export default mainSlice.reducer;