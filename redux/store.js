import { configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./imagesSlice";
import usersSlice from "./usersSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    images: imagesSlice,
    users: usersSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: usersSlice,
      },
      serializableCheck: false,
    }),

})
export default store