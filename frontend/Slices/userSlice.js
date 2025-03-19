import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

export const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state  , actions) => {
      state.value = actions.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { userInfo } = userSilce.actions;

export default userSilce.reducer;
