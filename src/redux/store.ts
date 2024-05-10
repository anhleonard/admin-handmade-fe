import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import confirmSlice from "./slices/confirmSlice";
import loadingSlice from "./slices/loadingSlice";
import alertSlice from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    confirm: confirmSlice,
    loading: loadingSlice,
    alert: alertSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;