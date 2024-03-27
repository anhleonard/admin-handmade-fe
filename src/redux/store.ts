import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import confirmSlice from "./slices/confirmSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    confirm: confirmSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
