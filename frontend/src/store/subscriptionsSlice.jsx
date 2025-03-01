import { createSlice } from "@reduxjs/toolkit";

const loadSubscriptions = () => {
  const data = localStorage.getItem("subscriptions");
  return data ? JSON.parse(data) : [];
};

const saveSubscriptions = (subscriptions) => {
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: loadSubscriptions(),
  reducers: {
    toggleSubscription: (state, action) => {
      const id = action.payload;
      let nextState;

      if (state.includes(id)) {
        nextState = state.filter((sub) => sub !== id);
      } else {
        nextState = [...state, id];
      }

      saveSubscriptions(nextState);
      return nextState;
    },
  },
});

export const { toggleSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
