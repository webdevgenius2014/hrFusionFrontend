import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: undefined,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setlogoutUser: (state) => {
      state.currentUser = undefined;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
    setlogoutUser,
    setCurrentUser
} = userReducer.actions;

export default userReducer.reducer;