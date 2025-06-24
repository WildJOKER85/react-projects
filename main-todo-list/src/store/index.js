import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todoSlice from "./todo-slice";

const store = configureStore({
   reducer: {
      auth: authSlice,
      todo: todoSlice,
   }
});

export default store;