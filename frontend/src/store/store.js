import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import subscriptionsReducer from "./subscriptionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiSlice.reducer,
    user: userReducer,
    subscriptions: subscriptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

export default store;
