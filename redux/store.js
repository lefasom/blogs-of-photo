import { configureStore } from "@reduxjs/toolkit";
import personSlice from "./personSlice";
import sessionSlice from "./sessionSlice";

const store = configureStore({
     reducer: {
        person: personSlice,
        session : sessionSlice,
     }
})
export default store