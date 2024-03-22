import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
