"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
// import {}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },

  devTools: false,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Call the load user function on every page laod
// const initializeApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//   );
// };

// initializeApp();
