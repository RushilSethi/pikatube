import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userDetails: null,
  },
  reducers: {
    setUserId: (state, action) => {
        state.userId = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserId, setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
