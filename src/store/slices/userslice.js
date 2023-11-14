import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/useraction";

const initialState = {
  users: [],
  darkMode: false,
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  //thunk aksiyonlarını yönetmek için extraReducers kullanılır
  extraReducers: {
    //* henüz api'den cevap gelmediyse tetiklendir
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },

    //* api'dan olumlu cevap geldiyse
    [getUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    //* api'den olumsuz cevap gelirse
    [getUser.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
  // senkron aksiyonlar (api isteği olmayanlar)
  reducers: {
    toogleTheme: () => {
      darkMode = !darkMode;
    },
  },
});

export const { toogleTheme } = userSlice.actions;
export default userSlice.reducer;
