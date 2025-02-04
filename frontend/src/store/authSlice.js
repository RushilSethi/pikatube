import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    signIn: (state) => {
      state.isSignedIn = true;
      // console.log("user signed in via redux")
    },
    signOut: (state) => {
      // console.log("signedOut")
      localStorage.removeItem("AuthToken");
      state.isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
