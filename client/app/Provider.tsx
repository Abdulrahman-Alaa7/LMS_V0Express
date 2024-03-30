"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { apiSlice } from "../redux/features/api/apiSlice";

interface ProviderProps {
  children: any;
}

export function Providers({ children }: ProviderProps) {
  useEffect(() => {
    const initializeApp = async () => {
      await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
      );
    };

    initializeApp();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
