import { configureStore } from "@reduxjs/toolkit";

import translateSlice from "./slices/translateSlice";
import userslice from "./slices/userslice";

export default configureStore({
  reducer: {
    userslice,
    translateSlice,
  },
});
