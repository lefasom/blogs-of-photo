import { configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./imagesSlice";
import userSlice from "./userSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    images: imagesSlice,
    user: userSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: userSlice,
      },
      serializableCheck: false,
    }),

})
export default store