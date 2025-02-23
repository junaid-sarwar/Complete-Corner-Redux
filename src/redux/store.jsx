import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice"; // Your cart slice
import productReducer from "./productSlice"; // Assuming you have a product slice
import authReducer from "./authSlice"; // Assuming you have a product slice

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  auth: authReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To prevent errors
    }),
});

// Persist Store
export const persistor = persistStore(store);
